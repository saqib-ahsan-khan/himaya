import { FAQSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { AtlasPreviewSection } from "@/components/sections/AtlasPreviewSection";
import { ControlDriftSection } from "@/components/sections/ControlDriftSection";
import { EnforcementSection } from "@/components/sections/EnforcementSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhoWeHelpSection } from "@/components/sections/WhoWeHelpSection";

export const metadata = buildMetadata({
  title: "HIMAYA — Continuous Regulatory Assurance for FCA-Regulated SMEs",
  description:
    "HIMAYA helps FCA-regulated firms detect control drift, track remediation ownership, capture evidence and maintain board-level regulatory visibility — without reactive audit scramble.",
  path: "/",
  keywords: [
    "FCA compliance support for SMEs",
    "control drift detection",
    "regulatory assurance platform UK",
    "FCA governance support",
    "remediation tracking FCA",
    "ATLAS regulatory dashboard",
    "continuous compliance monitoring UK",
    "FCA regulated SME compliance",
  ],
});

export default function Home() {
  return (
    <>
      <FAQSchema />
      <ServiceSchema />
      <Hero />
      <ProblemSection />
      <ControlDriftSection />
      <AtlasPreviewSection />
      <ServicesSection />
      <LeadMagnetSection />
      <WhoWeHelpSection />
      <EnforcementSection />
      <PackagesSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
