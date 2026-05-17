import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://himaya.uk";

const DEFAULT_META = {
  siteName: "HIMAYA",
  twitterHandle: "@himayauk",
  logoUrl: `${BASE_URL}/images/himaya-logo.png`,
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  image,
  robots,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  robots?: Metadata["robots"];
}): Metadata {
  const fullTitle = title.includes("HIMAYA") ? title : `${title} | HIMAYA`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/images/himaya-og.png`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: DEFAULT_META.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: DEFAULT_META.twitterHandle,
    },
    robots:
      robots ??
      ({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      } as const),
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
  return buildPageMetadata({
    title,
    description,
    path,
    robots: { index: false, follow: false },
  });
}
