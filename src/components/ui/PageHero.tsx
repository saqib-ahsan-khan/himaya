import { SectionLabel } from "@/components/ui/SectionLabel";

interface PageHeroProps {
  label: string;
  headline: string;
  subtext: string;
  background?: "navy" | "ivory";
}

export function PageHero({ label, headline, subtext, background = "navy" }: PageHeroProps) {
  const isNavy = background === "navy";
  return (
    <section className={`${isNavy ? "bg-deepNavy text-ivoryWhite" : "bg-ivoryWhite text-deepNavy"} py-[140px] pb-20`}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionLabel text={label} />
        <h1 className="mt-6 max-w-4xl whitespace-pre-line font-heading text-[clamp(2rem,6vw,3.2rem)] font-bold leading-tight">
          {headline}
        </h1>
        <p className={`mt-6 max-w-[580px] text-[1.03rem] leading-[1.85] ${isNavy ? "text-[rgba(255,253,247,0.65)]" : "text-slateText"}`}>
          {subtext}
        </p>
      </div>
    </section>
  );
}
