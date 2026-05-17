import { AdminPage } from "@/components/admin/AdminPage";

export default function AdminSettingsPage() {
  return (
    <AdminPage title="Settings">
      <div className="rounded-xl border border-deepNavy/7 bg-white p-8 text-slateText">
        <p>Admin settings and environment configuration are managed via deployment secrets.</p>
        <ul className="mt-4 list-inside list-disc text-sm text-mutedText">
          <li>ADMIN_EMAIL — founder login email</li>
          <li>ADMIN_PASSWORD_HASH — bcrypt hash</li>
          <li>NEXTAUTH_SECRET — session signing key</li>
          <li>Firebase Admin credentials</li>
        </ul>
      </div>
    </AdminPage>
  );
}
