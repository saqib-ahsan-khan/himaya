"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "Is HIMAYA a replacement for our compliance officer?",
    a: "No. HIMAYA supports and strengthens governance, evidence, control monitoring and remediation discipline. It can reduce the need to hire a full internal team early, but it does not replace legal or regulatory accountability.",
  },
  {
    q: "Does HIMAYA replace our MSP?",
    a: "No. HIMAYA works alongside an MSP. The MSP may execute technical changes; HIMAYA tracks control status, evidence, ownership, remediation and reporting.",
  },
  {
    q: "What is ATLAS?",
    a: "ATLAS is HIMAYA's regulatory assurance dashboard for control drift, evidence status, remediation owners, SLA deadlines and compliance posture. It is not a generic security dashboard - it is built around regulator-mapped controls.",
  },
  {
    q: "Is HIMAYA a law firm?",
    a: "No. HIMAYA provides cybersecurity, GRC and operational assurance support, not legal advice. Legal accountability remains with the firm and its legal counsel.",
  },
  {
    q: "Can HIMAYA help us prepare for audits?",
    a: "HIMAYA helps build ongoing evidence and remediation discipline so audit preparation becomes more structured and less reactive. The goal is to make audit readiness a continuous state, not a last-minute scramble.",
  },
  {
    q: "What data do you collect through the public website?",
    a: "Only lead and booking information: name, work email, company, role and compliance concern. Sensitive compliance evidence should never be submitted through public forms.",
  },
  {
    q: "Does HIMAYA guarantee regulatory compliance?",
    a: "No. HIMAYA provides cybersecurity, governance, risk, compliance, and operational assurance support. We help firms improve visibility, evidence, ownership, and remediation discipline, but we do not provide legal advice, regulatory representation, or guarantee regulatory outcomes.",
  },
  {
    q: "Do you need access to our systems?",
    a: "It depends on the package and agreed scope. Some services can begin with manual evidence and structured reviews. Platform integrations are introduced only where they add assurance value and are agreed with the client.",
  },
  {
    q: "Which firms do you help first?",
    a: "Initial focus is FCA-regulated SMEs with 10-100 employees, small compliance teams, MSP support and manual internal governance. We also support SRA-regulated law firms, accounting firms and UK GDPR-sensitive SMEs.",
  },
];

export function FAQSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-ivoryWhite py-[100px] max-md:py-[60px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          FREQUENTLY ASKED
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mx-auto mt-4 max-w-xl text-center font-heading text-4xl font-bold text-deepNavy md:text-5xl"
        >
          Questions we hear from
          <br />
          regulated SMEs.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mx-auto mt-10 max-w-[760px]"
        >
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="border-b border-deepNavy/8 py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="group flex w-full cursor-pointer items-start justify-between gap-4 text-left"
                >
                  <span className="text-base font-semibold text-deepNavy transition-colors group-hover:text-metallicGold">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0 text-[#D4A017] transition-colors"
                    style={{ transformOrigin: "center" }}
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[680px] pb-2 pt-3 text-[0.92rem] leading-[1.85] text-slateText">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
