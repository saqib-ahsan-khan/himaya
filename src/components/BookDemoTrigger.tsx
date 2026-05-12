"use client";

import { useBooking } from "@/context/BookingContext";
import type { ButtonHTMLAttributes } from "react";

export function BookDemoTrigger({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openModal } = useBooking();
  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openModal();
      }}
    >
      {children}
    </button>
  );
}
