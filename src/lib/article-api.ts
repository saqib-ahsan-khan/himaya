import type { FcaArticle } from "@/lib/articles";
import { serializeArticle } from "@/lib/articles";

export function articleToJson(article: FcaArticle) {
  return serializeArticle(article);
}

export type ArticleFormPayload = {
  title: string;
  slug: string;
  publishedDate: string;
  status: "draft" | "published";
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
