import { projectsContent } from "@/content/projects";
import { impactMetricsContent } from "@/content/impact";
import {
  ImpactMetricSchema,
  ProjectSchema,
} from "@/lib/validation/schemas";
import { Project, ProjectCategory, ProjectStatus } from "@/types";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Education",
  "Children and Youth",
  "Community Development",
  "Humanitarian Assistance",
  "Other",
];

export const PROJECT_STATUSES: ProjectStatus[] = [
  "Planned",
  "Fundraising",
  "In Progress",
  "Completed",
];

export function getAllProjects(): Project[] {
  return projectsContent.filter((p) => p.publicationStatus !== "archived");
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.isFeatured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function validateAllContent(): {
  valid: boolean;
  projectErrors: string[];
  metricErrors: string[];
} {
  const projectErrors: string[] = [];
  const metricErrors: string[] = [];

  for (const project of projectsContent) {
    const res = ProjectSchema.safeParse(project);
    if (!res.success) {
      projectErrors.push(
        `Project "${project.id}": ${res.error.issues.map((i) => i.message).join(", ")}`
      );
    }
  }

  for (const metric of impactMetricsContent) {
    const res = ImpactMetricSchema.safeParse(metric);
    if (!res.success) {
      metricErrors.push(
        `Metric "${metric.id}": ${res.error.issues.map((i) => i.message).join(", ")}`
      );
    }
  }

  return {
    valid: projectErrors.length === 0 && metricErrors.length === 0,
    projectErrors,
    metricErrors,
  };
}
