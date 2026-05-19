import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services IA Agentique — Architecture, LLMOps, EU AI Act",
  description:
    "3 offres de services en architecture IA agentique pour environnements régulés : Architecture Plateforme IA (banque/assurance), LLMOps & Quorum Multi-LLM, Conformité EU AI Act Articles 9-15. Paris. Loïc Lafhej, LUTECE Consulting.",
  keywords: [
    "architecture plateforme IA",
    "LLMOps Paris",
    "conformité EU AI Act",
    "consultant IA agentique Paris",
    "architecture multi-agents",
    "quorum LLM",
    "DORA conformité IA",
    "architecte IA freelance",
  ],
  alternates: { canonical: "https://lutece-consulting.com/services" },
  openGraph: {
    title: "Services Architecture IA Agentique | LUTECE Consulting Paris",
    description:
      "Architecture Plateforme IA, LLMOps Multi-LLM, Conformité EU AI Act. Disponible juin 2026. TJM 850–1100€.",
    url: "https://lutece-consulting.com/services",
  },
};

const SERVICES = [
  {
    slug: "ai-platform-architecture",
    number: "01",
    color: "#00d9ff",
    title: "Architecture de Plateforme IA",
    subtitle: "AI Platform Architecture",
    description:
      "Conception et déploiement de plateformes IA agentiques production-ready pour environnements régulés. De la définition d'architecture au delivery, avec gouvernance EU AI Act, DORA et RGPD intégrée dès la conception.",
    deliverables: [
      "Architecture decision records (ADR)",
      "Infrastructure as Code (Terraform, ArgoCD)",
      "Patterns quorum multi-LLM",
      "PII Guard et audit chain",
      "Documentation conformité",
    ],
    tags: ["Agentic AI", "Multi-LLM", "EU AI Act", "IaC"],
  },
  {
    slug: "llmops-multi-llm",
    number: "02",
    color: "#6b00ff",
    title: "LLMOps & Quorum Multi-LLM",
    subtitle: "LLMOps & Multi-LLM Quorum",
    description:
      "Orchestration de quorum N-LLM spécialisé, observabilité IA (latence p95/p99, coût, qualité), versioning de prompts et frameworks d'évaluation. 2,5 ans d'IA agentique en production.",
    deliverables: [
      "QuorumDispatcher custom (asyncio, consensus engine)",
      "Registry prompts versionné",
      "Métriques latence p95/p99 par provider",
      "Benchmark data-driven multi-provider",
      "Dashboards Grafana / métriques personnalisées",
    ],
    tags: ["LLMOps", "Multi-LLM", "Observability", "Python"],
  },
  {
    slug: "ai-act-compliance",
    number: "03",
    color: "#ff00c8",
    title: "Conformité EU AI Act",
    subtitle: "EU AI Act Compliance",
    description:
      "Audit et mise en conformité de systèmes IA avec l'EU AI Act Articles 9-15, DORA, RGPD et AAOIFI. Risk register, model cards, audit chains SHA-256. Approche praticien : pas de conseil théorique, du delivery.",
    deliverables: [
      "Audit de conformité système IA existant",
      "AI risk register (ISO 42001 aligned)",
      "Model cards et system cards",
      "Audit chain SHA-256 (rétention 7 ans)",
      "Policy engine pre-LLM",
    ],
    tags: ["EU AI Act", "DORA", "RGPD", "AI Governance"],
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Architecture IA — LUTECE Consulting",
  description: "Offres de services en architecture IA agentique pour environnements régulés",
  url: "https://lutece-consulting.com/services",
  numberOfItems: 3,
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      url: `https://lutece-consulting.com/services#${s.slug}`,
      provider: {
        "@type": "Organization",
        name: "LUTECE Consulting SAS",
        url: "https://lutece-consulting.com",
      },
      areaServed: "FR",
      availableLanguage: ["French", "English"],
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels types de projets IA agentique prenez-vous en charge ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je prends en charge la conception et le déploiement de plateformes IA agentiques pour des environnements régulés : banque, assurance, santé. Cela inclut les architectures multi-agents, les systèmes de quorum N-LLM, la mise en conformité EU AI Act et la mise en production complète avec observabilité.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est votre TJM et votre disponibilité ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mon TJM est de 850 à 1100€ par jour selon le contexte de la mission. Je suis disponible à partir du 2 juin 2026 pour des missions à Paris et en mode hybride (Île-de-France).",
      },
    },
    {
      "@type": "Question",
      name: "Comment garantissez-vous la conformité EU AI Act ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J'applique une approche praticien : audit de conformité des systèmes IA existants selon les Articles 9-15 de l'EU AI Act, création de l'AI risk register aligné ISO 42001, model cards, system cards, audit chain SHA-256 avec rétention 7 ans, et policy engine pre-LLM. Je couvre également DORA, RGPD et AAOIFI.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce qu'une architecture Quorum Multi-LLM ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une architecture quorum N-LLM spécialisée orchestre plusieurs modèles de langage (LLM) en parallèle, chacun spécialisé par rôle. Un moteur de consensus détermine la réponse finale. Cela améliore la fiabilité, réduit les hallucinations et permet une observabilité fine (latence p95/p99, coût, qualité par provider).",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-24 px-6 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-4">Services</h1>
      <p className="text-lg text-[#a3a3a3] mb-16 max-w-2xl">
        3 offres de services centrées sur l&apos;IA agentique en production pour
        environnements régulés. Disponible à partir du 2 juin 2026.
      </p>

      <div className="space-y-8">
        {SERVICES.map((service) => (
          <div key={service.slug} className="glass-card rounded-xl p-8">
            <div className="flex items-start gap-6">
              <div className="text-5xl font-mono font-bold shrink-0" style={{ color: service.color }}>
                {service.number}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{service.title}</h2>
                <p className="text-sm text-[#a3a3a3] font-mono mb-4">{service.subtitle}</p>
                <p className="text-[#a3a3a3] mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-white mb-3">Livrables typiques</div>
                  <ul className="space-y-1">
                    {service.deliverables.map((d) => (
                      <li key={d} className="text-sm text-[#a3a3a3] flex items-center gap-2">
                        <span style={{ color: service.color }}>→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: service.color + "40", color: service.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-block px-8 py-4 rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition"
        >
          Discuter de votre projet
        </Link>
      </div>
    </div>
  );
}
