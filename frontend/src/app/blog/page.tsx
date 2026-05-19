import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog IA Agentique — LLMOps, EU AI Act, Multi-LLM",
  description:
    "Retours d'expérience sur l'IA agentique en production. Multi-agents, LLMOps, EU AI Act — patterns réels, métriques, code. Loïc Lafhej, LUTECE Consulting.",
  keywords: [
    "blog IA agentique",
    "LLMOps articles",
    "EU AI Act pratique",
    "architecture multi-agents production",
    "observabilité LLM",
    "Loïc Lafhej blog",
  ],
  alternates: { canonical: "https://lutece-consulting.com/blog" },
  openGraph: {
    title: "Blog IA Agentique | Loïc Lafhej — LUTECE Consulting",
    description: "Patterns IA agentique, LLMOps, EU AI Act — retours d'expérience terrain.",
    url: "https://lutece-consulting.com/blog",
    type: "website",
  },
};

const PILLAR: Record<number, { label: string; color: string }> = {
  1: { label: "IA Agentique Régulée", color: "var(--accent-violet)" },
  2: { label: "Quorum Multi-LLM & LLMOps", color: "var(--accent-cyan)" },
  3: { label: "AI Governance & Conformité", color: "#E879F9" },
};

interface Article {
  id: string;
  slug: string;
  title_fr: string;
  excerpt_fr: string;
  pillar: number;
  tags: string[];
  reading_time_minutes: number;
  published_at: string | null;
  featured: boolean;
}

async function getArticles(): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  try {
    const res = await fetch(`${apiUrl}/api/articles?per_page=20`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const articles = await getArticles();
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="pt-[56px]">

      {/* ── Header ──────────────────────────────────── */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <p className="kicker mb-3">Terrain, pas théorie</p>
            <h1 className="font-black mb-6" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", color: "var(--text-primary)" }}>
              Blog{" "}
              <span className="gradient-text">IA Agentique</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Retours d&apos;expérience sur l&apos;IA agentique en production.
              Pas de théorie : des patterns, des métriques, du code.
            </p>
          </div>

          {/* Pillar legend */}
          <div className="flex flex-wrap gap-2 mt-8 animate-fade-up delay-1">
            {Object.values(PILLAR).map((p) => (
              <span
                key={p.label}
                className="font-mono text-[10px] px-2.5 py-1 border"
                style={{
                  borderColor: `color-mix(in srgb, ${p.color} 30%, transparent)`,
                  color: p.color,
                  background: `color-mix(in srgb, ${p.color} 6%, transparent)`,
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div className="container">
          {articles.length === 0 ? (
            <div
              className="max-w-lg mx-auto p-12 text-center animate-fade-up border"
              style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}
            >
              <div
                className="w-12 h-12 mx-auto mb-5 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(0,229,255,0.12))", border: "1px solid var(--border-default)" }}
              >
                <span className="font-mono text-lg font-black gradient-text">B</span>
              </div>
              <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Articles à venir</p>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                Premier article en publication prochaine — patterns quorum multi-LLM,
                LLMOps en production, EU AI Act en pratique.
              </p>
              <a
                href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Suivre sur LinkedIn →
              </a>
            </div>
          ) : (
            <div className="max-w-4xl space-y-12">

              {/* Featured */}
              {featured.length > 0 && (
                <div>
                  <p className="kicker mb-6">À la une</p>
                  <div className="space-y-px" style={{ background: "var(--border-default)" }}>
                    {featured.map((article) => {
                      const p = PILLAR[article.pillar] ?? PILLAR[1];
                      return (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="hover-overlay block p-7 group"
                        >
                          <div className="flex items-start gap-5">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span
                                  className="font-mono text-[10px] px-2.5 py-1 border"
                                  style={{
                                    color: p.color,
                                    borderColor: `color-mix(in srgb, ${p.color} 30%, transparent)`,
                                    background: `color-mix(in srgb, ${p.color} 6%, transparent)`,
                                  }}
                                >
                                  {p.label}
                                </span>
                                <span className="font-mono text-[10px] flex items-center gap-1" style={{ color: "#FBBF24" }}>
                                  <Star size={10} fill="currentColor" /> À la une
                                </span>
                              </div>
                              <h2 className="text-xl font-bold mb-2 transition-colors leading-snug" style={{ color: "var(--text-primary)" }}>
                                {article.title_fr}
                              </h2>
                              <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                                {article.excerpt_fr}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                                {article.published_at && (
                                  <span>{formatDate(article.published_at)}</span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {article.reading_time_minutes} min
                                </span>
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span key={tag}>#{tag}</span>
                                ))}
                              </div>
                            </div>
                            <ArrowRight
                              size={16}
                              className="shrink-0 mt-1 transition-colors"
                              style={{ color: "var(--text-muted)" }}
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All other articles */}
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && <p className="kicker mb-6">Tous les articles</p>}
                  <div className="space-y-px" style={{ background: "var(--border-default)" }}>
                    {rest.map((article) => {
                      const p = PILLAR[article.pillar] ?? PILLAR[1];
                      return (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="hover-overlay block p-6 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                  className="font-mono text-[10px] px-2 py-0.5 border"
                                  style={{
                                    color: p.color,
                                    borderColor: `color-mix(in srgb, ${p.color} 25%, transparent)`,
                                  }}
                                >
                                  {p.label}
                                </span>
                              </div>
                              <h2 className="text-base font-semibold mb-1.5 transition-colors leading-snug" style={{ color: "var(--text-primary)" }}>
                                {article.title_fr}
                              </h2>
                              <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--text-tertiary)" }}>
                                {article.excerpt_fr}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                                {article.published_at && (
                                  <span>{formatDate(article.published_at)}</span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {article.reading_time_minutes} min
                                </span>
                              </div>
                            </div>
                            <ArrowRight
                              size={15}
                              className="shrink-0 mt-1 transition-colors"
                              style={{ color: "var(--text-muted)" }}
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
