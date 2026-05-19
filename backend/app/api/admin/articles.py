"""Admin CRUD for articles."""

import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_admin
from app.models.article import Article
from app.models.user import AdminUser
from app.schemas.article import ArticleCreate, ArticlePublic, ArticleUpdate

router = APIRouter()


@router.get("", response_model=list[ArticlePublic])
async def list_all_articles(
    db: AsyncSession = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
) -> list[Article]:
    result = await db.execute(select(Article).order_by(Article.created_at.desc()))
    return list(result.scalars().all())


@router.post("", response_model=ArticlePublic, status_code=201)
async def create_article(
    data: ArticleCreate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
) -> Article:
    article = Article(**data.model_dump(), author_id=admin.id)
    if data.status == "published":
        article.published_at = datetime.utcnow()
    db.add(article)
    await db.commit()
    await db.refresh(article)
    return article


@router.patch("/{article_id}", response_model=ArticlePublic)
async def update_article(
    article_id: uuid.UUID,
    data: ArticleUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
) -> Article:
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")

    for field, value in data.model_dump(exclude_none=True).items():
        setattr(article, field, value)

    if data.status == "published" and article.published_at is None:
        article.published_at = datetime.utcnow()

    article.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(article)
    return article


@router.delete("/{article_id}", status_code=204)
async def delete_article(
    article_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
) -> None:
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    await db.delete(article)
    await db.commit()
