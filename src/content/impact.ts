import { ImpactMetric } from "@/types";

/**
 * Impact Metrics & Reporting Commitments
 *
 * IMPORTANT: Never invent impact numbers, completed projects, or financial disbursements.
 * All metrics must be sourced from verified content records.
 * When `verifiedImpactMetrics` has no verified records (`verificationStatus === "verified"`),
 * the application displays our Mission Commitments and Reporting Framework instead.
 */
export const impactMetricsContent: ImpactMetric[] = [
  {
    id: "metric-projects-supported",
    metricName: "Projects Supported",
    value: null,
    reportingPeriod: "Foundational Phase (2026)",
    source: "Internal Project Registry",
    verificationStatus: "commitment",
    description:
      "2 initial project configurations (Classroom Construction in Ethiopia & Supporting Children in Need) are currently in draft planning. Verified counts will be published only after project execution begins.",
  },
  {
    id: "metric-communities-reached",
    metricName: "Communities Reached",
    value: null,
    reportingPeriod: "Foundational Phase (2026)",
    source: "Partner Verification Records",
    verificationStatus: "commitment",
    description:
      "Partner site evaluations are underway in Ethiopia. We report community reach strictly after on-the-ground programs are active and documented.",
  },
  {
    id: "metric-funds-distributed",
    metricName: "Funds Distributed",
    value: null,
    reportingPeriod: "FY 2026",
    source: "Treasurer Financial Ledger",
    verificationStatus: "commitment",
    description:
      "No charitable disbursements have been made yet during this initial organizational setup phase. Every future grant and project disbursement will be documented here.",
  },
  {
    id: "metric-reporting-cadence",
    metricName: "Transparency Standard",
    value: "100% Milestone-Based",
    reportingPeriod: "Ongoing Commitment",
    source: "Board Governance Charter",
    verificationStatus: "commitment",
    description:
      "All active campaigns commit to publishing chronological updates, budget allocations, and verified completion documentation.",
  },
];

export const impactMilestonesContent = [
  {
    phase: "Phase 1 — Foundation & Governance",
    status: "In Progress",
    title: "Organizational Formation & Compliance",
    description:
      "Incorporation as a California nonprofit public benefit corporation, establishment of governance policies, and design of transparent project reporting standards.",
  },
  {
    phase: "Phase 2 — Partner Due Diligence & Project Scoping",
    status: "Planned",
    title: "Vetting Local Implementation Partners",
    description:
      "Evaluating school sites, local community stewards, and construction/distribution safeguards for our initial draft initiatives in Ethiopia.",
  },
  {
    phase: "Phase 3 — Verified Campaign Launch",
    status: "Planned",
    title: "Opening Approved Fundraising Campaigns",
    description:
      "Activating hosted donation channels and launching community fundraising once payment provider verification and regulatory disclosures are finalized.",
  },
  {
    phase: "Phase 4 — Implementation & Public Reporting",
    status: "Planned",
    title: "Disbursement, Execution & Impact Audits",
    description:
      "Publishing chronological field updates, financial allocation summaries, and annual impact documentation accessible to all supporters.",
  },
];
