import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service — HIMAYA",
  description: "HIMAYA terms of service including service scope, limitations and governing law.",
  path: "/terms",
});

const sections = [
  {
    title: "Service boundaries",
    body: "HIMAYA provides governance, assurance and compliance-support services as described in written proposals and agreed scope documents.",
  },
  {
    title: "What HIMAYA does not provide",
    body: "HIMAYA does not provide legal advice, guaranteed compliance outcomes, or 24/7 SOC monitoring services.",
  },
  {
    title: "Liability limitations",
    body: "Services are provided with reasonable skill and care. To the maximum extent permitted by law, liability is limited to direct loss and excludes indirect or consequential loss.",
  },
  {
    title: "Data handling",
    body: "Client and prospect data is handled in line with UK GDPR principles, contractual obligations and our published privacy commitments.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of England and Wales, and disputes are subject to the exclusive jurisdiction of English courts unless otherwise agreed in writing.",
  },
];

export default function TermsPage() {
  return (
    <section className="bg-ivoryWhite px-8 py-[140px] pb-20">
      <div className="mx-auto max-w-[760px]">
        <h1 className="font-heading text-4xl font-bold text-deepNavy">Terms of Service</h1>
        <p className="mt-4 text-sm text-mutedText">Last updated: May 2026</p>
        <div className="mt-8 space-y-7">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-subheading text-lg font-semibold text-deepNavy">{section.title}</h2>
              <p className="mt-2 text-[0.96rem] leading-[1.85] text-slateText">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
