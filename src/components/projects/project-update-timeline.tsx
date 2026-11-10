import { ProjectUpdate } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { CalendarDays } from "lucide-react";

interface ProjectUpdateTimelineProps {
  updates: ProjectUpdate[];
}

export function ProjectUpdateTimeline({ updates }: ProjectUpdateTimelineProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] p-6 text-sm text-[#243746]">
        No chronological field updates have been posted for this initiative yet. Updates will be
        published here as milestones are reached.
      </div>
    );
  }

  return (
    <ol className="relative border-l-2 border-[#16856A]/30 ml-3 space-y-8">
      {updates.map((update) => (
        <li key={update.id} className="ml-6">
          <span
            className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#16856A]"
            aria-hidden="true"
          />
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className=" inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <CalendarDays className="h-3.5 w-3.5 text-[#16856A]" aria-hidden="true" />
                <time dateTime={update.date}>{formatDate(update.date)}</time>
              </div>
              {update.isDraft ? (
                <Badge variant="draft">Planning Note (Draft)</Badge>
              ) : (
                <Badge variant="emerald">Verified Update</Badge>
              )}
            </div>
            <h4 className="mt-2 font-serif text-lg font-bold text-[#102A43]">
              {update.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#243746]">
              {update.content}
            </p>
            {update.images && update.images.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {update.images.map((img, i) => (
                  <OptimizedImage key={`${update.id}-img-${i}`} image={img} />
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
