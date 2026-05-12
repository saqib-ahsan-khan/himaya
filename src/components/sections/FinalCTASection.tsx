"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { GoldCheck } from "@/components/ui/Icons";
import { ClipboardList, Lock, Shield } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function ShieldBg() {
  return (
    <svg className="text-metallicGold" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M100 8L180 40v72c0 48-36 92-80 108-44-16-80-60-80-108V40L100 8Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="currentColor"
      />
    </svg>
  );
}

const trust = [
  { icon: <Lock size={18} className="shrink-0 text-metallicGold/90" aria-hidden />, text: "No long-term contracts" },
  { icon: <ClipboardList size={18} className="shrink-0 text-metallicGold/90" aria-hidden />, text: "Response within 24 hours" },
  { icon: <GoldCheck size={18} />, text: "FCA-regulated firm focus" },
  { icon: <Shield size={18} className="shrink-0 text-metallicGold/90" aria-hidden />, text: "No sensitive data via public forms" },
];

export function FinalCTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#071827_0%,#0D1321_100%)] py-[120px] text-center text-ivoryWhite"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
        <div className="h-[400px] w-[400px] [&>svg]:h-full [&>svg]:w-full">
          <ShieldBg />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          GET STARTED
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mx-auto mt-4 max-w-[700px] font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight"
        >
          See where your governance is
          <br />
          drifting before scrutiny forces
          <br />
          the question.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.24 }}
          className="mx-auto mt-6 max-w-[520px] leading-[1.9] text-[rgba(255,253,247,0.65)]"
        >
          Book a 15-minute discovery call to see whether your current controls, evidence, and remediation discipline would stand up under regulatory pressure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.36 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <BookDemoTrigger className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-9 py-4 text-base font-bold text-deepNavy transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(212,160,23,0.4)]">
            Book a 15-Minute Demo
          </BookDemoTrigger>
          <Link
            href="/about"
            className="rounded-md border-[1.5px] border-metallicGold/35 px-9 py-4 text-base font-semibold text-[rgba(255,253,247,0.85)] transition hover:border-metallicGold hover:bg-metallicGold/6 hover:text-white"
          >
            Explore HIMAYA
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.48 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.82rem] text-[rgba(255,253,247,0.5)]"
        >
          {trust.map((t) => (
            <span key={t.text} className="inline-flex items-center gap-2">
              {t.icon}
              {t.text}
            </span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mx-auto mt-8 max-w-[600px] font-mono text-xs italic text-[rgba(255,253,247,0.3)]"
        >
          HIMAYA provides cybersecurity, governance, risk, compliance and operational assurance support. HIMAYA does not provide legal advice, regulatory
          representation, or guarantee regulatory outcomes.
        </motion.p>
      </div>
    </section>
  );
}
