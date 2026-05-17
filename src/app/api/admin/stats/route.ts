import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getLeadsStats } from "@/lib/admin-leads";
import { getArticleStats } from "@/lib/articles-server";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  const [articles, leads] = await Promise.all([getArticleStats(), getLeadsStats()]);
  return NextResponse.json({ articles, leads });
}
