import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { articleToJson, type ArticleFormPayload } from "@/lib/article-api";
import type { ArticleInput } from "@/lib/articles-server";
import { deleteArticle, getArticleById, updateArticle } from "@/lib/articles-server";

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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ article: articleToJson(article) });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  try {
    const body = (await req.json()) as ArticleFormPayload;
    await updateArticle(id, toInput(body));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  await deleteArticle(id);
  return NextResponse.json({ success: true });
}
