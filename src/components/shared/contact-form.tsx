"use client";

import * as React from "react";
import { ContactFormSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Info, Mail, Send } from "lucide-react";

interface ContactFormProps {
  initialInquiryType?:
    | "General Inquiry"
    | "Partnership Inquiry"
    | "Volunteer Inquiry"
    | "Donation Question";
  initialSubject?: string;
  contactEmail?: string;
}

export function ContactForm({
  initialInquiryType = "General Inquiry",
  initialSubject = "",
  contactEmail = "info@habeshaimpact.org",
}: ContactFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [inquiryType, setInquiryType] = React.useState<
    | "General Inquiry"
    | "Partnership Inquiry"
    | "Volunteer Inquiry"
    | "Donation Question"
  >(initialInquiryType);
  const [subject, setSubject] = React.useState(initialSubject);
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<{
    status: "idle" | "delivered" | "not_configured" | "error";
    message?: string;
  }>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitState({ status: "idle" });

    // Client-side validation with Zod
    const parsed = ContactFormSchema.safeParse({
      name,
      email,
      inquiryType,
      subject,
      message,
      honeypot,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (response.status === 200 && data.delivered === true) {
        setSubmitState({
          status: "delivered",
          message:
            data.message ||
            "Thank you for contacting Habesha Impact Fund. Your message has been delivered to our team.",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else if (response.status === 503 || data.code === "PROVIDER_NOT_CONFIGURED") {
        setSubmitState({
          status: "not_configured",
          message:
            data.message ||
            "Automated email delivery is not yet configured on this server. Your message was validated, but has NOT been sent automatically. Please use the direct email link below to reach our team.",
        });
      } else {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitState({
          status: "error",
          message:
            data.message ||
            "We could not process your request right now. Please check the form fields and try again.",
        });
      }
    } catch {
      setSubmitState({
        status: "error",
        message:
          "A network error occurred while validating your submission. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `[${inquiryType}] ${subject || "Inquiry for Habesha Impact Fund"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\n${message}`
  )}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact Habesha Impact Fund"
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
    >
      {/* Honeypot field for automated spam protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website-hp">Do not fill this field</label>
        <input
          id="contact-website-hp"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name" className="mb-2 block">
            Full Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name ? (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="contact-email" className="mb-2 block">
            Email Address <span className="text-red-600">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          {fieldErrors.email ? (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-inquiry-type" className="mb-2 block">
            Inquiry Category
          </Label>
          <select
            id="contact-inquiry-type"
            name="inquiryType"
            value={inquiryType}
            onChange={(e) =>
              setInquiryType(
                e.target.value as
                  | "General Inquiry"
                  | "Partnership Inquiry"
                  | "Volunteer Inquiry"
                  | "Donation Question"
              )
            }
            className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#102A43] focus-visible:border-[#16856A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A]/25"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Partnership Inquiry">Partnership Inquiry</option>
            <option value="Volunteer Inquiry">Volunteer Inquiry</option>
            <option value="Donation Question">Donation Question</option>
          </select>
        </div>

        <div>
          <Label htmlFor="contact-subject" className="mb-2 block">
            Subject <span className="text-red-600">*</span>
          </Label>
          <Input
            id="contact-subject"
            name="subject"
            type="text"
            required
            placeholder="How can we help?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={
              fieldErrors.subject ? "contact-subject-error" : undefined
            }
          />
          {fieldErrors.subject ? (
            <p
              id="contact-subject-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {fieldErrors.subject}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="contact-message" className="mb-2 block">
          Message <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Share details about your question, partnership idea, or how you would like to get involved..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
        />
        {fieldErrors.message ? (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {submitState.status === "delivered" ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-[#16856A]/30 bg-[#16856A]/10 p-4 text-sm text-[#102A43]"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-[#16856A]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">Message Delivered</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#243746]">
              {submitState.message}
            </p>
          </div>
        </div>
      ) : null}

      {submitState.status === "not_configured" ? (
        <div
          role="alert"
          className="space-y-3 rounded-xl border border-amber-400/60 bg-amber-50/90 p-4 text-sm text-amber-950"
        >
          <div className="flex items-start gap-3">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">
                Email Delivery Provider Not Configured — Submission Not Saved
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-900">
                {submitState.message}
              </p>
            </div>
          </div>
          <div>
            <Button asChild variant="default" size="sm">
              <a href={mailtoHref}>
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Send via Your Email Client ({contactEmail})</span>
              </a>
            </Button>
          </div>
        </div>
      ) : null}

      {submitState.status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">Unable to Submit Form</p>
            <p className="mt-0.5 text-xs leading-relaxed">{submitState.message}</p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          We respect your privacy and never sell or rent your contact information.
        </p>
        <Button
          type="submit"
          variant="donate"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>{isSubmitting ? "Validating..." : "Send Message"}</span>
        </Button>
      </div>
    </form>
  );
}
