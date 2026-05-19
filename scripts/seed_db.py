"""Seed script: creates admin user + first article.

Usage:
    cd backend
    DATABASE_URL=postgresql+asyncpg://... python ../scripts/seed_db.py
"""

import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from app.models.user import AdminUser
from app.models.article import Article
from app.core.security import get_password_hash


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://lutece:lutece@localhost:5432/lutece_db",
)

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "loic.lafhej@lutece-consulting.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "ChangeMe2026!")

ARTICLE_QUORUM = {
    "slug": "quorum-4-llm-production-architecture",
    "title_fr": "Architecture Quorum 4-LLM en production : patterns et retours d'expérience",
    "title_en": "4-LLM Quorum Architecture in Production: Patterns and Lessons Learned",
    "excerpt_fr": (
        "Comment orchestrer 4 LLMs spécialisés en quorum pour atteindre 96.3% de recall "
        "tout en maintenant un taux de faux positifs sous 2% dans un environnement régulé."
    ),
    "excerpt_en": (
        "How to orchestrate 4 specialized LLMs in quorum to achieve 96.3% recall "
        "while keeping false positives below 2% in a regulated environment."
    ),
    "content_fr": """# Architecture Quorum 4-LLM en production

## Contexte

Déployer un seul LLM en production dans un environnement régulé (banque, assurance) est une erreur d'architecture. La question n'est pas "quel LLM ?" mais "comment orchestrer plusieurs LLMs pour maximiser recall et minimiser les faux positifs ?".

## Le pattern QuorumDispatcher

L'idée centrale : N LLMs reçoivent la même requête en parallèle via asyncio.gather(). Un ConsensusEngine agrège les réponses par vote pondéré.

```python
import asyncio
from dataclasses import dataclass
from typing import Literal

@dataclass
class QuorumResult:
    status: Literal["AUTOMATED", "ESCALATE_HUMAN", "DEGRADED"]
    consensus_answer: str | None
    confidence: float
    provider_count: int

async def dispatch(request, providers, min_quorum_size=3):
    tasks = [p.complete(request) for p in providers if p.is_healthy()]
    outputs = await asyncio.gather(*tasks, return_exceptions=True)
    valid = [o for o in outputs if not isinstance(o, Exception)]
    if len(valid) < min_quorum_size:
        return QuorumResult(status="DEGRADED", ...)
    return consensus_engine.evaluate(valid)
```

## Résultats mesurés

Après 14 mois en production sur un volume de plusieurs millions de requêtes :

- Recall global : **96.3%** (vs 71% avec un seul LLM)
- Taux de faux positifs : **1.8%**
- Latence p95 : maintenue sous 2.5s malgré l'orchestration parallèle

## Patterns clés

**Health scoring** : chaque provider accumule un score glissant (fenêtre 100 appels). Un provider tombe sous le seuil de santé → exclu du quorum dynamiquement.

**Consensus pondéré** : les providers ne sont pas égaux. Un modèle spécialisé sur le domaine pèse plus lourd dans le vote. Le poids est calibré sur données réelles, pas sur benchmarks publics.

**Dégradation gracieuse** : si moins de N providers sont sains → DEGRADED (escalade humaine) plutôt qu'erreur 500.

## Ce que ça change opérationnellement

Un QuorumDispatcher bien calibré vous donne trois choses : résilience (un provider tombe, le quorum continue), qualité supérieure (consensus > meilleur modèle individuel), et traçabilité (chaque décision porte les votes de tous les providers).

Le code open-source du QuorumDispatcher est disponible dans [ai-agentic-toolkit](https://github.com/llafhej1976/ai-agentic-toolkit).
""",
    "content_en": "See French version. English translation available on request.",
    "pillar": 2,
    "status": "published",
    "featured": True,
    "tags": ["LLMOps", "Multi-LLM", "Quorum", "Production", "Python"],
    "reading_time_minutes": 8,
    "published_at": datetime(2026, 5, 20, 9, 0, 0, tzinfo=timezone.utc),
}


async def main() -> None:
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        # Check if admin already exists
        result = await session.execute(
            select(AdminUser).where(AdminUser.email == ADMIN_EMAIL)
        )
        admin = result.scalar_one_or_none()

        if admin is None:
            admin = AdminUser(
                id=uuid.uuid4(),
                email=ADMIN_EMAIL,
                hashed_password=get_password_hash(ADMIN_PASSWORD),
                is_active=True,
                created_at=datetime.utcnow(),
            )
            session.add(admin)
            await session.flush()
            print(f"[seed] Admin created: {ADMIN_EMAIL}")
        else:
            print(f"[seed] Admin already exists: {ADMIN_EMAIL}")

        # Check if article already exists
        result = await session.execute(
            select(Article).where(Article.slug == ARTICLE_QUORUM["slug"])
        )
        existing = result.scalar_one_or_none()

        if existing is None:
            article = Article(
                id=uuid.uuid4(),
                author_id=admin.id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
                **{k: v for k, v in ARTICLE_QUORUM.items() if k != "published_at"},
                published_at=ARTICLE_QUORUM["published_at"].replace(tzinfo=None),
            )
            session.add(article)
            print(f"[seed] Article created: {ARTICLE_QUORUM['slug']}")
        else:
            print(f"[seed] Article already exists: {ARTICLE_QUORUM['slug']}")

        await session.commit()

    await engine.dispose()
    print("[seed] Done.")


if __name__ == "__main__":
    asyncio.run(main())
