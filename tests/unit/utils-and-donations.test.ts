import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  formatCurrency,
  calculateFundraisingProgress,
  filterProjects,
} from "@/lib/utils";
import {
  resolveDonationCheckout,
  validateDonationAmount,
} from "@/lib/donations";
import { validateAllContent, getAllProjects } from "@/lib/projects";
import { projectsContent } from "@/content/projects";

describe("Unit Tests: Currency Formatting & Fundraising Progress", () => {
  it("formats donation amounts accurately in USD", () => {
    expect(formatCurrency(25)).toBe("$25");
    expect(formatCurrency(1000)).toBe("$1,000");
    expect(formatCurrency(30000)).toBe("$30,000");
    expect(formatCurrency(0)).toBe("$0");
    expect(formatCurrency(-50)).toBe("$0");
    expect(formatCurrency(Number.NaN)).toBe("$0");
  });

  it("calculates fundraising progress accurately for verified and unverified amounts", () => {
    const unverified = calculateFundraisingProgress(30000, null);
    expect(unverified.hasVerifiedAmount).toBe(false);
    expect(unverified.verifiedRaised).toBe(0);
    expect(unverified.percentage).toBe(0);
    expect(unverified.displayPercentage).toBe(0);
    expect(unverified.remainingAmount).toBe(30000);

    const partial = calculateFundraisingProgress(10000, 2500);
    expect(partial.hasVerifiedAmount).toBe(true);
    expect(partial.verifiedRaised).toBe(2500);
    expect(partial.percentage).toBe(25);
    expect(partial.displayPercentage).toBe(25);
    expect(partial.remainingAmount).toBe(7500);

    const exceeded = calculateFundraisingProgress(10000, 12500);
    expect(exceeded.percentage).toBe(125);
    expect(exceeded.displayPercentage).toBe(100);
    expect(exceeded.remainingAmount).toBe(0);
  });
});

describe("Unit Tests: Project Filtering & Content Validation", () => {
  it("validates all structured project and impact content against Zod schemas", () => {
    const result = validateAllContent();
    expect(result.valid).toBe(true);
    expect(result.projectErrors).toEqual([]);
    expect(result.metricErrors).toEqual([]);
  });

  it("includes both required draft project configurations with accurate targets", () => {
    const all = getAllProjects();
    expect(all.length).toBe(2);

    const classroom = all.find(
      (p) => p.slug === "classroom-construction-in-ethiopia"
    );
    expect(classroom).toBeDefined();
    expect(classroom?.category).toBe("Education");
    expect(classroom?.goal).toBe(30000);
    expect(classroom?.publicationStatus).toBe("draft");
    expect(classroom?.status).toBe("Planned");

    const children = all.find(
      (p) => p.slug === "supporting-children-in-need"
    );
    expect(children).toBeDefined();
    expect(children?.category).toBe("Children and Youth");
    expect(children?.goal).toBe(10000);
    expect(children?.publicationStatus).toBe("draft");
    expect(children?.status).toBe("Planned");
  });

  it("filters projects by category, status, and search query", () => {
    const eduOnly = filterProjects(projectsContent, {
      category: "Education",
    });
    expect(eduOnly.length).toBe(1);
    expect(eduOnly[0].slug).toBe("classroom-construction-in-ethiopia");

    const youthOnly = filterProjects(projectsContent, {
      category: "Children and Youth",
    });
    expect(youthOnly.length).toBe(1);
    expect(youthOnly[0].slug).toBe("supporting-children-in-need");

    const completedOnly = filterProjects(projectsContent, {
      status: "Completed",
    });
    expect(completedOnly.length).toBe(0);

    const searchMatch = filterProjects(projectsContent, {
      searchQuery: "classroom",
    });
    expect(searchMatch.length).toBe(1);
  });
});

describe("Unit Tests: Donation Link Configuration & Validation", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("validates donation amounts within acceptable boundaries", () => {
    expect(validateDonationAmount(0).valid).toBe(false);
    expect(validateDonationAmount(3).valid).toBe(false);
    expect(validateDonationAmount(50).valid).toBe(true);
    expect(validateDonationAmount(250000).valid).toBe(false);
  });

  it("returns unconfigured status safely when no payment provider is configured", () => {
    process.env.NEXT_PUBLIC_DONATION_PROVIDER = "none";
    process.env.NEXT_PUBLIC_DONATION_GENERAL_URL = "";

    const resolution = resolveDonationCheckout({
      amount: 100,
      frequency: "one-time",
      designation: "general",
    });

    expect(resolution.isConfigured).toBe(false);
    expect(resolution.checkoutUrl).toBeNull();
    expect(resolution.supportsRecurring).toBe(false);
    expect(resolution.statusMessage).toContain("not yet active");
  });

  it("builds a secure hosted checkout URL when provider and HTTPS link are configured for general fund", () => {
    process.env.NEXT_PUBLIC_DONATION_PROVIDER = "stripe_payment_link";
    process.env.NEXT_PUBLIC_DONATION_GENERAL_URL =
      "https://donate.stripe.com/test_habesha_general";
    process.env.NEXT_PUBLIC_DONATION_SUPPORTS_RECURRING = "false";

    const resolution = resolveDonationCheckout({
      amount: 250,
      frequency: "one-time",
      designation: "general",
    });

    expect(resolution.isConfigured).toBe(true);
    expect(resolution.checkoutUrl).toBe(
      "https://donate.stripe.com/test_habesha_general?amount=250"
    );
    expect(resolution.supportsRecurring).toBe(false);
  });

  it("prevents active checkout on draft campaigns unless an explicit project donation link is configured", () => {
    process.env.NEXT_PUBLIC_DONATION_PROVIDER = "stripe_payment_link";
    process.env.NEXT_PUBLIC_DONATION_GENERAL_URL =
      "https://donate.stripe.com/test_habesha_general";

    const draftResolution = resolveDonationCheckout({
      amount: 100,
      frequency: "one-time",
      designation: "classroom-construction-in-ethiopia",
    });

    expect(draftResolution.isDraftCampaign).toBe(true);
    expect(draftResolution.isConfigured).toBe(false);
    expect(draftResolution.checkoutUrl).toBeNull();
  });
});
