interface SectionLabelProps {
  text: string;
  centered?: boolean;
}

export function SectionLabel({ text, centered = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <span className="h-px w-10 bg-metallicGold" aria-hidden />
      <p className="font-mono text-[0.7rem] tracking-[0.2em] text-metallicGold">{text}</p>
    </div>
  );
}
