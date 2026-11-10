import { NextRequest, NextResponse } from "next/server";
import { NewsletterFormSchema } from "@/lib/validation/schemas";
import { getSiteSettings } from "@/config/site";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { subscribed: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const parsed = NewsletterFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        subscribed: false,
        message:
          parsed.error.issues[0]?.message || "Please enter a valid email address.",
      },
      { status: 400 }
    );
  }

  const settings = getSiteSettings();
  if (!settings.newsletterConfigured || !process.env.NEWSLETTER_WEBHOOK_URL) {
    return NextResponse.json(
      {
        subscribed: false,
        code: "NEWSLETTER_PROVIDER_NOT_CONFIGURED",
        message:
          "Newsletter subscription storage is not yet connected to an email marketing provider. Your email address was NOT saved. Please check back once our mailing list provider is active.",
      },
      { status: 503 }
    );
  }

  try {
    const resp = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: parsed.data.email,
        subscribedAt: new Date().toISOString(),
      }),
    });

    if (!resp.ok) {
      throw new Error("Webhook failed");
    }

    return NextResponse.json(
      {
        subscribed: true,
        message:
          "Thank you for subscribing to Habesha Impact Fund community dispatches.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        subscribed: false,
        message:
          "Could not complete subscription with the configured provider. Your email was not saved.",
      },
      { status: 502 }
    );
  }
}
