import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | HIMAYA",
  description: "HIMAYA privacy policy — how we collect, use and protect your data in accordance with UK GDPR.",
  path: "/privacy",
});

const sections = [
  {
    title: "Who we are",
    body: "HIMAYA provides cybersecurity, governance, risk, compliance and operational assurance support for regulated SMEs in the UK.",
  },
  {
    title: "What data we collect and why",
    body: "We collect contact and business context data submitted through website forms (name, email, company, role, and enquiry details) to respond to requests and provide relevant service follow-up.",
  },
  {
    title: "How we use your data",
    body: "We use submitted information to manage enquiries, schedule calls, deliver requested resources, improve service quality, and maintain auditability of customer communications.",
  },
  {
    title: "How long we keep it",
    body: "We retain data only as long as necessary for enquiry handling, ongoing service operations, compliance obligations, and lawful recordkeeping requirements.",
  },
  {
    title: "Your rights",
    body: "Under UK GDPR, you may request access, correction, deletion, restriction, portability, or object to certain processing where applicable.",
  },
  {
    title: "Cookies",
    body: "We use essential and analytics-related cookies and similar storage mechanisms to maintain core website functionality and understand usage patterns.",
  },
  {
    title: "Third-party services",
    body: "We rely on Firebase/Google Cloud, Resend and Vercel for infrastructure and delivery. These providers process data under their own security and compliance commitments.",
  },
  {
    title: "Contact us",
    body: "For privacy requests or concerns, contact contact@himaya.uk. We aim to respond within 48 hours for initial acknowledgement.",
  },
];

export default function PrivacyPage() {
  return (
    <section id="cookies" className="bg-ivoryWhite px-8 py-[140px] pb-20">
      <div className="mx-auto max-w-[760px]">
        <h1 className="font-heading text-4xl font-bold text-deepNavy">Privacy Policy</h1>
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
