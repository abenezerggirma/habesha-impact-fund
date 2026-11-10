import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ArrowRight, ShieldCheck } from "lucide-react";

interface DonationCtaProps {
  title?: string;
  description?: string;
  projectSlug?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function DonationCta({
  title = "Partner With Us to Build Lasting Opportunity",
  description = "Whether supporting educational infrastructure, providing learning materials for children, or volunteering your expertise, your engagement helps turn shared vision into accountable community action.",
  projectSlug,
  primaryLabel = "Explore Ways to Give",
  secondaryLabel = "Get Involved",
  secondaryHref = "/get-involved",
}: DonationCtaProps) {
  const donateHref = projectSlug
    ? `/donate?project=${encodeURIComponent(projectSlug)}`
    : "/donate";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#102A43] px-6 py-12 text-white shadow-lg sm:px-12 sm:py-16">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#16856A]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#D6A84B]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6A84B]/40 bg-white/5 px-3.5 py-1 text-xs font-semibold text-[#D6A84B]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Transparent Philanthropy • Accountable Stewardship</span>
        </div>

        <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="donate" size="lg">
            <Link href={donateHref}>
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              <span>{primaryLabel}</span>
            </Link>
          </Button>

          <Button asChild variant="outlineLight" size="lg">
            <Link href={secondaryHref}>
              <span>{secondaryLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
