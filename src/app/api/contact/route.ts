import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validation/schemas";
import { getSiteSettings } from "@/config/site";

// Lightweight in-memory rate limiting per IP
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        delivered: false,
        code: "RATE_LIMITED",
        message:
          "Too many contact requests from this connection. Please wait a minute before trying again.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        delivered: false,
        code: "INVALID_JSON",
        message: "Invalid request payload.",
      },
      { status: 400 }
    );
  }

  const parsed = ContactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        delivered: false,
        code: "VALIDATION_ERROR",
        message: "Please correct the highlighted errors in the form.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const settings = getSiteSettings();
  if (!settings.contactDeliveryConfigured) {
    return NextResponse.json(
      {
        delivered: false,
        code: "PROVIDER_NOT_CONFIGURED",
        message:
          "Automated email delivery is not yet configured on this server. Your message was validated, but has NOT been sent automatically. Please use the direct email link below to reach our team.",
      },
      { status: 503 }
    );
  }

  const provider = process.env.CONTACT_DELIVERY_PROVIDER;

  try {
    if (provider === "webhook" && process.env.CONTACT_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "habesha-impact-fund-contact-form",
          submittedAt: new Date().toISOString(),
          name: parsed.data.name,
          email: parsed.data.email,
          inquiryType: parsed.data.inquiryType,
          subject: parsed.data.subject,
          message: parsed.data.message,
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error("Webhook delivery failed");
      }

      return NextResponse.json(
        {
          delivered: true,
          message:
            "Thank you for contacting Habesha Impact Fund. Your inquiry has been delivered.",
        },
        { status: 200 }
      );
    }

    if (provider === "resend" && process.env.RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Habesha Impact Fund <onboarding@resend.dev>",
          to: [settings.contactEmail],
          reply_to: parsed.data.email,
          subject: `[${parsed.data.inquiryType}] ${parsed.data.subject}`,
          text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nInquiry Type: ${parsed.data.inquiryType}\n\nMessage:\n${parsed.data.message}`,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error("Resend API delivery failed");
      }

      return NextResponse.json(
        {
          delivered: true,
          message:
            "Thank you for contacting Habesha Impact Fund. Your message has been delivered to our team.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        delivered: false,
        code: "PROVIDER_NOT_CONFIGURED",
        message:
          "Email delivery provider is not configured. Please email us directly.",
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      {
        delivered: false,
        code: "DELIVERY_ERROR",
        message:
          "An error occurred while delivering your message to the configured provider. Please contact us directly via email.",
      },
      { status: 502 }
    );
  }
}
