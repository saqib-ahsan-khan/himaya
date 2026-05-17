"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export function ArticleAnalytics({ title, firmName }: { title: string; firmName?: string }) {
  useEffect(() => {
    analytics.articleViewed(title);
  }, [title]);

  return null;
}

export function trackFcaSourceClick(firm: string) {
  analytics.fcaSourceClicked(firm || "FCA source");
}
