import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { formatCurrency } from "@/lib/utils";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { ImageGallery } from "@/components/shared/image-gallery";
import { FundraisingProgressBar } from "@/components/projects/fundraising-progress-bar";
import { ProjectUpdateTimeline } from "@/components/projects/project-update-timeline";
import { ShareProject } from "@/components/projects/share-project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  HeartHandshake,
  Info,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} (${project.status})`,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Habesha Impact Fund`,
      description: project.shortDescription,
      images: [project.coverImage.src],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isDraft =
    project.publicationStatus === "draft" || project.status === "Planned";

  return (
    <div className="pb-20">
      {/* Project Hero Banner */}
      <section className="bg-[#102A43] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84B] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="emerald">{project.category}</Badge>
            <Badge variant={isDraft ? "draft" : "gold"}>
              {isDraft
                ? `Draft Configuration • ${project.status}`
                : project.status}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-[#D6A84B]" aria-hidden="true" />
              {project.location}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content + Fundraising Sidebar */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Project Details */}
          <div className="space-y-10 lg:col-span-8">
            <OptimizedImage image={project.coverImage} priority />

            {/* Draft Campaign Notice */}
            {isDraft ? (
              <div
                role="region"
                aria-label="Draft Campaign Notice"
                className="flex items-start gap-3 rounded-2xl border border-amber-400/60 bg-amber-50 p-5 text-sm text-amber-950"
              >
                <Info
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-bold">Draft Campaign Configuration</p>
                  <p className="text-xs leading-relaxed text-amber-900 sm:text-sm">
                    {project.transparencyNotes}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Project Overview */}
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#102A43]">
                  Initiative Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#243746]">
                  {project.description}
                </p>
              </div>

              <div className="grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-2">
                <div className="rounded-xl bg-[#F8FAFC] p-5">
                  <h3 className="font-serif text-lg font-bold text-[#102A43]">
                    The Challenge
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#243746]">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FAFC] p-5">
                  <h3 className="font-serif text-lg font-bold text-[#16856A]">
                    Proposed Solution
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#243746]">
                    {project.proposedSolution}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-5">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#102A43]">
                  <Users className="h-5 w-5 text-[#16856A]" aria-hidden="true" />
                  <h3>Who Benefits</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#243746]">
                  {project.beneficiaries}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#102A43]">
                  Key Project Goals & Milestones
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.projectGoals.map((goalItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[#243746]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#16856A]"
                        aria-hidden="true"
                      />
                      <span>{goalItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Transparency & Estimated Fund Allocation */}
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <ShieldCheck
                  className="h-6 w-6 text-[#16856A]"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-2xl font-bold text-[#102A43]">
                  Transparency & Estimated Fund Allocation
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-[#243746]">
                Implementation Partner Status:{" "}
                <strong className="text-[#102A43]">
                  {project.implementationPartner || "Vetting in progress"}
                </strong>
              </p>

              {project.fundAllocation && project.fundAllocation.length > 0 ? (
                <div className="space-y-4">
                  {project.fundAllocation.map((item) => (
                    <div
                      key={item.category}
                      className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-center justify-between text-sm font-bold text-[#102A43]">
                        <span>{item.category}</span>
                        <span className="text-[#16856A]">{item.percentage}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-[#102A43]"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Concept Gallery */}
            <ImageGallery
              images={project.galleryImages}
              title="Concept & Planning Illustrations"
            />

            {/* Chronological Project Updates */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#102A43]">
                Project Updates & Timeline
              </h2>
              <ProjectUpdateTimeline updates={project.updates} />
            </div>
          </div>

          {/* Right Column: Fundraising Panel & Share */}
          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <Card className="border-slate-200 bg-white shadow-md">
                <CardHeader className="border-b border-slate-100 bg-[#F8FAFC]">
                  <Badge
                    variant={isDraft ? "draft" : "emerald"}
                    className="w-fit"
                  >
                    {isDraft
                      ? "Draft Target Configuration"
                      : "Active Campaign"}
                  </Badge>
                  <CardTitle className="mt-2 font-serif text-2xl">
                    Fundraising Summary
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <FundraisingProgressBar
                    goal={project.goal}
                    verifiedAmountRaised={project.verifiedAmountRaised}
                    isDraft={isDraft}
                  />

                  <div className="rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#243746]">
                    <p>
                      <strong>Initial Target:</strong>{" "}
                      {formatCurrency(project.goal)}
                    </p>
                    <p className="mt-1">
                      <strong>Verified Raised:</strong>{" "}
                      {project.verifiedAmountRaised !== null
                        ? formatCurrency(project.verifiedAmountRaised)
                        : "$0 (Campaign not yet open)"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="donate"
                      size="lg"
                      className="w-full"
                    >
                      <Link href={`/donate?project=${project.slug}`}>
                        <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {isDraft
                            ? "Inquire or Pledge Support"
                            : "Donate to This Project"}
                        </span>
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="default"
                      className="w-full"
                    >
                      <Link
                        href={`/contact?type=Partnership%20Inquiry&subject=${encodeURIComponent(
                          `Project Inquiry: ${project.title}`
                        )}`}
                      >
                        Ask a Question About This Initiative
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <ShareProject
                title={project.title}
                slug={project.slug}
                summary={project.shortDescription}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
