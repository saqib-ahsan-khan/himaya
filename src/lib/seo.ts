import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();
const SITE_NAME = "HIMAYA";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/himaya-og.png`;
const TWITTER_HANDLE = "@himayauk";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  articleDate?: string;
  articleModified?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords = [],
  articleDate,
  articleModified,
}: SEOProps): Metadata {
  const fullTitle = title.includes("HIMAYA") ? title : `${title} | HIMAYA`;
  const canonicalUrl = `${BASE_URL}${path}`;

  const baseKeywords = [
    "FCA compliance",
    "regulatory assurance",
    "control drift",
    "FCA regulated SME",
    "HIMAYA",
    "continuous regulatory assurance UK",
  ];

  const allKeywords = [...baseKeywords, ...keywords].join(", ");
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: "HIMAYA", url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-GB": canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: articleDate ? "article" : "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: "image/png",
        },
      ],
      ...(articleDate && {
        publishedTime: articleDate,
        modifiedTime: articleModified,
        authors: ["HIMAYA"],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
  };
}

export function buildNoIndexMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return buildMetadata({
    title,
    description,
    path,
    noIndex: true,
  });
}
