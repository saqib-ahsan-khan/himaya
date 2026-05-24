"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  FileCheck2,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { DotAmber, DotGreen, DotRed } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const kpis = [
  {
    label: "Posture Score",
    value: "82",
    suffix: "/100",
    trend: "+4",
    trendUp: true,
    icon: Shield,
    accent: "from-metallicGold/20 to-luminousGold/5",
    valueColor: "text-metallicGold",
  },
  {
    label: "Drift Alerts",
    value: "4",
    suffix: " active",
    trend: "2 critical",
    trendUp: false,
    icon: Activity,
    accent: "from-dangerRed/15 to-dangerRed/5",
    valueColor: "text-dangerRed",
  },
  {
    label: "Evidence",
    value: "91",
    suffix: "%",
    trend: "6 missing",
    trendUp: false,
    icon: FileCheck2,
    accent: "from-successGreen/15 to-successGreen/5",
    valueColor: "text-successGreen",
  },
  {
    label: "SLA Breaches",
    value: "1",
    suffix: " open",
    trend: "Due Fri",
    trendUp: false,
    icon: AlertTriangle,
    accent: "from-warningAmber/15 to-warningAmber/5",
    valueColor: "text-warningAmber",
  },
] as const;

const controls = [
  { name: "MFA Enforcement", owner: "IT Ops", status: "Failing", dot: "red" as const },
  { name: "Access Review Q2", owner: "Compliance", status: "Overdue", dot: "amber" as const },
  { name: "Incident Response Plan", owner: "CISO", status: "Compliant", dot: "green" as const },
  { name: "Supplier Risk Assessment", owner: "Procurement", status: "At Risk", dot: "amber" as const },
  { name: "Backup Restore Test", owner: "Infrastructure", status: "Compliant", dot: "green" as const },
] as const;

const regulators = [
  { code: "FCA", level: "Medium", width: "68%", color: "bg-warningAmber" },
  { code: "ICO", level: "High", width: "42%", color: "bg-dangerRed" },
  { code: "ISO", level: "72%", width: "72%", color: "bg-metallicGold" },
  { code: "CE", level: "Good", width: "88%", color: "bg-successGreen" },
] as const;

const quickSignals = [
  {
    icon: Shield,
    label: "SYSC mapped",
    tone: "border-metallicGold/25 bg-metallicGold/10 text-metallicGold",
  },
  {
    icon: Activity,
    label: "3 drift signals",
    tone: "border-warningAmber/25 bg-warningAmber/10 text-warningAmber",
  },
  {
    icon: FileCheck2,
    label: "Evidence 91%",
    tone: "border-successGreen/25 bg-successGreen/10 text-successGreen",
  },
] as const;

function StatusPill({ status, dot }: { status: string; dot: "red" | "amber" | "green" }) {
  const tones = {
    red: "bg-dangerRed/12 text-dangerRed border-dangerRed/20",
    amber: "bg-warningAmber/12 text-warningAmber border-warningAmber/20",
    green: "bg-successGreen/12 text-successGreen border-successGreen/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wide ${tones[dot]}`}
    >
      {dot === "red" ? <DotRed /> : dot === "amber" ? <DotAmber /> : <DotGreen />}
      {status}
    </span>
  );
}

export function AtlasDashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate = mounted && inView;

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 28 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-metallicGold/25 bg-gradient-to-br from-deepNavy via-[#0a1f33] to-midnightNavy p-1 shadow-[0_32px_80px_rgba(7,24,39,0.28),0_0_0_1px_rgba(212,160,23,0.08)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-metallicGold/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-luminousGold/8 blur-3xl"
        />

        <div className="relative overflow-hidden rounded-[14px] bg-[#0c1a2a]">
          {/* Window chrome */}
          <motion.div
            className="flex items-center justify-between border-b border-white/[0.06] bg-[#081420] px-4 py-3"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-dangerRed/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-warningAmber/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-successGreen/80" />
              </motion.div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 bg-metallicGold [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0_50%)]" />
                <span className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-ivoryWhite">ATLAS</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[0.58rem] text-ivoryWhite/40 sm:inline">Regulatory Assurance</span>
              <span className="flex items-center gap-1.5 rounded-full border border-successGreen/30 bg-successGreen/10 px-2 py-0.5 font-mono text-[0.58rem] text-successGreen">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-successGreen" />
                Live
              </span>
            </div>
          </motion.div>

          <motion.div
            className="border-b border-white/[0.06] px-4 py-3 sm:px-5"
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-metallicGold">ATLAS Preview</p>
            <h3 className="mt-0.5 font-heading text-lg font-bold text-ivoryWhite sm:text-xl">
              Regulatory Assurance Dashboard
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-2 border-b border-white/[0.06] px-4 py-3 sm:grid-cols-3 sm:px-5"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {quickSignals.map((signal) => (
              <div
                key={signal.label}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 ${signal.tone}`}
              >
                <signal.icon size={13} aria-hidden className="shrink-0" />
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-wide">{signal.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="space-y-4 p-4 sm:p-5">
            {/* KPI row */}
            <motion.div
              className="grid grid-cols-2 gap-2 sm:gap-3"
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
            >
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={animate ? { opacity: 0, scale: 0.96 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.32 + i * 0.06, duration: 0.45 }}
                  className={`rounded-xl border border-white/[0.06] bg-gradient-to-br ${kpi.accent} p-3 backdrop-blur-sm`}
                >
                  <motion.div className="flex items-start justify-between gap-1">
                    <kpi.icon size={14} className="shrink-0 text-metallicGold/90" aria-hidden />
                    <span
                      className={`flex items-center gap-0.5 font-mono text-[0.55rem] ${kpi.trendUp ? "text-successGreen" : "text-ivoryWhite/45"}`}
                    >
                      {kpi.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {kpi.trend}
                    </span>
                  </motion.div>
                  <p className="mt-2 font-mono text-[0.58rem] text-ivoryWhite/50">{kpi.label}</p>
                  <p className="mt-0.5 flex items-baseline gap-0.5">
                    <span className={`font-heading text-2xl font-bold leading-none ${kpi.valueColor}`}>{kpi.value}</span>
                    <span className="text-[0.65rem] text-ivoryWhite/40">{kpi.suffix}</span>
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Posture + regulators */}
            <motion.div
              className="grid gap-3 sm:grid-cols-5"
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              <div className="relative overflow-hidden rounded-xl border border-metallicGold/20 bg-gradient-to-br from-metallicGold/10 to-transparent p-4 sm:col-span-2">
                <p className="font-mono text-[0.58rem] tracking-[0.14em] text-metallicGold">OVERALL POSTURE</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="font-heading text-4xl font-bold leading-none text-ivoryWhite">82</span>
                  <span className="pb-1 text-sm text-ivoryWhite/40">/100</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-metallicGold via-luminousGold to-softGold" />
                </div>
                <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-warningAmber/15 px-2 py-0.5 text-[0.65rem] font-medium text-warningAmber">
                  <AlertTriangle size={11} aria-hidden /> Watch — 4 controls need attention
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:col-span-3">
                <p className="mb-3 font-mono text-[0.58rem] tracking-[0.14em] text-ivoryWhite/45">REGULATOR ALIGNMENT</p>
                <div className="space-y-2.5">
                  {regulators.map((r) => (
                    <div key={r.code}>
                      <div className="mb-1 flex items-center justify-between text-[0.68rem]">
                        <span className="font-semibold text-ivoryWhite/90">{r.code}</span>
                        <span className="text-ivoryWhite/45">{r.level}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full ${r.color}`} style={{ width: r.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Control table */}
            <motion.div
              className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.55 }}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2.5 sm:px-4">
                <p className="font-mono text-[0.58rem] tracking-[0.12em] text-ivoryWhite/50">CONTROL STATUS</p>
                <span className="font-mono text-[0.55rem] text-metallicGold">2 unowned</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {controls.map((row, i) => (
                  <motion.div
                    key={row.name}
                    className="flex items-center justify-between gap-2 px-3 py-2.5 transition-colors hover:bg-white/[0.03] sm:px-4"
                    initial={animate ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 + i * 0.05 }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.78rem] font-medium text-ivoryWhite/90">{row.name}</p>
                      <p className="text-[0.62rem] text-ivoryWhite/35">{row.owner}</p>
                    </div>
                    <StatusPill status={row.status} dot={row.dot} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer actions */}
            <motion.div
              className="flex flex-wrap items-center justify-between gap-2"
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <div className="flex flex-wrap gap-2">
                {["Audit Pack Ready", "Board Pack Q2"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-metallicGold/25 bg-metallicGold/10 px-2 py-1 font-mono text-[0.58rem] text-metallicGold"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-metallicGold to-luminousGold px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-wide text-deepNavy transition hover:brightness-110"
              >
                Open Audit Mode
                <ChevronRight size={12} aria-hidden />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
