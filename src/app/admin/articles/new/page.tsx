import { ArticleEditorForm } from "@/components/admin/ArticleEditorForm";
import { AdminPage } from "@/components/admin/AdminPage";

export default function NewArticlePage() {
  return (
    <AdminPage title="New Article">
      <ArticleEditorForm />
    </AdminPage>
  );
}
