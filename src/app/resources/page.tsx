import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Resources | HIMAYA",
  description: "Guides and resources for governance, control drift and evidence discipline.",
};

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
