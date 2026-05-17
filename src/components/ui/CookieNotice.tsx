"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookieConsent";
export const COOKIE_CONSENT_EVENT = "himaya-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const setConsent = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[8998] flex flex-col items-start justify-between gap-4 border-t border-deepNavy/[0.08] bg-white px-6 py-4 shadow-[0_-4px_24px_rgba(7,24,39,0.08)] sm:flex-row sm:items-center sm:px-8"
        >
          <p className="max-w-2xl text-[0.82rem] leading-relaxed text-slateText">
            We use cookies for analytics and to improve your experience. See our{" "}
            <Link href="/privacy" className="font-medium text-metallicGold underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <button type="button" onClick={() => setConsent("declined")} className="text-sm text-mutedText hover:text-deepNavy">
              Decline
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-5 py-2 text-sm font-bold text-deepNavy"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
