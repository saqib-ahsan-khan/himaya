"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, FileText, UserPlus, Users } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { SerializedFcaArticle } from "@/lib/articles";
import type { AdminLead } from "@/lib/types";
import { formatArticleDate } from "@/lib/articles";

type Stats = {
  articles: { publishedCount: number; totalCount: number; totalViews: number };
  leads: { total: number; newThisWeek: number; newCount: number };
};

export function DashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [articles, setArticles] = useState<SerializedFcaArticle[]>([]);

  useEffect(() => {
    void Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/admin/leads?limit=8").then((r) => r.json()),
      fetch("/api/admin/articles").then((r) => r.json()),
    ]).then(([statsRes, leadsRes, articlesRes]) => {
      setStats(statsRes);
      setLeads(leadsRes.leads ?? []);
      setArticles((articlesRes.articles ?? []).slice(0, 4));
    });
  }, []);

  const statCards = [
    { icon: FileText, label: "Published Articles", value: stats?.articles.publishedCount ?? "—", bg: "bg-metallicGold/15 text-metallicGold" },
    { icon: Users, label: "Total Leads", value: stats?.leads.total ?? "—", bg: "bg-deepNavy/10 text-deepNavy" },
    { icon: UserPlus, label: "New This Week", value: stats?.leads.newThisWeek ?? "—", bg: "bg-successGreen/10 text-successGreen" },
    { icon: Eye, label: "Total Views", value: stats?.articles.totalViews ?? "—", bg: "bg-blue-500/10 text-blue-600" },
  ];

  const updateLeadStatus = async (lead: AdminLead, leadStatus: AdminLead["leadStatus"]) => {
    if (lead.recordType !== "booking") return;
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadStatus, recordType: lead.recordType }),
    });
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, leadStatus } : l)));
  };

  return (
    <AdminPage title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ icon: Icon, label, value, bg }) => (
          <div key={label} className="rounded-[10px] border border-deepNavy/[0.07] bg-white p-5 shadow-[0_2px_12px_rgba(7,24,39,0.05)]">
            <span className={`inline-flex rounded-lg p-2 ${bg}`}>
              <Icon size={20} />
            </span>
            <p className="mt-3 font-heading text-[2rem] font-bold text-deepNavy">{value}</p>
            <p className="text-[0.8rem] text-mutedText">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-deepNavy/7 bg-white">
        <div className="flex items-center justify-between border-b border-deepNavy/5 px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-deepNavy">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-metallicGold hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="font-mono text-[0.65rem] uppercase tracking-wider text-mutedText">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Industry</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={`${lead.recordType}-${lead.id}`} className="border-t border-deepNavy/5 hover:bg-metallicGold/[0.03]">
                  <td className="px-5 py-3 font-medium text-deepNavy">{lead.fullName}</td>
                  <td className="px-5 py-3">{lead.companyName}</td>
                  <td className="px-5 py-3">{lead.industry}</td>
                  <td className="px-5 py-3">
                    <LeadStatusBadge status={lead.leadStatus} />
                  </td>
                  <td className="px-5 py-3 text-mutedText">{new Date(lead.createdAt).toLocaleDateString("en-GB")}</td>
                  <td className="px-5 py-3">
                    {lead.recordType === "booking" ? (
                      <select
                        value={lead.leadStatus}
                        onChange={(e) => void updateLeadStatus(lead, e.target.value as AdminLead["leadStatus"])}
                        className="rounded border border-deepNavy/10 px-2 py-1 text-xs"
                      >
                        {(["New", "Contacted", "Demo Booked", "Closed", "Not Fit"] as const).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-mutedText">Checklist</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-deepNavy/7 bg-white">
        <div className="flex items-center justify-between border-b border-deepNavy/5 px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-deepNavy">Recent Articles</h2>
          <Link href="/admin/articles" className="text-sm font-medium text-metallicGold hover:underline">
            View All →
          </Link>
        </div>
        <div className="divide-y divide-deepNavy/5">
          {articles.map((article) => (
            <div key={article.id} className="flex flex-wrap items-center gap-3 px-5 py-3 text-sm">
              <p className="min-w-[200px] flex-1 font-medium text-deepNavy">{article.title}</p>
              <p className="text-mutedText">{article.categories[0] ?? "—"}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  article.status === "published" ? "bg-successGreen/10 text-successGreen" : "bg-deepNavy/10 text-slateText"
                }`}
              >
                {article.status}
              </span>
              <p className="text-mutedText">{formatArticleDate(article.publishedDate)}</p>
              <p className="text-mutedText">{article.views} views</p>
              <Link href={`/admin/articles/${article.id}/edit`} className="text-metallicGold hover:underline">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </section>
    </AdminPage>
  );
}
