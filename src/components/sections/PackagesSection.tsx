"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { GoldCheck, MidDot } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";

const ease = [0.16, 1, 0.3, 1] as const;

export function PackagesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="packages" ref={ref} className="bg-deepNavy py-[110px] max-md:py-[60px] max-md:pb-20 text-ivoryWhite">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          PACKAGES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-4 font-heading text-4xl font-bold md:text-5xl"
        >
          Structured assurance.
          <br />
          Predictable investment.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-5 max-w-3xl space-y-3 text-[rgba(255,253,247,0.65)]"
        >
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-heading text-base text-ivoryWhite/90 md:text-lg">
            <span>
              Essential <span className="text-metallicGold">£750</span>
            </span>
            <span className="inline-flex items-center" aria-hidden>
              <MidDot className="bg-ivoryWhite/40" />
            </span>
            <span>
              Regulated <span className="text-metallicGold">£1,250</span>
            </span>
            <span className="inline-flex items-center" aria-hidden>
              <MidDot className="bg-ivoryWhite/40" />
            </span>
            <span>
              Assurance+ <span className="text-metallicGold">£1,850</span>
            </span>
            <span className="inline-flex w-full flex-wrap items-center gap-x-1 text-sm font-normal text-ivoryWhite/55 sm:w-auto sm:pl-1">
              / month from <MidDot className="bg-ivoryWhite/40" /> flexible by scope
            </span>
          </p>
          <p>
            Simple monthly tiers - pricing stays flexible because every firm&apos;s scope, footprint, and data sources differ. We confirm the right package on
            a fit call. For many regulated SMEs, HIMAYA provides structured oversight at a fraction of the cost of adding senior internal compliance
            headcount.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 max-lg:grid-cols-1 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="flex flex-col rounded-2xl border border-metallicGold/20 bg-ivoryWhite/5 p-10 transition-all duration-300"
          >
            <h3 className="font-heading text-2xl font-bold text-white">HIMAYA Essential</h3>
            <p className="mt-2 text-[0.88rem] text-ivoryWhite/60">For regulated SMEs that need basic visibility.</p>
            <div className="mt-6">
              <p className="text-xs text-ivoryWhite/45">From</p>
              <p className="font-heading text-[2.8rem] font-bold leading-none text-white">£750</p>
              <p className="text-sm text-ivoryWhite/55">/month</p>
              <p className="mt-1 text-xs text-ivoryWhite/45">Approx. £9,000/year</p>
            </div>
            <div className="my-6 h-px bg-metallicGold/15" />
            <p className="mb-3 text-sm font-semibold text-ivoryWhite/80">Includes</p>
            <div className="flex flex-1 flex-col gap-2">
              {[
                "ATLAS core dashboard",
                "Control drift visibility",
                "Evidence library",
                "Basic monthly summary",
                "Basic framework mapping",
                "Limited support",
              ].map((t) => (
                <ListItem key={t} icon={<GoldCheck size={15} />} textClassName="!text-ivoryWhite/80">
                  {t}
                </ListItem>
              ))}
            </div>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-ivoryWhite/45">
              Light entry - no deep vCISO work, no heavy remediation.
            </p>
            <BookDemoTrigger className="safe-bottom mt-8 w-full rounded-md border border-metallicGold/30 py-3 text-sm font-bold text-metallicGold transition-colors hover:bg-metallicGold/10">
              Book a 15-Minute Demo
            </BookDemoTrigger>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="relative flex flex-col rounded-2xl border-2 border-metallicGold/50 bg-metallicGold/10 p-10 shadow-[0_0_60px_rgba(212,160,23,0.12),0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 lg:scale-[1.04] max-lg:scale-100"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-metallicGold to-luminousGold px-4 py-1 text-[0.72rem] font-bold text-deepNavy">
              MOST POPULAR
            </span>
            <h3 className="mt-2 font-heading text-2xl font-bold text-white">HIMAYA Regulated</h3>
            <p className="mt-2 text-[0.88rem] text-ivoryWhite/60">Our main offer - most FCA-regulated SMEs should be guided here.</p>
            <div className="mt-6">
              <p className="text-xs text-ivoryWhite/45">From</p>
              <p className="font-heading text-[2.8rem] font-bold leading-none text-white">£1,250</p>
              <p className="text-sm text-ivoryWhite/55">/month</p>
              <p className="mt-1 text-xs text-ivoryWhite/45">Approx. £15,000/year</p>
            </div>
            <div className="my-6 h-px bg-metallicGold/25" />
            <p className="mb-3 text-sm font-semibold text-ivoryWhite/80">Includes</p>
            <div className="flex flex-1 flex-col gap-2">
              {[
                "ATLAS",
                "Human Risk & Awareness Programme",
                "Remediation / SLA tracking",
                "Evidence status monitoring",
                "Owner mapping",
                "Quarterly assurance call",
                "Monthly control drift summary",
              ].map((t) => (
                <ListItem key={t} icon={<GoldCheck size={15} />} textClassName="!text-ivoryWhite/80">
                  {t}
                </ListItem>
              ))}
            </div>
            <BookDemoTrigger className="safe-bottom mt-8 w-full rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-3 text-sm font-bold text-deepNavy transition hover:shadow-[0_10px_40px_rgba(212,160,23,0.4)]">
              Book a 15-Minute Demo
            </BookDemoTrigger>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="flex flex-col rounded-2xl border border-metallicGold/20 bg-ivoryWhite/5 p-10 transition-all duration-300"
          >
            <h3 className="font-heading text-2xl font-bold text-white">HIMAYA Assurance+</h3>
            <p className="mt-2 text-[0.88rem] text-ivoryWhite/60">
              For firms that want serious board-level oversight - strategic, visible, and defensible.
            </p>
            <div className="mt-6">
              <p className="text-xs text-ivoryWhite/45">From</p>
              <p className="font-heading text-[2.8rem] font-bold leading-none text-white">£1,850</p>
              <p className="text-sm text-ivoryWhite/55">/month</p>
              <p className="mt-1 text-xs text-ivoryWhite/45">Approx. £22,200/year</p>
            </div>
            <div className="my-6 h-px bg-metallicGold/15" />
            <p className="mb-3 text-sm font-semibold text-ivoryWhite/80">Includes</p>
            <div className="flex flex-1 flex-col gap-2">
              {[
                "Everything in Regulated",
                "vCISO Lite",
                "Deeper governance support",
                "Board packs",
                "Monthly assurance review",
                "Priority oversight",
                "More strategic recommendations",
              ].map((t) => (
                <ListItem key={t} icon={<GoldCheck size={15} />} textClassName="!text-ivoryWhite/80">
                  {t}
                </ListItem>
              ))}
            </div>
            <p className="mt-4 text-[0.8rem] font-medium leading-relaxed text-metallicGold/90">
              Built for senior leaders who need board-ready oversight, assurance rhythm, and evidence-backed decision-making.
            </p>
            <BookDemoTrigger className="safe-bottom mt-8 w-full rounded-md border border-metallicGold/30 py-3 text-sm font-bold text-metallicGold transition-colors hover:bg-metallicGold/10">
              Book a 15-Minute Demo
            </BookDemoTrigger>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.65 }}
          className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-ivoryWhite/50"
        >
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1">
            Essential £750
            <MidDot className="bg-ivoryWhite/40" />
            Regulated £1,250
            <MidDot className="bg-ivoryWhite/40" />
            Assurance+ £1,850
          </span>{" "}
          - indicative monthly from; final fees reflect scope and complexity. Confirmed on a fit call. No long-term lock-in for initial pilots where offered.
        </motion.p>
      </div>
    </section>
  );
}
