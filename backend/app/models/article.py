"""Article model."""

import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, Integer, DateTime, ARRAY, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)

    title_fr: Mapped[str] = mapped_column(String(500))
    title_en: Mapped[str] = mapped_column(String(500))
    excerpt_fr: Mapped[str] = mapped_column(Text, default="")
    excerpt_en: Mapped[str] = mapped_column(Text, default="")
    content_fr: Mapped[str] = mapped_column(Text, default="")
    content_en: Mapped[str] = mapped_column(Text, default="")

    status: Mapped[str] = mapped_column(String(20), default="draft")
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    pillar: Mapped[int] = mapped_column(Integer, default=1)

    tags: Mapped[list] = mapped_column(ARRAY(String), default=list)
    cover_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    views_count: Mapped[int] = mapped_column(Integer, default=0)
    reading_time_minutes: Mapped[int] = mapped_column(Integer, default=5)

    published_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("admin_users.id"))
