const PRODUCTION_SITE_URL = "https://himaya.uk";

/** Public site URL for SEO, sitemap, robots, and canonical links. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (!fromEnv) {
    return PRODUCTION_SITE_URL;
  }

  // Never publish localhost URLs to crawlers in production builds.
  if (process.env.NODE_ENV === "production" && /localhost|127\.0\.0\.1/i.test(fromEnv)) {
    return PRODUCTION_SITE_URL;
  }

  return fromEnv;
}
