import type { AdminLead } from "@/lib/types";

function escapeCsvValue(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportLeadsToCSV(leads: AdminLead[]): string {
  const headers = [
    "full_name",
    "work_email",
    "phone",
    "company_name",
    "job_title",
    "industry",
    "employee_count",
    "main_concern",
    "preferred_date_time",
    "consent_status",
    "lead_status",
    "source",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "created_at",
  ];

  const rows = leads.map((lead) =>
    [
      lead.fullName,
      lead.workEmail,
      lead.phone ?? "",
      lead.companyName,
      lead.jobTitle,
      lead.industry,
      lead.employeeCount,
      lead.mainConcern,
      lead.preferredDateTime ?? "",
      lead.consentStatus,
      lead.leadStatus,
      lead.source,
      lead.utmSource ?? "",
      lead.utmMedium ?? "",
      lead.utmCampaign ?? "",
      lead.createdAt,
    ]
      .map(escapeCsvValue)
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export function downloadLeadsCSV(leads: AdminLead[], filename?: string) {
  const csv = exportLeadsToCSV(leads);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = filename ?? `himaya-leads-${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
