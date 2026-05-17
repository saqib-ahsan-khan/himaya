import "server-only";

import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import type { AdminLead, BookingLead } from "@/lib/types";

export type { AdminLead };

function mapBookingDoc(doc: QueryDocumentSnapshot): AdminLead {
  const data = doc.data();
  return {
    id: doc.id,
    recordType: "booking",
    fullName: String(data.fullName ?? ""),
    workEmail: String(data.workEmail ?? ""),
    phone: data.phone ? String(data.phone) : "",
    companyName: String(data.companyName ?? ""),
    jobTitle: String(data.jobTitle ?? data.role ?? ""),
    industry: String(data.industry ?? "Other"),
    employeeCount: String(data.employeeCount ?? ""),
    mainConcern: String(data.mainConcern ?? data.role ?? "Checklist download"),
    preferredDateTime: data.preferredDateTime ? String(data.preferredDateTime) : "",
    consentStatus: Boolean(data.consentStatus),
    consentTimestamp: String(data.consentTimestamp ?? ""),
    leadStatus: (data.leadStatus as AdminLead["leadStatus"]) ?? "New",
    utmSource: data.utmSource ? String(data.utmSource) : "",
    utmMedium: data.utmMedium ? String(data.utmMedium) : "",
    utmCampaign: data.utmCampaign ? String(data.utmCampaign) : "",
    source: (data.source as AdminLead["source"]) ?? "booking_form",
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? data.createdAt ?? ""),
  };
}

function mapLeadMagnetDoc(doc: QueryDocumentSnapshot): AdminLead {
  const data = doc.data();
  return {
    id: doc.id,
    recordType: "lead_magnet",
    fullName: String(data.fullName ?? ""),
    workEmail: String(data.workEmail ?? ""),
    phone: "",
    companyName: String(data.companyName ?? ""),
    jobTitle: String(data.role ?? ""),
    industry: "Other",
    employeeCount: "",
    mainConcern: "Control Drift Checklist download",
    preferredDateTime: "",
    consentStatus: Boolean(data.consentStatus),
    consentTimestamp: String(data.consentTimestamp ?? ""),
    leadStatus: "New",
    utmSource: data.utmSource ? String(data.utmSource) : "",
    utmMedium: data.utmMedium ? String(data.utmMedium) : "",
    utmCampaign: data.utmCampaign ? String(data.utmCampaign) : "",
    source: "lead_magnet",
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.createdAt ?? ""),
  };
}

export async function getAllLeads(): Promise<AdminLead[]> {
  const [bookingSnap, magnetSnap] = await Promise.all([
    adminDb.collection("booking_leads").orderBy("createdAt", "desc").get(),
    adminDb.collection("lead_magnet_submissions").orderBy("createdAt", "desc").get(),
  ]);

  const leads = [...bookingSnap.docs.map(mapBookingDoc), ...magnetSnap.docs.map(mapLeadMagnetDoc)];
  return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getLeadsStats() {
  const leads = await getAllLeads();
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = leads.filter((l) => new Date(l.createdAt).getTime() >= weekAgo).length;
  const newCount = leads.filter((l) => l.leadStatus === "New").length;

  return {
    total: leads.length,
    newThisWeek,
    newCount,
  };
}

export async function updateLeadStatus(
  id: string,
  recordType: "booking" | "lead_magnet",
  leadStatus: AdminLead["leadStatus"]
) {
  const collection = recordType === "booking" ? "booking_leads" : "lead_magnet_submissions";
  if (recordType === "booking") {
    await adminDb.collection(collection).doc(id).update({
      leadStatus,
      updatedAt: new Date().toISOString(),
    });
  }
}

export async function deleteLead(id: string, recordType: "booking" | "lead_magnet") {
  const collection = recordType === "booking" ? "booking_leads" : "lead_magnet_submissions";
  await adminDb.collection(collection).doc(id).delete();
}
