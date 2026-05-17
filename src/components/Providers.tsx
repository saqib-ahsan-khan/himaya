"use client";

import { SessionProvider } from "next-auth/react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { BookingModal } from "@/components/modals/BookingModal";
import { ToastContainer } from "@/components/ui/Toast";
import { UTMCapture } from "@/components/UTMCapture";
import { BookingProvider } from "@/context/BookingContext";
import { ToastProvider } from "@/hooks/useToast";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <BookingProvider>
          <UTMCapture />
          {children}
          <BookingModal />
          <ChatWidget />
          <ToastContainer />
        </BookingProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
