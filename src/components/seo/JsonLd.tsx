import type { SerializedFcaArticle } from "@/lib/articles";

import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

const FAQ_ENTRIES = [
  {
    q: "What does HIMAYA do?",
    a: "HIMAYA helps FCA-regulated SMEs detect control drift, assign remediation owners, track evidence, and maintain continuous regulatory assurance without reactive audit scramble.",
  },
  {
    q: "What is control drift?",
    a: "Control drift happens when a firm's documented controls no longer match operational reality. MFA exceptions grow, access reviews become overdue, evidence goes missing and remediation deadlines slip — often without leadership awareness.",
  },
  {
    q: "Is HIMAYA a replacement for our compliance officer?",
    a: "No. HIMAYA supports and strengthens governance, evidence, control monitoring and remediation discipline. It can reduce the need to hire a full internal team early, but it does not replace legal or regulatory accountability.",
  },
  {
    q: "Does HIMAYA replace our MSP?",
    a: "No. HIMAYA works alongside an MSP. The MSP may execute technical changes; HIMAYA tracks control status, evidence, ownership, remediation and reporting.",
  },
  {
    q: "What is ATLAS?",
    a: "ATLAS is HIMAYA's Continuous Regulatory Posture Assurance System. It tracks control drift, evidence status, remediation owners, SLA deadlines and compliance posture in real time for regulated firms.",
  },
  {
    q: "Does HIMAYA guarantee regulatory compliance?",
    a: "No. HIMAYA provides cybersecurity, governance, risk, compliance, and operational assurance support. We help firms improve visibility, evidence, ownership, and remediation discipline, but we do not provide legal advice, regulatory representation, or guarantee regulatory outcomes.",
  },
  {
    q: "How much does HIMAYA cost?",
    a: "HIMAYA Essential starts from £750 per month. HIMAYA Regulated starts from £1,250 per month. HIMAYA Assurance+ starts from £1,850 per month. Final scope is confirmed during a 15-minute discovery call.",
  },
  {
    q: "Can HIMAYA help us prepare for audits?",
    a: "HIMAYA helps build ongoing evidence and remediation discipline so audit preparation becomes more structured and less reactive. The goal is to make audit readiness a continuous state, not a last-minute scramble.",
  },
  {
    q: "Which firms do you help first?",
    a: "Initial focus is FCA-regulated SMEs with 10-100 employees, small compliance teams, MSP support and manual internal governance. We also support SRA-regulated law firms, accounting firms and UK GDPR-sensitive SMEs.",
  },
];

function JsonLdScript(data: Record<string, unknown>) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganisationSchema() {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "HIMAYA",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/himaya-logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "Continuous Regulatory Posture Assurance for UK Regulated SMEs. Control drift detection, evidence tracking, remediation ownership and board-level reporting.",
    foundingDate: "2025",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@himaya.uk",
      contactType: "sales",
      areaServed: "GB",
      availableLanguage: "English",
    },
    sameAs: ["https://linkedin.com/company/himaya"],
    knowsAbout: [
      "FCA Compliance",
      "Regulatory Assurance",
      "Control Drift Detection",
      "AML Controls",
      "SMCR Governance",
      "Consumer Duty",
      "Operational Resilience",
      "UK GDPR Compliance",
    ],
  });
}

export const OrganizationJsonLd = OrganisationSchema;

export function WebSiteSchema() {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "HIMAYA",
    description: "Continuous Regulatory Assurance for FCA-Regulated SMEs",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/fca-insights?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

export function ServiceSchema() {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#service`,
    name: "HIMAYA Regulatory Assurance Services",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    serviceType: "Regulatory Compliance Assurance",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HIMAYA Service Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HIMAYA Essential",
            description: "ATLAS core platform, evidence library, monthly drift summary and basic drift alerts.",
          },
          price: "750",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "RecurringCharge",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HIMAYA Regulated",
            description:
              "ATLAS plus Human Risk and Awareness Programme, remediation SLA tracker, quarterly oversight call and board-ready monthly reports.",
          },
          price: "1250",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "RecurringCharge",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HIMAYA Assurance+",
            description: "Full vCISO Lite, deep governance support, board packs, priority oversight and supplier risk governance.",
          },
          price: "1850",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "RecurringCharge",
            billingDuration: "P1M",
          },
        },
      ],
    },
  });
}

export function FAQSchema() {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });
}

export const FAQJsonLd = FAQSchema;

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  updatedAt: string;
  firmName?: string;
}

export function ArticleSchema({ title, description, slug, publishedDate, updatedAt, firmName }: ArticleSchemaProps) {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/fca-insights/${slug}`,
    headline: title,
    description,
    url: `${BASE_URL}/fca-insights/${slug}`,
    datePublished: publishedDate,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: "HIMAYA",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "HIMAYA",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/himaya-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/fca-insights/${slug}`,
    },
    about: [
      { "@type": "Thing", name: "FCA Enforcement" },
      { "@type": "Thing", name: "Regulatory Compliance" },
      ...(firmName ? [{ "@type": "Organization", name: firmName }] : []),
    ],
    keywords: "FCA enforcement, regulatory compliance, control drift, UK financial regulation",
  });
}

export function ArticleJsonLd({ article }: { article: SerializedFcaArticle }) {
  return (
    <ArticleSchema
      title={article.title}
      description={article.summary}
      slug={article.slug}
      publishedDate={article.publishedDate}
      updatedAt={article.updatedAt}
      firmName={article.firmName}
    />
  );
}

interface BreadcrumbProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  return JsonLdScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
