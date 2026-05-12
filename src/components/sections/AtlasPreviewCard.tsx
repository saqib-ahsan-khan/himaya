"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Lock, Shield } from "lucide-react";
import { DotAmber, DotGreen, DotRed, WarnIcon } from "@/components/ui/Icons";

const controls = [
  { name: "MFA Enforcement", status: "Failing", tone: "bg-dangerRed/12 text-dangerRed", dot: "red" as const },
  { name: "Access Review Q2", status: "Overdue", tone: "bg-warningAmber/12 text-warningAmber", dot: "amber" as const },
  { name: "Incident Response", status: "Compliant", tone: "bg-successGreen/12 text-successGreen", dot: "green" as const },
  { name: "Supplier Risk", status: "Failing", tone: "bg-dangerRed/12 text-dangerRed", dot: "red" as const },
];

const miniStats = [
  { label: "FCA: Medium", tone: "bg-warningAmber/8 text-warningAmber" },
  { label: "ICO: High", tone: "bg-dangerRed/8 text-dangerRed" },
  { label: "ISO: 72%", tone: "bg-metallicGold/8 text-metallicGold" },
];

export function AtlasPreviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 0.8, duration: 1 },
          scale: { delay: 0.8, duration: 1 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="rounded-2xl border border-metallicGold/20 bg-white p-6 shadow-[0_20px_60px_rgba(7,24,39,0.12),0_4px_20px_rgba(212,160,23,0.08)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 bg-deepNavy [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0_50%)]" />
            <span className="font-mono text-sm font-bold text-deepNavy">ATLAS</span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[0.65rem] text-successGreen">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-successGreen" />
            Live
          </span>
        </div>

        <div className="mb-5 space-y-3">
          <p className="font-mono text-[0.63rem] tracking-[0.12em] text-mutedText">REGULATORY POSTURE</p>
          <div className="flex items-end gap-1">
            <span className="font-heading text-5xl font-bold leading-none text-deepNavy">62</span>
            <span className="pb-1 text-sm text-mutedText">/100</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-metallicGold/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-metallicGold to-luminousGold"
            />
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-warningAmber/12 px-2 py-1 text-xs font-medium text-warningAmber">
            <WarnIcon size={12} /> Watch
          </span>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {miniStats.map((item) => (
            <div key={item.label} className={`rounded-lg px-2 py-2 text-center text-[0.63rem] font-medium ${item.tone}`}>
              {item.label}
            </div>
          ))}
        </div>

        <div className="mb-5 divide-y divide-deepNavy/5 rounded-xl border border-deepNavy/5">
          {controls.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2 px-3 py-2.5 transition-colors hover:bg-metallicGold/3">
              <span className="flex min-w-0 items-center gap-2 text-[0.82rem] text-slateText">
                {item.dot === "red" ? <DotRed /> : item.dot === "amber" ? <DotAmber /> : <DotGreen />}
                <span className="truncate">{item.name}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-medium ${item.tone}`}>{item.status}</span>
            </div>
          ))}
        </div>

        <button className="w-full rounded-lg border border-dashed border-metallicGold/30 py-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-metallicGold transition-colors hover:bg-metallicGold/5">
          Open Audit Mode Export
        </button>
      </motion.div>

      {[
        {
          cls: "left-3 -top-3 text-deepNavy",
          delay: 0,
          content: (
            <>
              <Shield size={12} className="inline shrink-0 align-middle text-metallicGold" aria-hidden /> SYSC Aligned
            </>
          ),
        },
        {
          cls: "right-3 -top-3 text-warningAmber",
          delay: -1,
          content: (
            <>
              <AlertTriangle size={12} className="inline shrink-0 align-middle" aria-hidden /> 3 Drift Alerts
            </>
          ),
        },
        {
          cls: "bottom-3 right-3 text-deepNavy",
          delay: -2,
          content: (
            <>
              <Lock size={12} className="inline shrink-0 align-middle text-metallicGold" aria-hidden /> Evidence: 82%
            </>
          ),
        },
      ].map((badge, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
          className={`absolute z-10 flex items-center gap-1 rounded-lg border border-metallicGold/30 bg-white px-3 py-1.5 font-mono text-[0.65rem] shadow-[0_4px_16px_rgba(7,24,39,0.1)] ${badge.cls}`}
        >
          {badge.content}
        </motion.div>
      ))}
    </div>
  );
}
