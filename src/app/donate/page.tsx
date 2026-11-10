import type { Metadata } from "next";
import { Hero } from "@/components/shared/hero";
import { DonationWidget } from "@/components/donations/donation-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProjects } from "@/lib/projects";
import { organizationContent } from "@/content/organization";
import { CheckCircle2, Lock, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Habesha Impact Fund's charitable initiatives in education, child well-being, and community development.",
  alternates: {
    canonical: "/donate",
  },
};

interface DonatePageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const { project: projectParam } = await searchParams;
  const projects = getAllProjects();

  return (
    <div>
      <Hero
        compact
        badgeText="Support Our Mission"
        headline="Invest in Education, Children, and Community Resilience."
        subheadline="Your generosity fuels accountable charitable initiatives designed to create lasting opportunity."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Interactive Donation Configuration Widget */}
            <div className="lg:col-span-7">
              <DonationWidget
                projects={projects}
                initialProjectSlug={projectParam}
              />
            </div>

            {/* Right Column: Stewardship, Security & Legal Disclosures */}
            <div className="space-y-6 lg:col-span-5">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-2.5 text-[#16856A]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Stewardship & Security
                    </span>
                  </div>
                  <CardTitle className="mt-2 font-serif text-xl">
                    How Donations Are Handled
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed text-[#243746]">
                  <div className="flex items-start gap-2.5">
                    <Lock
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#16856A]"
                      aria-hidden="true"
                    />
                    <p>
                      <strong>No Card Data Stored:</strong> Habesha Impact Fund never collects,
                      processes, or stores payment card numbers directly on this website.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#16856A]"
                      aria-hidden="true"
                    />
                    <p>
                      <strong>Hosted Provider Architecture:</strong> When online giving is active,
                      contributions are processed through externally hosted payment links (such as
                      Stripe Payment Links or PayPal Giving/Hosted Checkout).
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Scale
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#16856A]"
                      aria-hidden="true"
                    />
                    <p>
                      <strong>Honest Status Reporting:</strong> We never simulate transactions or
                      mark a contribution complete without confirmation from a verified payment
                      provider.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#D6A84B]/40 bg-[#102A43] text-white">
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-[#D6A84B]">
                    Legal Status & Tax Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  <p>{organizationContent.taxStatusNotice}</p>
                  <p className="text-slate-300">
                    For questions regarding institutional grants, offline contributions, or legal
                    documentation, please contact{" "}
                    <a
                      href={`mailto:${organizationContent.contact.email}`}
                      className="font-semibold text-[#D6A84B] underline"
                    >
                      {organizationContent.contact.email}
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
