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
    color: "var(--accent-violet)",
    title: "IA Agentique Régulée",
    desc: "Architectures multi-agents pour banque, assurance, santé. Gouvernance EU AI Act by design, PII Guard, audit chains.",
    tags: ["Agentic AI", "PII Guard", "Audit Chain", "EU AI Act"],
    href: "/services#architecture",
  },
  {
    icon: Layers,
    number: "02",
    color: "var(--accent-cyan)",
    title: "Quorum Multi-LLM & LLMOps",
    desc: "Orchestration quorum N-LLM spécialisé par rôle. Observabilité (latence p95/p99, coût, qualité). Versioning prompts.",
    tags: ["Multi-LLM", "Observability", "LLMOps", "Python"],
    href: "/services#llmops",
  },
  {
    icon: FileCheck,
    number: "03",
    color: "var(--accent-success)",
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
                  <PromptLine command='export TJM="850-1100 €/j"' />
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
        className="border-y"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}
        aria-label="Chiffres clés"
      >
        <div className="container py-12">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: "var(--text-dim)" }}>
                  {s.label}
                </dt>
                <dd
                  className="font-bold font-mono leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", color: "var(--text-primary)" }}
                >
                  {s.value}
                  <span className="text-[0.55em]" style={{ color: "var(--text-muted)" }}>{s.unit}</span>
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
            <p className="kicker mb-3" style={{ color: "var(--text-muted)" }}>Expertise</p>
            <h2 id="pillars-heading" className="font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)", color: "var(--text-primary)" }}>
              3 piliers d&apos;expertise
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border-default)" }}>
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.number}
                  className="hover-overlay flex flex-col p-7"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${p.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 25%, transparent)` }}
                    >
                      <Icon size={16} style={{ color: p.color }} aria-hidden="true" />
                    </div>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: `color-mix(in srgb, ${p.color} 40%, transparent)` }}
                      aria-hidden="true"
                    >
                      {p.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                  <p className="text-sm leading-[1.65] mb-5 flex-1" style={{ color: "var(--text-tertiary)" }}>{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 border"
                        style={{
                          borderColor: `color-mix(in srgb, ${p.color} 25%, transparent)`,
                          color: p.color,
                          background: `color-mix(in srgb, ${p.color} 6%, transparent)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors mt-auto"
                    style={{ color: "var(--text-muted)" }}
                  >
                    En savoir plus
                    <ArrowRight size={11} aria-hidden="true" />
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
      <section
        className="section-spacing border-y"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}
        aria-labelledby="approach-heading"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <p className="kicker mb-4">Approche</p>
              <h2 id="approach-heading" className="font-bold tracking-[-0.02em] leading-[1.2] mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
                Pas de conseil théorique.<br />
                <span className="gradient-text">Architecture, code,<br />déploiement, mesure.</span>
              </h2>
              <p className="leading-[1.7] mb-5" style={{ color: "var(--text-secondary)" }}>
                2,5 ans d&apos;IA agentique en production dans des environnements régulés — banque,
                assurance, infrastructures critiques. Expertise praticien EU AI Act dès la conception.
              </p>
              <p className="text-sm leading-[1.7]" style={{ color: "var(--text-tertiary)" }}>
                Chaque mission livre du code, des ADR, des métriques vérifiables — pas des
                recommandations PowerPoint.
              </p>
              <div className="mt-8">
                <CommandButton href="/about" variant="ghost" as="a">
                  Parcours détaillé
                  <ArrowRight size={13} aria-hidden="true" />
                </CommandButton>
              </div>
            </div>

            {/* Right — proof grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px" role="list" style={{ background: "var(--border-default)" }}>
              {PROOF_ITEMS.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="hover-overlay p-5 flex gap-4 items-start">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }}>
                    <Icon size={14} style={{ color: "var(--accent-violet)" }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{label}</p>
                    <p className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>{detail}</p>
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
      <section className="py-8 overflow-hidden border-b" style={{ borderColor: "var(--border-default)" }} aria-label="Stack technique">
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {allTech.map((tech, i) => (
              <span
                key={i}
                className="shrink-0 font-mono text-[11px] px-3 py-1 border transition-colors cursor-default"
                style={{ borderColor: "var(--border-default)", color: "var(--text-dim)" }}
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
              <p className="kicker mb-2">Journal de bord</p>
              <h2 id="blog-heading" className="font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)" }}>
                Publications
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              Voir tout <ArrowRight size={11} aria-hidden="true" />
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border-default)" }}>
              {articles.map((a: {
                slug: string;
                pillar: number;
                title_fr: string;
                excerpt_fr: string;
                reading_time_minutes: number;
              }) => {
                const c = a.pillar === 1 ? "var(--accent-violet)" : a.pillar === 2 ? "var(--accent-cyan)" : "var(--accent-success)";
                return (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="hover-overlay block p-6 group"
                  >
                    <div className="w-6 h-px mb-4" style={{ background: c }} aria-hidden="true" />
                    <h3 className="text-sm font-semibold mb-2 line-clamp-2 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {a.title_fr}
                    </h3>
                    <p className="text-xs leading-[1.6] line-clamp-3 mb-4" style={{ color: "var(--text-tertiary)" }}>{a.excerpt_fr}</p>
                    <span className="font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>{a.reading_time_minutes} min de lecture</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border p-10 max-w-xl" style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}>
              <p className="kicker mb-3">En cours d&apos;écriture</p>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Premier article à paraître prochainement
              </h3>
              <p className="text-sm leading-[1.65] mb-5" style={{ color: "var(--text-tertiary)" }}>
                Architectures agentiques en production, patterns quorum N-LLM,
                conformité EU AI Act — retours d&apos;expérience terrain.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Architecture agentique", "LLMOps", "EU AI Act"].map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1 border" style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors"
                style={{ color: "var(--accent-violet)" }}
              >
                Suivre sur LinkedIn <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section
        className="section-spacing border-t"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}
        aria-labelledby="cta-heading"
      >
        <div className="container text-center max-w-[640px]">
          <p className="kicker mb-4">Contact</p>
          <h2 id="cta-heading" className="font-bold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "var(--text-primary)" }}>
            Parlons de votre projet.
          </h2>
          <p className="leading-[1.65] mb-8" style={{ color: "var(--text-secondary)" }}>
            Disponible à partir du{" "}
            <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>2 juin 2026</strong> pour des missions
            d&apos;architecture IA en environnements régulés. Premier appel de découverte 30 min,
            gratuit.
          </p>
          <CommandButton href="/contact" variant="primary" size="lg" as="a">
            Démarrer une discussion
            <ArrowRight size={15} aria-hidden="true" />
          </CommandButton>
          <p className="mt-6 font-mono text-xs" style={{ color: "var(--text-dim)" }}>
            loic.lafhej@lutece-consulting.com · +33 6 52 56 11 33
          </p>
        </div>
      </section>

    </div>
  );
}
