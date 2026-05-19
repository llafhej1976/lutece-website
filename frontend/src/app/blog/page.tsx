import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog IA Agentique — LLMOps, EU AI Act, Multi-LLM",
  description:
    "Retours d'expérience de Loïc Lafhej sur l'IA agentique en production. Architectures multi-agents, LLMOps, observabilité IA, conformité EU AI Act. Patterns réels, métriques, code.",
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
  1: { label: "IA Agentique Régulée", color: "#4DD0FF" },
  2: { label: "Quorum Multi-LLM & LLMOps", color: "#7C5CFF" },
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
    <div className="pt-[72px]">

      {/* ── Header ──────────────────────────────────── */}
      <section className="section-spacing dot-grid">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <p className="kicker mb-3">Terrain, pas théorie</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#F5F6F8]">
              Blog{" "}
              <span className="gradient-text">IA Agentique</span>
            </h1>
            <p className="text-lg text-[#B4B7C1] leading-relaxed max-w-2xl">
              Retours d&apos;expérience sur l&apos;IA agentique en production.
              Pas de théorie : des patterns, des métriques, du code.
            </p>
          </div>

          {/* Pillar legend */}
          <div className="flex flex-wrap gap-3 mt-8 animate-fade-up delay-1">
            {Object.values(PILLAR).map((p) => (
              <span
                key={p.label}
                className="text-xs font-mono px-3 py-1 rounded-full border"
                style={{
                  borderColor: p.color + "40",
                  color: p.color,
                  background: p.color + "08",
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container">
          {articles.length === 0 ? (
            <div className="max-w-lg mx-auto card rounded-2xl p-12 text-center animate-fade-up">
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.15), rgba(77,208,255,0.15))" }}
              >
                <span className="font-mono text-xl font-black gradient-text">B</span>
              </div>
              <p className="text-[#F5F6F8] font-semibold mb-2">Articles à venir</p>
              <p className="text-sm text-[#7A7E8C] mb-6 leading-relaxed">
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
                  <div className="space-y-4">
                    {featured.map((article) => {
                      const p = PILLAR[article.pillar] ?? PILLAR[1];
                      return (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="block card-gradient-border rounded-xl p-7 group transition-all hover:shadow-lg"
                        >
                          <div className="flex items-start gap-5">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span
                                  className="text-xs font-mono px-2.5 py-1 rounded-full border"
                                  style={{
                                    color: p.color,
                                    borderColor: p.color + "40",
                                    background: p.color + "08",
                                  }}
                                >
                                  {p.label}
                                </span>
                                <span className="text-xs text-[#FBBF24] flex items-center gap-1">
                                  <Star size={11} fill="currentColor" /> À la une
                                </span>
                              </div>
                              <h2 className="text-xl font-bold text-[#F5F6F8] mb-2 group-hover:text-[#4DD0FF] transition-colors leading-snug">
                                {article.title_fr}
                              </h2>
                              <p className="text-sm text-[#B4B7C1] leading-relaxed mb-4 line-clamp-2">
                                {article.excerpt_fr}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A5E6B]">
                                {article.published_at && (
                                  <span>{formatDate(article.published_at)}</span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  {article.reading_time_minutes} min
                                </span>
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="text-[#7A7E8C]">#{tag}</span>
                                ))}
                              </div>
                            </div>
                            <ArrowRight
                              size={18}
                              className="shrink-0 text-[#5A5E6B] group-hover:text-[#4DD0FF] transition-colors mt-1"
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
                  <div className="space-y-4">
                    {rest.map((article) => {
                      const p = PILLAR[article.pillar] ?? PILLAR[1];
                      return (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="block card-interactive rounded-xl p-6 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                  className="text-xs font-mono px-2 py-0.5 rounded-full border"
                                  style={{
                                    color: p.color,
                                    borderColor: p.color + "40",
                                  }}
                                >
                                  {p.label}
                                </span>
                              </div>
                              <h2 className="text-base font-semibold text-[#F5F6F8] mb-1.5 group-hover:text-[#4DD0FF] transition-colors leading-snug">
                                {article.title_fr}
                              </h2>
                              <p className="text-sm text-[#7A7E8C] leading-relaxed mb-3 line-clamp-2">
                                {article.excerpt_fr}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A5E6B]">
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
                              size={16}
                              className="shrink-0 text-[#5A5E6B] group-hover:text-[#4DD0FF] transition-colors mt-1"
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
