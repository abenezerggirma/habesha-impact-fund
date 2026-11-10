import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  badgeText?: string;
  headline: string;
  subheadline: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundImage?: {
    src: string;
    alt: string;
  };
  compact?: boolean;
}

export function Hero({
  badgeText = "California Nonprofit Public Benefit Corporation",
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  backgroundImage = {
    src: "/images/hero-ethiopia-highlands.svg",
    alt: "Artistic illustration of the Ethiopian highlands at sunrise with a community school silhouette",
  },
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-[#102A43] text-white ${
        compact ? "py-16 sm:py-24" : "py-20 sm:py-28 lg:py-32"
      }`}
    >
      {/* Background Image with Sophisticated Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority
          className="object-cover object-center opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#102A43] via-[#102A43]/90 to-[#102A43]/65"
          aria-hidden="true"
        />
      </div>

      {/* Subtle Gold Top Border Accent */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#16856A] via-[#D6A84B] to-[#16856A]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {badgeText ? (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/40 bg-[#102A43]/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#D6A84B] backdrop-blur-xs">
              <ShieldCheck className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
              <span>{badgeText}</span>
            </div>
          ) : null}

          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
            {headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            {subheadline}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {primaryCta ? (
                <Button asChild variant="donate" size="lg">
                  <Link href={primaryCta.href}>
                    <span>{primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}

              {secondaryCta ? (
                <Button asChild variant="outlineLight" size="lg">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
