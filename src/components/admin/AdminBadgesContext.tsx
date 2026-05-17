"use client";

import { createContext, useContext, type ReactNode } from "react";

type Badges = { articles: number; leads: number };

const AdminBadgesContext = createContext<Badges>({ articles: 0, leads: 0 });

export function AdminBadgesProvider({ value, children }: { value: Badges; children: ReactNode }) {
  return <AdminBadgesContext.Provider value={value}>{children}</AdminBadgesContext.Provider>;
}

export function useAdminBadges() {
  return useContext(AdminBadgesContext);
}
