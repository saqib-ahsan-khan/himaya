import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ConsentGoogleAnalytics } from "@/components/analytics/ConsentGoogleAnalytics";
import { Providers } from "@/components/Providers";
import { LayoutSwitcher } from "@/components/layout/LayoutSwitcher";
import { OrganisationSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import { CookieNotice } from "@/components/ui/CookieNotice";
import "./globals.css";

import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-GB": BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <OrganisationSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-full font-subheading text-slateText">
        <Providers>
          <LayoutSwitcher>{children}</LayoutSwitcher>
          <CookieNotice />
        </Providers>
        <ConsentGoogleAnalytics />
      </body>
    </html>
  );
}
