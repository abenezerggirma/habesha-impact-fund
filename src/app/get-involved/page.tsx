import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building2,
  HandHeart,
  Handshake,
  Info,
  Megaphone,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Discover how you can support Habesha Impact Fund through donations, volunteering, corporate matching inquiries, partnerships, and community fundraising.",
  alternates: {
    canonical: "/get-involved",
  },
};

export default function GetInvolvedPage() {
  return (
    <div>
      <Hero
        compact
        badgeText="Community Engagement"
        headline="Join Us in Building Lasting Community Impact."
        subheadline="Whether contributing funds, lending your professional skills, or connecting us with local partners, your participation strengthens our mission."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {/* 1. Donate */}
          <div
            id="donate"
            className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs lg:grid-cols-12 lg:items-center sm:p-10"
          >
            <div className="space-y-4 lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16856A]">
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                <span>Direct Philanthropy</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#102A43] sm:text-3xl">
                Support a Charitable Project
              </h2>
              <p className="text-base leading-relaxed text-[#243746]">
                Contributions to Habesha Impact Fund help underwrite classroom construction,
                essential student supplies, and community development initiatives. Explore our
                donation options or inquire about pledging toward upcoming campaigns.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <Button asChild variant="donate" size="lg">
                <Link href="/donate">
                  <span>Go to Donation Page</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link href="/projects">Browse Draft Initiatives</Link>
              </Button>
            </div>
          </div>

          {/* 2. Volunteer & 3. Partner With Us & 4. Fundraise With Us */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card
              id="volunteer"
              className="flex flex-col justify-between border-slate-200 bg-white"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#102A43] text-[#D6A84B]">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="emerald" className="w-fit">
                  Time & Expertise
                </Badge>
                <CardTitle className="mt-3 font-serif text-2xl">
                  Volunteer With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-relaxed text-[#243746]">
                  We welcome volunteers across the Habesha diaspora and allied communities with
                  experience in civil engineering, education, nonprofit law, grant writing,
                  communications, and community organizing.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link href="/contact?type=Volunteer%20Inquiry&subject=Volunteer%20Interest">
                    <span>Inquire About Volunteering</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              id="partner"
              className="flex flex-col justify-between border-slate-200 bg-white"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#16856A] text-white">
                  <Handshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="gold" className="w-fit">
                  Institutional Collaboration
                </Badge>
                <CardTitle className="mt-3 font-serif text-2xl">
                  Partner With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-relaxed text-[#243746]">
                  Are you a registered charitable organization, school administrator, or community
                  development steward in Ethiopia or the United States? Connect with us to discuss
                  potential project collaborations.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link href="/contact?type=Partnership%20Inquiry&subject=Partnership%20Exploration">
                    <span>Propose a Partnership</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              id="fundraise"
              className="flex flex-col justify-between border-slate-200 bg-white"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#102A43] text-[#D6A84B]">
                  <Megaphone className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="emerald" className="w-fit">
                  Grassroots Action
                </Badge>
                <CardTitle className="mt-3 font-serif text-2xl">
                  Fundraise With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-relaxed text-[#243746]">
                  Host a community gathering, campus awareness drive, or milestone celebration in
                  support of Habesha Impact Fund&apos;s educational and youth initiatives once
                  campaigns officially open.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link href="/contact?type=General%20Inquiry&subject=Community%20Fundraising%20Inquiry">
                    <span>Plan a Community Campaign</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 5. Corporate Matching Section */}
          <div
            id="corporate-matching"
            className="rounded-3xl border border-slate-200 bg-[#102A43] p-8 text-white sm:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-4 lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span>Workplace Giving & Employer Programs</span>
                </div>
                <SectionHeading
                  title="Exploring Corporate Matching Gifts"
                  description="Many employers sponsor workplace giving and matching gift programs that amplify employee philanthropy. Here is how you can explore future eligibility with your employer."
                  tone="dark"
                />

                <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  <Info
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84B]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      Important Verification Notice
                    </p>
                    <p className="mt-1">
                      Habesha Impact Fund does <strong>not</strong> claim current approval on
                      specific employer matching platforms (such as Benevity, YourCause, or
                      CyberGrants) or federal IRS 501(c)(3) determination unless formally verified.
                      Most corporate matching programs require verified 501(c)(3) status before
                      matching disbursements can be approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 lg:col-span-4">
                <h3 className="font-serif text-lg font-bold text-white">
                  Questions From Your Workplace Giving Coordinator?
                </h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  Contact our governance team for official corporate formation details or updates
                  on our regulatory verification timeline.
                </p>
                <Button asChild variant="gold" className="w-full">
                  <Link href="/contact?type=Donation%20Question&subject=Corporate%20Matching%20Inquiry">
                    <span>Contact Governance Team</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
