import Link from "next/link";
import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ImpactStatistics } from "@/components/shared/impact-statistics";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { DonationCta } from "@/components/donations/donation-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProjects } from "@/lib/projects";
import { organizationContent } from "@/content/organization";
import { impactMetricsContent } from "@/content/impact";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Compass,
  HandHeart,
  Handshake,
  HeartHandshake,
  LineChart,
  Megaphone,
  School,
  Sparkles,
  Users,
} from "lucide-react";

const focusPillars = [
  {
    title: "Educational Infrastructure",
    description:
      "Supporting classroom construction, durable furnishings, and safe learning spaces for students in underserved communities.",
    icon: School,
  },
  {
    title: "Support for Underserved Children",
    description:
      "Providing foundational learning kits, school supplies, and community-coordinated support that helps children stay in school.",
    icon: BookOpen,
  },
  {
    title: "Community Development",
    description:
      "Investing in practical, locally guided programs that strengthen community resilience in Ethiopia and within the diaspora.",
    icon: Users,
  },
  {
    title: "Accountable Partnerships",
    description:
      "Collaborating with vetted charitable organizations and local stewards committed to milestone-based transparency.",
    icon: Handshake,
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Discover a Cause",
    description:
      "Explore structured charitable initiatives with clear problem statements, transparent budget frameworks, and defined community goals.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Make a Contribution",
    description:
      "Support an approved project or contribute to our General Fund through secure, externally hosted donation channels once active.",
    icon: HeartHandshake,
  },
  {
    step: "03",
    title: "Follow the Impact",
    description:
      "Track chronological project updates, milestone verifications, and transparent reporting from planning through completion.",
    icon: LineChart,
  },
];

const getInvolvedWays = [
  {
    title: "Individual Donations",
    description:
      "Support project-specific campaigns or general mission operations as approved initiatives open for funding.",
    href: "/donate",
    cta: "Give or Pledge",
    icon: HandHeart,
  },
  {
    title: "Corporate Matching",
    description:
      "Learn how employees can inquire with their employer's philanthropy program once tax-exemption verification is completed.",
    href: "/get-involved#corporate-matching",
    cta: "Learn About Matching",
    icon: Building2,
  },
  {
    title: "Volunteering",
    description:
      "Contribute professional skills in engineering, education, communications, legal compliance, or community outreach.",
    href: "/get-involved#volunteer",
    cta: "Volunteer With Us",
    icon: Sparkles,
  },
  {
    title: "Charitable Partnerships",
    description:
      "Connect your school, community organization, or NGO with Habesha Impact Fund to explore collaborative initiatives.",
    href: "/get-involved#partner",
    cta: "Explore Partnerships",
    icon: Handshake,
  },
  {
    title: "Community Fundraising",
    description:
      "Mobilize your local network, diaspora association, or family milestone to champion educational and youth initiatives.",
    href: "/get-involved#fundraise",
    cta: "Fundraise With Us",
    icon: Megaphone,
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        badgeText="Habesha Impact Fund • California Nonprofit Public Benefit Corporation"
        headline="Together, We Can Create Lasting Impact."
        subheadline="Connecting generosity with meaningful opportunities to support education, children, and communities in need."
        primaryCta={{
          label: "Support a Project",
          href: "/projects",
        }}
        secondaryCta={{
          label: "Explore Our Mission",
          href: "/about",
        }}
      />

      {/* 2. Mission & Identity Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-6">
              <SectionHeading
                eyebrow="Our Mission & Purpose"
                title="Bridging Diaspora Generosity With Accountable Action"
                description={organizationContent.mission}
              />
              <p className="text-base leading-relaxed text-[#243746]">
                {organizationContent.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild variant="default">
                  <Link href="/about">
                    <span>About Our Foundation</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/impact">Our Transparency Standards</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
              {focusPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.title}
                    className="border-slate-200/90 bg-white transition-all hover:border-[#16856A]/40"
                  >
                    <CardHeader className="pb-2">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#102A43] text-[#D6A84B]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-[#243746]">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Section */}
      <section className="border-y border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Initiatives"
              title="Initial Charitable Project Configurations"
              description="Explore our inaugural project blueprints focused on classroom construction and supporting underserved children in Ethiopia. Note: These initiatives are currently in the planning stage as draft configurations prior to active fundraising launch."
            />
            <div className="shrink-0">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <span>View All Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <ProjectGrid projects={featuredProjects} enableFiltering={false} />
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="bg-[#102A43] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A Clear, Transparent Path From Generosity to Impact"
            description="Every initiative is structured around clarity, verifiable milestones, and honest communication with our supporters."
            align="center"
            tone="dark"
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16856A] text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="font-serif text-3xl font-bold text-[#D6A84B]/80">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Impact & Commitments Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Accountability & Stewardship"
              title="Our Impact & Reporting Commitments"
              description="We believe credibility begins with honesty. Every metric below is sourced directly from our verified organizational records."
            />
            <Button asChild variant="outline" className="shrink-0 self-start md:self-auto">
              <Link href="/impact">
                <span>View Full Impact Framework</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ImpactStatistics metrics={impactMetricsContent} />
        </div>
      </section>

      {/* 6. Get Involved Section */}
      <section className="border-t border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Community Participation"
            title="Ways to Get Involved"
            description="Meaningful change requires diverse forms of generosity—from individual giving and professional volunteering to community partnerships."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getInvolvedWays.map((way) => {
              const Icon = way.icon;
              return (
                <Card
                  key={way.title}
                  className="flex flex-col justify-between border-slate-200/90 bg-[#F8FAFC]"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#16856A]/15 text-[#16856A]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{way.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-[#243746]">
                      {way.description}
                    </p>
                    <Link
                      href={way.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16856A] hover:underline"
                    >
                      <span>{way.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}

            {/* Special Diaspora & Community Card */}
            <Card className="flex flex-col justify-between border-[#D6A84B]/50 bg-[#102A43] text-white">
              <CardHeader>
                <Badge variant="gold" className="w-fit">
                  Diaspora & Allies
                </Badge>
                <CardTitle className="mt-3 text-lg text-white">
                  Have a Community Initiative in Mind?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-200">
                  We welcome dialogue with educators, community organizers, and nonprofit
                  stewards working to uplift underserved communities.
                </p>
                <Button asChild variant="gold" size="sm" className="w-full">
                  <Link href="/contact?type=Partnership%20Inquiry">
                    <span>Start a Conversation</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Donation CTA & Newsletter Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DonationCta />
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
