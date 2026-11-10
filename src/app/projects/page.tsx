import type { Metadata } from "next";
import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { DonationCta } from "@/components/donations/donation-cta";
import { getAllProjects } from "@/lib/projects";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore Habesha Impact Fund's planned charitable initiatives in education, child support, and community development.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div>
      <Hero
        compact
        badgeText="Project Directory"
        headline="Charitable Initiatives & Campaign Blueprints"
        subheadline="Explore our structured project initiatives in Ethiopia and beyond. Filter by category or project stage to see how each initiative is designed."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-400/50 bg-amber-50/90 p-5 text-sm text-amber-950">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
              aria-hidden="true"
            />
            <div>
              <p className="font-bold">
                Transparency Notice: Draft Campaign Configurations
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-900 sm:text-sm">
                Our initial two initiatives—<strong>Classroom Construction in Ethiopia</strong>{" "}
                ($30,000 target) and <strong>Supporting Children in Need</strong> ($10,000
                target)—are currently in the <strong>Planned (Draft)</strong> stage while site
                selection, local partner vetting, and payment processor onboarding are finalized.
                No project is marked as active fundraising or completed until formally verified.
              </p>
            </div>
          </div>

          <SectionHeading
            eyebrow="Browse Initiatives"
            title="All Configured Projects"
            description="Use the search and filter controls below to explore initiatives by focus area and implementation status."
          />

          <ProjectGrid projects={projects} enableFiltering />

          <div className="pt-8">
            <DonationCta
              title="Interested in Partnering on a Project?"
              description="We welcome inquiries from local educators, community leaders, and philanthropic supporters who wish to collaborate on upcoming initiatives."
              primaryLabel="Contribute or Pledge"
              secondaryLabel="Contact Partnerships Team"
              secondaryHref="/contact?type=Partnership%20Inquiry"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
