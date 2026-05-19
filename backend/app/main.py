"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.public.articles import router as articles_router
from app.api.public.contacts import router as contacts_router
from app.api.public.services import router as services_router
from app.api.admin.auth import router as auth_router
from app.api.admin.articles import router as admin_articles_router
from app.core.config import settings

app = FastAPI(
    title="LUTECE Consulting API",
    description="Backend for lutece-consulting.com",
    version="0.1.0",
    docs_url="/api/docs" if settings.environment != "production" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles_router, prefix="/api/articles", tags=["articles"])
app.include_router(services_router, prefix="/api/services", tags=["services"])
app.include_router(contacts_router, prefix="/api/contacts", tags=["contacts"])
app.include_router(auth_router, prefix="/api/admin/auth", tags=["auth"])
app.include_router(admin_articles_router, prefix="/api/admin/articles", tags=["admin-articles"])


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "version": "0.1.0"}
