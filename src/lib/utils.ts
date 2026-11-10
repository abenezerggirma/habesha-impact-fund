import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Project, ProjectCategory, ProjectStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  options: { maximumFractionDigits?: number } = {}
): string {
  if (!Number.isFinite(amount) || amount < 0) {
    return "$0";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

export interface FundraisingProgress {
  goal: number;
  verifiedRaised: number;
  hasVerifiedAmount: boolean;
  percentage: number;
  displayPercentage: number;
  remainingAmount: number;
}

export function calculateFundraisingProgress(
  goal: number,
  verifiedAmountRaised: number | null | undefined
): FundraisingProgress {
  const safeGoal = goal > 0 ? goal : 1;
  const hasVerifiedAmount =
    typeof verifiedAmountRaised === "number" &&
    Number.isFinite(verifiedAmountRaised) &&
    verifiedAmountRaised >= 0;

  const verifiedRaised = hasVerifiedAmount ? verifiedAmountRaised : 0;
  const rawPercentage = (verifiedRaised / safeGoal) * 100;
  const percentage = Math.max(0, Math.round(rawPercentage));
  const displayPercentage = Math.min(100, Math.max(0, Math.round(rawPercentage)));
  const remainingAmount = Math.max(0, safeGoal - verifiedRaised);

  return {
    goal: safeGoal,
    verifiedRaised,
    hasVerifiedAmount,
    percentage,
    displayPercentage,
    remainingAmount,
  };
}

export function filterProjects(
  projects: Project[],
  filters: {
    category?: ProjectCategory | "All";
    status?: ProjectStatus | "All";
    searchQuery?: string;
  }
): Project[] {
  return projects.filter((project) => {
    if (project.publicationStatus === "archived") {
      return false;
    }

    if (
      filters.category &&
      filters.category !== "All" &&
      project.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.status &&
      filters.status !== "All" &&
      project.status !== filters.status
    ) {
      return false;
    }

    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.trim().toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(q);
      const matchesDesc = project.shortDescription.toLowerCase().includes(q);
      const matchesLocation = project.location.toLowerCase().includes(q);
      const matchesCategory = project.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesLocation && !matchesCategory) {
        return false;
      }
    }

    return true;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
