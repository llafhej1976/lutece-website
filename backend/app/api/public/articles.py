"""Public articles endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.article import Article
from app.schemas.article import ArticlePublic

router = APIRouter()


@router.get("", response_model=list[ArticlePublic])
async def list_articles(
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=10, ge=1, le=50),
    pillar: int | None = None,
    db: AsyncSession = Depends(get_db),
) -> list[Article]:
    query = select(Article).where(Article.status == "published")
    if pillar:
        query = query.where(Article.pillar == pillar)
    query = query.order_by(Article.published_at.desc())
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(query)
    return list(result.scalars().all())


@router.get("/{slug}", response_model=ArticlePublic)
async def get_article(slug: str, db: AsyncSession = Depends(get_db)) -> Article:
    result = await db.execute(
        select(Article).where(Article.slug == slug, Article.status == "published")
    )
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")

    article.views_count += 1
    await db.commit()
    return article
