"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { GoldArrow } from "@/components/ui/Icons";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center bg-deepNavy px-6 py-20 text-center text-ivoryWhite">
      <motion.div
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-metallicGold bg-metallicGold/10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring" }}>
          <Check className="h-12 w-12 text-metallicGold" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
      <h1 className="font-heading text-4xl font-bold md:text-[2.5rem]">You are in good hands.</h1>
      <p className="mt-6 max-w-lg text-[rgba(255,253,247,0.7)]">
        We have received your request and will be in touch within 24 hours to confirm your 15-minute discovery call.
      </p>
      <div className="mt-12 grid w-full max-w-4xl gap-4 md:grid-cols-3">
        {[
          { title: "Within 2 hours", body: "We review your details and prepare" },
          { title: "Within 24 hours", body: "We confirm your call slot by email" },
          { title: "Your call", body: "15 minutes, no hard sell, genuine fit check" },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-metallicGold/20 bg-ivoryWhite/5 p-6 text-left">
            <p className="font-heading text-lg text-metallicGold">{c.title}</p>
            <p className="mt-2 text-sm text-ivoryWhite/70">{c.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 text-sm">
        <Link href="/enforcement-lessons" className="inline-flex items-center gap-1 text-metallicGold hover:underline">
          Read our enforcement lessons
          <GoldArrow size={14} />
        </Link>
        <a
          href="/downloads/himaya-control-drift-checklist.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-metallicGold hover:underline"
        >
          Download the Control Drift Checklist
          <GoldArrow size={14} />
        </a>
        <Link href="/" className="inline-flex items-center gap-1 text-ivoryWhite/70 hover:text-ivoryWhite">
          Return to homepage
          <GoldArrow size={14} />
        </Link>
      </div>
    </div>
  );
}
