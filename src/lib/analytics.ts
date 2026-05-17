declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === "undefined" || typeof window.gtag === "undefined") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export const analytics = {
  bookingModalOpened: () => trackEvent("booking_modal_opened", "engagement"),
  bookingFormSubmitted: (industry: string) => trackEvent("booking_form_submitted", "conversion", industry),
  checklistDownloaded: () => trackEvent("checklist_downloaded", "conversion"),
  chatOpened: () => trackEvent("chat_opened", "engagement"),
  chatLeadCollected: () => trackEvent("chat_lead_collected", "conversion"),
  articleViewed: (title: string) => trackEvent("article_viewed", "content", title),
  fcaSourceClicked: (firm: string) => trackEvent("fca_source_clicked", "content", firm),
  navBookingClicked: () => trackEvent("nav_booking_clicked", "engagement"),
};
