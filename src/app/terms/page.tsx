import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use (Draft)",
  description:
    "Draft Terms of Use for the Habesha Impact Fund website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfUsePage() {
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
              These Terms of Use are draft material prepared for Habesha Impact Fund and require
              formal review and approval by legal counsel and the Board of Directors.
            </p>
          </div>
        </div>
      </div>

      <h1 className="font-serif text-3xl font-bold text-[#102A43] sm:text-4xl">
        Terms of Use (Draft)
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last Updated: November 9, 2026 • Status: Draft for Governance Review
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-[#243746] sm:p-8">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            1. Informational Purpose & Project Status
          </h2>
          <p>
            The Habesha Impact Fund website provides information regarding our mission, governance,
            and charitable project proposals. Projects marked as &ldquo;Draft&rdquo; or
            &ldquo;Planned&rdquo; represent preliminary campaign blueprints and are not presented
            as completed initiatives or active fundraising campaigns until formally approved.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            2. External Donation Links & Tax Disclosures
          </h2>
          <p>
            When online donation links are enabled, contributions are processed by external
            third-party payment platforms governed by their own terms and privacy policies.
            Visitors should review the tax status disclosures displayed on the Donate page prior to
            making a contribution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            3. Intellectual Property & Acceptable Use
          </h2>
          <p>
            All original text, branding, and illustrations on this website are the property of
            Habesha Impact Fund or used under permissive license. Visitors agree not to misuse forms,
            attempt automated scraping, or interfere with site security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#102A43]">
            4. Governing Law
          </h2>
          <p>
            These draft Terms are governed by the laws of the State of California, where Habesha
            Impact Fund is incorporated as a nonprofit public benefit corporation.
          </p>
        </section>
      </div>
    </div>
  );
}
