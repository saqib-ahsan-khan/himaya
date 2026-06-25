import { Suspense } from "react";
import { FcaInsightsBottomCTA } from "@/components/fca-insights/FcaInsightsBottomCTA";
import { FcaInsightsHero } from "@/components/fca-insights/FcaInsightsHero";
import { FcaInsightsListing } from "@/components/fca-insights/FcaInsightsListing";
import { serializeArticle } from "@/lib/articles";
import { getFeaturedArticles, getPublishedArticles } from "@/lib/articles-server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FCA Regulatory Insights — Enforcement Lessons for Regulated Firms",
  description:
    "Latest FCA enforcement actions, fines and regulatory updates turned into practical compliance lessons for UK regulated SMEs. Understand what went wrong and what your firm should do differently.",
  path: "/fca-insights",
  keywords: [
    "FCA enforcement lessons",
    "FCA fines 2025 2026",
    "FCA regulated firm lessons",
    "FCA enforcement analysis UK",
    "FCA press release summary",
    "compliance lessons regulated SMEs",
    "FCA action what went wrong",
  ],
});

export default async function FcaInsightsPage() {
  let articles: ReturnType<typeof serializeArticle>[] = [];
  let featuredArticle: ReturnType<typeof serializeArticle> | null = null;

  try {
    const [published, featured] = await Promise.all([getPublishedArticles(), getFeaturedArticles()]);
    articles = published.map(serializeArticle);
    featuredArticle = featured[0] ? serializeArticle(featured[0]) : null;
  } catch (error) {
    console.error("[fca-insights] Failed to load articles:", error);
    articles = [];
    featuredArticle = null;
  }

  return (
    <>
      <FcaInsightsHero />
      <Suspense>
        <FcaInsightsListing articles={articles} featuredArticle={featuredArticle} />
      </Suspense>
      <FcaInsightsBottomCTA />
    </>
  );
}
