import { ImpactMetric } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ClipboardCheck, ShieldAlert } from "lucide-react";

interface ImpactStatisticsProps {
  metrics: ImpactMetric[];
}

export function ImpactStatistics({ metrics }: ImpactStatisticsProps) {
  const verifiedMetrics = metrics.filter(
    (m) => m.verificationStatus === "verified" && m.value !== null
  );
  const hasVerifiedImpact = verifiedMetrics.length > 0;

  return (
    <div className="space-y-6">
      {!hasVerifiedImpact ? (
        <div
          role="region"
          aria-label="Transparency and Impact Verification Notice"
          className="rounded-2xl border border-[#D6A84B]/40 bg-[#102A43] p-6 text-white shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                <span>Foundational Phase — Commitment to Verified Reporting</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                We Never Invent or Inflate Impact Metrics
              </h3>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                As a newly established California nonprofit public benefit corporation, Habesha
                Impact Fund is currently in its initial planning and project-scoping phase. Rather
                than displaying projected estimates or unverified figures, we publish our current
                foundational status and reporting commitments below.
              </p>
            </div>
            <Badge variant="gold" className="shrink-0 self-start">
              0 Completed Projects Claimed
            </Badge>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const isVerified =
            metric.verificationStatus === "verified" && metric.value !== null;

          return (
            <Card
              key={metric.id}
              className="flex flex-col justify-between border-slate-200/90 bg-white hover:border-[#16856A]/40"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={isVerified ? "emerald" : "outline"}
                    className="text-[11px]"
                  >
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Verified Metric
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3 text-[#D6A84B]" aria-hidden="true" />
                        Mission Commitment
                      </span>
                    )}
                  </Badge>
                  <span className="text-xs font-medium text-slate-500">
                    {metric.reportingPeriod}
                  </span>
                </div>
                <CardTitle className="mt-3 text-lg text-[#102A43]">
                  {metric.metricName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-serif text-2xl font-bold text-[#16856A] sm:text-3xl">
                  {metric.value !== null ? String(metric.value) : "Baseline: $0 / 0"}
                </div>
                <p className="text-sm leading-relaxed text-[#243746]">
                  {metric.description}
                </p>
                <p className="border-t border-slate-100 pt-2 text-xs text-slate-500">
                  Source: {metric.source}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
