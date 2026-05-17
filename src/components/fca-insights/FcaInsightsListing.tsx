"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SerializedFcaArticle } from "@/lib/articles";
import { ArticleCard } from "@/components/fca-insights/ArticleCard";
import { EmptyState } from "@/components/fca-insights/EmptyState";
import { FeaturedArticleCard } from "@/components/fca-insights/FeaturedArticleCard";
import { FilterBar } from "@/components/fca-insights/FilterBar";

const PAGE_SIZE = 6;

function ListingContent({
  articles,
  featuredArticle,
}: {
  articles: SerializedFcaArticle[];
  featuredArticle: SerializedFcaArticle | null;
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category]);

  const filtered = useMemo(() => {
    let list = articles;
    if (featuredArticle) {
      list = list.filter((a) => a.id !== featuredArticle.id);
    }
    if (category) {
      list = list.filter((a) => a.categories.includes(category));
    }
    return list;
  }, [articles, category, featuredArticle]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const showFeatured = featuredArticle && (!category || featuredArticle.categories.includes(category));

  if (articles.length === 0) {
    return (
      <>
        <FilterBar />
        <section className="bg-ivoryWhite py-12">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-6">
            <EmptyState />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <FilterBar />
      <section className="bg-ivoryWhite py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          {showFeatured && featuredArticle && <FeaturedArticleCard article={featuredArticle} />}

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-slateText">No articles in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="cursor-pointer rounded-md border border-deepNavy px-8 py-3 text-sm font-semibold text-deepNavy transition hover:bg-deepNavy hover:text-white"
              >
                Load More Insights
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterBarFallback() {
  return <div className="sticky top-[65px] z-40 h-[52px] border-b border-metallicGold/10 bg-white/95 backdrop-blur-[16px]" />;
}

export function FcaInsightsListing({
  articles,
  featuredArticle,
}: {
  articles: SerializedFcaArticle[];
  featuredArticle: SerializedFcaArticle | null;
}) {
  return (
    <Suspense fallback={<FilterBarFallback />}>
      <ListingContent articles={articles} featuredArticle={featuredArticle} />
    </Suspense>
  );
}
