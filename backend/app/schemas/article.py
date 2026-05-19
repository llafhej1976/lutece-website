"""Article Pydantic schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel


class ArticlePublic(BaseModel):
    id: uuid.UUID
    slug: str
    title_fr: str
    title_en: str
    excerpt_fr: str
    excerpt_en: str
    content_fr: str
    content_en: str
    pillar: int
    status: str
    featured: bool
    tags: list[str]
    cover_image_url: str | None
    reading_time_minutes: int
    published_at: datetime | None
    created_at: datetime

    model_config = {"from_attributes": True}


class ArticleCreate(BaseModel):
    slug: str
    title_fr: str
    title_en: str
    excerpt_fr: str = ""
    excerpt_en: str = ""
    content_fr: str = ""
    content_en: str = ""
    pillar: int = 1
    status: str = "draft"
    featured: bool = False
    tags: list[str] = []
    cover_image_url: str | None = None
    reading_time_minutes: int = 5


class ArticleUpdate(BaseModel):
    title_fr: str | None = None
    title_en: str | None = None
    excerpt_fr: str | None = None
    excerpt_en: str | None = None
    content_fr: str | None = None
    content_en: str | None = None
    pillar: int | None = None
    status: str | None = None
    featured: bool | None = None
    tags: list[str] | None = None
    cover_image_url: str | None = None
    reading_time_minutes: int | None = None
