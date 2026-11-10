import { ImageAsset } from "@/types";
import { OptimizedImage } from "@/components/shared/optimized-image";

interface ImageGalleryProps {
  images: ImageAsset[];
  title?: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {title ? (
        <h3 className="font-serif text-xl font-bold text-[#102A43]">{title}</h3>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2">
        {images.map((image, idx) => (
          <OptimizedImage
            key={`${image.src}-${idx}`}
            image={image}
            aspectRatio="video"
            showCaption
          />
        ))}
      </div>
    </div>
  );
}
