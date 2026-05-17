"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function UTMCaptureInner() {
  const params = useSearchParams();

  useEffect(() => {
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

    utmParams.forEach((param) => {
      const value = params.get(param);
      if (value) {
        try {
          sessionStorage.setItem(param, value);
        } catch {
          /* ignore */
        }
      }
    });

    const gclid = params.get("gclid");
    if (gclid) {
      try {
        sessionStorage.setItem("gclid", gclid);
      } catch {
        /* ignore */
      }
    }

    const liFatId = params.get("li_fat_id");
    if (liFatId) {
      try {
        sessionStorage.setItem("li_fat_id", liFatId);
      } catch {
        /* ignore */
      }
    }
  }, [params]);

  return null;
}

export function UTMCapture() {
  return (
    <Suspense fallback={null}>
      <UTMCaptureInner />
    </Suspense>
  );
}
