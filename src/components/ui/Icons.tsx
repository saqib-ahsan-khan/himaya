import {
  Archive,
  ArrowRight,
  BarChart2,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Info,
  Shield,
  ShieldCheck,
  Users,
  X,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export function DotRed() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#EF4444",
        boxShadow: "0 0 6px rgba(239,68,68,0.5)",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function DotAmber() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#F59E0B",
        boxShadow: "0 0 6px rgba(245,158,11,0.4)",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function DotGreen() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#22C55E",
        boxShadow: "0 0 6px rgba(34,197,94,0.5)",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function DotGold() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#D4A017",
        boxShadow: "0 0 6px rgba(212,160,23,0.5)",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function DotNavy() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#071827",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function DotBlue() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#3B82F6",
        boxShadow: "0 0 6px rgba(59,130,246,0.45)",
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}

export function GoldCheck({ size = 16 }: { size?: number }) {
  return (
    <CheckCircle2
      size={size}
      color="#D4A017"
      strokeWidth={2}
      style={{ flexShrink: 0, marginTop: "1px" }}
      aria-hidden
    />
  );
}

export function GreenCheck({ size = 16 }: { size?: number }) {
  return (
    <CheckCircle2
      size={size}
      color="#22C55E"
      strokeWidth={2}
      style={{ flexShrink: 0, marginTop: "1px" }}
      aria-hidden
    />
  );
}

export function NavyCheck({ size = 16 }: { size?: number }) {
  return (
    <Check
      size={size}
      color="#071827"
      strokeWidth={2.5}
      style={{ flexShrink: 0, marginTop: "1px" }}
      aria-hidden
    />
  );
}

export function RedX({ size = 16 }: { size?: number }) {
  return (
    <XCircle
      size={size}
      color="#EF4444"
      strokeWidth={2}
      style={{ flexShrink: 0, marginTop: "1px" }}
      aria-hidden
    />
  );
}

export function MutedX({ size = 16 }: { size?: number }) {
  return (
    <X
      size={size}
      color="rgba(7,24,39,0.35)"
      strokeWidth={2}
      style={{ flexShrink: 0, marginTop: "1px" }}
      aria-hidden
    />
  );
}

export function GoldDash() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "18px",
        height: "2px",
        background: "#D4A017",
        borderRadius: "1px",
        flexShrink: 0,
        marginTop: "9px",
        marginRight: "2px",
      }}
      aria-hidden
    />
  );
}

export function MutedDash() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "14px",
        height: "1.5px",
        background: "rgba(7,24,39,0.25)",
        borderRadius: "1px",
        flexShrink: 0,
        marginTop: "9px",
      }}
      aria-hidden
    />
  );
}

export function GoldArrow({ size = 14 }: { size?: number }) {
  return <ArrowRight size={size} color="#D4A017" strokeWidth={2} style={{ flexShrink: 0 }} aria-hidden />;
}

export function AtlasIcon({ size = 20 }: { size?: number }) {
  return <Shield size={size} color="#D4A017" strokeWidth={1.8} aria-hidden />;
}

export function VCISOIcon({ size = 20 }: { size?: number }) {
  return <BarChart2 size={size} color="#071827" strokeWidth={1.8} aria-hidden />;
}

export function FirewallIcon({ size = 20 }: { size?: number }) {
  return <Users size={size} color="#DC2626" strokeWidth={1.8} aria-hidden />;
}

export function RemediationIcon({ size = 20 }: { size?: number }) {
  return <CheckCircle2 size={size} color="#D97706" strokeWidth={1.8} aria-hidden />;
}

export function EvidenceIcon({ size = 20 }: { size?: number }) {
  return <Archive size={size} color="#16A34A" strokeWidth={1.8} aria-hidden />;
}

export function ReportingIcon({ size = 20 }: { size?: number }) {
  return <FileText size={size} color="#D4A017" strokeWidth={1.8} aria-hidden />;
}

export function WarnIcon({ size = 16 }: { size?: number }) {
  return (
    <AlertTriangle size={size} color="#F59E0B" strokeWidth={2} style={{ flexShrink: 0 }} aria-hidden />
  );
}

export function InfoIcon({ size = 16 }: { size?: number }) {
  return <Info size={size} color="#3B82F6" strokeWidth={2} style={{ flexShrink: 0 }} aria-hidden />;
}

export function LinkIcon({ size = 12 }: { size?: number }) {
  return (
    <ExternalLink
      size={size}
      color="#D4A017"
      strokeWidth={2}
      style={{
        flexShrink: 0,
        display: "inline",
        marginLeft: "3px",
        verticalAlign: "middle",
      }}
      aria-hidden
    />
  );
}

export function DownloadIcon({ size = 16 }: { size?: number }) {
  return <Download size={size} color="#D4A017" strokeWidth={2} aria-hidden />;
}

export function GoldShieldCheck({ size = 16 }: { size?: number }) {
  return (
    <ShieldCheck size={size} color="#D4A017" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} aria-hidden />
  );
}

/** Inline separator for acronym-style lists (replaces middle dot). */
export function MidDot({ className = "bg-deepNavy/45" }: { className?: string }) {
  return (
    <span
      className={`mx-1 inline-block h-1 w-1 shrink-0 rounded-full align-middle ${className}`}
      style={{ verticalAlign: "middle" }}
      aria-hidden
    />
  );
}
