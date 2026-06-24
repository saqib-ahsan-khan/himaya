"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Activity, FileCheck, Shield, type LucideIcon } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { DotAmber, DotRed, GreenCheck, MidDot, WarnIcon } from "@/components/ui/Icons";

const headlineLines = [
  { text: "Continuous Regulatory Assurance", accent: false },
  { text: "for Regulated SMEs", accent: false },
];

const heroSubtext =
  "HIMAYA helps regulated firms monitor control drift, evidence gaps, remediation ownership, and regulatory posture before audits, incidents, or board-level scrutiny expose the weakness.";

const heroParticles = [
  { top: "12%", right: "8%", size: 3 },
  { top: "22%", right: "18%", size: 2 },
  { top: "18%", right: "32%", size: 4 },
  { top: "35%", right: "6%", size: 2 },
  { top: "42%", right: "24%", size: 3 },
  { top: "55%", right: "14%", size: 4 },
  { top: "48%", right: "38%", size: 2 },
  { top: "68%", right: "10%", size: 3 },
  { top: "72%", right: "28%", size: 2 },
  { top: "28%", right: "45%", size: 3 },
  { top: "62%", right: "42%", size: 2 },
  { top: "80%", right: "20%", size: 4 },
] as const;

type HoveredCard = null | 0 | 1 | 2;

const REST_ROTATE = [-2, 1.5, -1] as const;
const REST_Z = [3, 2, 1] as const;

const springEntrance: Transition = {
  type: "spring",
  stiffness: 45,
  damping: 14,
};

const hoverEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StackedHeroCard({
  index,
  hoveredCard,
  entranceComplete,
  onHoverCard,
  icon: Icon,
  collapsedTitle,
  expandedTitle,
  statusText,
  statusTone,
  metric,
  unit,
  progressPct,
  progressFillGradient,
  progressShadow,
  positionClass,
  expandedContent,
}: {
  index: 0 | 1 | 2;
  hoveredCard: HoveredCard;
  entranceComplete: boolean;
  onHoverCard: (i: 0 | 1 | 2) => void;
  icon: LucideIcon;
  collapsedTitle: string;
  expandedTitle: string;
  statusText: string;
  statusTone: "green" | "amber";
  metric: string;
  unit: string;
  progressPct: number;
  progressFillGradient: string;
  progressShadow: string;
  positionClass: string;
  expandedContent: ReactNode;
}) {
  const isHovered = hoveredCard === index;
  const isDimmed = hoveredCard !== null && hoveredCard !== index;
  const restR = REST_ROTATE[index];
  const restZ = REST_Z[index];

  const statusClass =
    statusTone === "green"
      ? "border border-[rgba(74,222,128,0.2)] bg-[rgba(22,163,74,0.15)] font-mono text-[0.55rem] font-medium uppercase tracking-[0.08em] text-[#4ADE80]"
      : "border border-[rgba(252,211,77,0.22)] bg-[rgba(217,119,6,0.15)] font-mono text-[0.55rem] font-medium uppercase tracking-[0.08em] text-[#FCD34D]";

  const delay = 1.4 + index * 0.2;
  const entranceDelay = entranceComplete ? 0 : delay;

  return (
    <motion.div
      className={`absolute ${positionClass} cursor-pointer overflow-hidden rounded-[14px] border border-solid will-change-[transform,z-index]`}
      style={{ transformOrigin: "50% 50%" }}
      initial={{ x: -800, opacity: 0, rotate: restR }}
      animate={{
        x: 0,
        opacity: isDimmed ? 0.65 : 1,
        rotate: isHovered ? 0 : restR,
        scale: isHovered ? 1.04 : isDimmed ? 0.97 : 1,
        y: isHovered ? -12 : 0,
        width: isHovered ? 270 : 240,
        zIndex: isHovered ? 10 : restZ,
        borderColor: isHovered ? "rgba(212,160,23,0.55)" : "rgba(212,160,23,0.22)",
        boxShadow: isHovered
          ? "0 24px 60px rgba(7,24,39,0.55), 0 0 0 1px rgba(212,160,23,0.15), 0 0 30px rgba(212,160,23,0.08)"
          : "0 12px 40px rgba(7,24,39,0.4)",
      }}
      transition={{
        x: { ...springEntrance, delay: entranceDelay },
        opacity: { duration: 0.35, ease: "easeOut", delay: entranceDelay },
        rotate: { duration: 0.35, ease: hoverEase },
        scale: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.35, ease: hoverEase },
        width: { duration: 0.35, ease: hoverEase },
        zIndex: { duration: 0 },
        borderColor: { duration: 0.35, ease: hoverEase },
        boxShadow: { duration: 0.35, ease: hoverEase },
      }}
      onMouseEnter={() => onHoverCard(index)}
    >
      <div className="h-full bg-[#071827]">
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.5)] to-transparent"
          aria-hidden
        />

        <div
          className={`flex flex-col overflow-hidden px-[1.3rem] pb-[1.1rem] pt-[1.1rem] transition-[max-height] duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "max-h-[480px]" : "h-[130px] max-h-[130px]"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Icon
                className={`shrink-0 text-[#D4A017] transition-[width,height] duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]"
                }`}
                strokeWidth={2}
                aria-hidden
              />
              <p
                className={`truncate font-subheading text-[0.78rem] font-bold leading-tight ${
                  isHovered ? "text-[rgba(255,253,247,0.92)]" : "text-[rgba(255,253,247,0.9)]"
                }`}
              >
                {isHovered ? expandedTitle : collapsedTitle}
              </p>
            </div>
            <span className={`shrink-0 rounded-[50px] px-[0.5rem] py-[0.15rem] ${statusClass}`}>{statusText}</span>
          </div>

          <div className={`flex shrink-0 items-end ${isHovered ? "mt-[0.6rem] mb-[0.4rem]" : "mt-2"}`}>
            <span className="font-heading text-[1.6rem] font-bold leading-none text-white" style={{ fontWeight: 700 }}>
              {metric}
            </span>
            <span className="pb-0.5 pl-1 font-mono text-[0.6rem] text-[rgba(255,253,247,0.38)]">{unit}</span>
          </div>

          {!isHovered ? <div className="min-h-0 flex-1 shrink" aria-hidden /> : null}

          <div className={`shrink-0 ${isHovered ? "mb-[0.7rem]" : ""}`}>
            <div className="h-[3px] w-full overflow-hidden rounded-[2px] bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-[2px]"
                style={{
                  width: `${progressPct}%`,
                  background: progressFillGradient,
                  boxShadow: progressShadow,
                }}
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isHovered ? (
              <motion.div
                key="expanded-body"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: 0.1, ease: hoverEase }}
                className="min-h-0 shrink-0"
              >
                {expandedContent}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function HeroFloatingCards() {
  const [hoveredCard, setHoveredCard] = useState<HoveredCard>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setEntranceComplete(true), 2600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="absolute bottom-10 right-10 z-20 hidden min-[1100px]:block w-[340px] pb-5">
      <div className="relative block h-[320px] w-[340px]" onMouseLeave={() => setHoveredCard(null)}>
        <StackedHeroCard
          index={0}
          hoveredCard={hoveredCard}
          entranceComplete={entranceComplete}
          onHoverCard={setHoveredCard}
          icon={Shield}
          collapsedTitle="Regulatory Posture"
          expandedTitle="Regulatory Posture"
          statusText="LIVE"
          statusTone="green"
          metric="62"
          unit="/100"
          progressPct={62}
          progressFillGradient="linear-gradient(90deg, #D97706, #F59E0B)"
          progressShadow="0 0 8px rgba(212,160,23,0.4)"
          positionClass="top-0 right-0"
          expandedContent={
            <>
              <p className="mb-[0.7rem] font-subheading text-[0.72rem] leading-[1.55] text-[rgba(255,253,247,0.45)]">
                <span className="inline-flex flex-wrap items-center gap-x-1 align-middle">
                  FCA
                  <MidDot className="bg-metallicGold/55" />
                  ICO
                  <MidDot className="bg-metallicGold/55" />
                  ISO
                </span>{" "}
                exposure monitored continuously. Drift detected automatically.
              </p>
              <div className="flex flex-wrap gap-[0.45rem]">
                <span className="rounded border border-[rgba(252,211,77,0.2)] bg-[rgba(217,119,6,0.15)] px-[0.45rem] py-[0.15rem] font-mono text-[0.52rem] text-[#FCD34D]">
                  FCA: Watch
                </span>
                <span className="rounded border border-[rgba(252,165,165,0.2)] bg-[rgba(220,38,38,0.15)] px-[0.45rem] py-[0.15rem] font-mono text-[0.52rem] text-[#FCA5A5]">
                  ICO: High
                </span>
                <span className="rounded border border-[rgba(134,239,172,0.2)] bg-[rgba(22,163,74,0.12)] px-[0.45rem] py-[0.15rem] font-mono text-[0.52rem] text-[#86EFAC]">
                  ISO: 72%
                </span>
              </div>
            </>
          }
        />

        <StackedHeroCard
          index={1}
          hoveredCard={hoveredCard}
          entranceComplete={entranceComplete}
          onHoverCard={setHoveredCard}
          icon={Activity}
          collapsedTitle="Control Drift"
          expandedTitle="Control Drift Alerts"
          statusText="ACTIVE"
          statusTone="amber"
          metric="3"
          unit="alerts"
          progressPct={30}
          progressFillGradient="linear-gradient(90deg, #DC2626, #EF4444)"
          progressShadow="0 0 8px rgba(220,38,38,0.45)"
          positionClass="left-0 top-[40px]"
          expandedContent={
            <>
              <p className="mb-[0.7rem] font-subheading text-[0.72rem] leading-[1.55] text-[rgba(255,253,247,0.45)]">
                Controls require owner assignment and immediate remediation action.
              </p>
              <div className="flex flex-col">
                <div className="mb-[0.28rem] flex items-center gap-2">
                  <DotRed />
                  <span className="font-mono text-[0.6rem] text-[rgba(255,253,247,0.5)]">Access review overdue</span>
                </div>
                <div className="mb-[0.28rem] flex items-center gap-2">
                  <DotAmber />
                  <span className="font-mono text-[0.6rem] text-[rgba(255,253,247,0.5)]">MFA exceptions rising</span>
                </div>
                <div className="flex items-center gap-2">
                  <DotAmber />
                  <span className="font-mono text-[0.6rem] text-[rgba(255,253,247,0.5)]">Restore test overdue</span>
                </div>
              </div>
            </>
          }
        />

        <StackedHeroCard
          index={2}
          hoveredCard={hoveredCard}
          entranceComplete={entranceComplete}
          onHoverCard={setHoveredCard}
          icon={FileCheck}
          collapsedTitle="Evidence Coverage"
          expandedTitle="Evidence Coverage"
          statusText="LIVE"
          statusTone="green"
          metric="82%"
          unit="complete"
          progressPct={82}
          progressFillGradient="linear-gradient(90deg, #D4A017, #F8C955)"
          progressShadow="0 0 8px rgba(212,160,23,0.4)"
          positionClass="bottom-0 right-[20px]"
          expandedContent={
            <>
              <p className="mb-0 font-subheading text-[0.72rem] leading-[1.55] text-[rgba(255,253,247,0.45)]">
                6 controls pending evidence upload. Last update 3 days ago.
              </p>
              <div className="mt-[0.5rem] flex justify-between font-mono text-[0.6rem]">
                <span className="inline-flex items-center gap-1 text-[rgba(74,222,128,0.75)]">
                  <GreenCheck size={14} /> 82% evidenced
                </span>
                <span className="inline-flex items-center gap-1 text-[rgba(252,211,77,0.75)]">
                  <WarnIcon size={14} /> 6 missing
                </span>
              </div>
            </>
          }
        />
      </div>

      <p className="pointer-events-none absolute -bottom-[1.2rem] right-0 font-mono text-[0.5rem] text-[rgba(7,24,39,0.3)]">
        * Dashboard visuals are representative
      </p>
    </div>
  );
}

export function Hero() {
  const { openModal } = useBooking();

  return (
    <section className="relative -mt-24 flex min-h-svh flex-col overflow-x-hidden bg-[#FFFDF7]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(212,160,23,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {heroParticles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              right: p.right,
              width: p.size,
              height: p.size,
              background: "rgba(212,160,23,0.18)",
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[400px] w-[400px]"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <HeroFloatingCards />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-24 pt-[100px] max-md:pb-32">
        <div className="flex w-full max-w-[820px] flex-col items-start text-left">
          <h1 className="mobile-section-headline max-w-[820px] text-left font-heading text-[clamp(2rem,5.5vw,4.75rem)] font-bold leading-[1.28] text-deepNavy">
            {headlineLines.map((line, index) => (
              <div key={line.text} className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${line.accent ? "text-metallicGold" : "text-deepNavy"}`}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mobile-long-text mt-[1.25rem] max-w-[680px] text-[1rem] leading-[1.85] text-slateText sm:mt-[1.4rem]"
          >
            {heroSubtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-[1.25rem] flex flex-wrap justify-start gap-4 sm:mt-[1.4rem]"
          >
            <motion.button
              type="button"
              onClick={() => openModal()}
              whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(212,160,23,0.38)" }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer rounded-[6px] border-none px-[2.2rem] py-[0.9rem] font-subheading text-[0.95rem] font-bold tracking-[0.02em] text-deepNavy transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #D4A017 0%, #F8C955 100%)",
              }}
            >
              Book a 15-Minute Demo
            </motion.button>

            <Link
              href="/atlas"
              className="inline-flex items-center justify-center rounded-[6px] border-[1.5px] border-[rgba(7,24,39,0.18)] bg-transparent px-[2.2rem] py-[0.9rem] font-subheading text-[0.95rem] font-bold tracking-[0.02em] text-deepNavy transition-all duration-300 hover:border-metallicGold hover:bg-[rgba(212,160,23,0.04)] hover:text-metallicGold"
            >
              See ATLAS Platform
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
