"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminBadges } from "@/components/admin/AdminBadgesContext";
import type { ReactNode } from "react";

export function AdminPage({ title, children }: { title: string; children: ReactNode }) {
  const badges = useAdminBadges();
  return (
    <AdminShell title={title} badges={badges}>
      {children}
    </AdminShell>
  );
}
