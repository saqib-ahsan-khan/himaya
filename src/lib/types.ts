export interface BookingLead {
  id?: string;
  fullName: string;
  workEmail: string;
  phone?: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  employeeCount: string;
  mainConcern: string;
  preferredDateTime?: string;
  consentStatus: boolean;
  consentTimestamp: string;
  leadStatus: "New" | "Contacted" | "Demo Booked" | "Closed" | "Not Fit";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  source: "booking_form" | "lead_magnet" | "chatbot";
  createdAt: string;
  updatedAt: string;
}

export type AdminLead = BookingLead & {
  id: string;
  recordType: "booking" | "lead_magnet";
};

export interface LeadMagnetSubmission {
  id?: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  role?: string;
  consentStatus?: boolean;
  consentTimestamp: string;
  downloadedChecklist: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}
