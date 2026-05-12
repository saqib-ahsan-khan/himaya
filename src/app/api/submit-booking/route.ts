import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/schemas";
import type { BookingLead } from "@/lib/types";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data", details: parsed.error.issues }, { status: 400 });
    }

    const data = parsed.data;
    const now = new Date().toISOString();

    const utmSource = body.utmSource || "";
    const utmMedium = body.utmMedium || "";
    const utmCampaign = body.utmCampaign || "";

    const lead: BookingLead = {
      fullName: data.fullName,
      workEmail: data.workEmail,
      phone: data.phone || "",
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      industry: data.industry,
      employeeCount: data.employeeCount,
      mainConcern: data.mainConcern,
      preferredDateTime: data.preferredDateTime || "",
      consentStatus: data.consent,
      consentTimestamp: now,
      leadStatus: "New",
      utmSource,
      utmMedium,
      utmCampaign,
      source: "booking_form",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("booking_leads").add(lead);

    const safe = {
      fullName: escapeHtml(data.fullName),
      companyName: escapeHtml(data.companyName),
      industry: escapeHtml(data.industry),
      mainConcern: escapeHtml(data.mainConcern),
      workEmail: escapeHtml(data.workEmail),
      jobTitle: escapeHtml(data.jobTitle),
      employeeCount: escapeHtml(data.employeeCount),
    };

    await resend.emails.send({
      from: "HIMAYA <contact@himaya.uk>",
      to: data.workEmail,
      subject: "Your HIMAYA Discovery Call Request",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#263447;">
          <div style="background:#071827;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:#D4A017;font-size:1.4rem;margin:0;font-family:Georgia,serif">HIMAYA</h1>
            <p style="color:rgba(255,253,247,0.6);font-size:0.75rem;margin:4px 0 0">From Risk to Readiness</p>
          </div>
          <div style="background:#FFFDF7;padding:32px;border:1px solid #F8E7B2;border-top:none;border-radius:0 0 8px 8px">
            <h2 style="color:#071827;font-family:Georgia,serif;font-size:1.4rem;margin:0 0 16px">Thank you, ${safe.fullName}.</h2>
            <p style="line-height:1.75;margin:0 0 16px">We have received your request for a 15-minute HIMAYA discovery call.</p>
            <div style="background:#F7F1E5;border-left:3px solid #D4A017;padding:16px 20px;border-radius:0 6px 6px 0;margin:20px 0">
              <p style="margin:0;font-size:0.85rem;color:#263447;line-height:1.75">
                <strong>Company:</strong> ${safe.companyName}<br/>
                <strong>Firm type:</strong> ${safe.industry}<br/>
                <strong>Main concern:</strong> ${safe.mainConcern}
              </p>
            </div>
            <p style="line-height:1.75;margin:0 0 24px">A member of the HIMAYA team will be in touch within <strong>24 hours</strong> to confirm your call slot and share what to expect.</p>
            <p style="font-size:0.8rem;color:#64748B;line-height:1.7;margin:0">
              HIMAYA provides cybersecurity, governance, risk, compliance and operational assurance support. HIMAYA does not provide legal advice or guarantee regulatory outcomes.
            </p>
          </div>
        </div>
      `,
    });

    const notifyTo = process.env.HIMAYA_NOTIFICATION_EMAIL;
    if (notifyTo) {
      await resend.emails.send({
        from: "HIMAYA Website <contact@himaya.uk>",
        to: notifyTo,
        subject: `New Demo Request - ${safe.companyName}`,
        html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#071827">New Booking Lead</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Name</td>
            <td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${safe.fullName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Email</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.workEmail}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Company</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.companyName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Job Title</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.jobTitle}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Industry</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.industry}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Employees</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.employeeCount}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#64748B;font-size:0.85rem">Concern</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${safe.mainConcern}</td></tr>
            <tr><td style="padding:8px;color:#64748B;font-size:0.85rem">UTM</td>
            <td style="padding:8px">${escapeHtml(utmSource)} / ${escapeHtml(utmMedium)} / ${escapeHtml(utmCampaign)}</td></tr>
          </table>
          <p style="margin-top:20px;font-size:0.85rem;color:#64748B">
            Lead ID: ${docRef.id}<br/>
            Status: New<br/>
            Time: ${now}
          </p>
        </div>
      `,
      });
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
