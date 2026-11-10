"use client";

import * as React from "react";
import { NewsletterFormSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Info, Mail } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "subscribed" | "not_configured";
    message?: string;
  }>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus({ type: "idle" });

    const parsed = NewsletterFormSchema.safeParse({ email, honeypot });
    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message || "Please enter a valid email address."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json();

      if (response.status === 200 && data.subscribed === true) {
        setStatus({
          type: "subscribed",
          message:
            data.message ||
            "Thank you for subscribing to Habesha Impact Fund updates.",
        });
        setEmail("");
      } else {
        setStatus({
          type: "not_configured",
          message:
            data.message ||
            "Newsletter subscription storage is not yet connected to an email marketing provider. Your email address was not saved. Please check back when our mailing list launches or reach out via our Contact page.",
        });
      }
    } catch {
      setError("Unable to process request right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs sm:p-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16856A]">
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Community Dispatches</span>
          </div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
            Stay Informed on Project Milestones
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#243746]">
            Receive periodic updates when new project proposals are approved, fundraising
            campaigns open, and verified field reports are published.
          </p>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="newsletter-hp">Leave empty</label>
              <input
                id="newsletter-hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter updates
              </Label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting}
                  className="shrink-0"
                >
                  {isSubmitting ? "Checking..." : "Subscribe"}
                </Button>
              </div>
              {error ? (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {error}
                </p>
              ) : null}
            </div>

            {status.type === "subscribed" ? (
              <div
                role="status"
                className="flex items-start gap-2 rounded-lg border border-[#16856A]/30 bg-[#16856A]/10 p-3 text-xs text-[#102A43]"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#16856A]"
                  aria-hidden="true"
                />
                <span>{status.message}</span>
              </div>
            ) : null}

            {status.type === "not_configured" ? (
              <div
                role="status"
                className="flex items-start gap-2 rounded-lg border border-amber-400/50 bg-amber-50 p-3 text-xs text-amber-950"
              >
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-800"
                  aria-hidden="true"
                />
                <span>{status.message}</span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
