"use client";

import Link from "next/link";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";

export function FcaInsightsBottomCTA() {
  return (
    <section className="bg-deepNavy py-20 text-center text-ivoryWhite">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-heading text-3xl font-bold">Find out where your controls are drifting.</h2>
        <p className="mt-4 text-[rgba(255,253,247,0.65)]">Book a 15-minute readiness call with HIMAYA.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <BookDemoTrigger className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-8 py-3 text-sm font-bold text-deepNavy transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(212,160,23,0.35)]">
            Book a Readiness Call
          </BookDemoTrigger>
          <Link
            href="/atlas"
            className="rounded-md border border-metallicGold/35 px-8 py-3 text-sm font-semibold text-[rgba(255,253,247,0.85)] transition hover:border-metallicGold hover:bg-metallicGold/6"
          >
            See How ATLAS Detects Control Drift
          </Link>
          <Link
            href="/#packages"
            className="rounded-md border border-metallicGold/35 px-8 py-3 text-sm font-semibold text-[rgba(255,253,247,0.85)] transition hover:border-metallicGold hover:bg-metallicGold/6"
          >
            View HIMAYA Service Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
