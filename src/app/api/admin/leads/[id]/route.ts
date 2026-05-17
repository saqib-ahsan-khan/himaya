import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { deleteLead, updateLeadStatus } from "@/lib/admin-leads";
import type { BookingLead } from "@/lib/types";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const leadStatus = body.leadStatus as BookingLead["leadStatus"];
  const recordType = body.recordType as "booking" | "lead_magnet";

  if (!leadStatus || !recordType) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (recordType === "lead_magnet") {
    return NextResponse.json({ error: "Lead magnet records cannot change status yet" }, { status: 400 });
  }

  await updateLeadStatus(id, recordType, leadStatus);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const { searchParams } = req.nextUrl;
  const recordType = searchParams.get("recordType") as "booking" | "lead_magnet";
  if (!recordType) {
    return NextResponse.json({ error: "recordType required" }, { status: 400 });
  }

  await deleteLead(id, recordType);
  return NextResponse.json({ success: true });
}
