"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GoldArrow, LinkIcon } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const cases = [
  {
    borderClass: "border-l-dangerRed",
    firm: "ADM Investor Services International",
    fine: "£6.47m",
    pattern:
      "Inadequate AML systems and controls; FCA had raised concerns earlier; little evidence of adequate ongoing monitoring through periodic customer reviews.",
    lesson:
      "Control drift becomes dangerous when risk assessments, reviews, policies and remediation are not tracked continuously.",
    url: "https://www.fca.org.uk/news/press-releases/fca-fines-admisi-serious-financial-crime-control",
  },
  {
    borderClass: "border-l-warningAmber",
    firm: "Sigma Broking Limited",
    fine: "£1.087m",
    pattern:
      "Failed to submit complete and accurate transaction reports for five years; 924,584 incorrect reports after independent review.",
    lesson: "A system can be running while the control is broken. Firms need ongoing validation, not assumptions.",
    url: "https://www.fca.org.uk/news/press-releases/fca-fines-sigma-broking-limited-transaction-reporting-failures",
  },
  {
    borderClass: "border-l-warningAmber",
    firm: "Starling Bank",
    fine: "£28.96m",
    pattern:
      "Growth outpaced financial crime controls; opened over 54,000 accounts for high-risk customers despite a restriction being in place.",
    lesson: "As firms grow, controls drift unless governance and monitoring scale with the business.",
    url: "https://www.fca.org.uk/news/press-releases/fca-fines-starling-bank-failings-financial-crime-systems-and-controls",
  },
  {
    borderClass: "border-l-dangerRed",
    firm: "Metro Bank",
    fine: "£16.675m",
    pattern:
      "Monitoring gaps affected over 60 million transactions worth over £51bn; concerns raised by junior staff did not lead to a proper fix.",
    lesson: "Controls need assurance that they are operating as intended; warning signs require escalation and evidence of action.",
    url: "https://www.fca.org.uk/news/press-releases/fca-fines-metro-bank-16m-financial-crime-failings",
  },
  {
    borderClass: "border-l-warningAmber",
    firm: "Equifax Ltd",
    fine: "£11.164m",
    pattern: "Failed to manage and monitor outsourced UK consumer data security; breach exposed millions of consumers to risk.",
    lesson: "Third-party risk and outsourced data still require governance, evidence and board accountability.",
    url: "https://www.fca.org.uk/news/press-releases/equifax-ltd-fine-cyber-security-breach",
  },
];

export function EnforcementSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section ref={ref} className="bg-warmCream py-[100px] max-md:py-[60px] max-md:pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          ENFORCEMENT LESSONS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mobile-section-headline mt-4 font-heading text-4xl font-bold leading-tight text-deepNavy md:text-5xl"
        >
          FCA enforcement shows what weak control discipline can cost.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mobile-long-text mt-5 max-w-[680px] text-slateText"
        >
          FCA enforcement actions repeatedly show the same operational pattern: controls are not tested properly, monitoring gaps persist, remediation is
          delayed, risk ownership is unclear, and firms struggle to evidence effective governance when challenged.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="my-10 grid gap-4 rounded-[10px] border border-metallicGold/15 bg-metallicGold/7 px-8 py-6 max-md:grid-cols-1 md:grid-cols-3"
        >
          {[
            { v: "£6.47m", l: "ADM Investor Services fine" },
            { v: "£28.96m", l: "Starling Bank fine" },
            { v: "£16.675m", l: "Metro Bank fine" },
          ].map((s, i) => (
            <div key={s.v} className={`text-center ${i < 2 ? "md:border-r md:border-metallicGold/20 md:pr-4" : ""}`}>
              <p className="font-heading text-[1.8rem] font-bold text-deepNavy">{s.v}</p>
              <p className="mt-1 text-[0.75rem] text-slateText">{s.l}</p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-4 max-md:grid-cols-1">
          {cases.map((c, idx) => (
            <motion.article
              key={c.firm}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.3 + idx * 0.1 }}
              className={`rounded-r-xl border border-deepNavy/6 bg-white py-7 pl-8 pr-8 shadow-[0_2px_16px_rgba(7,24,39,0.06)] transition-all duration-300 hover:translate-x-1 hover:border-l-luminousGold hover:shadow-[0_8px_32px_rgba(7,24,39,0.1)] border-l-4 ${c.borderClass}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-deepNavy">{c.firm}</h3>
                  <span className="rounded-md bg-deepNavy px-3 py-1 font-heading text-[0.9rem] text-white md:hidden">{c.fine}</span>
                </div>
                <span className="hidden shrink-0 rounded-md bg-deepNavy px-3 py-1 font-heading text-[0.9rem] text-white md:inline-block">{c.fine}</span>
              </div>
              <p className="mb-1 mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-mutedText">FAILURE PATTERN</p>
              <p className="text-[0.88rem] leading-[1.75] text-slateText">{c.pattern}</p>
              <div className="mt-4 rounded-md border border-metallicGold/15 bg-metallicGold/5 px-4 py-3">
                <p className="font-mono text-[0.62rem] tracking-[0.15em] text-metallicGold">HIMAYA LESSON</p>
                <p className="mt-1 text-[0.85rem] italic text-deepNavy">{c.lesson}</p>
              </div>
              <Link
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-metallicGold hover:underline"
              >
                View FCA source
                <LinkIcon size={12} />
              </Link>
            </motion.article>
          ))}
        </div>

        <div
          className="mt-8 rounded-r-[6px] border border-[rgba(7,24,39,0.1)] border-l-[3px] border-l-[rgba(212,160,23,0.5)] px-[1.2rem] py-[0.8rem] font-subheading text-[0.8rem] italic text-mutedText"
          style={{ background: "rgba(7,24,39,0.03)" }}
        >
          These examples are public FCA enforcement cases. They are not HIMAYA clients, and HIMAYA does not claim it would have prevented these outcomes.
          They are shown to highlight recurring governance, monitoring, evidence, and control issues.
        </div>

        <Link href="/enforcement-lessons" className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-metallicGold hover:underline">
          See all enforcement lessons
          <GoldArrow size={16} />
        </Link>
      </div>
    </section>
  );
}
