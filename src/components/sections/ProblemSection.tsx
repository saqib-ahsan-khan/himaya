"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Eye, FolderOpen, UserX } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    number: "01",
    title: "No Visibility",
    body: "No live view of which controls are healthy, drifting, or failing. Governance runs on assumption, not evidence.",
    border: "#D4A017",
    Icon: Eye,
    iconColor: "#D4A017",
    initial: { x: -30, y: -20, opacity: 0 },
  },
  {
    number: "02",
    title: "Fragmented Evidence",
    body: "Proof spread across folders, emails, and tools. When scrutiny arrives, there is no coherent audit trail.",
    border: "#DC2626",
    Icon: FolderOpen,
    iconColor: "#DC2626",
    initial: { x: 30, y: -20, opacity: 0 },
  },
  {
    number: "03",
    title: "Unclear Ownership",
    body: "No one clearly owns remediation or review actions. Issues are logged but never closed with accountability.",
    border: "#D97706",
    Icon: UserX,
    iconColor: "#D97706",
    initial: { x: -30, y: 20, opacity: 0 },
  },
  {
    number: "04",
    title: "Reactive Governance",
    body: "Audit prep happens under pressure. Continuous discipline is replaced by seasonal activity and scramble.",
    border: "#071827",
    Icon: AlertTriangle,
    iconColor: "#071827",
    initial: { x: 30, y: 20, opacity: 0 },
  },
];

export function ProblemSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-warmCream py-[100px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-6 inline-flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.28em] text-metallicGold"
        >
          <span className="h-px w-7 bg-metallicGold" />
          THE PROBLEM
        </motion.div>

        <h2 className="font-heading text-[clamp(2rem,4.5vw,3.4rem)] font-bold text-deepNavy">
          {["Most regulated firms", "do not fail", "because they lack tools."].map((part, i) => (
            <div key={part} className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease, delay: i * 0.12 }}
                className="block"
              >
                {part}
              </motion.span>
            </div>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-5 max-w-[580px] text-[1.05rem] leading-relaxed text-slateText"
        >
          They fail because control discipline breaks down between reviews - and{" "}
          <em className="text-metallicGold">no one is watching</em>.
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="my-12 rounded-r-lg border-l-4 border-metallicGold bg-metallicGold/4 px-8 py-6 font-heading text-[1.15rem] italic leading-relaxed text-deepNavy"
        >
          The problem is not that regulated firms have no controls. The problem is that controls decay quietly between reviews.
          HIMAYA exists to detect that decay before it becomes a breach, audit failure, FCA query or board-level crisis.
        </motion.blockquote>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={card.initial}
              animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.45 + idx * 0.1 }}
              className="group relative rounded-xl border border-deepNavy/8 bg-white p-8 shadow-[0_4px_24px_rgba(7,24,39,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(7,24,39,0.1)]"
              style={{ borderTop: `3px solid ${card.border}` }}
            >
              <span className="pointer-events-none absolute right-5 top-2 font-heading text-[4rem] leading-none text-deepNavy/6">
                {card.number}
              </span>
              <card.Icon size={28} style={{ color: card.iconColor }} className="mb-4" />
              <h3 className="mb-2 text-[1.1rem] font-bold text-deepNavy">{card.title}</h3>
              <p className="text-[0.9rem] leading-[1.8] text-slateText">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.95 }}
          className="mt-12 text-center"
        >
          <div className="mx-auto mb-3 h-px w-[60px] bg-metallicGold" />
          <p className="text-sm italic text-slateText">HIMAYA turns those weaknesses into a live, structured assurance system.</p>
        </motion.div>
      </div>
    </section>
  );
}
