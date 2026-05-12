"use client";

import { BookingModal } from "@/components/modals/BookingModal";
import { ToastContainer } from "@/components/ui/Toast";
import { UTMCapture } from "@/components/UTMCapture";
import { BookingProvider } from "@/context/BookingContext";
import { ToastProvider } from "@/hooks/useToast";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <BookingProvider>
        <UTMCapture />
        {children}
        <BookingModal />
        <ToastContainer />
      </BookingProvider>
    </ToastProvider>
  );
}
