import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, concern } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const now = new Date().toISOString();

    await adminDb.collection("booking_leads").add({
      fullName: name,
      workEmail: email,
      companyName: company || "",
      mainConcern: concern || "Chatbot enquiry",
      source: "chatbot",
      leadStatus: "New",
      consentStatus: true,
      consentTimestamp: now,
      createdAt: now,
      updatedAt: now,
      phone: "",
      jobTitle: "",
      industry: "",
      employeeCount: "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat lead save error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
