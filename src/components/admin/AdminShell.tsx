"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "FCA Articles", icon: FileText, badgeKey: "articles" as const },
  { href: "/admin/leads", label: "Leads", icon: Users, badgeKey: "leads" as const },
  { href: "/admin/chatbot", label: "Chatbot", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({
  pathname,
  badges,
}: {
  pathname: string;
  badges?: { articles?: number; leads?: number };
}) {
  return (
    <>
      <div className="border-b border-metallicGold/12 p-6">
        <Link href="/admin/dashboard">
          <img src="/assets/images/logos/himaya-logo.png" alt="HIMAYA" className="h-8 w-auto brightness-0 invert" />
        </Link>
        <p className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-[rgba(255,253,247,0.4)]">ADMIN PANEL</p>
      </div>
      <div className="h-px bg-metallicGold/12" />
      <nav className="flex-1 py-4">
        {navItems.map(({ href, label, icon: Icon, badgeKey }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const count = badgeKey === "articles" ? badges?.articles : badgeKey === "leads" ? badges?.leads : 0;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-6 py-2.5 text-[0.88rem] transition ${
                active
                  ? "border-l-[3px] border-metallicGold bg-metallicGold/8 font-semibold text-metallicGold"
                  : "border-l-[3px] border-transparent text-[rgba(255,253,247,0.55)] hover:bg-white/[0.04] hover:text-[rgba(255,253,247,0.9)]"
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {count ? (
                <span className="rounded-full bg-metallicGold/20 px-2 py-0.5 font-mono text-[0.6rem] text-metallicGold">{count}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-metallicGold/12 p-4">
        <div className="flex items-center gap-3 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-metallicGold font-mono text-xs font-bold text-deepNavy">HA</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ivoryWhite">HIMAYA Admin</p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-[rgba(255,253,247,0.5)] transition hover:text-metallicGold"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export function AdminShell({
  children,
  title,
  badges,
}: {
  children: ReactNode;
  title: string;
  badges?: { articles?: number; leads?: number };
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-warmCream">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-metallicGold/12 bg-deepNavy lg:flex">
        <SidebarContent pathname={pathname} badges={badges} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-deepNavy/60" onClick={() => setMobileOpen(false)} aria-label="Close menu" />
          <aside className="relative flex h-full w-60 flex-col bg-deepNavy shadow-xl">
            <SidebarContent pathname={pathname} badges={badges} />
          </aside>
        </div>
      )}

      <div className="lg:ml-60">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-deepNavy/[0.06] bg-white px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-md border border-deepNavy/10 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <h1 className="font-heading text-[1.3rem] font-bold text-deepNavy">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-md border border-deepNavy/10 p-2 text-mutedText" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <Link
              href="/admin/articles/new"
              className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-4 py-2 text-sm font-bold text-deepNavy"
            >
              New Article
            </Link>
          </div>
        </header>
        <main className="px-4 pb-12 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
