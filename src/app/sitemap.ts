import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/impact",
    "/donate",
    "/get-involved",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-11-09"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticEntries, ...projectEntries];
}
