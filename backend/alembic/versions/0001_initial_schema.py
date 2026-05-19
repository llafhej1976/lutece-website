"""Initial schema: admin_users + articles

Revision ID: 0001
Revises:
Create Date: 2026-05-19 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from alembic import op

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "admin_users",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.text("NOW()")),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_admin_users_email", "admin_users", ["email"], unique=True)

    op.create_table(
        "articles",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("slug", sa.String(255), nullable=False),
        sa.Column("title_fr", sa.String(500), nullable=False),
        sa.Column("title_en", sa.String(500), nullable=False),
        sa.Column("excerpt_fr", sa.Text(), nullable=False, server_default=""),
        sa.Column("excerpt_en", sa.Text(), nullable=False, server_default=""),
        sa.Column("content_fr", sa.Text(), nullable=False, server_default=""),
        sa.Column("content_en", sa.Text(), nullable=False, server_default=""),
        sa.Column("status", sa.String(20), nullable=False, server_default="draft"),
        sa.Column("featured", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("pillar", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("tags", postgresql.ARRAY(sa.String()), nullable=False, server_default="{}"),
        sa.Column("cover_image_url", sa.String(500), nullable=True),
        sa.Column("views_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("reading_time_minutes", sa.Integer(), nullable=False, server_default="5"),
        sa.Column("published_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.text("NOW()")),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.text("NOW()")),
        sa.Column("author_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["admin_users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_articles_slug", "articles", ["slug"], unique=True)
    op.create_index("ix_articles_status_published_at", "articles", ["status", "published_at"])


def downgrade() -> None:
    op.drop_table("articles")
    op.drop_table("admin_users")
