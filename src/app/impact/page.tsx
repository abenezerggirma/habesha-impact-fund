import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImpactStatistics } from "@/components/shared/impact-statistics";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { DonationCta } from "@/components/donations/donation-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  impactMetricsContent,
  impactMilestonesContent,
} from "@/content/impact";
import {
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact & Accountability",
  description:
    "Review Habesha Impact Fund's verified impact records, project milestones, annual reporting commitments, and financial transparency framework.",
  alternates: {
    canonical: "/impact",
  },
};

export default function ImpactPage() {
  return (
    <div>
      <Hero
        compact
        badgeText="Results & Accountability"
        headline="Transparent Reporting, Grounded in Fact."
        subheadline="We track our progress through verified records, clear milestones, and honest disclosure of what is planned versus what has been completed."
      />

      {/* 1. Impact Metrics & Commitments */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Verified Registry"
            title="Organizational Impact & Baseline Commitments"
            description="All metrics below are sourced from our internal verification registry. While our inaugural initiatives are in the planning phase, we display our baseline status and reporting commitments."
          />

          <ImpactStatistics metrics={impactMetricsContent} />
        </div>
      </section>

      {/* 2. Project & Organizational Milestones */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Implementation Roadmap"
            title="Organizational & Project Milestones"
            description="How Habesha Impact Fund progresses from foundational governance to verified field execution."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactMilestonesContent.map((milestone) => (
              <Card
                key={milestone.phase}
                className="flex flex-col justify-between border-slate-200 bg-[#F8FAFC]"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#16856A]">
                      {milestone.phase}
                    </span>
                    <Badge
                      variant={
                        milestone.status === "In Progress" ? "gold" : "outline"
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">
                    {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-[#243746]">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Impact Stories & Community Reflections */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Field Stories"
            title="Impact Stories & Community Voices"
            description="We publish impact narratives only after initiatives are implemented and documented with participant consent."
          />

          <TestimonialCard />
        </div>
      </section>

      {/* 4. Annual Reports & Financial Transparency */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Financial Governance"
            title="Annual Reports & Financial Transparency"
            description="Our commitment to publishing financial summaries, regulatory filings, and campaign disbursement ledgers."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-slate-200 bg-[#F8FAFC]">
              <CardHeader>
                <FileText
                  className="h-8 w-8 text-[#102A43]"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-lg">
                  Annual Impact Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#243746]">
                <p>
                  Habesha Impact Fund will publish its inaugural Annual Report following the
                  conclusion of our first full fiscal year of operations.
                </p>
                <Badge variant="outline">Scheduled: Post-FY 2026</Badge>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-[#F8FAFC]">
              <CardHeader>
                <FileSpreadsheet
                  className="h-8 w-8 text-[#16856A]"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-lg">
                  Campaign Fund Accounting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#243746]">
                <p>
                  Each approved project page tracks verified funds raised alongside estimated and
                  actual cost allocations across construction, supplies, and oversight.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1 font-semibold text-[#16856A] hover:underline"
                >
                  <span>Inspect Project Budgets</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-[#F8FAFC]">
              <CardHeader>
                <ShieldCheck
                  className="h-8 w-8 text-[#D6A84B]"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-lg">
                  Corporate & Regulatory Filings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#243746]">
                <p>
                  Copies of authorized corporate governance documents and regulatory filings may
                  be requested via our Contact channel as they become publicly available.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact?type=General%20Inquiry&subject=Governance%20Documentation%20Request">
                    Request Information
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="pt-6">
            <DonationCta />
          </div>
        </div>
      </section>
    </div>
  );
}
