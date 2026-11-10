import { z } from "zod";

export const ImageAssetSchema = z.object({
  src: z.string().min(1, "Image source is required"),
  alt: z.string().min(5, "Accessible alternative text is required"),
  caption: z.string().optional(),
  credit: z.string().optional(),
  isIllustrative: z.boolean().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const ProjectCategorySchema = z.enum([
  "Education",
  "Children and Youth",
  "Community Development",
  "Humanitarian Assistance",
  "Other",
]);

export const ProjectStatusSchema = z.enum([
  "Planned",
  "Fundraising",
  "In Progress",
  "Completed",
]);

export const PublicationStatusSchema = z.enum([
  "draft",
  "published",
  "archived",
]);

export const ProjectUpdateSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1),
  date: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  images: z.array(ImageAssetSchema).optional(),
  isDraft: z.boolean().optional(),
});

export const FundAllocationItemSchema = z.object({
  category: z.string().min(1),
  percentage: z.number().min(0).max(100),
  description: z.string().min(1),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  category: ProjectCategorySchema,
  location: z.string().min(2),
  goal: z.number().positive("Fundraising goal must be positive"),
  verifiedAmountRaised: z.number().min(0).nullable(),
  status: ProjectStatusSchema,
  publicationStatus: PublicationStatusSchema,
  isFeatured: z.boolean(),
  coverImage: ImageAssetSchema,
  galleryImages: z.array(ImageAssetSchema),
  problemStatement: z.string().min(10),
  proposedSolution: z.string().min(10),
  beneficiaries: z.string().min(10),
  projectGoals: z.array(z.string().min(3)).min(1),
  transparencyNotes: z.string().min(10),
  implementationPartner: z.string().optional(),
  fundAllocation: z.array(FundAllocationItemSchema).optional(),
  donationLink: z.string().url().optional().or(z.literal("")),
  updates: z.array(ProjectUpdateSchema),
});

export const ImpactMetricSchema = z.object({
  id: z.string().min(1),
  metricName: z.string().min(2),
  value: z.union([z.string(), z.number(), z.null()]),
  reportingPeriod: z.string().min(2),
  source: z.string().min(2),
  verificationStatus: z.enum(["verified", "pending_verification", "commitment"]),
  description: z.string().min(5),
});

export const ContactInquiryTypeSchema = z.enum([
  "General Inquiry",
  "Partnership Inquiry",
  "Volunteer Inquiry",
  "Donation Question",
]);

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  inquiryType: ContactInquiryTypeSchema.default("General Inquiry"),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject (at least 3 characters).")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(15, "Please provide a message of at least 15 characters.")
    .max(3000, "Message must be 3,000 characters or fewer."),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const NewsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type NewsletterFormInput = z.infer<typeof NewsletterFormSchema>;
