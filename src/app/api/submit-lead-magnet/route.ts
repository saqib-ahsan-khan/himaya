import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";
import { leadMagnetSchema } from "@/lib/schemas";
import type { LeadMagnetSubmission } from "@/lib/types";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const DOWNLOAD_PATH = "/downloads/himaya-control-drift-checklist.pdf";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = leadMagnetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data", details: parsed.error.issues }, { status: 400 });
    }

    const data = parsed.data;
    const now = new Date().toISOString();

    const utmSource = body.utmSource || "";
    const utmMedium = body.utmMedium || "";
    const utmCampaign = body.utmCampaign || "";

    const submission: LeadMagnetSubmission = {
      fullName: data.fullName,
      workEmail: data.workEmail,
      companyName: data.companyName,
      role: data.role,
      consentStatus: data.consent,
      consentTimestamp: now,
      downloadedChecklist: true,
      utmSource,
      utmMedium,
      utmCampaign,
      createdAt: now,
    };

    const docRef = await adminDb.collection("lead_magnet_submissions").add(submission);

    const safe = {
      fullName: escapeHtml(data.fullName),
      workEmail: escapeHtml(data.workEmail),
      companyName: escapeHtml(data.companyName),
      role: escapeHtml(data.role),
    };

    await resend.emails.send({
      from: "HIMAYA <contact@himaya.uk>",
      to: data.workEmail,
      subject: "Your HIMAYA Control Drift Checklist",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#263447;">
          <div style="background:#071827;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:#D4A017;font-size:1.4rem;margin:0;font-family:Georgia,serif">HIMAYA</h1>
          </div>
          <div style="background:#FFFDF7;padding:32px;border:1px solid #F8E7B2;border-top:none;border-radius:0 0 8px 8px">
            <h2 style="color:#071827;font-family:Georgia,serif;font-size:1.25rem;margin:0 0 16px">Hi ${safe.fullName},</h2>
            <p style="line-height:1.75;margin:0 0 16px">Thanks for downloading the <strong>FCA-Regulated SME Control Drift Checklist</strong>. Use the link from the download page to access your PDF anytime.</p>
            <p style="line-height:1.75;margin:0;font-size:0.9rem;color:#64748B">If you did not request this, you can ignore this email.</p>
          </div>
        </div>
      `,
    });

    const notifyTo = process.env.HIMAYA_NOTIFICATION_EMAIL;
    if (notifyTo) {
      await resend.emails.send({
        from: "HIMAYA Website <contact@himaya.uk>",
        to: notifyTo,
        subject: `New Lead Magnet Download - ${safe.companyName}`,
        html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#071827">New checklist download</h2>
          <p><strong>Name:</strong> ${safe.fullName}<br/>
          <strong>Email:</strong> ${safe.workEmail}<br/>
          <strong>Company:</strong> ${safe.companyName}<br/>
          <strong>Role:</strong> ${safe.role}</p>
          <p style="color:#64748B;font-size:0.85rem">UTM: ${escapeHtml(utmSource)} / ${escapeHtml(utmMedium)} / ${escapeHtml(utmCampaign)}</p>
          <p style="font-size:0.85rem;color:#64748B">Submission ID: ${docRef.id}</p>
        </div>
      `,
      });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: DOWNLOAD_PATH,
    });
  } catch (error) {
    console.error("Lead magnet submission error:", error);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
