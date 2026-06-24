"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GoldDash } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

function ShieldDecor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M48 8L78 20v26c0 19-12 36-30 44-18-8-30-25-30-44V20L48 8Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

const alsoSupports = [
  {
    title: "SRA-Regulated Law Firms",
    body: "Confidentiality obligations, client data handling, and evolving SRA cyber expectations require structured access and supplier governance.",
    badge: "SRA",
    future: true,
  },
  {
    title: "Accounting Firms",
    body: "ICAEW and ACCA oversight combined with sensitive client financial data demands documented data protection governance and access controls.",
    badge: "ICAEW / ACCA",
  },
  {
    title: "UK GDPR-Sensitive SMEs",
    body: "Any organisation under ICO enforcement risk - processing personal data without a documented data protection framework is direct regulatory exposure.",
    badge: "ICO / UK GDPR",
  },
  {
    title: "ISO 27001 Aspirants",
    body: "Firms pursuing certification need structured control implementation and evidence before engaging external auditors. HIMAYA builds the foundation.",
    badge: "ISO 27001",
    future: true,
  },
];

const frameworks = ["FCA SYSC", "UK GDPR / ICO", "ISO 27001", "Cyber Essentials", "SRA (Future)"];

const cornerInitials = [
  { x: -28, y: -28 },
  { x: 28, y: -28 },
  { x: -28, y: 28 },
  { x: 28, y: 28 },
];

export function WhoWeHelpSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-ivoryWhite py-[100px] max-md:py-[60px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          WHO WE HELP
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mobile-section-headline mt-4 font-heading text-4xl font-bold leading-tight text-deepNavy md:text-5xl"
        >
          Built for regulated firms where control drift becomes regulatory exposure.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mobile-long-text mt-5 max-w-[580px] text-slateText"
        >
          Initial focus: FCA-regulated SMEs with 10-100 employees, small compliance teams, MSP support and manual internal governance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="relative mt-10 w-full overflow-hidden rounded-2xl border border-metallicGold/30 bg-deepNavy p-10 shadow-[0_20px_60px_rgba(7,24,39,0.2)] transition-all duration-300 hover:border-metallicGold/60 hover:shadow-[0_24px_80px_rgba(7,24,39,0.3)] lg:max-w-[78%]"
        >
          <ShieldDecor className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 text-metallicGold opacity-[0.08]" />
          <span className="inline-block rounded border border-metallicGold/25 bg-metallicGold/10 px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.2em] text-metallicGold">
            PRIMARY FOCUS
          </span>
          <h3 className="mt-4 font-heading text-[1.8rem] font-bold text-white md:text-[2rem]">FCA-Regulated Financial Firms</h3>
          <p className="mt-4 max-w-[620px] text-[0.95rem] leading-[1.85] text-ivoryWhite/70">
            Operational resilience requirements, SMCR personal accountability, and SYSC governance obligations mean control drift is not just a risk - it is
            personal exposure for senior managers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Mortgage and credit brokers under Consumer Duty",
              "Wealth management and advisory firms",
              "Payment institutions and e-money firms",
              "Investment firms with operational resilience obligations",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2 text-[0.9rem] text-ivoryWhite/80">
                <span className="mt-2 shrink-0 leading-none" aria-hidden>
                  <GoldDash />
                </span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {alsoSupports.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: cornerInitials[idx].x, y: cornerInitials[idx].y }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.35 + idx * 0.1 }}
              className="rounded-xl border border-deepNavy/8 bg-white p-5 shadow-[0_2px_12px_rgba(7,24,39,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-metallicGold/40 md:p-6"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-block font-mono text-[0.62rem] tracking-[0.18em] text-mutedText">Also Supported</span>
                {card.future && (
                  <span className="rounded-full bg-deepNavy/8 px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.1em] text-mutedText">Future</span>
                )}
              </div>
              <h4 className="text-[1rem] font-bold text-deepNavy md:text-[1.05rem]">{card.title}</h4>
              <p className="mt-2 text-[0.85rem] leading-[1.78] text-slateText">{card.body}</p>
              <span className="mt-4 inline-block rounded-full bg-deepNavy/90 px-3 py-1 text-[0.72rem] font-bold text-white">{card.badge}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.75 }}
          className="mt-10 rounded-xl bg-warmCream px-8 py-6"
        >
          <p className="font-mono text-[0.62rem] tracking-[0.15em] text-metallicGold">FRAMEWORK ALIGNMENT</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {frameworks.map((f) => (
              <span key={f} className="rounded-full bg-deepNavy px-4 py-2 text-[0.82rem] font-bold text-white">
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
