import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

const PILLAR: Record<number, { label: string; color: string }> = {
  1: { label: "IA Agentique Régulée", color: "#4DD0FF" },
  2: { label: "Quorum Multi-LLM & LLMOps", color: "#7C5CFF" },
  3: { label: "AI Governance & Conformité", color: "#E879F9" },
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
  const p = PILLAR[article.pillar];
  return {
    title: `${article.title_fr}`,
    description: article.excerpt_fr,
    keywords: article.tags,
    alternates: { canonical: `https://lutece-consulting.com/blog/${slug}` },
    openGraph: {
      title: article.title_fr,
      description: article.excerpt_fr,
      url: `https://lutece-consulting.com/blog/${slug}`,
      type: "article",
      tags: article.tags,
    },
    other: p ? { "article:section": p.label } : {},
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("# ")) {
      return (
        <h2 key={i} className="text-2xl font-bold text-[#F5F6F8] mt-10 mb-4">
          {block.slice(2)}
        </h2>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h3 key={i} className="text-xl font-semibold text-[#F5F6F8] mt-8 mb-3">
          {block.slice(3)}
        </h3>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h4 key={i} className="text-lg font-semibold text-[#B4B7C1] mt-6 mb-2">
          {block.slice(4)}
        </h4>
      );
    }
    if (block.startsWith("```")) {
      const lines = block.split("\n");
      const lang = lines[0].replace("```", "").trim();
      const code = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined).join("\n");
      return (
        <div key={i} className="my-6">
          {lang && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0B10] border border-white/[0.1] border-b-0 rounded-t-lg">
              <span className="text-xs font-mono text-[#5A5E6B]">{lang}</span>
            </div>
          )}
          <pre
            className={`bg-[#0A0B10] border border-white/[0.1] ${lang ? "rounded-b-lg rounded-tr-lg" : "rounded-lg"} p-5 overflow-x-auto text-sm text-[#4DD0FF] font-mono leading-relaxed`}
          >
            <code>{code}</code>
          </pre>
        </div>
      );
    }
    if (block.startsWith("- ") || block.startsWith("* ")) {
      const items = block.split("\n").filter((l) => l.trim());
      return (
        <ul key={i} className="my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="text-[#B4B7C1] flex items-start gap-2 text-sm leading-relaxed">
              <span className="text-[#4DD0FF] shrink-0 mt-1">›</span>
              {item.replace(/^[-*]\s/, "")}
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-6 pl-4 border-l-2 border-[#7C5CFF] text-[#B4B7C1] italic text-sm leading-relaxed"
        >
          {block.slice(2)}
        </blockquote>
      );
    }
    return (
      <p key={i} className="text-[#B4B7C1] leading-relaxed text-sm my-4">
        {block}
      </p>
    );
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

  const pillar = PILLAR[article.pillar] ?? PILLAR[1];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title_fr,
    description: article.excerpt_fr,
    author: {
      "@type": "Person",
      name: "Loïc Lafhej",
      url: "https://lutece-consulting.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "LUTECE Consulting SAS",
      url: "https://lutece-consulting.com",
    },
    datePublished: article.published_at ?? undefined,
    keywords: article.tags.join(", "),
    url: `https://lutece-consulting.com/blog/${slug}`,
    inLanguage: "fr-FR",
  };

  return (
    <div className="pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Header strip ──────────────────────────── */}
      <section className="section-spacing dot-grid">
        <div className="container max-w-3xl">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#7A7E8C] hover:text-[#F5F6F8] transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Retour au blog
          </Link>

          {/* Pillar + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full border"
              style={{
                color: pillar.color,
                borderColor: pillar.color + "40",
                background: pillar.color + "08",
              }}
            >
              {pillar.label}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#5A5E6B] font-mono">
              <Clock size={11} />
              {article.reading_time_minutes} min de lecture
            </span>
            {article.published_at && (
              <span className="flex items-center gap-1.5 text-xs text-[#5A5E6B] font-mono">
                <Calendar size={11} />
                {formatDate(article.published_at)}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#F5F6F8] mb-4 leading-tight">
            {article.title_fr}
          </h1>

          <p className="text-lg text-[#B4B7C1] leading-relaxed mb-6">
            {article.excerpt_fr}
          </p>

          <div className="flex items-center gap-3 text-sm text-[#7A7E8C]">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #7C5CFF 0%, #4DD0FF 100%)" }}
            >
              <span className="text-white font-black text-[14px] font-mono">L</span>
            </div>
            <span>Loïc Lafhej</span>
            <span className="text-[#3A3E4C]">·</span>
            <span>LUTECE Consulting</span>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────── */}
      <section className="section-spacing border-t border-white/[0.06]">
        <div className="container max-w-3xl">
          <article>
            {renderContent(article.content_fr)}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/[0.06]">
            <Tag size={14} className="text-[#5A5E6B] mt-0.5" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-full border border-white/[0.08] text-[#7A7E8C]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 card rounded-2xl p-7 text-center">
            <p className="text-[#B4B7C1] mb-5 leading-relaxed">
              Une question sur cet article ou un projet IA à discuter ?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary">
                Me contacter →
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                ← Autres articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
