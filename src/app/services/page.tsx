import type { Metadata } from "next";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { GoldArrow, MutedX } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "HIMAYA Services | GRC, vCISO Lite and Evidence-Based Compliance",
  description: "Structured assurance services for regulated SMEs that need oversight without a full internal compliance team.",
};

const services = [
  {
    no: "01",
    badge: "Ongoing Visibility",
    title: "ATLAS Regulatory Assurance",
    desc: "Tracks control status, drift, evidence, owners, SLA deadlines and regulatory exposure across FCA, ICO, ISO 27001 and Cyber Essentials.",
    points: [
      "Real-time posture score and drift alerts",
      "Control-by-control evidence tracking",
      "Regulator-mapped control library",
      "Monthly control certification",
      "Audit Mode export in one click",
    ],
    value: "Creates ongoing visibility instead of last-minute audit preparation.",
    not: "ATLAS is not a SOC, SIEM or penetration testing tool.",
    visual: ["Posture score: 82", "Drift alerts: 4", "Evidence coverage: 91%", "Audit mode: Ready"],
  },
  {
    no: "02",
    badge: "Strategic Oversight",
    title: "vCISO Lite / Monthly Oversight",
    desc: "Monthly review, risk posture summary, action prioritisation and executive guidance for firms without a senior internal security leader.",
    points: [
      "Monthly posture review call",
      "Risk prioritisation and action plan",
      "Executive summary report",
      "Board-ready quarterly pack",
      "Strategic recommendations",
    ],
    value: "Gives SMEs structured oversight without hiring a full-time senior security leader.",
    not: "HIMAYA does not provide legal advice or regulatory representation.",
    visual: ["Top 5 risks", "Action owners", "30/60/90-day plan", "Quarterly board summary"],
  },
  {
    no: "03",
    badge: "Behavioural Risk",
    title: "Human Firewall Programme",
    desc: "Builds practical staff discipline around phishing, policy adherence and escalation behaviour in high-risk workflows.",
    points: [
      "Phishing simulations",
      "Repeat offender identification",
      "Mandatory training enforcement",
      "Management escalation",
      "GDPR and FCA awareness mapping",
      "90-day KPI measurement",
    ],
    value: "Supports security culture, GDPR security expectations and defensibility after incidents.",
    not: "Training does not replace technical controls or legal advice.",
    visual: ["Click-rate trends", "Repeat-risk users", "Completion KPI", "Escalation log"],
  },
  {
    no: "04",
    badge: "Accountability",
    title: "Remediation & SLA Tracking",
    desc: "Turns unmanaged issues into owner-assigned, deadline-bound and evidenced remediation workflows.",
    points: [
      "Named owner assignment per issue",
      "SLA countdown with auto-escalation",
      "Regulatory impact classification",
      "Closure evidence requirement",
      "Management notification on breach",
    ],
    value: "Turns known weaknesses into managed, evidenced action plans.",
    not: "HIMAYA does not implement infrastructure fixes for your IT team.",
    visual: ["Critical issues: 2", "Due this week: 6", "Escalated: 1", "Closure evidence: Required"],
  },
  {
    no: "05",
    badge: "Audit Readiness",
    title: "Evidence Library",
    desc: "Creates a control-linked evidence layer so audits are prepared continuously, not reconstructed at the last minute.",
    points: [
      "Control-linked evidence storage",
      "Screenshot and config export logging",
      "Missing evidence alerts",
      "Expiry and renewal tracking",
      "Timestamped audit trail",
    ],
    value: "Makes audit preparation easier and improves proof of governance discipline.",
    not: "Not a generic document drive disconnected from controls.",
    visual: ["Missing evidence: 7", "Expiring evidence: 12", "Control links: 100%", "Audit trail: timestamped"],
  },
  {
    no: "06",
    badge: "Board Visibility",
    title: "Board Reporting",
    desc: "Provides leadership-level outputs that summarise control posture, drift trends and remediation accountability in plain language.",
    points: [
      "Monthly drift certificate",
      "Quarterly assurance pack",
      "Non-technical board language",
      "Posture trend over time",
      "Remediation progress summary",
    ],
    value: "Gives leadership visibility and helps evidence accountability at board level.",
    not: "Not legal representation and not a guarantee of regulatory outcomes.",
    visual: ["Posture trend line", "Top board risks", "Owner accountability", "Quarterly recommendations"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="OUR SERVICES"
        headline={"Six services. One continuous\nassurance system."}
        subtext="Every service has a clear compliance value, defined output and named accountability. No vague cyber language."
      />

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionLabel text="SERVICE DETAIL" />
          <div className="mt-8 space-y-2">
            {services.map((service, idx) => (
              <div key={service.title} className="grid gap-8 border-b border-deepNavy/10 py-14 md:grid-cols-2 md:items-start">
                <div className={idx % 2 ? "md:order-2" : ""}>
                  <p className="font-heading text-7xl leading-none text-deepNavy/10">{service.no}</p>
                  <span className="mt-4 inline-block rounded-full bg-metallicGold/10 px-3 py-1 text-xs font-mono text-metallicGold">
                    {service.badge}
                  </span>
                  <h2 className="mt-4 font-heading text-[1.85rem] font-bold text-deepNavy">{service.title}</h2>
                  <p className="mt-3 text-[0.98rem] leading-[1.9] text-slateText">{service.desc}</p>
                  <div className="mt-4 space-y-2 text-[0.92rem] text-slateText">
                    {service.points.map((point) => (
                      <ListItem key={point} icon={<GoldArrow size={12} />}>
                        {point}
                      </ListItem>
                    ))}
                  </div>
                  <div className="mt-5 rounded-r-lg border-l-4 border-metallicGold bg-warmCream px-4 py-3 text-[0.9rem] italic text-deepNavy">
                    {service.value}
                  </div>
                  <p className="mt-3 text-xs italic text-mutedText">{service.not}</p>
                </div>
                <div className={`${idx % 2 ? "md:order-1" : ""} rounded-xl border border-metallicGold/25 bg-white p-6 shadow-[0_16px_50px_rgba(7,24,39,0.08)]`}>
                  <p className="font-mono text-xs tracking-[0.15em] text-metallicGold">DELIVERABLE PREVIEW</p>
                  <p className="mt-2 text-sm font-semibold text-deepNavy">{service.title}</p>
                  <div className="mt-4 space-y-2 text-sm text-slateText">
                    {service.visual.map((line) => (
                      <p key={line} className="rounded bg-warmCream px-3 py-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warmCream py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h3 className="text-xl font-bold text-deepNavy">Scope boundaries</h3>
          <p className="mt-2 text-slateText">Clear scope protects both parties.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              "24/7 Security Operations Centre (SOC)",
              "Legal advice or regulatory representation",
              "Guarantee of breach prevention",
              "Hands-on IT execution",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-lg bg-white px-4 py-3 text-sm text-slateText">
                <span className="mt-0.5 shrink-0">
                  <MutedX size={16} />
                </span>
                {item}
              </div>
            ))}
          </div>
          <BookDemoTrigger className="mt-8 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-7 py-3 font-bold text-deepNavy">
            Book a 15-Minute Review
          </BookDemoTrigger>
        </div>
      </section>
    </>
  );
}
