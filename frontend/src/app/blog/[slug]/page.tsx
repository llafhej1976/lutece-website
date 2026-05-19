import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import CommandButton from "@/components/ui/terminal/CommandButton";

export const dynamic = "force-dynamic";

const PILLAR: Record<number, { label: string; color: string }> = {
  1: { label: "IA Agentique Régulée", color: "var(--accent-violet)" },
  2: { label: "Quorum Multi-LLM & LLMOps", color: "var(--accent-cyan)" },
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

function renderContent(raw: string): React.ReactNode[] {
  const content = raw.replace(/^#[ \t]+[^\n]+\n?/, "");
  const parts = content.split(/(```[\w]*\n[\s\S]*?```)/);
  const elements: React.ReactNode[] = [];

  parts.forEach((part, partIdx) => {
    if (part.startsWith("```")) {
      const lines = part.split("\n");
      const lang = lines[0].replace("```", "").trim();
      const lastLine = lines[lines.length - 1];
      const code = lines.slice(1, lastLine === "```" ? -1 : undefined).join("\n");
      elements.push(
        <div key={`code-${partIdx}`} className="my-6">
          {lang && (
            <div
              className="flex items-center gap-2 px-4 py-2 border border-b-0"
              style={{ background: "var(--bg-code)", borderColor: "var(--border-default)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--text-muted)" }}>{lang}</span>
            </div>
          )}
          <pre
            className={`border overflow-x-auto text-sm font-mono leading-relaxed p-5`}
            style={{
              background: "var(--bg-code)",
              borderColor: "var(--border-default)",
              color: "var(--accent-cyan)",
            }}
          >
            <code>{code}</code>
          </pre>
        </div>
      );
      return;
    }

    part.split("\n\n").forEach((block, blockIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return;
      const key = `p-${partIdx}-${blockIdx}`;

      if (trimmed.startsWith("# ")) {
        elements.push(
          <h2 key={key} className="text-2xl font-bold mt-10 mb-4" style={{ color: "var(--text-primary)" }}>
            {trimmed.slice(2)}
          </h2>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h3 key={key} className="text-xl font-semibold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
            {trimmed.slice(3)}
          </h3>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h4 key={key} className="text-lg font-semibold mt-6 mb-2" style={{ color: "var(--text-secondary)" }}>
            {trimmed.slice(4)}
          </h4>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter((l) => l.trim());
        elements.push(
          <ul key={key} className="my-4 space-y-2">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <span className="shrink-0 mt-1" style={{ color: "var(--accent-cyan)" }}>›</span>
                {item.replace(/^[-*]\s/, "")}
              </li>
            ))}
          </ul>
        );
      } else if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote
            key={key}
            className="my-6 pl-4 border-l-2 italic text-sm leading-relaxed"
            style={{ borderColor: "var(--accent-violet)", color: "var(--text-secondary)" }}
          >
            {trimmed.slice(2)}
          </blockquote>
        );
      } else {
        elements.push(
          <p key={key} className="leading-relaxed text-sm my-4" style={{ color: "var(--text-secondary)" }}>
            {trimmed}
          </p>
        );
      }
    });
  });

  return elements;
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
    <div className="pt-[56px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Header strip ──────────────────────────── */}
      <section className="section-spacing">
        <div className="container max-w-3xl">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm transition-colors mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={14} />
            Retour au blog
          </Link>

          {/* Pillar + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="font-mono text-[10px] px-2.5 py-1 border"
              style={{
                color: pillar.color,
                borderColor: `color-mix(in srgb, ${pillar.color} 30%, transparent)`,
                background: `color-mix(in srgb, ${pillar.color} 6%, transparent)`,
              }}
            >
              {pillar.label}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
              <Clock size={10} />
              {article.reading_time_minutes} min de lecture
            </span>
            {article.published_at && (
              <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                <Calendar size={10} />
                {formatDate(article.published_at)}
              </span>
            )}
          </div>

          <h1 className="font-black mb-4 leading-tight" style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", color: "var(--text-primary)" }}>
            {article.title_fr}
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {article.excerpt_fr}
          </p>

          <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <div
              className="w-7 h-7 flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="font-black text-[13px] font-mono" style={{ color: "var(--bg-base)" }}>L</span>
            </div>
            <span>Loïc Lafhej</span>
            <span style={{ color: "var(--border-bright)" }}>·</span>
            <span>LUTECE Consulting</span>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────── */}
      <section className="section-spacing border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div className="container max-w-3xl">
          <article>
            {renderContent(article.content_fr)}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t" style={{ borderColor: "var(--border-faint)" }}>
            <Tag size={13} className="mt-0.5" style={{ color: "var(--text-dim)" }} />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 border"
                style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 p-7 text-center border" style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}>
            <p className="mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Une question sur cet article ou un projet IA à discuter ?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <CommandButton href="/contact" variant="primary" as="a">
                ./me-contacter →
              </CommandButton>
              <CommandButton href="/blog" variant="ghost" as="a">
                ← Autres articles
              </CommandButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
