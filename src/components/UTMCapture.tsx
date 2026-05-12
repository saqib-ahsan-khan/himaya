"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function UTMCaptureInner() {
  const params = useSearchParams();

  useEffect(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign"] as const;
    keys.forEach((key) => {
      const v = params.get(key);
      if (v) {
        try {
          sessionStorage.setItem(key, v);
        } catch {
          /* ignore */
        }
      }
    });
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
