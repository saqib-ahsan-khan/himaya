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

export default function Home() {
  return (
    <>
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
