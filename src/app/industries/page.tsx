import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { GoldDash } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Industries | HIMAYA Regulated Assurance",
  description:
    "HIMAYA serves FCA-regulated firms, law firms, accounting firms and UK GDPR-sensitive SMEs with continuous regulatory assurance.",
  path: "/industries",
});

const industries = [
  {
    title: "FCA-Regulated Financial Firms",
    badge: "PRIMARY FOCUS",
    body: "Operational resilience requirements, SMCR personal accountability and SYSC governance obligations mean control drift becomes personal exposure for senior managers.",
    controls: [
      "SMCR accountability mapping",
      "SYSC governance obligations",
      "Consumer Duty evidence",
      "Operational resilience testing",
      "Board-level reporting",
    ],
    who: ["Mortgage and credit brokers", "Wealth management firms", "Payment institutions", "Investment firms"],
  },
  {
    title: "SRA-Regulated Law Firms",
    badge: "SUPPORTED",
    body: "Law firms handling sensitive client data need stronger access governance, supplier controls and breach readiness aligned with SRA cyber expectations.",
    controls: ["Client confidentiality controls", "Supplier access governance", "Data breach readiness", "Access review discipline"],
  },
  {
    title: "Accounting Firms",
    badge: "SUPPORTED",
    body: "ICAEW and ACCA oversight, sensitive client financial records and operational complexity demand evidence-led access controls and governance documentation.",
    controls: ["Role-based access", "Data retention governance", "Evidence-linked policy reviews", "Management reporting"],
  },
  {
    title: "UK GDPR-Sensitive SMEs",
    badge: "SUPPORTED",
    body: "Firms at ICO enforcement risk need a documented data protection framework with ownership, audit trail and practical incident readiness.",
    controls: ["ROPA and DPIA prompts", "Processor oversight", "Data incident readiness", "Evidence-backed governance"],
  },
  {
    title: "ISO 27001 Aspirants",
    badge: "SUPPORTED",
    body: "Before certification, firms need Annex A control mapping, owner assignment and reliable evidence to avoid weak external audit outcomes.",
    controls: ["Annex A mapping", "Control owner matrix", "Evidence coverage tracker", "Pre-audit readiness checks"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="INDUSTRIES"
        headline={"Built for regulated firms where\nweak governance becomes exposure."}
        subtext="HIMAYA is designed for organisations where compliance discipline, ownership and evidence quality directly shape regulatory risk."
      />

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionLabel text="WHO WE SERVE" />
          <div className="mt-8 space-y-0">
            {industries.map((industry, idx) => (
              <article key={industry.title} className="grid gap-8 border-b border-deepNavy/10 py-12 md:grid-cols-2 md:items-start">
                <div className={idx % 2 ? "md:order-2" : ""}>
                  <span className="inline-block rounded-full bg-metallicGold/10 px-3 py-1 font-mono text-xs text-metallicGold">{industry.badge}</span>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-deepNavy">{industry.title}</h2>
                  <p className="mt-3 text-[0.96rem] leading-[1.85] text-slateText">{industry.body}</p>
                  {industry.who && (
                    <div className="mt-4">
                      <p className="font-mono text-xs text-metallicGold">WHO SPECIFICALLY</p>
                      <div className="mt-2 space-y-1 text-sm text-slateText">
                        {industry.who.map((w) => (
                          <ListItem key={w} icon={<GoldDash />}>
                            {w}
                          </ListItem>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={`${idx % 2 ? "md:order-1" : ""} rounded-xl border border-metallicGold/25 bg-white p-6 shadow-[0_12px_40px_rgba(7,24,39,0.08)]`}>
                  <p className="font-mono text-xs tracking-[0.15em] text-metallicGold">RELEVANT CONTROLS</p>
                  <ul className="mt-4 space-y-2 text-sm text-slateText">
                    {industry.controls.map((item) => (
                      <li key={item} className="rounded bg-warmCream px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <BookDemoTrigger className="mt-10 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-8 py-3 font-bold text-deepNavy">
            Book a Fit Call
          </BookDemoTrigger>
        </div>
      </section>
    </>
  );
}
