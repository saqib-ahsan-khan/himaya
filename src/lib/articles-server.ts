import "server-only";

import { FieldValue, type QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import type { ArticleStatus, FcaArticle } from "@/lib/articles";

const COLLECTION = "fca_articles";

function toDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return new Date();
}

function sortByPublishedDateDesc(articles: FcaArticle[]): FcaArticle[] {
  return [...articles].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

function mapDoc(doc: QueryDocumentSnapshot): FcaArticle {
  const data = doc.data();
  return {
    id: doc.id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    publishedDate: toDate(data.publishedDate),
    updatedAt: toDate(data.updatedAt),
    status: (data.status as ArticleStatus) ?? "draft",
    author: String(data.author ?? "HIMAYA Team"),
    categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
    summary: String(data.summary ?? ""),
    source: String(data.source ?? ""),
    sourceUrl: String(data.sourceUrl ?? ""),
    firmName: data.firmName ? String(data.firmName) : undefined,
    fineAmount: data.fineAmount ? String(data.fineAmount) : undefined,
    whatHappened: String(data.whatHappened ?? ""),
    whyItMatters: String(data.whyItMatters ?? ""),
    whatWentWrong: Array.isArray(data.whatWentWrong) ? data.whatWentWrong.map(String) : [],
    lessonsForSMEs: Array.isArray(data.lessonsForSMEs) ? data.lessonsForSMEs.map(String) : [],
    whatShouldHaveDone: Array.isArray(data.whatShouldHaveDone) ? data.whatShouldHaveDone.map(String) : [],
    howHIMAYAHelps: String(data.howHIMAYAHelps ?? ""),
    featured: Boolean(data.featured),
    readTimeMinutes: Number(data.readTimeMinutes ?? 5),
    views: Number(data.views ?? 0),
  };
}

export async function getPublishedArticles(limit?: number): Promise<FcaArticle[]> {
  const snap = await adminDb.collection(COLLECTION).where("status", "==", "published").get();
  const articles = sortByPublishedDateDesc(snap.docs.map(mapDoc));
  return limit ? articles.slice(0, limit) : articles;
}

export async function getArticleBySlug(slug: string): Promise<FcaArticle | null> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snap.empty) return null;
  return mapDoc(snap.docs[0]);
}

export async function getArticlesByCategory(category: string, limit?: number): Promise<FcaArticle[]> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("status", "==", "published")
    .where("categories", "array-contains", category)
    .get();
  const articles = sortByPublishedDateDesc(snap.docs.map(mapDoc));
  return limit ? articles.slice(0, limit) : articles;
}

export async function getFeaturedArticles(): Promise<FcaArticle[]> {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("status", "==", "published")
    .where("featured", "==", true)
    .get();

  return sortByPublishedDateDesc(snap.docs.map(mapDoc)).slice(0, 3);
}

export async function getRelatedArticles(article: FcaArticle, limit = 3): Promise<FcaArticle[]> {
  const primaryCategory = article.categories[0];
  if (!primaryCategory) {
    const all = await getPublishedArticles(limit + 1);
    return all.filter((a) => a.id !== article.id).slice(0, limit);
  }

  const related = await getArticlesByCategory(primaryCategory, limit + 5);
  return related.filter((a) => a.id !== article.id && a.slug !== article.slug).slice(0, limit);
}

export async function incrementViews(id: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(id).update({
    views: FieldValue.increment(1),
  });
}

export async function getAllArticles(): Promise<FcaArticle[]> {
  const snap = await adminDb.collection(COLLECTION).orderBy("updatedAt", "desc").get();
  return snap.docs.map(mapDoc);
}

export async function getArticleById(id: string): Promise<FcaArticle | null> {
  const doc = await adminDb.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return mapDoc(doc as QueryDocumentSnapshot);
}

export type ArticleInput = {
  title: string;
  slug: string;
  publishedDate: Date;
  status: ArticleStatus;
  author?: string;
  categories: string[];
  summary: string;
  source: string;
  sourceUrl: string;
  firmName?: string;
  fineAmount?: string;
  whatHappened: string;
  whyItMatters: string;
  whatWentWrong: string[];
  lessonsForSMEs: string[];
  whatShouldHaveDone: string[];
  howHIMAYAHelps: string;
  featured: boolean;
  readTimeMinutes: number;
};

function articleToFirestore(input: ArticleInput) {
  const now = Timestamp.now();
  return {
    title: input.title,
    slug: input.slug,
    publishedDate: Timestamp.fromDate(input.publishedDate),
    updatedAt: now,
    status: input.status,
    author: input.author ?? "HIMAYA Team",
    categories: input.categories,
    summary: input.summary,
    source: input.source,
    sourceUrl: input.sourceUrl,
    firmName: input.firmName ?? null,
    fineAmount: input.fineAmount ?? null,
    whatHappened: input.whatHappened,
    whyItMatters: input.whyItMatters,
    whatWentWrong: input.whatWentWrong,
    lessonsForSMEs: input.lessonsForSMEs,
    whatShouldHaveDone: input.whatShouldHaveDone,
    howHIMAYAHelps: input.howHIMAYAHelps,
    featured: input.featured,
    readTimeMinutes: input.readTimeMinutes,
  };
}

export async function createArticle(input: ArticleInput): Promise<string> {
  const ref = await adminDb.collection(COLLECTION).add({
    ...articleToFirestore(input),
    views: 0,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updateArticle(id: string, input: ArticleInput): Promise<void> {
  const existing = await adminDb.collection(COLLECTION).doc(id).get();
  const views = existing.exists ? Number(existing.data()?.views ?? 0) : 0;
  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .set(
      {
        ...articleToFirestore(input),
        views,
      },
      { merge: true }
    );
}

export async function deleteArticle(id: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(id).delete();
}

export async function toggleArticlePublish(id: string): Promise<ArticleStatus> {
  const doc = await adminDb.collection(COLLECTION).doc(id).get();
  if (!doc.exists) throw new Error("Article not found");
  const current = (doc.data()?.status as ArticleStatus) ?? "draft";
  const next: ArticleStatus = current === "published" ? "draft" : "published";
  const update: Record<string, unknown> = {
    status: next,
    updatedAt: Timestamp.now(),
  };
  if (next === "published" && !doc.data()?.publishedDate) {
    update.publishedDate = Timestamp.now();
  }
  await adminDb.collection(COLLECTION).doc(id).update(update);
  return next;
}

export async function getArticleStats() {
  const articles = await getAllArticles();
  const published = articles.filter((a) => a.status === "published");
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  return {
    publishedCount: published.length,
    totalCount: articles.length,
    totalViews,
  };
}
