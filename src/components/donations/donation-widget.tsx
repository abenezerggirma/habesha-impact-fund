"use client";

import * as React from "react";
import Link from "next/link";
import {
  SUGGESTED_DONATION_AMOUNTS,
  resolveDonationCheckout,
  validateDonationAmount,
} from "@/lib/donations";
import { formatCurrency } from "@/lib/utils";
import { DonationFrequency, Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  HeartHandshake,
  Info,
  Lock,
  Mail,
  ShieldAlert,
} from "lucide-react";

interface DonationWidgetProps {
  projects: Project[];
  initialProjectSlug?: string;
}

export function DonationWidget({
  projects,
  initialProjectSlug,
}: DonationWidgetProps) {
  const validInitialSlug = projects.some((p) => p.slug === initialProjectSlug)
    ? (initialProjectSlug as string)
    : "general";

  const [frequency, setFrequency] = React.useState<DonationFrequency>("one-time");
  const [selectedPreset, setSelectedPreset] = React.useState<number | "custom">(
    100
  );
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [designation, setDesignation] = React.useState<string>(validInitialSlug);

  const effectiveAmount =
    selectedPreset === "custom" ? Number(customAmount) : selectedPreset;

  const amountValidation = validateDonationAmount(effectiveAmount);

  const resolution = React.useMemo(
    () =>
      resolveDonationCheckout({
        amount: amountValidation.valid ? effectiveAmount : undefined,
        frequency,
        designation,
      }),
    [amountValidation.valid, effectiveAmount, frequency, designation]
  );

  // Ensure recurring tab resets if recurring is not supported
  React.useEffect(() => {
    if (!resolution.supportsRecurring && frequency === "monthly") {
      setFrequency("one-time");
    }
  }, [resolution.supportsRecurring, frequency]);

  return (
    <Card className="border-slate-200/90 bg-white shadow-md">
      <CardHeader className="border-b border-slate-100 bg-[#F8FAFC] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="emerald" className="gap-1.5">
            <Lock className="h-3 w-3" aria-hidden="true" />
            <span>Zero Card Storage on This Site</span>
          </Badge>
          <Badge variant={resolution.isConfigured ? "gold" : "draft"}>
            {resolution.isConfigured
              ? "Hosted Checkout Active"
              : "Provider Setup Pending"}
          </Badge>
        </div>

        <CardTitle className="mt-3 font-serif text-2xl text-[#102A43]">
          Configure Your Contribution
        </CardTitle>
        <CardDescription className="text-sm text-[#243746]">
          Select a suggested contribution level and fund designation. All transactions are
          processed exclusively through verified external payment links when active.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Step 1: Frequency Selection */}
        <div className="space-y-2.5">
          <Label className="block text-sm font-semibold text-[#102A43]">
            1. Contribution Frequency
          </Label>
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Donation frequency">
            <button
              type="button"
              onClick={() => setFrequency("one-time")}
              aria-pressed={frequency === "one-time"}
              className={`flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] ${
                frequency === "one-time"
                  ? "border-[#16856A] bg-[#16856A]/10 text-[#102A43]"
                  : "border-slate-200 bg-white text-[#243746] hover:bg-slate-50"
              }`}
            >
              <span>One-Time Gift</span>
              <span className="mt-0.5 text-[11px] font-normal text-slate-600">
                Single contribution
              </span>
            </button>

            <button
              type="button"
              disabled={!resolution.supportsRecurring}
              onClick={() => {
                if (resolution.supportsRecurring) {
                  setFrequency("monthly");
                }
              }}
              aria-pressed={frequency === "monthly"}
              aria-disabled={!resolution.supportsRecurring}
              className={`flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] ${
                !resolution.supportsRecurring
                  ? "cursor-not-allowed border-slate-200 bg-slate-100/70 text-slate-400"
                  : frequency === "monthly"
                    ? "border-[#16856A] bg-[#16856A]/10 text-[#102A43]"
                    : "border-slate-200 bg-white text-[#243746] hover:bg-slate-50"
              }`}
            >
              <span>Monthly Giving</span>
              <span className="mt-0.5 text-[11px] font-normal">
                {resolution.supportsRecurring
                  ? "Recurring monthly support"
                  : "Requires recurring provider"}
              </span>
            </button>
          </div>
          {!resolution.supportsRecurring ? (
            <p className="text-xs text-slate-500">
              Note: Monthly recurring donations will become selectable once a recurring-capable
              payment provider is configured and enabled.
            </p>
          ) : null}
        </div>

        {/* Step 2: Suggested Donation Amounts */}
        <div className="space-y-2.5">
          <Label className="block text-sm font-semibold text-[#102A43]">
            2. Suggested Contribution Amount (USD)
          </Label>
          <div
            className="grid grid-cols-3 gap-2.5 sm:grid-cols-6"
            role="group"
            aria-label="Suggested donation amounts"
          >
            {SUGGESTED_DONATION_AMOUNTS.map((amt) => {
              const isSelected = selectedPreset === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(amt);
                    setCustomAmount("");
                  }}
                  aria-pressed={isSelected}
                  className={`flex h-12 items-center justify-center rounded-lg border text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] ${
                    isSelected
                      ? "border-[#16856A] bg-[#16856A] text-white shadow-2xs"
                      : "border-slate-300 bg-white text-[#102A43] hover:border-[#16856A]/60 hover:bg-[#F8FAFC]"
                  }`}
                >
                  {formatCurrency(amt)}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setSelectedPreset("custom")}
              aria-pressed={selectedPreset === "custom"}
              className={`flex h-12 items-center justify-center rounded-lg border text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] ${
                selectedPreset === "custom"
                  ? "border-[#16856A] bg-[#16856A] text-white shadow-2xs"
                  : "border-slate-300 bg-white text-[#102A43] hover:border-[#16856A]/60 hover:bg-[#F8FAFC]"
              }`}
            >
              Custom
            </button>
          </div>

          {selectedPreset === "custom" ? (
            <div className="mt-3">
              <Label htmlFor="custom-donation-amount" className="mb-1.5 block text-xs">
                Enter Custom Amount (USD)
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  $
                </span>
                <Input
                  id="custom-donation-amount"
                  type="number"
                  min={5}
                  max={100000}
                  step={1}
                  placeholder="Enter amount (e.g. 75)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
              {!amountValidation.valid && customAmount.length > 0 ? (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {amountValidation.error}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Step 3: Designation */}
        <div className="space-y-2">
          <Label htmlFor="donation-designation" className="block text-sm font-semibold text-[#102A43]">
            3. Fund Designation
          </Label>
          <select
            id="donation-designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#102A43] focus-visible:border-[#16856A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A]/25"
          >
            <option value="general">General Fund — Where Most Needed</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.slug}>
                {proj.title}{" "}
                {proj.publicationStatus === "draft" || proj.status === "Planned"
                  ? "(Draft / Planning Stage)"
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Resolution Action or Honest Status Notice */}
        <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
          {resolution.isConfigured && resolution.checkoutUrl && amountValidation.valid ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">Selected Gift:</span>
                <span className="font-serif text-xl font-bold text-[#102A43]">
                  {formatCurrency(effectiveAmount)}{" "}
                  <span className="font-sans text-xs font-normal text-slate-500">
                    ({frequency === "monthly" ? "Monthly" : "One-time"})
                  </span>
                </span>
              </div>

              <Button asChild variant="donate" size="lg" className="w-full">
                <a
                  href={resolution.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Continue to Secure Checkout ({formatCurrency(effectiveAmount)})
                  </span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <p className="text-center text-xs text-slate-600">
                {resolution.statusMessage}
              </p>
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <ShieldAlert
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84B]"
                  aria-hidden="true"
                />
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#102A43]">
                    External Donation Checkout Not Yet Enabled
                  </h4>
                  <p className="text-xs leading-relaxed text-[#243746]">
                    {resolution.statusMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="default" size="default" className="flex-1">
                  <Link
                    href={`/contact?type=${encodeURIComponent(
                      "Donation Question"
                    )}&subject=${encodeURIComponent(
                      `Contribution Inquiry: ${resolution.designationLabel} (${
                        amountValidation.valid ? formatCurrency(effectiveAmount) : "$100"
                      })`
                    )}`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Contact Us About Pledging Support</span>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="default">
                  <Link href="/projects">Explore Draft Initiatives</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Legal & Tax Status Disclosure */}
        <div className="flex items-start gap-2.5 rounded-lg border border-slate-200/80 bg-white p-3.5 text-xs leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#102A43]" aria-hidden="true" />
          <p>{resolution.taxDisclaimer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
