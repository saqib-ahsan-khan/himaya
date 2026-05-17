import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Valid email required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await adminDb.collection("fca_insights_subscribers").add({
      email: parsed.data.email,
      createdAt: new Date().toISOString(),
      source: "fca_insights_empty_state",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
