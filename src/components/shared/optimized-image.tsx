import Image from "next/image";
import { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface OptimizedImageProps {
  image: ImageAsset;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  showCaption?: boolean;
  aspectRatio?: "video" | "square" | "wide" | "auto";
}

export function OptimizedImage({
  image,
  priority = false,
  className,
  imageClassName,
  showCaption = true,
  aspectRatio = "video",
}: OptimizedImageProps) {
  const aspectClass =
    aspectRatio === "video"
      ? "aspect-16/10"
      : aspectRatio === "square"
        ? "aspect-square"
        : aspectRatio === "wide"
          ? "aspect-21/9"
          : "";

  return (
    <figure className={cn("group relative overflow-hidden rounded-xl", className)}>
      <div className={cn("relative w-full overflow-hidden bg-[#102A43]", aspectClass)}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width || 1200}
          height={image.height || 800}
          priority={priority}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none",
            imageClassName
          )}
        />
        {image.isIllustrative ? (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#102A43]/85 px-3 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-xs border border-white/15">
            <Info className="h-3 w-3 text-[#D6A84B]" aria-hidden="true" />
            <span>Illustrative Concept</span>
          </div>
        ) : null}
      </div>
      {showCaption && (image.caption || image.credit) ? (
        <figcaption className="mt-2 flex flex-col justify-between gap-1 text-xs text-slate-600 sm:flex-row sm:items-center">
          {image.caption ? <span>{image.caption}</span> : null}
          {image.credit ? (
            <span className="font-medium text-slate-500">{image.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
