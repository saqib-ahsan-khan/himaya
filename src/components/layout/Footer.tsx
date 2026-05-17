import Link from "next/link";
import { FooterBookLink } from "@/components/layout/FooterBookLink";

const footerSections = [
  {
    title: "PLATFORM",
    links: ["ATLAS", "Control Status", "Audit Mode", "Evidence Coverage", "Remediation Tracker"],
  },
  {
    title: "SERVICES",
    links: ["Human Firewall", "Manual GRC", "Access Governance", "Remediation Oversight", "Monthly Reporting"],
  },
  {
    title: "SECTORS",
    links: ["FCA-Regulated Firms", "Law Firms (SRA)", "Accounting Firms", "UK GDPR SMEs", "ISO 27001"],
  },
  {
    title: "RESOURCES",
    links: ["FCA Regulatory Insights", "Enforcement Lessons", "Control Drift Checklist", "Resources Hub"],
  },
  {
    title: "COMPANY",
    links: ["About HIMAYA", "How It Works", "Book a Demo", "Contact"],
  },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Trust & Security", "Cookies"];

const footerLinkClass =
  "font-subheading text-sm text-[rgba(255,253,247,0.55)] transition-all duration-200 hover:pl-1 hover:text-luminousGold";

export function Footer() {
  return (
    <footer className="border-t border-metallicGold/20 bg-deepNavy pb-8 pt-[60px]">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <picture>
                <source srcSet="/assets/images/logos/himaya-logo.png" type="image/png" />
                <img
                  src="/assets/images/logos/himaya-logo.svg"
                  alt="HIMAYA logo"
                  width={240}
                  height={64}
                  className="h-14 w-auto max-w-[240px] object-contain"
                />
              </picture>
            </div>
            <p className="font-subheading text-sm text-ivoryWhite/70">
              From Risk to Readiness - Powered by AI. Protected by HIMAYA
            </p>
            <p className="font-subheading text-sm text-ivoryWhite/55">
              Continuous Regulatory Posture & Remediation for UK Regulated SMEs
            </p>
            <div className="h-px w-10 bg-metallicGold" />
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-ivoryWhite/55 transition-colors hover:text-luminousGold"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6.94 8.5a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88ZM5.7 18.3V9.8h2.5v8.5H5.7Zm4 0V9.8h2.4v1.2h.03c.34-.64 1.17-1.32 2.4-1.32 2.56 0 3.03 1.67 3.03 3.85v4.77h-2.5v-4.24c0-1.01-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.23v4.31H9.7Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-mono text-xs tracking-[0.22em] text-metallicGold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <FooterBookLink link={link} className={footerLinkClass} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-center text-xs italic text-mutedText">
          HIMAYA provides cybersecurity, governance, risk, compliance, and operational assurance support. HIMAYA does not provide
          legal advice, regulatory representation, or guarantee regulatory outcomes.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-metallicGold/20 pt-4 text-[0.65rem] text-mutedText md:flex-row md:items-center md:justify-between">
          <p className="font-mono">© 2026 HIMAYA. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 font-mono">
            {legalLinks.map((link) => (
              <FooterBookLink key={link} link={link} className="transition-colors hover:text-luminousGold" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
