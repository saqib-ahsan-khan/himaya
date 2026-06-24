"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AtlasIcon,
  EvidenceIcon,
  FirewallIcon,
  GoldArrow,
  RemediationIcon,
  ReportingIcon,
  VCISOIcon,
} from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    name: "ATLAS Regulatory Assurance",
    tag: "Ongoing Visibility",
    description: "Tracks control status, drift, evidence, owners, SLA deadlines and regulatory exposure.",
    deliver: ["Real-time posture score", "Control drift detection", "Evidence coverage tracking", "Regulator-mapped alignment"],
    Icon: AtlasIcon,
    iconBg: "bg-metallicGold/10",
  },
  {
    name: "vCISO Lite / Monthly Oversight",
    tag: "Strategic Oversight",
    description: "Monthly review, risk posture summary, action prioritisation and executive guidance.",
    deliver: ["Monthly posture review", "Risk prioritisation", "Executive summary report", "Board-ready pack"],
    Icon: VCISOIcon,
    iconBg: "bg-deepNavy/6",
  },
  {
    name: "Human Risk & Awareness Programme",
    tag: "Behavioural Risk",
    description: "Awareness tracking, phishing simulations, repeat-risk identification and escalation.",
    deliver: ["Phishing simulations", "Repeat-risk behaviour tracking", "GDPR & FCA awareness mapping", "90-day KPI measurement"],
    Icon: FirewallIcon,
    iconBg: "bg-dangerRed/6",
  },
  {
    name: "Remediation & SLA Tracking",
    tag: "Accountability",
    description: "Every issue gets severity, owner, deadline, escalation route and closure evidence.",
    deliver: ["Named owner assignment", "SLA countdown tracking", "Automatic escalation", "Closure validation"],
    Icon: RemediationIcon,
    iconBg: "bg-warningAmber/8",
  },
  {
    name: "Evidence Library",
    tag: "Audit Readiness",
    description: "Stores screenshots, config exports, review logs, policies and closure evidence by control.",
    deliver: ["Timestamped evidence logs", "Control-linked storage", "Missing evidence alerts", "Audit export ready"],
    Icon: EvidenceIcon,
    iconBg: "bg-successGreen/7",
  },
  {
    name: "Board Reporting",
    tag: "Board Visibility",
    description: "Monthly and quarterly reports summarising posture, drift, remediation and evidence gaps.",
    deliver: ["Monthly Control Drift Report", "Quarterly assurance pack", "Non-technical format", "Board-ready language"],
    Icon: ReportingIcon,
    iconBg: "bg-metallicGold/10",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-warmCream py-[100px] max-md:py-[60px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[0.68rem] tracking-[0.2em] text-metallicGold"
        >
          WHAT HIMAYA DOES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-4 font-heading text-4xl font-bold text-deepNavy md:text-6xl mobile-section-headline"
        >
          Six services. One structured
          <br />
          assurance system.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-5 max-w-3xl text-slateText mobile-long-text"
        >
          Every HIMAYA service is designed to produce a clear assurance output: visibility, evidence, ownership, remediation tracking, or board-ready
          reporting.
        </motion.p>

        <div className="mt-10 grid gap-6 max-md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.24 + idx * 0.08 }}
              className="rounded-xl border border-deepNavy/7 bg-white p-8 shadow-[0_2px_16px_rgba(7,24,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-metallicGold hover:shadow-[0_12px_35px_rgba(7,24,39,0.1)]"
            >
              <div className={`mb-4 grid h-10 w-10 place-items-center rounded-lg ${service.iconBg}`}>
                <service.Icon size={20} />
              </div>
              <span className="mb-2 inline-flex rounded-full bg-metallicGold/12 px-2 py-1 text-[0.66rem] font-mono text-metallicGold">
                {service.tag}
              </span>
              <h3 className="mt-2 text-[1.05rem] font-bold text-deepNavy">{service.name}</h3>
              <p className="mt-3 text-[0.88rem] leading-[1.8] text-slateText mobile-service-desc">{service.description}</p>
              <div className="my-4 h-px bg-metallicGold/15" />
              <div className="space-y-1.5 font-mono text-[0.78rem] text-slateText">
                {service.deliver.map((item) => (
                  <ListItem key={item} icon={<GoldArrow size={12} />} textClassName="!font-mono !text-[0.78rem]">
                    {item}
                  </ListItem>
                ))}
              </div>
              <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-sm text-metallicGold hover:underline">
                Learn more
                <GoldArrow size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
