import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import type { ArticleInput } from "@/lib/articles-server";
import { createArticle, getAllArticles } from "@/lib/articles-server";
import { articleToJson, type ArticleFormPayload } from "@/lib/article-api";

function toInput(body: ArticleFormPayload): ArticleInput {
  return {
    title: body.title,
    slug: body.slug,
    publishedDate: new Date(body.publishedDate),
    status: body.status,
    author: body.author,
    categories: body.categories,
    summary: body.summary,
    source: body.source,
    sourceUrl: body.sourceUrl,
    firmName: body.firmName,
    fineAmount: body.fineAmount,
    whatHappened: body.whatHappened,
    whyItMatters: body.whyItMatters,
    whatWentWrong: body.whatWentWrong,
    lessonsForSMEs: body.lessonsForSMEs,
    whatShouldHaveDone: body.whatShouldHaveDone,
    howHIMAYAHelps: body.howHIMAYAHelps,
    featured: body.featured,
    readTimeMinutes: body.readTimeMinutes,
  };
}

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  const articles = await getAllArticles();
  return NextResponse.json({ articles: articles.map(articleToJson) });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const body = (await req.json()) as ArticleFormPayload;
    const id = await createArticle(toInput(body));
    return NextResponse.json({ id, success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
