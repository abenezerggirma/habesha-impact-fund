import {
  calculateFundraisingProgress,
  formatCurrency,
  cn,
} from "@/lib/utils";

interface FundraisingProgressBarProps {
  goal: number;
  verifiedAmountRaised: number | null;
  statusLabel?: string;
  isDraft?: boolean;
  className?: string;
}

export function FundraisingProgressBar({
  goal,
  verifiedAmountRaised,
  isDraft = false,
  className,
}: FundraisingProgressBarProps) {
  const progress = calculateFundraisingProgress(goal, verifiedAmountRaised);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <div>
          {progress.hasVerifiedAmount ? (
            <>
              <span className="font-bold text-[#102A43]">
                {formatCurrency(progress.verifiedRaised)}
              </span>{" "}
              <span className="text-slate-600">verified raised</span>
            </>
          ) : (
            <span className="text-xs font-semibold text-slate-600">
              {isDraft
                ? "Draft Target (Campaign Not Yet Active)"
                : "Verified Raised: $0"}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">Goal: </span>
          <span className="font-bold text-[#102A43]">
            {formatCurrency(progress.goal)}
          </span>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label="Campaign fundraising progress"
        aria-valuenow={progress.displayPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-[#16856A] transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${progress.displayPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {progress.hasVerifiedAmount
            ? `${progress.percentage}% of goal verified`
            : "0% — Awaiting campaign launch"}
        </span>
        {isDraft ? (
          <span className="font-medium text-amber-800">Planning Stage</span>
        ) : null}
      </div>
    </div>
  );
}
