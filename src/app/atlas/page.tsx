import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { AtlasDashboardPreview } from "@/components/sections/AtlasDashboardPreview";
import { GoldCheck } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "ATLAS | Regulatory Assurance Dashboard by HIMAYA",
  description:
    "Real-time control drift detection, evidence status, remediation owners, SLA deadlines and regulator-mapped posture for regulated firms.",
  path: "/atlas",
});

const capabilities = [
  {
    title: "Regulatory Posture Score",
    body: "Live score across FCA, ICO, ISO 27001 and Cyber Essentials obligations.",
  },
  {
    title: "Control Drift Detection",
    body: "Automatic alerts when controls become overdue, unsupported or unowned.",
  },
  {
    title: "Evidence Coverage Tracking",
    body: "Every control linked to required evidence. Missing items flagged immediately.",
  },
  {
    title: "Remediation Ownership",
    body: "Every issue has a named owner, SLA deadline and escalation route.",
  },
  {
    title: "Audit Mode Export",
    body: "One-click governance pack: timestamped, regulator-mapped and board-ready.",
  },
];

const modules = [
  ["Control Status", ["Passed/failed/at-risk indicators", "Last evidence timestamp", "Owner and team view"]],
  ["Drift Signals", ["Overdue control alerts", "Missed review windows", "Unsupported control warnings"]],
  ["Evidence Coverage", ["Missing evidence list", "Expiry warnings", "Linked document audit trail"]],
  ["Remediation Queue", ["Priority and SLA countdown", "Escalation path", "Closure evidence checks"]],
  ["Regulatory Mapping", ["FCA / ICO / ISO / CE mapping", "Gap heatmap", "Control-to-obligation traceability"]],
  ["Executive Reporting", ["Monthly Control Drift Report", "Quarterly board pack", "Trend and narrative summary"]],
] as const;

export default function AtlasPage() {
  return (
    <>
      <PageHero
        label="ATLAS PLATFORM"
        headline={"A live control environment.\nNot a dashboard."}
        subtext="ATLAS is a Continuous Regulatory Posture Assurance System built around controls, evidence, ownership, remediation and defensibility."
      />
      <section className="-mt-8 bg-deepNavy pb-10">
        <div className="mx-auto max-w-6xl px-6 text-xs italic text-[rgba(255,253,247,0.45)]">
          Dashboard visuals are representative. Final configuration depends on client scope and data sources.
        </div>
      </section>

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionLabel text="WHAT ATLAS IS" />
            <p className="mt-5 text-[0.98rem] leading-[1.9] text-slateText">
              ATLAS is not a generic security dashboard. It does not replace your SIEM, SOC or firewall. It exists to answer the question
              regulators actually ask: are your controls operating as documented, who owns them, when were they last evidenced, and what happens when
              they drift?
            </p>
            <div className="mt-7 space-y-3">
              {capabilities.map((cap) => (
                <div key={cap.title} className="rounded-r-lg border-l-4 border-metallicGold bg-white px-5 py-4">
                  <div className="flex items-center gap-2 text-deepNavy">
                    <GoldCheck size={16} />
                    <h3 className="font-semibold">{cap.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-slateText">{cap.body}</p>
                </div>
              ))}
            </div>
          </div>
          <AtlasDashboardPreview />
        </div>
      </section>

      <section className="bg-warmCream py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-heading text-4xl font-bold text-deepNavy">What ATLAS shows you</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(([title, bullets]) => (
              <article key={title} className="rounded-xl border border-metallicGold/20 bg-white p-6">
                <h3 className="font-semibold text-deepNavy">{title}</h3>
                <div className="mt-3 space-y-1 text-sm text-slateText">
                  {bullets.map((b) => (
                    <ListItem key={b} icon={<GoldCheck size={14} />}>
                      {b}
                    </ListItem>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deepNavy py-20 text-ivoryWhite">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-heading text-4xl font-bold">Regulator-mapped by design.</h2>
          <p className="mt-3 max-w-3xl text-[rgba(255,253,247,0.68)]">
            HIMAYA uses wording around alignment, mapping, readiness and evidence support. HIMAYA does not certify firms or guarantee regulatory
            approval.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["FCA", "Operational resilience, governance, systems and controls alignment.", "Board reporting, owner mapping, remediation tracking, incident readiness"],
              ["UK GDPR / ICO", "Security of processing, breach readiness and data protection governance support.", "DPIA prompts, ROPA support, evidence logs, access controls"],
              ["ISO 27001", "Annex A control alignment and evidence readiness.", "Access control, incident response, supplier security, backup, awareness"],
              ["Cyber Essentials", "Security hygiene and evidence support.", "MFA, patching, malware protection, secure configuration, firewalls"],
              ["SRA (Future)", "Future support for law firms handling sensitive client data.", "Coming Soon"],
            ].map(([title, body, outputs]) => (
              <article key={title} className={`rounded-xl border border-white/15 bg-white/5 p-6 ${title.includes("Future") ? "opacity-70" : ""}`}>
                <h3 className="font-semibold text-luminousGold">{title}</h3>
                <p className="mt-2 text-sm text-ivoryWhite/80">{body}</p>
                <p className="mt-3 text-xs text-ivoryWhite/60">Outputs: {outputs}</p>
              </article>
            ))}
          </div>
          <BookDemoTrigger className="mt-8 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-8 py-3 font-bold text-deepNavy">
            Book an Assurance Review
          </BookDemoTrigger>
        </div>
      </section>
    </>
  );
}
