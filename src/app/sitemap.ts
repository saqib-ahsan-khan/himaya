import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles-server";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://himaya.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/atlas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fca-insights`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/trust`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getPublishedArticles();
    articlePages = articles.map((article) => ({
      url: `${BASE}/fca-insights/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    /* Firestore unavailable at build time */
  }

  return [...staticPages, ...articlePages];
}
