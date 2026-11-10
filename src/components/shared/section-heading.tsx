import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest",
            isDark ? "text-[#D6A84B]" : "text-[#16856A]"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isDark ? "bg-[#D6A84B]" : "bg-[#16856A]"
            )}
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl font-bold tracking-tight sm:text-4xl",
          isDark ? "text-white" : "text-[#102A43]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isDark ? "text-slate-200" : "text-[#243746]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
