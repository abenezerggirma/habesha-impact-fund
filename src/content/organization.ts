import { OrganizationProfile } from "@/types";

export const organizationContent: OrganizationProfile = {
  name: "Habesha Impact Fund",
  legalName: "Habesha Impact Fund",
  legalJurisdiction: "State of California, United States",
  organizationType: "California Nonprofit Public Benefit Corporation",
  irs501c3Verified: process.env.NEXT_PUBLIC_IRS_501C3_VERIFIED === "true",
  taxId: process.env.NEXT_PUBLIC_ORGANIZATION_EIN || undefined,
  taxStatusNotice:
    "Habesha Impact Fund is incorporated as a California nonprofit public benefit corporation. Please note: Federal IRS 501(c)(3) tax-exempt status and tax deductibility of contributions are not claimed on this website until formal verification and public disclosure authorization are configured.",
  tagline: "Together, We Can Create Lasting Impact.",
  mission:
    "To support charitable initiatives benefiting underserved communities—particularly in Ethiopia and within the broader diaspora—through thoughtful fundraising, transparent partnerships, and sustained community engagement.",
  vision:
    "A world where every child and community has access to safe learning environments, essential resources, and opportunities to thrive with dignity and self-reliance.",
  description:
    "Habesha Impact Fund connects donors and supporters—especially members of the Ethiopian and Habesha diaspora—with structured, accountable charitable initiatives focused on education, child well-being, and community development.",
  story: [
    "Habesha Impact Fund was established in California as a nonprofit public benefit corporation rooted in a shared commitment to service, mutual aid, and long-term community uplift.",
    "Across the Ethiopian and Habesha diaspora, individuals and families carry a deep desire to give back to underserved communities—yet often look for a transparent, well-governed bridge that connects collective generosity with clearly defined charitable projects.",
    "Our organization was formed to build that bridge thoughtfully: prioritizing careful project selection, responsible stewardship of funds, clear documentation of project milestones, and honest communication at every stage of growth.",
  ],
  approach: [
    {
      title: "Community-Centered Selection",
      description:
        "We focus on practical initiatives identified in collaboration with local educators, community leaders, and qualified charitable partners on the ground.",
    },
    {
      title: "Phased & Accountable Funding",
      description:
        "Campaigns are structured around clear budgets, defined scopes, and verifiable milestones before funds are committed or disbursed.",
    },
    {
      title: "Transparent Reporting",
      description:
        "We distinguish clearly between planned proposals, active fundraising campaigns, and verified outcomes—never overstating accomplishments or projections.",
    },
    {
      title: "Diaspora & Ally Engagement",
      description:
        "We bring together donors, volunteers, and community advocates across the United States to mobilize resources and awareness for lasting impact.",
    },
  ],
  values: [
    {
      title: "Compassion",
      description:
        "We center empathy, human dignity, and care for underserved children and families in every initiative we design.",
      iconName: "Heart",
    },
    {
      title: "Integrity",
      description:
        "We uphold rigorous ethical standards, truthful representation, and faithful stewardship of community trust.",
      iconName: "ShieldCheck",
    },
    {
      title: "Transparency",
      description:
        "We commit to clear visibility into campaign status, project budgets, partner roles, and progress updates.",
      iconName: "Eye",
    },
    {
      title: "Community",
      description:
        "We believe lasting change grows from collective action—uniting the Habesha diaspora, local communities, and philanthropic allies.",
      iconName: "Users",
    },
    {
      title: "Sustainability",
      description:
        "We prioritize durable educational infrastructure and programs that strengthen local capacity over the long term.",
      iconName: "Sprout",
    },
  ],
  governanceStatement:
    "Habesha Impact Fund operates as a California nonprofit public benefit corporation governed by a Board of Directors dedicated to fiduciary oversight, conflict-of-interest compliance, and mission alignment. Board member profiles and formal governance charters will be published on this page upon final board authorization.",
  transparencyCommitment:
    "As an emerging charitable foundation, we believe trust is earned through candor. We do not publish unverified impact numbers, projected beneficiary counts as completed outcomes, or unconfirmed tax assertions. All project pages clearly indicate whether an initiative is in draft planning, active fundraising, or verified implementation.",
  contact: {
    email: "info@habeshaimpact.org",
    generalInquiriesEmail: "info@habeshaimpact.org",
    partnershipsEmail: "partnerships@habeshaimpact.org",
    location: "California, United States",
    mailingAddressNote:
      "Official corporate correspondence and partnership inquiries may be directed through our verified contact channel below.",
  },
  socialMedia: {},
};
