import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArticleDetailView } from "@/components/fca-insights/ArticleDetailView";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { serializeArticle } from "@/lib/articles";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles-server";
import { buildMetadata } from "@/lib/seo";

import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    if (!article) {
      return buildMetadata({
        title: "Article Not Found",
        description: "This article could not be found.",
        noIndex: true,
      });
    }

    return buildMetadata({
      title: article.title,
      description: article.summary,
      path: `/fca-insights/${article.slug}`,
      keywords: [
        ...article.categories,
        "FCA enforcement",
        "regulatory compliance UK",
        ...(article.firmName ? [article.firmName] : []),
      ],
      articleDate: article.publishedDate.toISOString(),
      articleModified: article.updatedAt.toISOString(),
    });
  } catch {
    return buildMetadata({
      title: "Article Not Found",
      description: "This article could not be found.",
      noIndex: true,
    });
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
      <ArticleSchema
        title={serialized.title}
        description={serialized.summary}
        slug={serialized.slug}
        publishedDate={serialized.publishedDate}
        updatedAt={serialized.updatedAt}
        firmName={serialized.firmName}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "FCA Insights", url: `${BASE_URL}/fca-insights` },
          { name: serialized.title, url: `${BASE_URL}/fca-insights/${serialized.slug}` },
        ]}
      />
      <ArticleDetailView article={serialized} relatedArticles={relatedSerialized} />
    </>
  );
}
