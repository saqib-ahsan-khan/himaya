import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GreenCheck, RedX } from "@/components/ui/Icons";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "About HIMAYA | Our Mission and Approach",
  description:
    "Why HIMAYA exists and how we help regulated SMEs move from reactive compliance to continuous regulatory assurance.",
  path: "/about",
});

const gapStats = [
  {
    number: "166",
    text: "Material cyber incidents reported to FCA in 2024",
    sourceLabel: "Source: FCA FOI",
    sourceHref: "https://www.fca.org.uk/freedom-information",
  },
  { number: "£60-75k", text: "Annual cost of internal Compliance Officer in London", sourceLabel: "Source: Morgan McKinley 2026" },
  { number: "£4.4m", text: "Global average data breach cost (IBM)", sourceLabel: "Source: IBM" },
  { number: "£28.96m", text: "Starling Bank fine for control failures", sourceLabel: "Source: FCA" },
];

const onboardingSteps = [
  {
    title: "Fit Call",
    detail: "15-minute discovery call to understand firm type, regulatory pressure, current systems and pain points.",
    output: "Fit/no-fit decision",
  },
  {
    title: "Scope & Boundaries",
    detail: "Confirm frameworks, systems, teams, service boundaries and data handling rules.",
    output: "Scope document",
  },
  {
    title: "Baseline Assessment",
    detail: "Review current controls, policies, evidence, risk register and remediation history.",
    output: "Gap summary",
  },
  {
    title: "ATLAS Configuration",
    detail: "Configure control library, owners, evidence requirements, SLAs and dashboards.",
    output: "Live control map",
  },
  {
    title: "Evidence & Reporting Setup",
    detail: "Create evidence library and monthly reporting workflow.",
    output: "Evidence tracker",
  },
  {
    title: "Remediation Rhythm",
    detail: "Issues assigned, tracked, escalated and validated.",
    output: "SLA tracker",
  },
  {
    title: "Monthly Assurance",
    detail: "Monthly review of drift, evidence, remediation and risk posture.",
    output: "Monthly Control Drift Report",
  },
  {
    title: "Quarterly Oversight",
    detail: "Quarterly oversight call with trend review and strategic recommendations.",
    output: "Board-ready quarterly pack",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT HIMAYA"
        headline={"From scattered evidence and\nlast-minute audit panic to\ncontinuous regulatory assurance."}
        subtext="HIMAYA was built because regulated SMEs face the same compliance pressure as large firms but rarely have the internal infrastructure to manage it continuously."
      />

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionLabel text="WHY WE EXIST" />
            <h2 className="mt-5 max-w-xl font-heading text-4xl font-bold leading-tight text-deepNavy">
              Many regulated SMEs do not fail because they have no policies.
            </h2>
            <div className="mt-6 space-y-5 text-[0.98rem] leading-[1.9] text-slateText">
              <p>
                They fail because ownership is unclear, evidence is scattered, remediation is late and controls drift between reviews. Large firms
                have compliance teams to manage this. SMEs often do not.
              </p>
              <p>
                HIMAYA gives regulated SMEs continuous monitoring, structured remediation and documented defensibility without hiring a full internal
                compliance team.
              </p>
              <p>
                Regulators expect discipline even when the firm is small. Manual compliance creates blind spots between reviews. Evidence gathered at
                the last minute is weak evidence. Known issues without owner, deadline and closure evidence remain live regulatory risk.
              </p>
            </div>
            <div className="mt-8 rounded-r-xl border-l-4 border-metallicGold bg-metallicGold/5 px-6 py-5">
              <p className="font-heading text-[1.2rem] italic text-deepNavy">HIMAYA provides structure, not theatre.</p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-metallicGold/30 bg-white p-8 shadow-[0_20px_60px_rgba(7,24,39,0.1)]">
            <h3 className="text-base font-bold text-deepNavy">The Compliance Gap</h3>
            <div className="mb-6 mt-3 h-px w-16 bg-metallicGold" />
            <div className="space-y-6">
              {gapStats.map((stat) => (
                <div key={stat.number + stat.text}>
                  <p className="font-heading text-4xl font-bold text-deepNavy">{stat.number}</p>
                  <p className="mt-1 text-[0.84rem] text-slateText">{stat.text}</p>
                  {stat.sourceHref ? (
                    <a href={stat.sourceHref} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-metallicGold hover:underline">
                      {stat.sourceLabel}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs text-metallicGold">{stat.sourceLabel}</p>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-warmCream py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionLabel text="CLARITY" />
          <h2 className="mt-4 font-heading text-4xl font-bold text-deepNavy">We do not sell compliance theatre.</h2>
          <p className="mt-4 max-w-2xl text-slateText">Transparency about scope protects you and protects us.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-r-xl border-l-[3px] border-dangerRed bg-white p-8">
              <h3 className="font-subheading text-lg font-bold text-deepNavy">HIMAYA IS NOT</h3>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-slateText">
                {[
                  "A generic MSP or IT support company",
                  "A tick-box compliance tool",
                  "A law firm or legal adviser",
                  "A one-off audit preparation company",
                  "A 24/7 Security Operations Centre (SOC)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">
                      <RedX size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-r-xl border-l-[3px] border-successGreen bg-white p-8">
              <h3 className="font-subheading text-lg font-bold text-deepNavy">HIMAYA IS</h3>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-slateText">
                {[
                  "A continuous regulatory assurance partner",
                  "A control drift and evidence discipline layer",
                  "A governance and assurance function",
                  "A monthly and quarterly assurance rhythm",
                  "A structured way to monitor, evidence and report governance discipline",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">
                      <GreenCheck size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionLabel text="HOW IT WORKS" />
          <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold text-deepNavy">
            Onboarding is controlled, lightweight and evidence-led.
          </h2>
          <p className="mt-4 max-w-3xl text-slateText">
            HIMAYA starts by understanding the firm&apos;s existing controls, then turns scattered governance into named owners, deadlines, evidence and
            reporting.
          </p>

          <div className="relative mt-10">
            <div className="absolute left-5 top-0 h-full w-px bg-metallicGold/35 md:left-1/2" aria-hidden />
            <div className="space-y-5">
              {onboardingSteps.map((step, idx) => {
                const number = String(idx + 1).padStart(2, "0");
                return (
                  <div key={step.title} className={`relative md:grid md:grid-cols-2 ${idx % 2 ? "" : ""}`}>
                    <div className={`hidden md:block ${idx % 2 ? "md:order-2" : ""}`} />
                    <article className={`ml-12 rounded-r-xl border-l-4 border-metallicGold bg-white px-8 py-6 md:ml-0 ${idx % 2 ? "md:order-1 md:mr-10" : "md:order-2 md:ml-10"}`}>
                      <div className="absolute left-1.5 top-8 grid h-7 w-7 place-items-center rounded-full bg-metallicGold font-heading text-sm font-bold text-deepNavy md:left-1/2 md:-translate-x-1/2">
                        {number}
                      </div>
                      <h3 className="text-lg font-bold text-deepNavy">{step.title}</h3>
                      <p className="mt-2 text-[0.92rem] leading-[1.8] text-slateText">{step.detail}</p>
                      <span className="mt-4 inline-block rounded-full bg-metallicGold/10 px-3 py-1 font-mono text-[0.68rem] text-metallicGold">
                        {step.output}
                      </span>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deepNavy py-20 text-center text-ivoryWhite">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="font-heading text-4xl font-bold">Ready to find out if HIMAYA is the right fit?</h2>
          <BookDemoTrigger className="mt-8 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-8 py-3.5 font-bold text-deepNavy transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(212,160,23,0.4)]">
            Book a 15-Minute Discovery Call
          </BookDemoTrigger>
        </div>
      </section>
    </>
  );
}
