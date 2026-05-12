import type { ReactNode } from "react";
import { GoldDash } from "@/components/ui/Icons";

export interface ListItemProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  textClassName?: string;
}

export default function ListItem({ icon, children, className, textClassName }: ListItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.65rem",
        padding: "0.22rem 0",
      }}
      className={className}
    >
      <span style={{ marginTop: "2px", flexShrink: 0 }}>{icon ?? <GoldDash />}</span>
      <span
        className={`font-subheading text-[0.9rem] leading-[1.75] text-slateText ${textClassName ?? ""}`}
      >
        {children}
      </span>
    </div>
  );
}
