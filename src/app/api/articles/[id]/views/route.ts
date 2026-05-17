import { NextResponse } from "next/server";
import { incrementViews } from "@/lib/articles-server";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing article id" }, { status: 400 });
    }
    await incrementViews(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
