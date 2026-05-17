import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { toggleArticlePublish } from "@/lib/articles-server";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  try {
    const status = await toggleArticlePublish(id);
    return NextResponse.json({ status, success: true });
  } catch {
    return NextResponse.json({ error: "Failed to toggle publish status" }, { status: 500 });
  }
}
