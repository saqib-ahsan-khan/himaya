import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllLeads } from "@/lib/admin-leads";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const industry = searchParams.get("industry");
  const source = searchParams.get("source");
  const search = searchParams.get("search")?.toLowerCase();
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 25)));

  let leads = await getAllLeads();

  if (status) leads = leads.filter((l) => l.leadStatus === status);
  if (industry) leads = leads.filter((l) => l.industry === industry);
  if (source) leads = leads.filter((l) => l.source === source);
  if (search) {
    leads = leads.filter(
      (l) =>
        l.fullName.toLowerCase().includes(search) ||
        l.workEmail.toLowerCase().includes(search) ||
        l.companyName.toLowerCase().includes(search)
    );
  }
  if (dateFrom) {
    const from = new Date(dateFrom).getTime();
    leads = leads.filter((l) => new Date(l.createdAt).getTime() >= from);
  }
  if (dateTo) {
    const to = new Date(dateTo).getTime();
    leads = leads.filter((l) => new Date(l.createdAt).getTime() <= to);
  }

  const total = leads.length;
  const start = (page - 1) * limit;
  const paginated = leads.slice(start, start + limit);

  return NextResponse.json({ leads: paginated, total, page, limit });
}
