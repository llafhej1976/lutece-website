import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — LUTECE Consulting",
  description: "Articles techniques sur l'IA agentique en production, LLMOps, et conformité EU AI Act par Loïc Lafhej.",
};

const PILLAR_COLORS: Record<number, string> = {
  1: "#00d9ff",
  2: "#6b00ff",
  3: "#ff00c8",
};

const PILLAR_LABELS: Record<number, string> = {
  1: "IA Agentique Régulée",
  2: "Quorum Multi-LLM & LLMOps",
  3: "AI Governance & Conformité",
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

  return (
    <div className="pt-24 pb-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-[#a3a3a3] mb-16 max-w-2xl">
        Retours d&apos;expérience sur l&apos;IA agentique en production. Pas de théorie :
        des patterns, des métriques, du code.
      </p>

      {articles.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-[#a3a3a3] text-lg mb-2">Articles à venir</p>
          <p className="text-sm text-[#525252]">
            Premier article en publication prochaine — suivez sur{" "}
            <a
              href="https://www.linkedin.com/in/lafhej-loic-15a79a3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d9ff] hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => {
            const color = PILLAR_COLORS[article.pillar] ?? "#00d9ff";
            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="block glass-card rounded-xl p-8 hover:border-[#00d9ff]/30 transition group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{ color, borderColor: color + "40" }}
                      >
                        {PILLAR_LABELS[article.pillar]}
                      </span>
                      {article.featured && (
                        <span className="text-xs text-[#a3a3a3]">★ Featured</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-[#00d9ff] transition">
                      {article.title_fr}
                    </h2>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4">
                      {article.excerpt_fr}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#525252]">
                      {article.published_at && (
                        <span>{formatDate(article.published_at)}</span>
                      )}
                      <span>{article.reading_time_minutes} min de lecture</span>
                      <div className="flex gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[#a3a3a3]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#525252] group-hover:text-[#00d9ff] transition text-lg shrink-0">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
