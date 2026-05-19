import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  title_en: string;
  excerpt_fr: string;
  content_fr: string;
  pillar: number;
  tags: string[];
  reading_time_minutes: number;
  published_at: string | null;
  featured: boolean;
}

async function getArticle(slug: string): Promise<Article | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  try {
    const res = await fetch(`${apiUrl}/api/articles/${slug}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article — LUTECE Consulting" };
  return {
    title: `${article.title_fr} — LUTECE Consulting`,
    description: article.excerpt_fr,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const color = PILLAR_COLORS[article.pillar] ?? "#00d9ff";

  return (
    <div className="pt-24 pb-24 px-6 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white mb-8 transition"
      >
        ← Retour au blog
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{ color, borderColor: color + "40" }}
          >
            {PILLAR_LABELS[article.pillar]}
          </span>
          <span className="text-xs text-[#525252]">
            {article.reading_time_minutes} min de lecture
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title_fr}</h1>

        <p className="text-lg text-[#a3a3a3] mb-4">{article.excerpt_fr}</p>

        <div className="flex items-center gap-4 text-sm text-[#525252]">
          <span>Loïc Lafhej</span>
          {article.published_at && (
            <>
              <span>·</span>
              <span>{formatDate(article.published_at)}</span>
            </>
          )}
        </div>
      </div>

      <hr className="border-[#262626] mb-8" />

      <div className="prose-dark text-[#a3a3a3] leading-relaxed space-y-4">
        {article.content_fr.split("\n\n").map((para, i) => {
          if (para.startsWith("# ")) {
            return (
              <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
                {para.slice(2)}
              </h2>
            );
          }
          if (para.startsWith("## ")) {
            return (
              <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">
                {para.slice(3)}
              </h3>
            );
          }
          if (para.startsWith("```")) {
            const lines = para.split("\n");
            const code = lines.slice(1, -1).join("\n");
            return (
              <pre
                key={i}
                className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4 overflow-x-auto text-sm text-[#00d9ff] font-mono"
              >
                <code>{code}</code>
              </pre>
            );
          }
          return (
            <p key={i} className="text-[#a3a3a3]">
              {para}
            </p>
          );
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-[#262626]">
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-[#262626] text-[#a3a3a3]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 text-center">
          <p className="text-[#a3a3a3] mb-4">
            Une question sur cet article ou un projet à discuter ?
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg bg-[#00d9ff] text-black font-semibold hover:bg-[#00d9ff]/90 transition"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
