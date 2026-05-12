"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: "border-successGreen/40 bg-ivoryWhite text-deepNavy",
  error: "border-dangerRed/40 bg-ivoryWhite text-deepNavy",
  info: "border-metallicGold/50 bg-ivoryWhite text-deepNavy",
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[2000] flex w-[min(100vw-2rem,380px)] flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} dismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  dismiss,
}: {
  toast: { id: string; type: keyof typeof icons; message: string };
  dismiss: (id: string) => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => dismiss(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, dismiss]);

  const Icon = icons[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${styles[toast.type]}`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${
          toast.type === "success" ? "text-successGreen" : toast.type === "error" ? "text-dangerRed" : "text-metallicGold"
        }`}
      />
      <p className="flex-1 text-sm leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        className="shrink-0 rounded p-1 text-mutedText transition hover:bg-deepNavy/5 hover:text-deepNavy"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
