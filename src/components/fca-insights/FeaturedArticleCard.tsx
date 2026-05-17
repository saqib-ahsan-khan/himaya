"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { formatArticleDate, type SerializedFcaArticle } from "@/lib/articles";

export function FeaturedArticleCard({ article }: { article: SerializedFcaArticle }) {
  return (
    <Link
      href={`/fca-insights/${article.slug}`}
      className="group mb-10 block overflow-hidden rounded-2xl border border-metallicGold/20 bg-deepNavy p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-metallicGold/40 md:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {article.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-metallicGold/30 bg-metallicGold/10 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-metallicGold"
              >
                {cat}
              </span>
            ))}
            <span className="rounded-full bg-warningAmber/20 px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-warningAmber">
              Featured
            </span>
          </div>

          <h2 className="font-heading text-[1.8rem] font-bold leading-tight text-ivoryWhite">{article.title}</h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[rgba(255,253,247,0.65)]">{article.summary}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[0.65rem] text-[rgba(255,253,247,0.45)]">
              {article.source} · {formatArticleDate(article.publishedDate)}
            </p>
            <span className="inline-flex items-center gap-1.5 font-subheading text-sm font-semibold text-metallicGold transition group-hover:gap-2.5">
              Read Analysis
              <ArrowRight size={16} aria-hidden />
            </span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <Shield size={160} strokeWidth={1} className="text-metallicGold/10" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
