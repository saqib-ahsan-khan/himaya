"use client";

import Link from "next/link";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";

const hrefMap: Record<string, string> = {
  "ATLAS": "/atlas",
  "Control Status": "/atlas",
  "Audit Mode": "/atlas",
  "Evidence Coverage": "/atlas",
  "Remediation Tracker": "/atlas",
  "Human Risk & Awareness Programme": "/services",
  "Manual GRC": "/services",
  "Access Governance": "/services",
  "Remediation Oversight": "/services",
  "Monthly Reporting": "/services",
  "FCA-Regulated Firms": "/industries",
  "Law Firms (SRA)": "/industries",
  "Accounting Firms": "/industries",
  "UK GDPR SMEs": "/industries",
  "ISO 27001": "/industries",
  "About HIMAYA": "/about",
  "How It Works": "/about",
  "Resources": "/resources",
  "Resources Hub": "/resources",
  "FCA Regulatory Insights": "/fca-insights",
  "Enforcement Lessons": "/enforcement-lessons",
  "Control Drift Checklist": "/resources/checklist",
  "Contact": "/trust",
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Trust & Security": "/trust",
  "Cookies": "/privacy#cookies",
};

const toHref = (value: string) => hrefMap[value] ?? "/";

export function FooterBookLink({ link, className }: { link: string; className: string }) {
  if (link === "Book a Demo") {
    return (
      <BookDemoTrigger type="button" className={`cursor-pointer bg-transparent p-0 text-left ${className}`}>
        {link}
      </BookDemoTrigger>
    );
  }
  return (
    <Link href={toHref(link)} className={className}>
      {link}
    </Link>
  );
}
