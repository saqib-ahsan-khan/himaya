import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArticleDetailView } from "@/components/fca-insights/ArticleDetailView";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { serializeArticle } from "@/lib/articles";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles-server";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    if (!article) {
      return { title: "Not Found" };
    }
    return buildPageMetadata({
      title: article.title,
      description: article.summary,
      path: `/fca-insights/${article.slug}`,
    });
  } catch {
    return { title: "Not Found" };
  }
}

export default async function FcaInsightArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    redirect("/fca-insights");
  }

  if (!article) {
    redirect("/fca-insights");
  }

  const related = await getRelatedArticles(article, 3).catch(() => []);
  const serialized = serializeArticle(article);
  const relatedSerialized = related.map(serializeArticle);

  return (
    <>
      <ArticleJsonLd article={serialized} />
      <ArticleDetailView article={serialized} relatedArticles={relatedSerialized} />
    </>
  );
}
