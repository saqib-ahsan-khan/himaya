import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Enforcement Lessons | HIMAYA",
  description: "Regulatory enforcement patterns and practical governance lessons for regulated SMEs.",
};

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
