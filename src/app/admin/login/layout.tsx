import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/dashboard");
  }
  return children;
}
