export type ProjectCategory =
  | "Education"
  | "Children and Youth"
  | "Community Development"
  | "Humanitarian Assistance"
  | "Other";

export type ProjectStatus =
  | "Planned"
  | "Fundraising"
  | "In Progress"
  | "Completed";

export type PublicationStatus = "draft" | "published" | "archived";

export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  isIllustrative?: boolean;
  width?: number;
  height?: number;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  date: string;
  title: string;
  content: string;
  images?: ImageAsset[];
  isDraft?: boolean;
}

export interface FundAllocationItem {
  category: string;
  percentage: number;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  location: string;
  goal: number;
  verifiedAmountRaised: number | null;
  status: ProjectStatus;
  publicationStatus: PublicationStatus;
  isFeatured: boolean;
  coverImage: ImageAsset;
  galleryImages: ImageAsset[];
  problemStatement: string;
  proposedSolution: string;
  beneficiaries: string;
  projectGoals: string[];
  transparencyNotes: string;
  implementationPartner?: string;
  fundAllocation?: FundAllocationItem[];
  donationLink?: string;
  updates: ProjectUpdate[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  biography: string;
  photograph?: ImageAsset;
  isPlaceholder?: boolean;
}

export interface ImpactMetric {
  id: string;
  metricName: string;
  value: string | number | null;
  reportingPeriod: string;
  source: string;
  verificationStatus: "verified" | "pending_verification" | "commitment";
  description: string;
}

export interface OrganizationValue {
  title: string;
  description: string;
  iconName: string;
}

export interface OrganizationProfile {
  name: string;
  legalName: string;
  legalJurisdiction: string;
  organizationType: string;
  irs501c3Verified: boolean;
  taxId?: string;
  taxStatusNotice: string;
  tagline: string;
  mission: string;
  vision: string;
  description: string;
  story: string[];
  approach: {
    title: string;
    description: string;
  }[];
  values: OrganizationValue[];
  governanceStatement: string;
  transparencyCommitment: string;
  contact: {
    email: string;
    generalInquiriesEmail: string;
    partnershipsEmail: string;
    location: string;
    mailingAddressNote: string;
  };
  socialMedia: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export type DonationProviderType =
  | "none"
  | "stripe_payment_link"
  | "paypal_hosted"
  | "external_hosted";

export type DonationFrequency = "one-time" | "monthly";

export interface SiteSettings {
  siteUrl: string;
  donationProvider: DonationProviderType;
  generalDonationUrl: string;
  monthlyDonationUrl: string;
  supportsRecurringDonations: boolean;
  contactEmail: string;
  contactDeliveryConfigured: boolean;
  newsletterConfigured: boolean;
  irs501c3Verified: boolean;
  organizationEin: string;
  featureFlags: {
    enableNewsletter: boolean;
    enableOnlineDonations: boolean;
    showDraftNotices: boolean;
  };
}
