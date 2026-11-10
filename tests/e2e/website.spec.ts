import { test, expect } from "@playwright/test";

test.describe("Habesha Impact Fund E2E Suite", () => {
  test("1. Homepage loads and communicates mission, projects, and CTAs", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Together, We Can Create Lasting Impact.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Support a Project" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explore Our Mission" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Classroom Construction in Ethiopia" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Supporting Children in Need" })
    ).toBeVisible();
  });

  test("2. Primary navigation works across all core routes", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("heading", {
        name: "Rooted in Service, Guided by Transparency.",
      })
    ).toBeVisible();

    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Our Impact" })
      .click();
    await expect(page).toHaveURL(/\/impact$/);
    await expect(
      page.getByRole("heading", {
        name: "Transparent Reporting, Grounded in Fact.",
      })
    ).toBeVisible();

    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Get Involved" })
      .click();
    await expect(page).toHaveURL(/\/get-involved$/);
    await expect(
      page.getByRole("heading", {
        name: "Join Us in Building Lasting Community Impact.",
      })
    ).toBeVisible();
  });

  test("3. Projects directory displays and filters projects accurately", async ({
    page,
  }) => {
    await page.goto("/projects");
    await expect(
      page.getByRole("heading", {
        name: "Charitable Initiatives & Campaign Blueprints",
      })
    ).toBeVisible();

    const categorySelect = page.locator("#category-filter");
    await categorySelect.selectOption("Education");
    await expect(
      page.getByRole("link", { name: "Classroom Construction in Ethiopia" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Supporting Children in Need" })
    ).not.toBeVisible();

    await categorySelect.selectOption("All");
    await expect(
      page.getByRole("link", { name: "Supporting Children in Need" })
    ).toBeVisible();
  });

  test("4. Individual project detail pages load with draft notices and fundraising panels", async ({
    page,
  }) => {
    await page.goto("/projects/classroom-construction-in-ethiopia");
    await expect(
      page.getByRole("heading", {
        name: "Classroom Construction in Ethiopia",
      })
    ).toBeVisible();
    await expect(page.getByText("$30,000").first()).toBeVisible();
    await expect(
      page.getByText("Draft Campaign Configuration").first()
    ).toBeVisible();
  });

  test("5. Donation page and buttons behave safely without simulating transactions", async ({
    page,
  }) => {
    await page.goto("/donate");
    await expect(
      page.getByRole("heading", {
        name: "Invest in Education, Children, and Community Resilience.",
      })
    ).toBeVisible();
    await expect(
      page.getByText("External Donation Checkout Not Yet Enabled")
    ).toBeVisible();
  });

  test("6. Contact form validation and honest provider notice work", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();

    await page.fill("#contact-name", "Selam Tesfaye");
    await page.fill("#contact-email", "selam@example.org");
    await page.fill("#contact-subject", "Volunteer Inquiry for Engineering");
    await page.fill(
      "#contact-message",
      "I would love to contribute civil engineering review for the classroom construction initiative."
    );
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(
      page.getByText(/Email Delivery Provider Not Configured/i)
    ).toBeVisible();
  });

  test("7. Mobile navigation drawer opens and navigates cleanly", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuBtn = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const dialog = page.getByRole("dialog", {
      name: /mobile navigation menu/i,
    });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "Our Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("8. No broken internal links exist on homepage", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((links) =>
        Array.from(
          new Set(
            links
              .map((el) => el.getAttribute("href"))
              .filter((href): href is string => Boolean(href))
          )
        )
      );

    expect(hrefs.length).toBeGreaterThan(5);

    for (const href of hrefs) {
      const cleanPath = href.split("#")[0];
      const response = await request.get(cleanPath);
      expect(
        response.status(),
        `Expected ${cleanPath} to return 200`
      ).toBeLessThan(400);
    }
  });
});
