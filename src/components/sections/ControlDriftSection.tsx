"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DotAmber, DotRed, GoldCheck } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const rows = [
  {
    dot: "red" as const,
    title: "Access reviews overdue",
    text: "Quarterly review overdue - status turns amber then red. Owner notified automatically.",
  },
  {
    dot: "amber" as const,
    title: "MFA exception growth",
    text: "Exception count rising - risk posture score worsens. Escalation triggered at threshold.",
  },
  {
    dot: "red" as const,
    title: "Evidence missing",
    text: "Control marked incomplete until screenshot, config export or policy version is uploaded.",
  },
  {
    dot: "amber" as const,
    title: "Remediation overdue",
    text: "Ticket has named owner but SLA breached - dashboard escalates to senior management.",
  },
  {
    dot: "red" as const,
    title: "Policy/control mismatch",
    text: "Policy says one thing, evidence shows another. HIMAYA flags the gap and assigns resolution.",
  },
];

export function ControlDriftSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-ivoryWhite py-[100px] max-md:py-[60px]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-8 lg:grid-cols-[45%_55%]">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
          <p className="mb-5 font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold">WHAT IS CONTROL DRIFT?</p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-deepNavy md:text-[2.8rem]">
            Controls decay quietly
            <br />
            between reviews.
          </h2>
          <p className="mt-5 max-w-xl text-[1rem] leading-[1.85] text-slateText">
            Control drift happens when a firm&apos;s documented controls no longer match reality. MFA exceptions grow, access reviews
            become overdue, evidence goes missing, owners become unclear and remediation deadlines slip. On paper, the firm may still
            look controlled. In reality, its operating discipline is weakening.
          </p>

          <div className="mt-7 space-y-4 text-sm text-slateText">
            <p className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">
                <GoldCheck size={16} />
              </span>
              <span>
                <strong>166 cyber incidents</strong> reported to FCA in 2024{" "}
                <Link href="https://www.fca.org.uk/" target="_blank" className="text-metallicGold hover:underline">
                  (source)
                </Link>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">
                <GoldCheck size={16} />
              </span>
              <span>
                <strong>£28.96m</strong> Starling Bank fined for control failures{" "}
                <Link href="https://www.fca.org.uk/news/" target="_blank" className="text-metallicGold hover:underline">
                  (source)
                </Link>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">
                <GoldCheck size={16} />
              </span>
              <span>
                <strong>Controls drift</strong> between annual reviews without continuous monitoring
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="overflow-hidden rounded-xl border border-metallicGold/40 bg-white"
        >
          <div className="grid grid-cols-2 bg-metallicGold/6 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-deepNavy">
            <span>DRIFT INDICATOR</span>
            <span>WHAT HIMAYA DETECTS</span>
          </div>
          {rows.map((row, idx) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.2 + idx * 0.1 }}
              className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm transition-colors hover:bg-metallicGold/4 ${
                idx % 2 === 1 ? "bg-warmCream" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 font-medium text-deepNavy">
                {row.dot === "red" ? <DotRed /> : <DotAmber />}
                {row.title}
              </div>
              <p className="text-slateText">{row.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
