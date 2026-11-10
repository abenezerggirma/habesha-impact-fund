import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102A43] text-[#D6A84B]">
        <Compass className="h-7 w-7" aria-hidden="true" />
      </div>
      <h1 className="font-serif text-3xl font-bold text-[#102A43] sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-[#243746]">
        We couldn&apos;t find the page you were looking for. Explore our mission, draft
        initiatives, or ways to get involved below.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild variant="default">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="donate">
          <Link href="/projects">Explore Our Projects</Link>
        </Button>
      </div>
    </div>
  );
}
