export const APPROVED_CATEGORIES = [
  "Enforcement",
  "Consumer Duty",
  "Operational Resilience",
  "Financial Crime",
  "Governance",
  "SMCR",
  "Cyber Risk",
  "Third-Party Risk",
  "Data Protection",
  "Client Money",
  "Complaints Handling",
  "FCA Statement",
  "FCA Warning",
  "Policy Update",
  "Consultation",
] as const;

export type ArticleCategory = (typeof APPROVED_CATEGORIES)[number];

export type ArticleStatus = "draft" | "published";

export interface FcaArticle {
  id: string;
  title: string;
  slug: string;
  publishedDate: Date;
  updatedAt: Date;
  status: ArticleStatus;
  author: string;
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
  views: number;
}

export type SerializedFcaArticle = Omit<FcaArticle, "publishedDate" | "updatedAt"> & {
  publishedDate: string;
  updatedAt: string;
};

export function serializeArticle(article: FcaArticle): SerializedFcaArticle {
  return {
    ...article,
    publishedDate: article.publishedDate.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export function formatArticleDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const CATEGORY_BAR_COLORS: Record<string, string> = {
  Enforcement: "#DC2626",
  "Financial Crime": "#DC2626",
  "FCA Warning": "#DC2626",
  "Consumer Duty": "#D97706",
  "Operational Resilience": "#D97706",
  SMCR: "#D4A017",
  Governance: "#D4A017",
  "Cyber Risk": "#3B82F6",
  "Data Protection": "#3B82F6",
  "Third-Party Risk": "#7C3AED",
};

export function getCategoryBarColor(category?: string): string {
  if (!category) return "#D4A017";
  return CATEGORY_BAR_COLORS[category] ?? "#D4A017";
}
