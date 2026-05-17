import { Suspense } from "react";
import { FcaInsightsBottomCTA } from "@/components/fca-insights/FcaInsightsBottomCTA";
import { FcaInsightsHero } from "@/components/fca-insights/FcaInsightsHero";
import { FcaInsightsListing } from "@/components/fca-insights/FcaInsightsListing";
import { serializeArticle } from "@/lib/articles";
import { getFeaturedArticles, getPublishedArticles } from "@/lib/articles-server";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "FCA Regulatory Insights | HIMAYA",
  description:
    "Latest FCA enforcement actions, regulatory updates and compliance lessons for UK regulated SMEs. Understand what went wrong and what your firm should do differently.",
  path: "/fca-insights",
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
