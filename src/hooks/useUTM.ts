"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function sessionGet(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export function useUTM() {
  const params = useSearchParams();
  return useMemo(() => {
    return {
      utmSource: params.get("utm_source") || sessionGet("utm_source"),
      utmMedium: params.get("utm_medium") || sessionGet("utm_medium"),
      utmCampaign: params.get("utm_campaign") || sessionGet("utm_campaign"),
    };
  }, [params]);
}
