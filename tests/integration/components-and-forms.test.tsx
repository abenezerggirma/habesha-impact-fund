import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "@/components/shared/contact-form";
import { DonationWidget } from "@/components/donations/donation-widget";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

describe("Integration Tests: Contact Form Validation", () => {
  it("displays client-side validation errors when submitting empty required fields", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/please enter your name/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a subject/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please provide a message of at least 15 characters/i)
    ).toBeInTheDocument();
  });
});

describe("Integration Tests: Project Detail Routing & Lookup", () => {
  it("resolves valid project slugs and returns undefined for unknown slugs", () => {
    const classroom = getProjectBySlug("classroom-construction-in-ethiopia");
    expect(classroom).toBeDefined();
    expect(classroom?.title).toBe("Classroom Construction in Ethiopia");

    const children = getProjectBySlug("supporting-children-in-need");
    expect(children).toBeDefined();
    expect(children?.title).toBe("Supporting Children in Need");

    const unknown = getProjectBySlug("non-existent-project");
    expect(unknown).toBeUndefined();
  });
});

describe("Integration Tests: Donation Widget Behavior", () => {
  it("renders suggested amounts, disables monthly giving when unsupported, and shows honest unconfigured notice", () => {
    const projects = getAllProjects();
    render(
      <DonationWidget
        projects={projects}
        initialProjectSlug="classroom-construction-in-ethiopia"
      />
    );

    expect(screen.getByText("$25")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();

    const monthlyButton = screen.getByRole("button", {
      name: /monthly giving/i,
    });
    expect(monthlyButton).toBeDisabled();

    expect(
      screen.getByText(/external donation checkout not yet enabled/i)
    ).toBeInTheDocument();
  });
});
