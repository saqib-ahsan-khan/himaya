"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";
import { APPROVED_CATEGORIES, formatArticleDate, type SerializedFcaArticle } from "@/lib/articles";

const PAGE_SIZE = 20;

export function ArticlesClient() {
  const [articles, setArticles] = useState<SerializedFcaArticle[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const load = () => {
    void fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((data) => setArticles(data.articles ?? []));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (categoryFilter !== "all" && !a.categories.includes(categoryFilter)) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [articles, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const togglePublish = async (id: string) => {
    await fetch(`/api/admin/articles/${id}/publish`, { method: "POST" });
    load();
  };

  const deleteArticle = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminPage title="FCA Articles">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="min-w-[200px] flex-1 rounded-md border border-deepNavy/12 px-3 py-2 text-sm"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm">
          <option value="all">All categories</option>
          {APPROVED_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Link href="/admin/articles/new" className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-4 py-2 text-sm font-bold text-deepNavy">
          + New Article
        </Link>
      </div>

      {paginated.length === 0 ? (
        <div className="rounded-xl border border-dashed border-metallicGold/30 bg-white py-16 text-center">
          <p className="text-slateText">No articles yet. Create your first FCA insight.</p>
          <Link href="/admin/articles/new" className="mt-4 inline-block rounded-md bg-deepNavy px-5 py-2.5 text-sm font-semibold text-white">
            + Create First Article
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-deepNavy/7 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-deepNavy/5 font-mono text-[0.65rem] uppercase text-mutedText">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((article) => (
                <tr key={article.id} className="border-t border-deepNavy/5 hover:border-l-2 hover:border-l-metallicGold hover:bg-metallicGold/[0.03]">
                  <td className="max-w-[280px] truncate px-4 py-3 font-medium text-deepNavy">{article.title.slice(0, 60)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {article.categories.slice(0, 2).map((c) => (
                        <span key={c} className="rounded bg-deepNavy/5 px-1.5 py-0.5 font-mono text-[0.6rem]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        article.status === "published" ? "bg-successGreen/10 text-successGreen" : "bg-warningAmber/10 text-warningAmber"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-mutedText">{formatArticleDate(article.publishedDate)}</td>
                  <td className="px-4 py-3 text-mutedText">{article.views}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/articles/${article.id}/edit`} className="text-metallicGold" aria-label="Edit">
                        <Pencil size={16} />
                      </Link>
                      <Link href={`/fca-insights/${article.slug}`} target="_blank" className="text-mutedText hover:text-deepNavy" aria-label="Preview">
                        <Eye size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => void togglePublish(article.id)}
                        className={`text-xs font-semibold ${article.status === "draft" ? "text-successGreen" : "text-warningAmber"}`}
                      >
                        {article.status === "draft" ? "Publish" : "Unpublish"}
                      </button>
                      <button type="button" onClick={() => void deleteArticle(article.id, article.title)} className="text-dangerRed" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
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
      )}
    </AdminPage>
  );
}
