import Link from "next/link";
import { ArrowRight, Shield, Layers, FileCheck, CheckCircle } from "lucide-react";
import TerminalBox from "@/components/ui/terminal/TerminalBox";
import PromptLine from "@/components/ui/terminal/PromptLine";
import CommandButton from "@/components/ui/terminal/CommandButton";
import BlinkCursor from "@/components/ui/terminal/BlinkCursor";

export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function getRecentArticles() {
  try {
    const res = await fetch(`${API_BASE}/api/articles?per_page=3`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/* ── Data ─────────────────────────────────────────────────── */

const STATS = [
  { value: "23", unit: " ans", label: "Expérience IT" },
  { value: "2,5", unit: " ans", label: "IA agentique en production" },
  { value: "3", unit: " ans", label: "IA générative régulée" },
  { value: "850–1100", unit: " €/j", label: "TJM cible" },
];

const PILLARS = [
  {
    icon: Layers,
    number: "01",
    color: "#7C5CFF",
    title: "IA Agentique Régulée",
    desc: "Architectures multi-agents pour banque, assurance, santé. Gouvernance EU AI Act by design, PII Guard, audit chains.",
    tags: ["Agentic AI", "PII Guard", "Audit Chain", "EU AI Act"],
    href: "/services#architecture",
  },
  {
    icon: Layers,
    number: "02",
    color: "#4DD0FF",
    title: "Quorum Multi-LLM & LLMOps",
    desc: "Orchestration quorum N-LLM spécialisé par rôle. Observabilité (latence p95/p99, coût, qualité). Versioning prompts.",
    tags: ["Multi-LLM", "Observability", "LLMOps", "Python"],
    href: "/services#llmops",
  },
  {
    icon: FileCheck,
    number: "03",
    color: "#4ADE80",
    title: "AI Governance & Conformité",
    desc: "EU AI Act Art. 9-15, DORA, RGPD, AAOIFI. Model cards, AI risk register, audit chain SHA-256, rétention 7 ans.",
    tags: ["EU AI Act", "ISO 42001", "Risk Register", "DORA"],
    href: "/services#compliance",
  },
];

const PROOF_ITEMS = [
  { icon: Shield, label: "Systèmes IA en production", detail: "Environnements banque, assurance, santé" },
  { icon: FileCheck, label: "Conformité EU AI Act", detail: "Articles 9-15 · DORA · RGPD · AAOIFI" },
  { icon: Layers, label: "Architecture quorum N-LLM", detail: "Consensus engine, observabilité p95/p99" },
  { icon: CheckCircle, label: "DEA Intelligence Artificielle", detail: "Université Paris 13 · 2003" },
];

const TECH = [
  "Python 3.12", "FastAPI", "asyncio", "SQLAlchemy",
  "Anthropic Claude", "OpenAI", "LangChain", "LlamaIndex",
  "PostgreSQL", "Docker", "Terraform", "GitHub Actions",
  "Kubernetes", "Redis", "Nginx", "Next.js 15",
  "EU AI Act", "ISO 42001", "DORA", "JWT / OAuth2",
];

/* ── Component ────────────────────────────────────────────── */

export default async function HomePage() {
  const articles = await getRecentArticles();
  const allTech = [...TECH, ...TECH];

  return (
    <div>

      {/* ══════════════════════════════════════════════════════
          HERO — Terminal Editorial Brutalist
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center"
        aria-labelledby="hero-heading"
      >
        {/* Accent glows — < 4 % opacity */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 -left-48 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 60%)" }} />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 60%)" }} />
        </div>

        <div className="container relative pt-[56px]">
          <div className="max-w-[860px] pt-16 pb-20">

            {/* Terminal box */}
            <div className="animate-fade-up mb-10">
              <TerminalBox title="lutece-consulting — zsh" className="max-w-[480px]">
                <div className="p-4 space-y-1.5">
                  <PromptLine command="whoami" />
                  <PromptLine command="loic.lafhej@lutece-consulting.com" prefix="→" />
                  <PromptLine command="architect --env regulated --mode production" />
                  <PromptLine command="available --date 2026-06-02 --location Paris" prefix="→" />
                  <PromptLine command="export TJM=&quot;850-1100 €/j&quot;" />
                </div>
              </TerminalBox>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="animate-fade-up delay-1 font-bold uppercase leading-[0.95] tracking-[-0.02em] text-balance"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>L&apos;ARCHITECTE QUI MET</span>
              <br />
              <span style={{ color: "var(--text-primary)" }}>DE L&apos;IA AGENTIQUE</span>
              <br />
              <span className="gradient-text">EN PRODUCTION</span>
              <BlinkCursor className="ml-1" />
            </h1>

            {/* Sub */}
            <p
              className="animate-fade-up delay-2 mt-7 leading-[1.65] max-w-[560px]"
              style={{ fontSize: "1.0625rem", color: "var(--text-secondary)" }}
            >
              Pas de conseil théorique. Architecture, code, déploiement, mesure —
              dans des environnements régulés (banque, assurance, santé).
            </p>

            {/* Meta */}
            <p
              className="animate-fade-up delay-3 mt-3 font-mono text-xs"
              style={{ color: "var(--text-dim)" }}
              aria-hidden="true"
            >
              LOÏC LAFHEJ · LUTECE CONSULTING SAS · DEA IA PARIS 13 · 23 ANS IT
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-4 mt-10 flex flex-col sm:flex-row gap-3">
              <CommandButton href="/services" variant="primary" size="lg" as="a">
                ./voir-services
                <ArrowRight size={14} aria-hidden="true" />
              </CommandButton>
              <CommandButton href="/contact" variant="ghost" size="lg" as="a">
                ./me-contacter
              </CommandButton>
            </div>

            {/* Status line */}
            <div
              className="animate-fade-up delay-5 mt-8 flex items-center gap-2"
              aria-label="Statut : disponible"
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span
                className="font-mono text-xs"
                style={{ color: "var(--accent-success)" }}
              >
                DISPONIBLE · 2 JUIN 2026 · PARIS / HYBRIDE ÎLE-DE-FRANCE
              </span>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, var(--border-default))" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════════════════ */}
      <section
        className="border-y border-white/[0.06] bg-[#11131A]"
        aria-label="Chiffres clés"
      >
        <div className="container py-14">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-xs font-mono text-[#5A5E6B] uppercase tracking-[0.08em] mb-2">
                  {s.label}
                </dt>
                <dd className="text-[clamp(2rem,4vw,3rem)] font-bold font-mono text-[#F5F6F8] leading-none tracking-[-0.02em]">
                  {s.value}
                  <span className="text-[#7A7E8C] text-[0.55em]">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3 PILLARS
      ══════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="pillars-heading">
        <div className="container">
          <header className="mb-12">
            <p className="kicker text-[#7A7E8C] mb-3">Expertise</p>
            <h2 id="pillars-heading" className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-[-0.02em]">
              3 piliers d&apos;expertise
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.number} className="card-interactive p-7 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${p.color}18` }}
                    >
                      <Icon size={18} style={{ color: p.color }} aria-hidden="true" />
                    </div>
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: `${p.color}60` }}
                      aria-hidden="true"
                    >
                      {p.number}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#F5F6F8] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#7A7E8C] leading-[1.65] mb-5 flex-1">{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border"
                        style={{
                          borderColor: `${p.color}30`,
                          color: `${p.color}CC`,
                          background: `${p.color}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors mt-auto"
                  >
                    En savoir plus
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          APPROACH — proof section
      ══════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#11131A] border-y border-white/[0.06]" aria-labelledby="approach-heading">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <p className="kicker text-[#7A7E8C] mb-4">Approche</p>
              <h2 id="approach-heading" className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] leading-[1.2] mb-5">
                Pas de conseil théorique.<br />
                J&apos;<span className="gradient-text">architecture, code,<br />déploie et mesure.</span>
              </h2>
              <p className="text-[#B4B7C1] leading-[1.7] mb-5">
                2,5 ans d&apos;IA agentique en production dans des environnements régulés — banque,
                assurance, infrastructures critiques. Expertise praticien EU AI Act dès la conception.
              </p>
              <p className="text-[#7A7E8C] text-sm leading-[1.7]">
                Chaque mission livre du code, des ADR, des métriques vérifiables — pas des
                recommandations PowerPoint.
              </p>
              <div className="mt-8">
                <Link href="/about" className="btn btn-ghost">
                  Parcours détaillé
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right — proof grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {PROOF_ITEMS.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="card p-5 flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#7C5CFF]/10 mt-0.5">
                    <Icon size={16} className="text-[#7C5CFF]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F6F8] mb-0.5">{label}</p>
                    <p className="text-xs text-[#7A7E8C] leading-snug">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TECH STRIP — marquee
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 overflow-hidden border-b border-white/[0.06]" aria-label="Stack technique">
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {allTech.map((tech, i) => (
              <span
                key={i}
                className="shrink-0 text-xs font-mono px-4 py-1.5 rounded-full border border-white/[0.08] text-[#5A5E6B] hover:text-[#B4B7C1] hover:border-white/[0.14] transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BLOG TEASER
      ══════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="blog-heading">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="kicker text-[#7A7E8C] mb-2">Journal de bord</p>
              <h2 id="blog-heading" className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em]">
                Publications
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors"
            >
              Voir tout <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-5">
              {articles.map((a: {
                slug: string;
                pillar: number;
                title_fr: string;
                excerpt_fr: string;
                reading_time_minutes: number;
              }) => {
                const c = a.pillar === 1 ? "#7C5CFF" : a.pillar === 2 ? "#4DD0FF" : "#4ADE80";
                return (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="card-interactive p-6 block group">
                    <div className="w-7 h-0.5 rounded mb-4" style={{ background: c }} />
                    <h3 className="text-sm font-semibold text-[#F5F6F8] mb-2 group-hover:text-[#7C5CFF] transition-colors line-clamp-2">
                      {a.title_fr}
                    </h3>
                    <p className="text-xs text-[#7A7E8C] leading-[1.6] line-clamp-3 mb-4">{a.excerpt_fr}</p>
                    <span className="text-[11px] font-mono text-[#5A5E6B]">{a.reading_time_minutes} min de lecture</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card-gradient-border p-10 max-w-xl">
              <p className="kicker text-[#7A7E8C] mb-3">En cours d&apos;écriture</p>
              <h3 className="text-lg font-semibold text-[#F5F6F8] mb-3">
                Premier article à paraître prochainement
              </h3>
              <p className="text-sm text-[#7A7E8C] leading-[1.65] mb-5">
                Architectures agentiques en production, patterns quorum N-LLM,
                conformité EU AI Act — retours d&apos;expérience terrain.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Architecture agentique", "LLMOps", "EU AI Act"].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded border border-white/[0.08] text-[#5A5E6B]">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C5CFF] hover:text-[#9B7FFF] transition-colors"
              >
                Suivre sur LinkedIn <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[#11131A] border-t border-white/[0.06]" aria-labelledby="cta-heading">
        <div className="container text-center max-w-[640px]">
          <p className="kicker text-[#7A7E8C] mb-4">Contact</p>
          <h2 id="cta-heading" className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-4">
            Parlons de votre projet.
          </h2>
          <p className="text-[#B4B7C1] leading-[1.65] mb-8">
            Disponible à partir du{" "}
            <strong className="text-[#F5F6F8] font-semibold">2 juin 2026</strong> pour des missions
            d&apos;architecture IA en environnements régulés. Premier appel de découverte 30 min,
            gratuit.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Démarrer une discussion
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="mt-6 text-xs font-mono text-[#5A5E6B]">
            loic.lafhej@lutece-consulting.com · +33 6 52 56 11 33
          </p>
        </div>
      </section>

    </div>
  );
}
