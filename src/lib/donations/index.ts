import { getSiteSettings } from "@/config/site";
import { projectsContent } from "@/content/projects";
import { DonationFrequency, DonationProviderType } from "@/types";

export const SUGGESTED_DONATION_AMOUNTS = [25, 50, 100, 250, 500] as const;

export interface DonationRequestOptions {
  amount?: number;
  frequency: DonationFrequency;
  designation: "general" | string; // "general" or project slug
}

export interface DonationResolution {
  isConfigured: boolean;
  provider: DonationProviderType;
  checkoutUrl: string | null;
  supportsRecurring: boolean;
  designationLabel: string;
  isDraftCampaign: boolean;
  statusMessage: string;
  taxDisclaimer: string;
}

export function validateDonationAmount(amount: number): {
  valid: boolean;
  error?: string;
} {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, error: "Please enter a valid donation amount greater than $0." };
  }
  if (amount < 5) {
    return { valid: false, error: "Minimum suggested online contribution is $5." };
  }
  if (amount > 100000) {
    return {
      valid: false,
      error:
        "For leadership gifts above $100,000, please contact our team directly for wire or check instructions.",
    };
  }
  return { valid: true };
}

export function resolveDonationCheckout(
  options: DonationRequestOptions
): DonationResolution {
  const settings = getSiteSettings();
  const project =
    options.designation !== "general"
      ? projectsContent.find(
          (p) => p.slug === options.designation || p.id === options.designation
        )
      : undefined;

  const designationLabel = project
    ? project.title
    : "General Fund — Where Most Needed";

  const isDraftCampaign = Boolean(
    project && (project.publicationStatus === "draft" || project.status === "Planned")
  );

  const taxDisclaimer = settings.irs501c3Verified
    ? `Habesha Impact Fund is a California nonprofit public benefit corporation with verified IRS 501(c)(3) status${
        settings.organizationEin ? ` (EIN: ${settings.organizationEin})` : ""
      }. Contributions are tax-deductible to the extent permitted by law.`
    : "Habesha Impact Fund is incorporated as a California nonprofit public benefit corporation. Federal IRS 501(c)(3) tax-exempt determination and tax deductibility of contributions are not claimed until verified documentation is published.";

  // If online donations are not configured yet
  if (!settings.featureFlags.enableOnlineDonations) {
    return {
      isConfigured: false,
      provider: settings.donationProvider,
      checkoutUrl: null,
      supportsRecurring: false,
      designationLabel,
      isDraftCampaign,
      statusMessage:
        "Online donation checkout is not yet active while our payment processor and campaign approvals are being finalized. We do not collect payment details on this site or simulate transactions. Please contact us if you would like to pledge support or receive updates when giving opens.",
      taxDisclaimer,
    };
  }

  // If a project is still in draft/planned status, do not allow active checkout unless it has an explicit verified link
  if (isDraftCampaign && !project?.donationLink?.startsWith("https://")) {
    return {
      isConfigured: false,
      provider: settings.donationProvider,
      checkoutUrl: null,
      supportsRecurring: settings.supportsRecurringDonations,
      designationLabel,
      isDraftCampaign: true,
      statusMessage: `"${designationLabel}" is currently a draft project configuration in the planning phase and is not yet open for active campaign fundraising. You may contribute to the General Fund or contact our team to express interest in supporting this initiative.`,
      taxDisclaimer,
    };
  }

  // Recurring check
  if (options.frequency === "monthly" && !settings.supportsRecurringDonations) {
    return {
      isConfigured: false,
      provider: settings.donationProvider,
      checkoutUrl: null,
      supportsRecurring: false,
      designationLabel,
      isDraftCampaign,
      statusMessage:
        "Monthly recurring donations are not yet enabled for the current payment provider configuration. Please select a one-time contribution or contact us for recurring pledge options.",
      taxDisclaimer,
    };
  }

  const baseUrl =
    options.frequency === "monthly"
      ? settings.monthlyDonationUrl
      : project?.donationLink?.startsWith("https://")
        ? project.donationLink
        : settings.generalDonationUrl;

  if (!baseUrl || !baseUrl.startsWith("https://")) {
    return {
      isConfigured: false,
      provider: settings.donationProvider,
      checkoutUrl: null,
      supportsRecurring: settings.supportsRecurringDonations,
      designationLabel,
      isDraftCampaign,
      statusMessage:
        "A verified external checkout link has not been configured for this selection yet.",
      taxDisclaimer,
    };
  }

  // Build safe external URL with query metadata if valid URL
  try {
    const url = new URL(baseUrl);
    if (options.amount && options.amount > 0) {
      url.searchParams.set("amount", String(Math.round(options.amount)));
    }
    if (options.designation && options.designation !== "general") {
      url.searchParams.set("campaign", options.designation);
    }
    return {
      isConfigured: true,
      provider: settings.donationProvider,
      checkoutUrl: url.toString(),
      supportsRecurring: settings.supportsRecurringDonations,
      designationLabel,
      isDraftCampaign,
      statusMessage:
        "You will be securely redirected to our external payment provider to complete your contribution.",
      taxDisclaimer,
    };
  } catch {
    return {
      isConfigured: false,
      provider: settings.donationProvider,
      checkoutUrl: null,
      supportsRecurring: false,
      designationLabel,
      isDraftCampaign,
      statusMessage: "Invalid payment provider URL configuration.",
      taxDisclaimer,
    };
  }
}
