"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2, Mail, X } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBooking } from "@/context/BookingContext";
import { useUTM } from "@/hooks/useUTM";
import { useToast } from "@/hooks/useToast";
import { analytics } from "@/lib/analytics";
import { bookingSchema, type BookingFormData } from "@/lib/schemas";

const industryOptions = [
  { value: "", label: "Select your firm type" },
  { value: "FCA-Regulated Financial Firm", label: "FCA-Regulated Financial Firm" },
  { value: "SRA-Regulated Law Firm", label: "SRA-Regulated Law Firm" },
  { value: "Accounting Firm (ICAEW/ACCA)", label: "Accounting Firm (ICAEW/ACCA)" },
  { value: "Fintech / Payment Institution", label: "Fintech / Payment Institution" },
  { value: "UK GDPR / ICO-Sensitive SME", label: "UK GDPR / ICO-Sensitive SME" },
  { value: "ISO 27001 Aspirant", label: "ISO 27001 Aspirant" },
  { value: "Other Regulated Firm", label: "Other Regulated Firm" },
];

const sizeOptions = [
  { value: "", label: "Select size" },
  { value: "1-10", label: "1-10" },
  { value: "11-25", label: "11-25" },
  { value: "26-50", label: "26-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-250", label: "101-250" },
  { value: "250+", label: "250+" },
];

const inputClass =
  "w-full rounded-md border-[1.5px] border-deepNavy/12 bg-white px-4 py-2.5 font-subheading text-[0.92rem] text-slateText placeholder:text-deepNavy/35 transition focus:border-metallicGold focus:outline-none focus:ring-[3px] focus:ring-metallicGold/10";
const inputError = "border-dangerRed focus:border-dangerRed focus:ring-dangerRed/10";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-[0.75rem] text-dangerRed">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {message}
    </p>
  );
}

export function BookingModal() {
  return (
    <Suspense fallback={null}>
      <BookingModalInner />
    </Suspense>
  );
}

function BookingModalInner() {
  const { isOpen, closeModal } = useBooking();
  const { utmSource, utmMedium, utmCampaign, utmContent, utmTerm, gclid } = useUTM();
  const { success: toastSuccess } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      industry: "",
      employeeCount: "",
      mainConcern: "",
      preferredDateTime: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    analytics.bookingModalOpened();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const onEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen, onEscape]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSuccess(false);
        setSubmitError(null);
        reset();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
          gclid,
        }),
      });
      if (!res.ok) {
        setSubmitError("Something went wrong. Please email contact@himaya.uk directly.");
        return;
      }
      analytics.bookingFormSubmitted(data.industry);
      setFirstName(data.fullName.split(/\s+/)[0] || data.fullName);
      setConfirmEmail(data.workEmail);
      setSuccess(true);
      toastSuccess("Request received - check your inbox for confirmation.");
    } catch {
      setSubmitError("Something went wrong. Please email contact@himaya.uk directly.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="booking-modal"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-deepNavy/85 backdrop-blur-[8px]"
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative z-[1] max-h-[90vh] w-[min(560px,95vw)] overflow-y-auto rounded-2xl border border-metallicGold/20 bg-ivoryWhite shadow-[0_32px_100px_rgba(7,24,39,0.35)]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between rounded-t-2xl bg-deepNavy px-8 py-6">
              <div>
                <p id="booking-modal-title" className="font-heading text-[1.1rem] font-bold text-metallicGold">
                  HIMAYA
                </p>
                <p className="mt-1 font-subheading text-[0.85rem] text-white/70">Book Your 15-Minute Demo</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/15 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {!success ? (
              <div className="p-8">
                <p className="text-[0.88rem] leading-relaxed text-slateText">
                  We will assess your current control posture and show you exactly where HIMAYA adds value. No hard sell.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                      Full Name <span className="text-metallicGold">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className={`${inputClass} ${errors.fullName ? inputError : ""}`}
                      {...register("fullName")}
                    />
                    <FieldError message={errors.fullName?.message} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Work Email <span className="text-metallicGold">*</span>
                      </label>
                      <input
                        type="email"
                        className={`${inputClass} ${errors.workEmail ? inputError : ""}`}
                        {...register("workEmail")}
                      />
                      <FieldError message={errors.workEmail?.message} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Phone Number <span className="font-normal text-mutedText">(Optional)</span>
                      </label>
                      <input type="tel" className={inputClass} {...register("phone")} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Company Name <span className="text-metallicGold">*</span>
                      </label>
                      <input
                        type="text"
                        className={`${inputClass} ${errors.companyName ? inputError : ""}`}
                        {...register("companyName")}
                      />
                      <FieldError message={errors.companyName?.message} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Job Title <span className="text-metallicGold">*</span>
                      </label>
                      <input type="text" className={`${inputClass} ${errors.jobTitle ? inputError : ""}`} {...register("jobTitle")} />
                      <FieldError message={errors.jobTitle?.message} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Firm Type / Industry <span className="text-metallicGold">*</span>
                      </label>
                      <select className={`${inputClass} ${errors.industry ? inputError : ""}`} {...register("industry")}>
                        {industryOptions.map((o) => (
                          <option key={o.value || "empty"} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.industry?.message} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                        Number of Employees <span className="text-metallicGold">*</span>
                      </label>
                      <select className={`${inputClass} ${errors.employeeCount ? inputError : ""}`} {...register("employeeCount")}>
                        {sizeOptions.map((o) => (
                          <option key={o.value || "empty-size"} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.employeeCount?.message} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">
                      Main Compliance Concern <span className="text-metallicGold">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us your main compliance challenge (e.g. access reviews overdue, evidence gaps, upcoming audit, control drift...)"
                      className={`${inputClass} resize-y ${errors.mainConcern ? inputError : ""}`}
                      {...register("mainConcern")}
                    />
                    <p className="mt-1 text-[0.72rem] text-mutedText">Please do not include sensitive compliance evidence in this form.</p>
                    <FieldError message={errors.mainConcern?.message} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-deepNavy">Preferred Date / Time (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Monday mornings, week of 19 May..."
                      className={inputClass}
                      {...register("preferredDateTime")}
                    />
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-deepNavy/20 text-metallicGold focus:ring-metallicGold"
                        {...register("consent")}
                      />
                      <span className="text-[0.82rem] leading-relaxed text-slateText">
                        I agree to HIMAYA&apos;s{" "}
                        <Link href="/privacy" className="text-metallicGold underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                          Privacy Policy
                        </Link>{" "}
                        and consent to being contacted regarding my enquiry. I understand that HIMAYA does not provide legal advice.
                      </span>
                    </label>
                    <FieldError message={errors.consent?.message} />
                  </div>

                  {submitError && <p className="text-sm text-dangerRed">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="safe-bottom flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-3.5 text-base font-bold text-deepNavy transition hover:-translate-y-px hover:shadow-[0_10px_40px_rgba(212,160,23,0.35)] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending your request...
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        Request My 15-Minute Demo
                        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                className="p-8"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-metallicGold bg-metallicGold/10"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Check className="h-10 w-10 text-deepNavy" strokeWidth={2.5} aria-hidden />
                  </motion.div>
                </motion.div>
                <h3 className="text-center font-heading text-[1.6rem] font-bold text-deepNavy">Demo request received.</h3>
                <p className="mt-3 text-center text-slateText leading-[1.85]">
                  We will be in touch within 24 hours to confirm your demo slot.
                </p>
                <div className="mt-6 rounded-r-lg border-l-4 border-metallicGold bg-warmCream px-5 py-4 text-sm text-slateText">
                  <span className="inline-flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-metallicGold" aria-hidden />
                    <span>
                      Check your inbox - a confirmation email is on its way to {confirmEmail}
                    </span>
                  </span>
                </div>
                <ol className="mt-6 space-y-3 text-sm text-slateText">
                  <li>
                    <strong className="text-deepNavy">1. We review your details</strong> - within 2 hours
                  </li>
                  <li>
                    <strong className="text-deepNavy">2. We confirm your slot</strong> - within 24 hours
                  </li>
                  <li>
                    <strong className="text-deepNavy">3. Your 15-minute call</strong> - no hard sell
                  </li>
                </ol>
                <button
                  type="button"
                  onClick={closeModal}
                  className="safe-bottom mt-8 w-full rounded-md border border-deepNavy/15 py-3 text-sm font-semibold text-deepNavy transition hover:bg-deepNavy/5"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
