"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";

interface ShareProjectProps {
  title: string;
  slug: string;
  summary: string;
}

export function ShareProject({ title, slug, summary }: ShareProjectProps) {
  const [copied, setCopied] = React.useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/projects/${slug}`;
    }
    return `https://habeshaimpact.org/projects/${slug}`;
  };

  const handleShare = async () => {
    const url = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Habesha Impact Fund`,
          text: summary,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard copy if user cancels or share fails
      }
    }
    await handleCopy();
  };

  const handleCopy = async () => {
    const url = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
      <h4 className="font-serif text-base font-bold text-[#102A43]">
        Share This Initiative
      </h4>
      <p className="mt-1 text-xs leading-relaxed text-[#243746]">
        Help build awareness within the Habesha diaspora and broader community by sharing this
        project overview.
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex-1"
        >
          <Share2 className="h-3.5 w-3.5 text-[#16856A]" aria-hidden="true" />
          <span>Share Project</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#16856A]" aria-hidden="true" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy Link</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
