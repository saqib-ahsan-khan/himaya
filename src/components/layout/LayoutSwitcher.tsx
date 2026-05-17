"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function LayoutSwitcher({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivoryWhite">
      <Navbar />
      <div className="flex min-h-screen flex-col pt-24">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
