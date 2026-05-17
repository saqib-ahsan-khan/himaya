"use client";

import { useEffect, useState } from "react";
import { Copy, Eye, Trash2, X } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { AdminLead } from "@/lib/types";

const PAGE_SIZE = 25;

export function LeadsClient() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [industry, setIndustry] = useState("");
  const [source, setSource] = useState("");
  const [selected, setSelected] = useState<AdminLead | null>(null);

  const fetchLeads = () => {
    const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (industry) params.set("industry", industry);
    if (source) params.set("source", source);
    void fetch(`/api/admin/leads?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads ?? []);
        setTotal(data.total ?? 0);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status, industry, source]);

  const updateStatus = async (lead: AdminLead, leadStatus: AdminLead["leadStatus"]) => {
    if (lead.recordType !== "booking") return;
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadStatus, recordType: lead.recordType }),
    });
    fetchLeads();
    if (selected?.id === lead.id) setSelected({ ...lead, leadStatus });
  };

  const deleteLead = async (lead: AdminLead) => {
    if (!confirm(`Delete lead ${lead.fullName}?`)) return;
    await fetch(`/api/admin/leads/${lead.id}?recordType=${lead.recordType}`, { method: "DELETE" });
    setSelected(null);
    fetchLeads();
  };

  const exportCsv = async () => {
    const res = await fetch("/api/admin/leads/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `himaya-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <AdminPage title="Leads">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search name, email, company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="min-w-[200px] flex-1 rounded-md border border-deepNavy/12 px-3 py-2 text-sm"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {["New", "Contacted", "Demo Booked", "Closed", "Not Fit"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm"
        />
        <select value={source} onChange={(e) => setSource(e.target.value)} className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm">
          <option value="">All sources</option>
          <option value="booking_form">Booking Form</option>
          <option value="lead_magnet">Checklist</option>
          <option value="chatbot">Chatbot</option>
        </select>
        <button type="button" onClick={() => void exportCsv()} className="rounded-md border border-deepNavy/15 px-4 py-2 text-sm font-semibold text-deepNavy">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-deepNavy/7 bg-white">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-deepNavy/5 font-mono text-[0.65rem] uppercase text-mutedText">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3">Employees</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={`${lead.recordType}-${lead.id}`}
                className="cursor-pointer border-t border-deepNavy/5 hover:bg-metallicGold/[0.03]"
                onClick={() => setSelected(lead)}
              >
                <td className="px-4 py-3 font-medium">{lead.fullName}</td>
                <td className="px-4 py-3">{lead.companyName}</td>
                <td className="px-4 py-3">{lead.industry}</td>
                <td className="px-4 py-3">{lead.employeeCount || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                      lead.source === "lead_magnet"
                        ? "bg-metallicGold/15 text-metallicGold"
                        : lead.source === "chatbot"
                          ? "bg-blue-500/10 text-blue-700"
                          : "bg-deepNavy/10 text-deepNavy"
                    }`}
                  >
                    {lead.source === "lead_magnet" ? "Checklist" : lead.source === "chatbot" ? "Chatbot" : "Booking Form"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <LeadStatusBadge status={lead.leadStatus} />
                </td>
                <td className="px-4 py-3 text-mutedText">{new Date(lead.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSelected(lead)} aria-label="View">
                      <Eye size={16} />
                    </button>
                    {lead.recordType === "booking" && (
                      <select
                        value={lead.leadStatus}
                        onChange={(e) => void updateStatus(lead, e.target.value as AdminLead["leadStatus"])}
                        className="rounded border px-1 text-xs"
                      >
                        {(["New", "Contacted", "Demo Booked", "Closed", "Not Fit"] as const).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                    <button type="button" onClick={() => void deleteLead(lead)} className="text-dangerRed" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-40">
          Previous
        </button>
        <span className="px-2 py-1 text-sm text-mutedText">
          Page {page} of {totalPages}
        </span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-40">
          Next
        </button>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-deepNavy/40">
          <div className="h-full w-full max-w-[420px] overflow-y-auto bg-white p-6 shadow-[-8px_0_40px_rgba(7,24,39,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl font-bold text-deepNavy">{selected.fullName}</h2>
                <p className="text-sm text-mutedText">
                  {selected.companyName} · {new Date(selected.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {selected.recordType === "booking" && (
              <select
                className="mt-4 w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm"
                value={selected.leadStatus}
                onChange={(e) => void updateStatus(selected, e.target.value as AdminLead["leadStatus"])}
              >
                {(["New", "Contacted", "Demo Booked", "Closed", "Not Fit"] as const).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}

            <div className="mt-6 h-px bg-metallicGold/20" />

            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Full Name", selected.fullName],
                ["Work Email", selected.workEmail],
                ["Phone", selected.phone || "—"],
                ["Company", selected.companyName],
                ["Job Title", selected.jobTitle],
                ["Industry", selected.industry],
                ["Employees", selected.employeeCount || "—"],
                ["Main Concern", selected.mainConcern],
                ["Preferred Date/Time", selected.preferredDateTime || "—"],
                ["UTM Source", selected.utmSource || "—"],
                ["UTM Medium", selected.utmMedium || "—"],
                ["UTM Campaign", selected.utmCampaign || "—"],
                ["Consent", selected.consentStatus ? "Yes" : "No"],
                ["Consent Time", selected.consentTimestamp],
                ["Lead ID", selected.id],
                ["Created", selected.createdAt],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-metallicGold">{label}</dt>
                  <dd className="mt-0.5 text-slateText">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-2">
              <a href={`mailto:${selected.workEmail}`} className="rounded-md bg-deepNavy py-2.5 text-center text-sm font-semibold text-white">
                Send Email
              </a>
              <button
                type="button"
                onClick={() => void navigator.clipboard.writeText(selected.workEmail)}
                className="inline-flex items-center justify-center gap-2 rounded-md border py-2.5 text-sm"
              >
                <Copy size={14} /> Copy Email
              </button>
              <button type="button" onClick={() => void deleteLead(selected)} className="rounded-md border border-dangerRed/30 py-2.5 text-sm text-dangerRed">
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPage>
  );
}
