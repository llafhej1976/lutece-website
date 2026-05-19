import Link from "next/link";

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

const TECH = [
  "Python 3.12", "FastAPI", "asyncio", "SQLAlchemy", "PostgreSQL",
  "Anthropic Claude", "OpenAI", "LangChain", "LlamaIndex",
  "Docker", "Terraform", "GitHub Actions", "Nginx",
  "Next.js 15", "React 19", "TypeScript",
  "EU AI Act", "ISO 42001", "DORA", "RGPD",
  "Alembic", "Pydantic", "JWT / OAuth2",
];

const PILLARS = [
  {
    number: "01",
    color: "#00d9ff",
    title: "IA Agentique Régulée",
    desc: "Architectures agentiques pour banque, assurance, santé. Patterns auditabilité, gouvernance agents, PII Guard.",
    tags: ["Agentic AI", "PII Guard", "Audit Chain"],
  },
  {
    number: "02",
    color: "#6b00ff",
    title: "Quorum Multi-LLM & LLMOps",
    desc: "Architecture quorum N-LLM spécialisé. Observabilité IA (latence p95, coût, qualité). LLMOps custom.",
    tags: ["Multi-LLM", "Observability", "Prompt Versioning"],
  },
  {
    number: "03",
    color: "#ff00c8",
    title: "AI Governance & Conformité",
    desc: "EU AI Act 2026 (Art. 9-15), DORA, AAOIFI, MiCA. Model cards, AI risk register, audit chain SHA-256.",
    tags: ["EU AI Act", "Risk Register", "Model Cards"],
  },
];

const STATS = [
  { value: "23", unit: "ans", label: "Expérience IT", color: "#00d9ff" },
  { value: "2.5", unit: "ans", label: "IA agentique prod", color: "#6b00ff" },
  { value: "3", unit: "ans", label: "IA Générative régulée", color: "#ff00c8" },
  { value: "850", unit: "€+", label: "TJM / jour", color: "#00ffaa" },
];

const CONNECT = [
  { label: "Email", value: "loic.lafhej@lutece-consulting.com", href: "mailto:loic.lafhej@lutece-consulting.com", color: "#00d9ff", icon: "✉" },
  { label: "Téléphone", value: "+33 6 52 56 11 33", href: "tel:+33652561133", color: "#00ffaa", icon: "☎" },
  { label: "LinkedIn", value: "lafhej-loic-15a79a3", href: "https://www.linkedin.com/in/lafhej-loic-15a79a3", color: "#6b00ff", icon: "in" },
  { label: "GitHub", value: "llafhej1976", href: "https://github.com/llafhej1976", color: "#ff00c8", icon: "⌥" },
];

export default async function HomePage() {
  const articles = await getRecentArticles();
  const allTech = [...TECH, ...TECH];

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {/* Grid */}
        <div className="hero-grid" />

        {/* Availability badge */}
        <div className="fade-up fade-up-1 flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#00ffaa]/30 bg-[#00ffaa]/5">
          <span className="pulse-dot" />
          <span className="text-xs font-mono text-[#00ffaa] tracking-wider uppercase">
            Disponible · 2 juin 2026 · Paris / Hybride
          </span>
        </div>

        <h1 className="fade-up fade-up-2 text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 max-w-4xl">
          <span className="gradient-text">L&apos;architecte</span> qui met<br />
          de l&apos;IA agentique en production<br />
          <span className="text-white/70 text-3xl md:text-4xl lg:text-5xl font-light">
            dans des environnements régulés.
          </span>
        </h1>

        <p className="fade-up fade-up-3 text-base md:text-lg text-[#a3a3a3] mb-10 max-w-2xl">
          <strong className="text-white">Loïc Lafhej</strong> · LUTECE Consulting SAS ·
          DEA IA Paris 13 (2003) · 23 ans IT · TJM{" "}
          <strong className="text-white">850–1100€/j</strong>
        </p>

        <div className="fade-up fade-up-4 flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/services"
            className="px-8 py-4 rounded-xl bg-[#00d9ff] text-black font-bold hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(0,217,255,0.4)]"
          >
            Voir mes services →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-[#00d9ff] hover:text-[#00d9ff] hover:scale-105 transition-all duration-200"
          >
            Me contacter
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 text-[#a3a3a3]">
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── TECH MARQUEE ─────────────────────────────── */}
      <section className="py-12 border-t border-b border-[#262626] bg-[#050505] overflow-hidden">
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {allTech.map((tech, i) => (
              <span
                key={i}
                className="shrink-0 px-5 py-2 rounded-full text-sm font-mono text-[#a3a3a3] border border-[#262626] bg-[#0a0a0a] hover:border-[#00d9ff]/40 hover:text-[#00d9ff] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="gradient-border p-6 text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="text-4xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
                <span className="text-2xl">{stat.unit}</span>
              </div>
              <div className="text-xs text-[#a3a3a3] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3 PILLARS ────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-3">Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold">3 piliers d&apos;expertise</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="gradient-border p-8 group cursor-default"
              >
                <div
                  className="text-5xl font-mono font-black mb-6 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: pillar.color }}
                >
                  {pillar.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">{pillar.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: pillar.color + "15",
                        border: `1px solid ${pillar.color}40`,
                        color: pillar.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#00d9ff] hover:gap-4 transition-all text-sm font-semibold"
            >
              Voir toutes les offres de services
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROOF BANNER ─────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden border-t border-[#262626]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/5 via-[#6b00ff]/5 to-[#ff00c8]/5" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4">Approche</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Pas de conseil théorique.<br />
                <span className="gradient-text">J&apos;architecture, je code,<br />je déploie, je mesure.</span>
              </h2>
              <p className="text-[#a3a3a3] leading-relaxed mb-8">
                2,5 ans d&apos;IA agentique en production dans des environnements régulés.
                Banque, assurance, infrastructures critiques. Expertise praticien EU AI Act.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#00d9ff]/40 text-[#00d9ff] hover:bg-[#00d9ff]/10 transition text-sm font-semibold"
              >
                En savoir plus sur mon parcours →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { label: "Systèmes IA en production", value: "Environnements régulés", icon: "⚡" },
                { label: "Conformité EU AI Act", value: "Articles 9-15 · DORA · RGPD", icon: "🔒" },
                { label: "Architecture quorum N-LLM", value: "Patterns multi-provider", icon: "◈" },
                { label: "DEA Intelligence Artificielle", value: "Université Paris 13 · 2003", icon: "🎓" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-[#a3a3a3]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ─────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-[#6b00ff] tracking-widest uppercase mb-2">Blog</p>
              <h2 className="text-3xl font-bold">Publications</h2>
            </div>
            <Link href="/blog" className="text-sm text-[#00d9ff] hover:underline hidden sm:block">
              Voir tout →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article: {
                slug: string;
                pillar: number;
                title_fr: string;
                excerpt_fr: string;
                reading_time_minutes: number;
              }) => {
                const c = article.pillar === 1 ? "#00d9ff" : article.pillar === 2 ? "#6b00ff" : "#ff00c8";
                return (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="gradient-border p-6 block group"
                  >
                    <div className="w-8 h-1 rounded-full mb-5" style={{ background: c }} />
                    <h3 className="font-semibold mb-3 group-hover:text-[#00d9ff] transition line-clamp-2">
                      {article.title_fr}
                    </h3>
                    <p className="text-sm text-[#a3a3a3] line-clamp-3 mb-4">{article.excerpt_fr}</p>
                    <span className="text-xs text-[#a3a3a3]">{article.reading_time_minutes} min de lecture</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="gradient-border p-10 text-center">
              <div className="text-4xl mb-4">✍</div>
              <p className="text-white font-semibold mb-2">Articles à venir</p>
              <p className="text-sm text-[#a3a3a3] mb-6">
                Architectures agentiques, LLMOps, EU AI Act — suivez sur LinkedIn pour les publications.
              </p>
              <a
                href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#00d9ff] hover:underline"
              >
                Suivre sur LinkedIn →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CONNECT ──────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#262626] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d9ff]/3 to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-xs font-mono text-[#ff00c8] tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parlons de votre projet</h2>
          <p className="text-[#a3a3a3] mb-14 max-w-xl mx-auto">
            Disponible à partir du{" "}
            <strong className="text-white">2 juin 2026</strong> pour des missions
            d&apos;architecture IA en environnements régulés.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {CONNECT.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="gradient-border p-6 block group text-left"
              >
                <div
                  className="text-2xl font-bold mb-3"
                  style={{ color: ch.color }}
                >
                  {ch.icon}
                </div>
                <div className="text-xs text-[#a3a3a3] mb-1">{ch.label}</div>
                <div className="text-sm font-medium text-white group-hover:text-[#00d9ff] transition break-all">
                  {ch.value}
                </div>
              </a>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-xl bg-[#00d9ff] text-black font-bold hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(0,217,255,0.3)]"
          >
            Envoyer un message →
          </Link>
        </div>
      </section>

    </div>
  );
}
