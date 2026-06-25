import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FCA Enforcement Lessons — Real Cases, Real Consequences",
  description:
    "Real FCA enforcement cases showing the pattern of control failures, monitoring gaps, evidence weaknesses and remediation delays that lead to regulatory action.",
  path: "/enforcement-lessons",
  keywords: [
    "FCA enforcement cases UK",
    "FCA fines analysis",
    "FCA control failure lessons",
    "regulatory enforcement UK SME",
    "AML control failures FCA",
    "financial crime FCA penalties",
    "FCA enforcement lessons for SMEs",
  ],
});

export default function EnforcementLessonsPage() {
  return (
    <>
      <PageHero
        label="ENFORCEMENT LESSONS"
        headline="Real enforcement patterns. Practical governance lessons."
        subtext="This full page is scheduled in Chunk 7. The homepage currently includes a live summary section with public FCA examples."
      />
      <section className="bg-ivoryWhite py-16">
        <div className="mx-auto max-w-4xl px-6 text-slateText">
          <p>
            We will publish expanded case breakdowns with repeat failure patterns, governance lessons and implementation guidance for small regulated
            firms.
          </p>
        </div>
      </section>
    </>
  );
}
