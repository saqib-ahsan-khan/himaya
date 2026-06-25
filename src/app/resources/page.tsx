import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HIMAYA Resources — Control Drift and FCA Compliance Guides",
  description:
    "Practical resources for FCA-regulated SMEs: control drift checklists, evidence readiness guides and regulatory assurance tools from HIMAYA.",
  path: "/resources",
  keywords: [
    "FCA compliance resources",
    "control drift checklist",
    "regulatory evidence management",
    "how to prepare for FCA audit evidence",
  ],
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        label="RESOURCES"
        headline="HIMAYA resources are being prepared."
        subtext="The full Resources hub will be published in the next content chunk. Use Enforcement Lessons and the checklist download in the meantime."
      />
      <section className="bg-ivoryWhite py-16">
        <div className="mx-auto max-w-4xl px-6 text-slateText">
          <p>Coming next: downloadable templates, practical guides and regulator-focused explainers for regulated SMEs.</p>
        </div>
      </section>
    </>
  );
}
