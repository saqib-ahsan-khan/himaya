import { buildNoIndexMetadata } from "@/lib/metadata";

export const metadata = buildNoIndexMetadata({
  title: "Thank You | HIMAYA",
  description: "Your request has been received.",
  path: "/thank-you",
});

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
