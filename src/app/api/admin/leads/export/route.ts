import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllLeads } from "@/lib/admin-leads";
import { exportLeadsToCSV } from "@/lib/exportCSV";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  const leads = await getAllLeads();
  const csv = exportLeadsToCSV(leads);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="himaya-leads-${date}.csv"`,
    },
  });
}
