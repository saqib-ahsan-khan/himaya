import Link from "next/link";
import { formatArticleDate, type SerializedFcaArticle } from "@/lib/articles";

export function MinimalArticleCard({ article }: { article: SerializedFcaArticle }) {
  return (
    <Link href={`/fca-insights/${article.slug}`} className="block rounded-lg border border-deepNavy/10 bg-white p-4 transition hover:border-metallicGold/30">
      <p className="line-clamp-2 font-heading text-sm font-bold text-deepNavy">{article.title}</p>
      <p className="mt-1 font-mono text-[0.6rem] text-mutedText">{formatArticleDate(article.publishedDate)}</p>
    </Link>
  );
}
