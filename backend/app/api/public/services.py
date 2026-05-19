"""Public services endpoint (static content)."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Service(BaseModel):
    slug: str
    title_fr: str
    title_en: str
    description_fr: str
    description_en: str
    icon: str
    tags: list[str]


SERVICES = [
    Service(
        slug="ai-platform-architecture",
        title_fr="Architecture de Plateforme IA",
        title_en="AI Platform Architecture",
        description_fr=(
            "Conception et déploiement de plateformes IA agentiques production-ready "
            "pour environnements régulés. De la définition d'architecture au delivery, "
            "avec gouvernance EU AI Act, DORA et RGPD intégrée dès la conception."
        ),
        description_en=(
            "Design and deployment of production-ready agentic AI platforms for regulated "
            "environments. From architecture definition to delivery, with EU AI Act, DORA "
            "and GDPR governance built in from day one."
        ),
        icon="brain",
        tags=["Agentic AI", "Multi-LLM", "EU AI Act", "Architecture"],
    ),
    Service(
        slug="llmops-multi-llm",
        title_fr="LLMOps & Quorum Multi-LLM",
        title_en="LLMOps & Multi-LLM Quorum",
        description_fr=(
            "Orchestration de quorum N-LLM spécialisé, observabilité IA (latence p95/p99, "
            "coût, qualité), versioning de prompts et frameworks d'évaluation. "
            "2,5 ans d'IA agentique en production."
        ),
        description_en=(
            "N-LLM quorum orchestration, AI observability (p95/p99 latency, cost, quality), "
            "prompt versioning, and evaluation frameworks. 2.5 years of agentic AI in production."
        ),
        icon="layers",
        tags=["LLMOps", "Multi-LLM", "Observability", "MLOps"],
    ),
    Service(
        slug="ai-act-compliance",
        title_fr="Conformité EU AI Act",
        title_en="EU AI Act Compliance",
        description_fr=(
            "Audit et mise en conformité de systèmes IA avec l'EU AI Act Articles 9-15, "
            "DORA, RGPD et AAOIFI. Risk register, model cards, audit chains SHA-256, "
            "PII Guard. Approche praticien : pas de conseil théorique, du delivery."
        ),
        description_en=(
            "AI system compliance audit for EU AI Act Articles 9-15, DORA, GDPR and AAOIFI. "
            "Risk register, model cards, SHA-256 audit chains, PII Guard. Practitioner approach: "
            "delivery, not theoretical consulting."
        ),
        icon="shield",
        tags=["EU AI Act", "DORA", "GDPR", "AI Governance"],
    ),
]


@router.get("", response_model=list[Service])
async def list_services() -> list[Service]:
    return SERVICES


@router.get("/{slug}", response_model=Service)
async def get_service(slug: str) -> Service:
    for s in SERVICES:
        if s.slug == slug:
            return s
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Service not found")
