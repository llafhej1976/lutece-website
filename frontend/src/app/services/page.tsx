import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Services IA Agentique — Architecture, LLMOps, EU AI Act",
  description:
    "Architecture IA agentique pour environnements régulés : Plateforme IA, LLMOps Quorum Multi-LLM, Conformité EU AI Act Art. 9-15. Paris. Loïc Lafhej.",
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
    accent: "#4DD0FF",
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
    accent: "#7C5CFF",
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
    accent: "#E879F9",
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
    <div className="pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Header ──────────────────────────────────── */}
      <section className="section-spacing dot-grid">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <p className="kicker mb-3">Offres de mission</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F5F6F8]">
              3 services,{" "}
              <span className="gradient-text">un seul focus</span>
            </h1>
            <p className="text-lg text-[#B4B7C1] leading-relaxed max-w-2xl">
              IA agentique en production pour environnements régulés. Pas de
              conseil théorique — architecture, code, déploiement, mesure.
              Disponible à partir du 2 juin 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="space-y-8 max-w-4xl">
            {SERVICES.map((service, i) => (
              <div
                key={service.slug}
                id={service.slug}
                className={`card-gradient-border rounded-xl p-8 animate-fade-up delay-${i + 1}`}
                style={{ "--hover-accent": service.accent } as React.CSSProperties}
              >
                <div className="flex items-start gap-6 md:gap-8">
                  {/* Number */}
                  <div
                    className="text-5xl font-mono font-black shrink-0 leading-none"
                    style={{ color: service.accent }}
                    aria-hidden="true"
                  >
                    {service.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-[#F5F6F8] mb-1">
                        {service.title}
                      </h2>
                      <p className="text-xs font-mono text-[#5A5E6B] tracking-wider uppercase">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-[#B4B7C1] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <p className="text-xs font-mono text-[#7A7E8C] uppercase tracking-widest mb-3">
                        Livrables typiques
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((d) => (
                          <li
                            key={d}
                            className="text-sm text-[#B4B7C1] flex items-start gap-2"
                          >
                            <CheckCircle
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: service.accent }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: service.accent + "40",
                            color: service.accent,
                            background: service.accent + "08",
                          }}
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
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container max-w-3xl">
          <p className="kicker mb-3 text-center">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#F5F6F8]">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <details
                key={faq.name}
                className="card rounded-xl group"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none text-[#F5F6F8] font-medium hover:text-[#4DD0FF] transition-colors">
                  {faq.name}
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-[#5A5E6B] group-open:rotate-90 transition-transform duration-200"
                  />
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm text-[#B4B7C1] leading-relaxed border-t border-white/[0.06]">
                  <p className="pt-4">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <MessageSquare size={32} className="text-[#4DD0FF] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F5F6F8]">
              Discutons de votre projet
            </h2>
            <p className="text-[#7A7E8C] mb-8 leading-relaxed">
              TJM{" "}
              <span className="text-[#F5F6F8] font-semibold">850–1100 €/j</span>{" "}
              selon contexte. Paris / hybride.
              Disponible <span className="text-[#F5F6F8] font-semibold">juin 2026</span>.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Prendre contact →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
