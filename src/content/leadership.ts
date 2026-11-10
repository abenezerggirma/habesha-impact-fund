import { LeadershipMember } from "@/types";

/**
 * Leadership and Governance Content
 *
 * IMPORTANT: Do not invent names, biographies, or credentials for board members.
 * This array is intentionally populated with structured governance role placeholders
 * that clearly indicate board rosters are pending official publication authorization.
 * To add verified board members later, add records with `isPlaceholder: false`.
 */
export const leadershipContent: LeadershipMember[] = [
  {
    id: "gov-board-chair",
    name: "Board Chair / President",
    role: "Executive Governance & Strategic Oversight",
    biography:
      "Responsible for leading the Board of Directors, ensuring alignment with Habesha Impact Fund's articles of incorporation, and overseeing long-term philanthropic strategy. Verified director profile will be published upon formal onboarding authorization.",
    isPlaceholder: true,
  },
  {
    id: "gov-board-treasurer",
    name: "Board Treasurer",
    role: "Financial Stewardship & Audit Compliance",
    biography:
      "Responsible for overseeing financial controls, campaign fund accounting, regulatory filings, and transparent financial reporting. Verified director profile will be published upon formal onboarding authorization.",
    isPlaceholder: true,
  },
  {
    id: "gov-board-secretary",
    name: "Board Secretary",
    role: "Corporate Records & Governance Integrity",
    biography:
      "Responsible for maintaining corporate bylaws, board minutes, conflict-of-interest disclosures, and partner documentation. Verified director profile will be published upon formal onboarding authorization.",
    isPlaceholder: true,
  },
];
