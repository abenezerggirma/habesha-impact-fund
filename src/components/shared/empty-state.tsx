import * as React from "react";
import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-[#F8FAFC] px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#102A43]/10 text-[#102A43]">
        <FolderSearch className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl font-bold text-[#102A43]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#243746]">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAction}
          className="mt-5"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
