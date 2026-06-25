import { Info } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const heroStats = [
  { value: "10+", label: "FCA enforcement cases analysed" },
  { value: "£100m+", label: "Total fines reviewed" },
  { value: "Weekly", label: "New insights added" },
];

export function FcaInsightsHero() {
  return (
    <section className="bg-deepNavy pb-20 pt-[140px] text-ivoryWhite">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <SectionLabel text="FCA REGULATORY INSIGHTS" />
        <h1 className="mt-6 max-w-3xl font-heading text-[3rem] font-bold leading-tight">
          FCA Regulatory Insights for Regulated Firms.
          <br />
          Enforcement Lessons That Matter.
        </h1>
        <p className="mt-6 max-w-[640px] text-[1.03rem] leading-[1.85] text-[rgba(255,253,247,0.65)]">
          We turn FCA news, fines, warnings and regulatory updates into practical lessons for regulated SMEs. Understand what went wrong, what
          regulators expected, and what your firm should do differently.
        </p>

        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-metallicGold/15 bg-white/[0.04] px-5 py-3.5">
          <Info size={14} className="mt-0.5 shrink-0 text-metallicGold" aria-hidden />
          <p className="text-[0.78rem] leading-relaxed text-[rgba(255,253,247,0.55)]">
            Articles are based on publicly available FCA sources. This is not legal or regulatory advice. Always consult qualified legal counsel for
            formal compliance decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-8 border-t border-metallicGold/15 pt-8 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-metallicGold">{stat.value}</p>
              <p className="mt-1 text-sm text-[rgba(255,253,247,0.55)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
