import type { Metadata } from "next";
import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadershipCard } from "@/components/shared/leadership-card";
import { DonationCta } from "@/components/donations/donation-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { organizationContent } from "@/content/organization";
import { leadershipContent } from "@/content/leadership";
import {
  Eye,
  Heart,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Habesha Impact Fund's story, mission, vision, values, governance, and commitment to transparent philanthropy.",
  alternates: {
    canonical: "/about",
  },
};

const valueIconMap: Record<string, typeof Heart> = {
  Heart,
  ShieldCheck,
  Eye,
  Users,
  Sprout,
};

export default function AboutPage() {
  return (
    <div>
      <Hero
        compact
        badgeText="About Habesha Impact Fund"
        headline="Rooted in Service, Guided by Transparency."
        subheadline="Habesha Impact Fund is a California nonprofit public benefit corporation dedicated to connecting diaspora and community generosity with structured charitable initiatives."
      />

      {/* 1. Our Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Our Story"
                title="Why Habesha Impact Fund Was Founded"
              />
              <div className="mt-6 rounded-2xl border border-[#D6A84B]/40 bg-[#102A43] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
                  Legal Incorporation Status
                </p>
                <p className="mt-2 font-serif text-lg font-semibold">
                  {organizationContent.organizationType}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {organizationContent.taxStatusNotice}
                </p>
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-[#243746] lg:col-span-7">
              {organizationContent.story.map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Mission & Vision */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-slate-200 bg-[#F8FAFC] p-2">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#16856A] text-white">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="emerald" className="w-fit">
                  Our Mission
                </Badge>
                <CardTitle className="mt-3 font-serif text-2xl">
                  Purpose-Driven Philanthropy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-[#243746]">
                  {organizationContent.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-[#F8FAFC] p-2">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#102A43] text-[#D6A84B]">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="gold" className="w-fit">
                  Our Vision
                </Badge>
                <CardTitle className="mt-3 font-serif text-2xl">
                  Opportunity & Dignity for Every Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-[#243746]">
                  {organizationContent.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Principles"
            title="Our Values"
            description="Five foundational commitments guide how we select projects, steward contributions, and engage with communities."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {organizationContent.values.map((val) => {
              const Icon = valueIconMap[val.iconName] || Heart;
              return (
                <Card key={val.title} className="border-slate-200 bg-white">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#102A43] text-[#D6A84B]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{val.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-[#243746]">
                      {val.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Our Approach */}
      <section className="bg-[#102A43] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Methodology"
            title="Our Approach to Charitable Initiatives"
            description="We focus on disciplined planning, local collaboration, and clear verification at every stage."
            tone="dark"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {organizationContent.approach.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <span className="font-serif text-sm font-bold text-[#D6A84B]">
                  Principle 0{idx + 1}
                </span>
                <h3 className="mt-2 font-serif text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Leadership and Governance */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Governance & Stewardship"
            title="Leadership and Governance"
            description={organizationContent.governanceStatement}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {leadershipContent.map((member) => (
              <LeadershipCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Transparency & Accountability */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16856A]">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  <span>Transparency & Accountability</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#102A43] sm:text-3xl">
                  Our Candor & Verification Pledge
                </h2>
                <p className="text-base leading-relaxed text-[#243746]">
                  {organizationContent.transparencyCommitment}
                </p>
              </div>
              <Badge variant="emerald" className="self-start lg:self-center">
                Verified Content Architecture
              </Badge>
            </div>
          </div>

          <div className="mt-16">
            <DonationCta />
          </div>
        </div>
      </section>
    </div>
  );
}
