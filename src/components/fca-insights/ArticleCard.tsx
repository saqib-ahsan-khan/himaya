"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { formatArticleDate, getCategoryBarColor, type SerializedFcaArticle } from "@/lib/articles";

export function ArticleCard({ article, index = 0 }: { article: SerializedFcaArticle; index?: number }) {
  const barColor = getCategoryBarColor(article.categories[0]);
  const displayCategories = article.categories.slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/fca-insights/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-deepNavy/[0.07] bg-white shadow-[0_2px_16px_rgba(7,24,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-metallicGold/35 hover:shadow-[0_12px_40px_rgba(7,24,39,0.1)]"
      >
        <div className="h-1 w-full" style={{ backgroundColor: barColor }} aria-hidden />
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {displayCategories.map((cat) => (
              <span
                key={cat}
                className="rounded bg-deepNavy/[0.06] px-[0.55rem] py-[0.15rem] font-mono text-[0.55rem] uppercase tracking-[0.12em] text-slateText"
              >
                {cat}
              </span>
            ))}
            {article.fineAmount && (
              <span className="rounded border border-dangerRed/20 bg-dangerRed/[0.08] px-2 py-0.5 font-mono text-[0.55rem] text-dangerRed">
                {article.fineAmount}
              </span>
            )}
          </div>

          {article.firmName && (
            <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-mutedText">{article.firmName}</p>
          )}

          <h3 className="mb-2.5 line-clamp-2 font-heading text-[1.15rem] font-bold leading-snug text-deepNavy">{article.title}</h3>
          <p className="mb-4 line-clamp-3 flex-1 text-[0.85rem] leading-[1.75] text-slateText">{article.summary}</p>

          <div className="flex items-center justify-between gap-3 border-t border-deepNavy/[0.05] pt-3">
            <p className="font-mono text-[0.6rem] text-mutedText">
              {article.source}
              <span className="mx-1">·</span>
              {formatArticleDate(article.publishedDate)}
            </p>
            <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-mutedText">
              {article.readTimeMinutes} min read
              <BookOpen size={11} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
