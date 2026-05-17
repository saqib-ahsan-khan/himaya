"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { Check, FileText, Loader2 } from "lucide-react";
import { GoldArrow, GoldCheck } from "@/components/ui/Icons";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUTM } from "@/hooks/useUTM";
import { useToast } from "@/hooks/useToast";
import { analytics } from "@/lib/analytics";
import { leadMagnetSchema, type LeadMagnetFormData } from "@/lib/schemas";

const ease = [0.16, 1, 0.3, 1] as const;

function PreviewListTick({ muted }: { muted?: boolean }) {
  return (
    <span
      className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded border bg-metallicGold/10 ${
        muted ? "border-metallicGold/25 text-metallicGold/60" : "border-metallicGold/45 text-metallicGold"
      }`}
      aria-hidden
    >
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  );
}

function LeadMagnetForm() {
  const { utmSource, utmMedium, utmCampaign } = useUTM();
  const { success: toastSuccess } = useToast();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      companyName: "",
      role: "",
      consent: false,
    },
  });

  const onSubmit = async (data: LeadMagnetFormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/submit-lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const url = (json.downloadUrl as string) || "/downloads/himaya-control-drift-checklist.pdf";
      window.open(url, "_blank", "noopener,noreferrer");
      analytics.checklistDownloaded();
      setStatus("success");
      toastSuccess("Your download is starting...");
    } catch {
      setStatus("error");
    }
  };

  const input =
    "w-full rounded-md border border-deepNavy/12 bg-white px-3 py-2.5 text-sm text-slateText focus:border-metallicGold focus:outline-none focus:ring-2 focus:ring-metallicGold/15";

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-deepNavy">Full Name *</label>
          <input type="text" className={input} {...register("fullName")} />
          {errors.fullName && <p className="mt-1 text-xs text-dangerRed">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-deepNavy">Work Email *</label>
          <input type="email" className={input} {...register("workEmail")} />
          {errors.workEmail && <p className="mt-1 text-xs text-dangerRed">{errors.workEmail.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-deepNavy">Company *</label>
          <input type="text" className={input} {...register("companyName")} />
          {errors.companyName && <p className="mt-1 text-xs text-dangerRed">{errors.companyName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-deepNavy">Role *</label>
          <input type="text" className={input} {...register("role")} />
          {errors.role && <p className="mt-1 text-xs text-dangerRed">{errors.role.message}</p>}
        </div>
      </div>
      <label className="flex cursor-pointer items-start gap-2 text-sm text-slateText">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-deepNavy/20 text-metallicGold" {...register("consent")} />
        <span>I agree to the processing of my data to receive the checklist.</span>
      </label>
      {errors.consent && <p className="text-xs text-dangerRed">{errors.consent.message}</p>}
      {status === "error" && <p className="text-sm text-dangerRed">Something went wrong. Please try again.</p>}
      {status === "success" && <p className="text-sm text-successGreen">Your download is starting...</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-3 text-sm font-bold text-deepNavy transition hover:shadow-[0_8px_28px_rgba(212,160,23,0.35)] disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            Download Free Checklist
            <GoldArrow size={16} />
          </span>
        )}
      </button>
      <p className="text-[0.72rem] text-mutedText">
        By downloading you agree to our{" "}
        <Link href="/privacy" className="text-metallicGold underline underline-offset-2">
          Privacy Policy
        </Link>
        . We may follow up by email. Unsubscribe anytime.
      </p>
    </form>
  );
}

export function LeadMagnetSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="control-drift-checklist" ref={ref} className="bg-warmCream py-20">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-8 lg:grid-cols-[55%_45%] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
          <span className="inline-block rounded-full bg-metallicGold/15 px-3 py-1 font-mono text-[0.65rem] tracking-[0.12em] text-metallicGold">
            FREE RESOURCE
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-deepNavy md:text-[2rem]">
            FCA-Regulated SME
            <br />
            Control Drift Checklist
          </h2>
          <p className="mt-4 text-slateText">
            Assess your own evidence, access reviews, MFA exceptions, backup testing, owner mapping and remediation deadlines. Free download, no spam.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slateText">
            {[
              "20 control drift indicators to assess",
              "Evidence readiness self-check",
              "Owner mapping worksheet",
              "Remediation deadline tracker",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <GoldCheck size={16} />
                {item}
              </li>
            ))}
          </ul>
          <Suspense fallback={null}>
            <LeadMagnetForm />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="relative rounded-xl border border-metallicGold/35 bg-white p-6 shadow-[0_16px_50px_rgba(7,24,39,0.1)]"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-heading text-lg font-bold text-deepNavy">HIMAYA</p>
              <div className="mt-2 flex items-start gap-2 border-l-2 border-metallicGold/50 pl-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-metallicGold" strokeWidth={2} aria-hidden />
                <h3 className="font-heading text-base font-bold leading-snug text-deepNavy md:text-lg">
                  FCA-Regulated SME Control Drift Checklist
                </h3>
              </div>
            </div>
            <span className="-rotate-12 shrink-0 rounded border border-dangerRed/40 bg-dangerRed/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-dangerRed">
              Confidential
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slateText">
            <li className="flex items-start gap-2">
              <PreviewListTick />
              MFA exceptions reviewed and documented
            </li>
            <li className="flex items-start gap-2">
              <PreviewListTick />
              Access review completed and evidenced
            </li>
            <li className="flex items-start gap-2">
              <PreviewListTick />
              Backup restore test within 90 days
            </li>
            <li className="flex items-start gap-2">
              <PreviewListTick />
              Remediation owner assigned for all issues
            </li>
            <li className="relative flex items-start gap-2 overflow-hidden pb-8 text-deepNavy/70">
              <PreviewListTick muted />
              Evidence stored per control...
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </li>
          </ul>
          <p className="mt-2 text-center text-sm font-medium text-metallicGold">Download to see all 20 checks</p>
        </motion.div>
      </div>
    </section>
  );
}
