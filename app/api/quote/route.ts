import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import { siteConfig } from "@/lib/config";

export const runtime = "nodejs";

// Best-effort in-memory rate limit. Serverless functions can spin up
// multiple isolated instances and this map does not persist across cold
// starts, so this is a light deterrent, not a hard guarantee. For real
// abuse protection at scale, put Upstash Redis or Vercel Firewall rules
// in front of this route instead.
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

// Reject submissions that come back faster than a human could plausibly
// fill out the form — a simple bot deterrent alongside the honeypot field.
const MIN_FILL_TIME_MS = 2500;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later, or call/text us directly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "That request couldn't be read. Please try again." },
      { status: 400 }
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: a real submission never fills this hidden field.
  if (data.company) {
    // Respond as if successful so bots don't learn the check exists.
    return NextResponse.json({ ok: true });
  }

  // Time-trap: reject implausibly fast submissions.
  if (Date.now() - data.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { ok: false, message: "Please try submitting again." },
      { status: 422 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  const subject = `New quote request — ${data.name}`;
  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "(not provided)"}`,
    `Address / ZIP: ${data.address}`,
    `Services: ${data.services.join(", ")}`,
    `Interior/exterior: ${data.windowSide || "(not specified)"}`,
    `Approx. window count: ${data.windowCount || "(not specified)"}`,
    `Property type: ${data.propertyType || "(not specified)"}`,
    `Preferred contact method: ${data.contactMethod}`,
    `Preferred date: ${data.preferredDate || "(not specified)"}`,
    `Message: ${data.message || "(none)"}`,
  ];
  const text = lines.join("\n");

  if (!resendApiKey) {
    // No email service configured yet. Log server-side so the request
    // isn't silently lost during local development/testing, and tell the
    // caller plainly rather than pretending the email sent.
    console.warn(
      "[quote] RESEND_API_KEY not set — quote request logged but not emailed:\n" + text
    );
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        message:
          "Request received, but email delivery isn't configured yet on this deployment (RESEND_API_KEY missing). See README.md.",
      },
      { status: 200 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      // Resend requires sending from a domain you've verified with them.
      // "onboarding@resend.dev" works for testing without domain setup.
      from: process.env.RESEND_FROM_EMAIL || "New Wave Exterior <onboarding@resend.dev>",
      to: siteConfig.leadRecipientEmail,
      replyTo: data.email || undefined,
      subject,
      text,
    });

    if (error) {
      console.error("[quote] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We couldn't send that automatically. Please call or text us directly so we don't miss your request.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[quote] Unexpected error sending email:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong on our end. Please call or text us directly so we don't miss your request.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
