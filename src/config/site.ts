import { DonationProviderType, SiteSettings } from "@/types";

function parseProvider(value: string | undefined): DonationProviderType {
  if (
    value === "stripe_payment_link" ||
    value === "paypal_hosted" ||
    value === "external_hosted"
  ) {
    return value;
  }
  return "none";
}

export function getSiteSettings(): SiteSettings {
  const provider = parseProvider(process.env.NEXT_PUBLIC_DONATION_PROVIDER);
  const generalUrl = (process.env.NEXT_PUBLIC_DONATION_GENERAL_URL || "").trim();
  const monthlyUrl = (process.env.NEXT_PUBLIC_DONATION_MONTHLY_URL || "").trim();
  const supportsRecurringEnv =
    process.env.NEXT_PUBLIC_DONATION_SUPPORTS_RECURRING === "true";

  const hasValidGeneralUrl = generalUrl.startsWith("https://");
  const hasValidMonthlyUrl = monthlyUrl.startsWith("https://");
  const enableOnlineDonations = provider !== "none" && hasValidGeneralUrl;
  const supportsRecurringDonations =
    enableOnlineDonations && supportsRecurringEnv && hasValidMonthlyUrl;

  const contactDeliveryProvider = process.env.CONTACT_DELIVERY_PROVIDER || "none";
  const contactDeliveryConfigured =
    (contactDeliveryProvider === "resend" && Boolean(process.env.RESEND_API_KEY)) ||
    (contactDeliveryProvider === "webhook" &&
      Boolean(process.env.CONTACT_WEBHOOK_URL?.startsWith("https://")));

  const newsletterProvider = process.env.NEWSLETTER_PROVIDER || "none";
  const newsletterConfigured =
    newsletterProvider === "webhook" &&
    Boolean(process.env.NEWSLETTER_WEBHOOK_URL?.startsWith("https://"));

  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://habeshaimpact.org",
    donationProvider: provider,
    generalDonationUrl: hasValidGeneralUrl ? generalUrl : "",
    monthlyDonationUrl: hasValidMonthlyUrl ? monthlyUrl : "",
    supportsRecurringDonations,
    contactEmail:
      process.env.CONTACT_RECIPIENT_EMAIL || "info@habeshaimpact.org",
    contactDeliveryConfigured,
    newsletterConfigured,
    irs501c3Verified: process.env.NEXT_PUBLIC_IRS_501C3_VERIFIED === "true",
    organizationEin: (process.env.NEXT_PUBLIC_ORGANIZATION_EIN || "").trim(),
    featureFlags: {
      enableNewsletter: true,
      enableOnlineDonations,
      showDraftNotices: true,
    },
  };
}

export const siteConfig = {
  name: "Habesha Impact Fund",
  shortName: "HIF",
  tagline: "Together, We Can Create Lasting Impact.",
  description:
    "Habesha Impact Fund is a California nonprofit public benefit corporation connecting generosity with meaningful opportunities to support education, children, and underserved communities in Ethiopia and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://habeshaimpact.org",
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Projects", href: "/projects" },
    { name: "Our Impact", href: "/impact" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ],
};
