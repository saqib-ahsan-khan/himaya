import { AdminBadgesProvider } from "@/components/admin/AdminBadgesContext";
import { getLeadsStats } from "@/lib/admin-leads";
import { getArticleStats } from "@/lib/articles-server";
import { buildNoIndexMetadata } from "@/lib/metadata";

export const metadata = buildNoIndexMetadata({
  title: "Admin | HIMAYA",
  description: "HIMAYA admin panel.",
  path: "/admin",
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let badges = { articles: 0, leads: 0 };
  try {
    const [articles, leads] = await Promise.all([getArticleStats(), getLeadsStats()]);
    badges = { articles: articles.publishedCount, leads: leads.newCount };
  } catch {
    /* Firestore may be unavailable during build */
  }

  return <AdminBadgesProvider value={badges}>{children}</AdminBadgesProvider>;
}
