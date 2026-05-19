import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = "https://lutece-consulting.com";

async function getArticleSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/articles?per_page=50`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const articles = await res.json();
    return articles.map((a: { slug: string }) => a.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getArticleSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
