import { GreenCheck, GoldShieldCheck, MutedDash } from "@/components/ui/Icons";
import ListItem from "@/components/ui/ListItem";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Trust & Security | HIMAYA",
  description:
    "How HIMAYA handles website data, protects form submissions and maintains security hygiene on our platform.",
  path: "/trust",
});

const dataHandling = [
  "What we collect: name, email, company, role and concern details submitted through forms.",
  "What we do not collect: sensitive compliance evidence through public forms.",
  "Retention: only as long as required for enquiry handling, service delivery and legal obligations.",
  "UK GDPR rights: access, rectification, erasure, restriction and portability where applicable.",
];

const websiteSecurity = [
  "HTTPS-only delivery for all website traffic.",
  "Input validation and rate limiting on all form endpoints.",
  "reCAPTCHA / hCaptcha to reduce automated abuse on booking flows.",
  "Admin access protected with strong authentication.",
  "No sensitive compliance evidence accepted through public forms.",
];

const dataStorage = [
  "Primary infrastructure: Firebase / Google Cloud.",
  "Preferred regional alignment: europe-west2 (London), depending on service configuration.",
  "Data is not sold and not shared with unrelated third parties.",
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        label="TRUST & SECURITY"
        headline="We hold ourselves to the same standard we help you reach."
        subtext="Our website controls, data handling and submission safeguards are designed to support disciplined governance."
      />

      <section className="bg-ivoryWhite py-24">
        <div className="mx-auto w-full max-w-5xl space-y-12 px-6">
          <div>
            <SectionLabel text="HOW WE HANDLE YOUR DATA" />
            <div className="mt-5 space-y-1">
              {dataHandling.map((line) => (
                <ListItem key={line} icon={<MutedDash />}>
                  {line}
                </ListItem>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel text="WEBSITE SECURITY" />
            <div className="mt-5 space-y-1">
              <ListItem icon={<GreenCheck size={16} />}>{websiteSecurity[0]}</ListItem>
              {websiteSecurity.slice(1).map((line) => (
                <ListItem key={line} icon={<GoldShieldCheck size={16} />}>
                  {line}
                </ListItem>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel text="DATA STORAGE" />
            <div className="mt-5 space-y-1">
              {dataStorage.map((line) => (
                <ListItem key={line} icon={<MutedDash />}>
                  {line}
                </ListItem>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-metallicGold/30 bg-white p-8 shadow-[0_18px_55px_rgba(7,24,39,0.1)]">
            <h2 className="font-heading text-3xl font-bold text-deepNavy">For any data, privacy or security questions:</h2>
            <p className="mt-4 text-slateText">
              Email:{" "}
              <a href="mailto:contact@himaya.uk" className="text-metallicGold hover:underline">
                contact@himaya.uk
              </a>
            </p>
            <p className="mt-1 text-slateText">Response target: within 48 hours.</p>
          </div>
        </div>
      </section>

      <section className="bg-deepNavy py-8">
        <p className="mx-auto max-w-5xl px-6 text-center text-xs italic text-mutedText">
          HIMAYA provides cybersecurity, governance, risk, compliance and operational assurance support. HIMAYA does not provide legal advice,
          regulatory representation or guarantee regulatory outcomes.
        </p>
      </section>
    </>
  );
}
