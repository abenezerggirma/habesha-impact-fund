import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description:
    "Draft Privacy Policy for Habesha Impact Fund outlining data minimization, security practices, and donor privacy.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-2xl border border-amber-400/60 bg-amber-50 p-5 text-amber-950">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
            aria-hidden="true"
          />
          <div>
            <Badge variant="draft">Draft Legal Material — Subject to Legal Review</Badge>
            <p className="mt-2 text-xs leading-relaxed sm:text-sm">
              This Privacy Policy is an initial draft prepared for Habesha Impact Fund and must be
              reviewed and approved by qualified legal counsel prior to formal production
              adoption.
            </p>
          </div>
        </div>
      </div>

      <h1 className="font-serif text-3xl font-bold text-[#102A43] sm:text-4xl">
        Privacy Policy (Draft)
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last Updated: November 9, 2026 • Status: Draft for Governance Review
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-[#243746] sm:p-8">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            1. Overview & Commitment to Data Minimization
          </h2>
          <p>
            Habesha Impact Fund (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the
            Organization&rdquo;), a California nonprofit public benefit corporation, respects the
            privacy of every visitor, supporter, and community partner. We practice strict data
            minimization: we collect only the information you voluntarily provide when contacting
            us or subscribing to updates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            2. Information We Collect
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Contact Inquiries:</strong> When you submit our contact form, we process your
              name, email address, inquiry category, subject, and message content solely to respond
              to your inquiry.
            </li>
            <li>
              <strong>Newsletter Subscriptions:</strong> When an email marketing provider is
              configured and you opt in, we collect your email address to send periodic project and
              organizational updates.
            </li>
            <li>
              <strong>No Payment Card Storage:</strong> We do not collect, process, or store credit
              card numbers, bank account details, or payment credentials on this website. All
              online donations, when active, are handled through externally hosted third-party
              payment processors.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            3. How We Use & Protect Information
          </h2>
          <p>
            We never sell, rent, or trade supporter email addresses or personal information to
            third parties. We apply industry-standard security headers, input validation, and rate
            limiting to protect against unauthorized access or automated abuse.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            4. Contact Regarding Privacy
          </h2>
          <p>
            For questions regarding this draft Privacy Policy or to request deletion of any
            correspondence records, please contact{" "}
            <a
              href="mailto:info@habeshaimpact.org"
              className="font-semibold text-[#16856A] underline"
            >
              info@habeshaimpact.org
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
