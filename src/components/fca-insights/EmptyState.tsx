"use client";

import { BookOpen, Loader2 } from "lucide-react";
import { useState } from "react";

export function EmptyState() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe-fca-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-metallicGold/25 bg-white px-8 py-16 text-center">
      <BookOpen size={48} className="text-metallicGold/50" aria-hidden />
      <h3 className="mt-6 font-heading text-xl font-bold text-deepNavy">Regulatory insights coming soon.</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slateText">
        We are preparing our first FCA enforcement analysis. Check back shortly.
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          className="flex-1 rounded-md border border-deepNavy/12 px-3 py-2.5 text-sm focus:border-metallicGold focus:outline-none focus:ring-2 focus:ring-metallicGold/15"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-deepNavy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-midnightNavy disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
        </button>
      </form>
      {status === "success" && <p className="mt-3 text-sm text-successGreen">You are on the list. We will be in touch.</p>}
      {status === "error" && <p className="mt-3 text-sm text-dangerRed">Something went wrong. Please try again.</p>}
    </div>
  );
}
