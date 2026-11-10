"use client";

import * as React from "react";
import { Project, ProjectCategory, ProjectStatus } from "@/types";
import { filterProjects } from "@/lib/utils";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ProjectGridProps {
  projects: Project[];
  enableFiltering?: boolean;
}

export function ProjectGrid({
  projects,
  enableFiltering = false,
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<
    ProjectCategory | "All"
  >("All");
  const [selectedStatus, setSelectedStatus] = React.useState<
    ProjectStatus | "All"
  >("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = React.useMemo(() => {
    if (!enableFiltering) {
      return projects;
    }
    return filterProjects(projects, {
      category: selectedCategory,
      status: selectedStatus,
      searchQuery,
    });
  }, [projects, enableFiltering, selectedCategory, selectedStatus, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedStatus !== "All" ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {enableFiltering ? (
        <div
          role="search"
          aria-label="Filter charitable projects"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs sm:p-6"
        >
          <div className="grid gap-5 md:grid-cols-12">
            {/* Search Input */}
            <div className="md:col-span-5">
              <Label htmlFor="project-search" className="mb-2 block">
                Search Initiatives
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="project-search"
                  type="search"
                  placeholder="Search by title, keyword, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="md:col-span-4">
              <Label htmlFor="category-filter" className="mb-2 block">
                Category
              </Label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as ProjectCategory | "All")
                }
                className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#102A43] focus-visible:border-[#16856A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A]/25"
              >
                <option value="All">All Categories</option>
                {PROJECT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div className="md:col-span-3">
              <Label htmlFor="status-filter" className="mb-2 block">
                Project Status
              </Label>
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as ProjectStatus | "All")
                }
                className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#102A43] focus-visible:border-[#16856A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A]/25"
              >
                <option value="All">All Statuses</option>
                {PROJECT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <span>
              Showing <strong>{filteredProjects.length}</strong> of{" "}
              <strong>{projects.length}</strong> configured initiatives
            </span>
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-8 px-2.5 text-xs text-[#16856A]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Filters</span>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No Matching Projects Found"
          description="No charitable initiatives match your current filter selection. Try clearing your filters to view our configured initiatives."
          actionLabel="Reset All Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
