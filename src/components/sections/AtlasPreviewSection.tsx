"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Clock3, FileCheck2, FileText, Shield, UserCheck } from "lucide-react";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { DotAmber, DotBlue, DotRed, GoldArrow, GoldDash, GreenCheck, WarnIcon } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";

const ease = [0.16, 1, 0.3, 1] as const;

function Card({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      className="rounded-xl border border-metallicGold/20 bg-ivoryWhite/4 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-metallicGold/45 hover:bg-ivoryWhite/7"
    >
      {children}
    </motion.div>
  );
}

export function AtlasPreviewSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative border-y border-metallicGold/25 bg-deepNavy py-[110px] max-md:py-[60px] text-ivoryWhite">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.24em] text-metallicGold"
        >
          ATLAS PLATFORM
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl"
        >
          A live control environment
          <br />
          for regulated firms.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-5 max-w-3xl text-[rgba(255,253,247,0.65)]"
        >
          ATLAS is not a security dashboard. It is a Continuous Regulatory Posture Assurance System built around controls, evidence,
          ownership, remediation and defensibility.
        </motion.p>
        <p className="mt-3 text-xs italic text-ivoryWhite/50">
          Dashboard visuals are representative; final configuration depends on client scope and data sources.
        </p>
        <Link href="/atlas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-metallicGold hover:underline">
          See How ATLAS Detects Control Drift
        </Link>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Card delay={0}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <Shield size={16} /> Regulatory Posture
            </p>
            <p className="font-heading text-[2.2rem]">62/100</p>
            <div className="mt-2 h-1.5 rounded-full bg-metallicGold/15">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-metallicGold to-luminousGold" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-warningAmber/20 px-2 py-1 text-warningAmber">FCA: Medium</span>
              <span className="rounded bg-dangerRed/20 px-2 py-1 text-dangerRed">ICO: High</span>
              <span className="rounded bg-metallicGold/20 px-2 py-1 text-metallicGold">ISO: 72%</span>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 rounded bg-warningAmber/20 px-2 py-1 text-xs text-warningAmber">
              <WarnIcon size={12} /> Watch
            </span>
          </Card>

          <Card delay={0.1}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <Activity size={16} /> Control Drift Alerts
            </p>
            <p className="font-heading text-[2.5rem] text-dangerRed">3</p>
            <p className="text-sm text-ivoryWhite/75">Controls drifting now</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <DotRed /> Access review overdue
              </li>
              <li className="flex items-center gap-2">
                <DotAmber /> MFA exceptions rising
              </li>
              <li className="flex items-center gap-2">
                <DotAmber /> Restore test overdue
              </li>
            </ul>
            <p className="mt-4 text-xs text-ivoryWhite/45">Last checked: 2 minutes ago</p>
          </Card>

          <Card delay={0.2}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <FileCheck2 size={16} /> Evidence Status
            </p>
            <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border-4 border-metallicGold/25">
              <div
                className="grid h-16 w-16 place-items-center rounded-full border-4 border-metallicGold"
                style={{ borderRightColor: "transparent", transform: "rotate(25deg)" }}
              >
                <span className="-rotate-[25deg] text-xs">82%</span>
              </div>
            </div>
            <p className="text-sm text-ivoryWhite/75">82% complete | 6 items missing</p>
            <p className="mt-2 text-xs text-ivoryWhite/45">Last evidence update: 3 days ago</p>
            <button type="button" className="mt-4 inline-flex items-center gap-1 text-sm text-metallicGold hover:underline">
              Review Missing Items
              <GoldArrow size={14} />
            </button>
          </Card>

          <Card delay={0.3}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <UserCheck size={16} /> Remediation Owner
            </p>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-metallicGold text-deepNavy">OM</div>
              <div>
                <p className="text-sm">Operations Manager</p>
                <p className="text-xs text-ivoryWhite/55">Sarah Mitchell</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ivoryWhite/75">SLA: 7 days remaining</p>
            <div className="mt-2 h-1.5 rounded-full bg-warningAmber/20">
              <div className="h-full w-[40%] rounded-full bg-warningAmber" />
            </div>
            <span className="mt-3 inline-block rounded bg-warningAmber/20 px-2 py-1 text-xs text-warningAmber">Escalation: Pending</span>
          </Card>

          <Card delay={0.4}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <Clock3 size={16} /> SLA Deadlines
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-wrap items-center gap-2">
                <DotRed /> Critical: <span className="text-successGreen">0 overdue (Clear)</span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <DotAmber /> High: <span className="text-warningAmber">2 due this week</span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <DotBlue /> Medium: <span className="text-ivoryWhite/80">5 open</span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <GreenCheck size={14} /> Low: <span className="text-ivoryWhite/60">12 on track</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-ivoryWhite/75">19 tracked remediations</p>
          </Card>

          <Card delay={0.5}>
            <p className="mb-3 flex items-center gap-2 text-metallicGold">
              <FileText size={16} /> Monthly Report
            </p>
            <p className="text-sm text-ivoryWhite/75">
              Generate board pack: evidence snapshot, remediation list, drift summary.
            </p>
            <p className="mt-2 text-xs text-ivoryWhite/45">Last generated: 14 Apr 2026</p>
            <div className="mt-3 space-y-1 text-sm">
              {["Evidence snapshot", "Remediation list", "Drift summary", "Regulatory posture"].map((line) => (
                <ListItem key={line} icon={<GoldDash />} textClassName="!text-ivoryWhite/75">
                  {line}
                </ListItem>
              ))}
            </div>
            <BookDemoTrigger className="mt-4 w-full rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-4 py-2 font-semibold text-deepNavy">
              Generate Board Pack
            </BookDemoTrigger>
          </Card>
        </div>
      </div>

    </section>
  );
}
