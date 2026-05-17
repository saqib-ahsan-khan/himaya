"use client";

import { getStoredUTMs } from "@/lib/utm";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useUTM() {
  const params = useSearchParams();

  return useMemo(() => {
    const stored = getStoredUTMs();
    return {
      utmSource: params.get("utm_source") || stored.utmSource,
      utmMedium: params.get("utm_medium") || stored.utmMedium,
      utmCampaign: params.get("utm_campaign") || stored.utmCampaign,
      utmContent: params.get("utm_content") || stored.utmContent,
      utmTerm: params.get("utm_term") || stored.utmTerm,
      gclid: params.get("gclid") || stored.gclid,
    };
  }, [params]);
}
