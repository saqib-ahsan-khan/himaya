import type { SerializedFcaArticle } from "@/lib/articles";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://himaya.uk";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HIMAYA",
    url: BASE_URL,
    logo: `${BASE_URL}/images/himaya-logo.png`,
    description: "Continuous Regulatory Posture Assurance for UK Regulated SMEs",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@himaya.uk",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
    sameAs: ["https://linkedin.com/company/himaya"],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ArticleJsonLd({ article }: { article: SerializedFcaArticle }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: "HIMAYA",
    },
    publisher: {
      "@type": "Organization",
      name: "HIMAYA",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/himaya-logo.png`,
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/fca-insights/${article.slug}`,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is HIMAYA a replacement for our compliance officer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. HIMAYA supports and strengthens governance, evidence, control monitoring and remediation discipline.",
        },
      },
      {
        "@type": "Question",
        name: "What is ATLAS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ATLAS is HIMAYA's regulatory assurance dashboard for control drift, evidence status, remediation owners, SLA deadlines and compliance posture.",
        },
      },
      {
        "@type": "Question",
        name: "Does HIMAYA replace our MSP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. HIMAYA works alongside an MSP. The MSP executes technical changes; HIMAYA tracks control status, evidence, ownership, remediation and reporting.",
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
