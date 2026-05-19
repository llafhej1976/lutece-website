"""Smoke tests for public API endpoints."""

import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.database import get_db
from app.models.base import Base


TEST_DATABASE_URL = "postgresql+asyncpg://test:test@localhost:5432/test_db"


@pytest.fixture
async def db_engine():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()


@pytest.fixture
async def db_session(db_engine):
    Session = sessionmaker(db_engine, class_=AsyncSession, expire_on_commit=False)
    async with Session() as session:
        yield session


@pytest.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


async def test_services_returns_list(client):
    response = await client.get("/api/services")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3
    slugs = {s["slug"] for s in data}
    assert "ai-platform-architecture" in slugs


async def test_articles_returns_empty_list(client):
    response = await client.get("/api/articles")
    assert response.status_code == 200
    assert response.json() == []


async def test_contact_submit(client):
    response = await client.post("/api/contacts", json={
        "name": "Test CI",
        "email": "ci@lutece-consulting.com",
        "message": "Automated smoke test",
    })
    assert response.status_code == 200
    assert response.json()["success"] is True
