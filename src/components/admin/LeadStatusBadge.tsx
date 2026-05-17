import type { BookingLead } from "@/lib/types";

const styles: Record<BookingLead["leadStatus"], string> = {
  New: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  Contacted: "bg-warningAmber/10 text-warningAmber border-warningAmber/20",
  "Demo Booked": "bg-successGreen/10 text-successGreen border-successGreen/20",
  Closed: "bg-deepNavy/10 text-deepNavy border-deepNavy/20",
  "Not Fit": "bg-dangerRed/10 text-dangerRed border-dangerRed/20",
};

export function LeadStatusBadge({ status }: { status: BookingLead["leadStatus"] }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
