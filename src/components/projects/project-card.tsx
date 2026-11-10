import Link from "next/link";
import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { FundraisingProgressBar } from "@/components/projects/fundraising-progress-bar";
import { MapPin, ArrowRight, HeartHandshake } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isDraft =
    project.publicationStatus === "draft" || project.status === "Planned";

  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden border-slate-200/90 bg-white transition-all hover:border-[#16856A]/50 hover:shadow-md">
      <div>
        <div className="p-3 pb-0">
          <OptimizedImage
            image={project.coverImage}
            showCaption={false}
            aspectRatio="video"
          />
        </div>

        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="emerald">{project.category}</Badge>
            <div className="flex items-center gap-1.5">
              <Badge variant={isDraft ? "draft" : "gold"}>
                {isDraft ? `Draft • ${project.status}` : project.status}
              </Badge>
            </div>
          </div>

          <CardTitle className="mt-3 line-clamp-2 text-xl">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-[#16856A] focus-visible:outline-none focus-visible:underline"
            >
              {project.title}
            </Link>
          </CardTitle>

          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-[#16856A]" aria-hidden="true" />
            <span>{project.location}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-3 text-sm leading-relaxed text-[#243746]">
            {project.shortDescription}
          </p>

          <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
            <FundraisingProgressBar
              goal={project.goal}
              verifiedAmountRaised={project.verifiedAmountRaised}
              isDraft={isDraft}
            />
          </div>
        </CardContent>
      </div>

      <CardFooter className="grid grid-cols-2 gap-3 border-t border-slate-100 bg-slate-50/50 pt-4">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/projects/${project.slug}`}>
            <span>View Project</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Button>

        <Button asChild variant="donate" size="sm" className="w-full">
          <Link href={`/donate?project=${project.slug}`}>
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isDraft ? "Support / Pledge" : "Donate"}</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
