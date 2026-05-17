import { ArticleEditorForm } from "@/components/admin/ArticleEditorForm";
import { AdminPage } from "@/components/admin/AdminPage";
import { getArticleById } from "@/lib/articles-server";
import { serializeArticle } from "@/lib/articles";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id).catch(() => null);
  if (!article) notFound();

  return (
    <AdminPage title="Edit Article">
      <ArticleEditorForm articleId={id} initial={serializeArticle(article)} />
    </AdminPage>
  );
}
