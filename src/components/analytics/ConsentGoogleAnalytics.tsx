"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_EVENT } from "@/components/ui/CookieNotice";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function ConsentGoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      setEnabled(localStorage.getItem("cookieConsent") === "accepted");
    };
    check();
    window.addEventListener(COOKIE_CONSENT_EVENT, check);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, check);
  }, []);

  if (!GA_ID || !enabled) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}
