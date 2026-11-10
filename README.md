# Habesha Impact Fund — Official Website & Fundraising Platform

A modern, accessible, production-grade nonprofit foundation and fundraising platform built for **Habesha Impact Fund**, a California nonprofit public benefit corporation supporting charitable initiatives in Ethiopia and within the broader community.

---

## 1. Project Overview

Habesha Impact Fund connects generosity—especially across the Ethiopian and Habesha diaspora—with structured, accountable charitable projects focused on educational infrastructure, underserved children, and community development.

Key architectural principles implemented in this repository:
- **Truthful & Accountable Content Architecture:** Strictly separates planned/draft initiatives from active campaigns and verified outcomes. Never fabricates accomplishments, beneficiaries, or unverified tax assertions.
- **Provider-Independent Hosted Donations:** Supports externally hosted checkout links (Stripe Payment Links, PayPal Hosted Checkout, or other nonprofit payment processors) without ever collecting or storing payment card numbers on this website.
- **CMS-Ready Structured Content:** All organizational data, projects, updates, leadership profiles, and impact metrics live in strongly typed TypeScript modules validated with **Zod** schemas.
- **WCAG 2.2 AA Accessibility:** Semantic landmarks, skip-to-content navigation, keyboard-accessible mobile drawer, high-contrast color tokens, ARIA attributes, and reduced-motion support.

---

## 2. Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Server Components, Route Handlers) |
| **UI Library** | React 19 + TypeScript 5 |
| **Styling & Design System** | Tailwind CSS v4 + shadcn/ui component architecture |
| **Icons** | Lucide React (`lucide-react`) |
| **Validation** | Zod (`zod`) for content schemas, forms, and API routes |
| **Unit & Integration Testing** | Vitest + React Testing Library + JSDOM |
| **End-to-End Testing** | Playwright (`@playwright/test`) |
| **CI/CD & Hosting** | GitHub Actions (`.github/workflows/ci.yml`) + Vercel |

---

## 3. Prerequisites

- **Node.js:** `v20.11+` or `v22 LTS` / `v24` (recommended)
- **npm:** `v10+`
- **Git:** `v2.30+`

---

## 4. Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/habesha-impact-fund.git
cd habesha-impact-fund

# 2. Install dependencies
npm install

# 3. Copy the environment variable template
cp .env.example .env.local

# 4. Start the local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 5. Environment Variables

All environment variables are documented in [`.env.example`](.env.example).

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL (e.g., `https://habeshaimpactfund.org`) |
| `NEXT_PUBLIC_DONATION_PROVIDER` | Public | `"none"` (default), `"stripe_payment_link"`, `"paypal_hosted"`, or `"external_hosted"` |
| `NEXT_PUBLIC_DONATION_GENERAL_URL` | Public | HTTPS URL for general fund one-time donations |
| `NEXT_PUBLIC_DONATION_MONTHLY_URL` | Public | HTTPS URL for monthly recurring donations |
| `NEXT_PUBLIC_DONATION_SUPPORTS_RECURRING` | Public | Set to `"true"` only when the configured provider supports recurring gifts |
| `NEXT_PUBLIC_DONATION_CLASSROOM_URL` | Public | Optional HTTPS hosted checkout link specifically for Classroom Construction |
| `NEXT_PUBLIC_DONATION_CHILDREN_URL` | Public | Optional HTTPS hosted checkout link specifically for Supporting Children in Need |
| `NEXT_PUBLIC_IRS_501C3_VERIFIED` | Public | Set to `"true"` **only** after official IRS 501(c)(3) determination is verified |
| `NEXT_PUBLIC_ORGANIZATION_EIN` | Public | Optional EIN displayed when authorized for publication |
| `CONTACT_DELIVERY_PROVIDER` | Server | `"none"` (default), `"resend"`, or `"webhook"` |
| `CONTACT_RECIPIENT_EMAIL` | Server | Destination address for contact form inquiries |
| `RESEND_API_KEY` | Server | API key if `CONTACT_DELIVERY_PROVIDER="resend"` |
| `CONTACT_WEBHOOK_URL` | Server | HTTPS endpoint if `CONTACT_DELIVERY_PROVIDER="webhook"` |
| `NEWSLETTER_PROVIDER` | Server | `"none"` (default) or `"webhook"` |
| `NEWSLETTER_WEBHOOK_URL` | Server | HTTPS endpoint if `NEWSLETTER_PROVIDER="webhook"` |

---

## 6. Development Commands

```bash
npm run dev          # Start Next.js development server
npm run build        # Build production application
npm run start        # Start production server locally
npm run lint         # Run ESLint checks
npm run typecheck    # Run TypeScript compiler verification
npm run format       # Format codebase with Prettier
```

---

## 7. Testing Commands

```bash
# Run unit and integration tests (Vitest)
npm test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end browser tests (Playwright)
npm run test:e2e
```

---

## 8. Content Editing Instructions

All structured website content is stored in [`src/content/`](src/content/) and validated by [`src/lib/validation/schemas.ts`](src/lib/validation/schemas.ts):

- **Organization Profile & Legal Disclosures:** [`src/content/organization.ts`](src/content/organization.ts)
- **Charitable Projects & Updates:** [`src/content/projects.ts`](src/content/projects.ts)
- **Leadership & Governance:** [`src/content/leadership.ts`](src/content/leadership.ts)
- **Impact Metrics & Roadmap Milestones:** [`src/content/impact.ts`](src/content/impact.ts)

### How to Create a New Project

1. Open [`src/content/projects.ts`](src/content/projects.ts).
2. Add a new object conforming to the `Project` interface (`src/types/index.ts`):
   - Set a unique `id` and URL-safe `slug` (e.g., `"community-library-initiative"`).
   - Choose a `category`: `"Education"`, `"Children and Youth"`, `"Community Development"`, `"Humanitarian Assistance"`, or `"Other"`.
   - Set `status`: `"Planned"`, `"Fundraising"`, `"In Progress"`, or `"Completed"`. *(Never mark `"Completed"` unless verified).*
   - Set `publicationStatus`: `"draft"` (shows draft notices) or `"published"` (when formally approved).
   - Place project illustrations or licensed photographs in `public/images/projects/` and provide accurate `alt`, `caption`, and `isIllustrative` metadata.
3. Run `npm test` to verify your new project passes Zod schema validation.

### How to Update a Fundraising Goal or Verified Amount Raised

1. Open [`src/content/projects.ts`](src/content/projects.ts) and locate the project.
2. Update `goal` (number in USD, e.g., `30000`).
3. Update `verifiedAmountRaised`:
   - Keep as `null` while the project is in draft/planning.
   - Set to a verified numeric dollar amount (e.g., `4250`) once confirmed by your payment processor ledger.
4. To approve a draft campaign for active fundraising, change `publicationStatus` from `"draft"` to `"published"` and `status` from `"Planned"` to `"Fundraising"`.

### How to Configure Donation Links

1. Create a hosted payment link in your payment processor (e.g., Stripe Payment Links or PayPal Hosted Checkout).
2. Set the environment variables in Vercel (or `.env.local`):
   ```env
   NEXT_PUBLIC_DONATION_PROVIDER="stripe_payment_link"
   NEXT_PUBLIC_DONATION_GENERAL_URL="https://donate.stripe.com/your-verified-link"
   ```
3. If your provider supports monthly recurring donations, also set:
   ```env
   NEXT_PUBLIC_DONATION_SUPPORTS_RECURRING="true"
   NEXT_PUBLIC_DONATION_MONTHLY_URL="https://donate.stripe.com/your-monthly-link"
   ```

### How to Add Leadership Information

1. Open [`src/content/leadership.ts`](src/content/leadership.ts).
2. Replace the governance placeholder entries or add verified board member objects with:
   ```ts
   {
     id: "board-member-1",
     name: "Full Name",
     role: "Board Chair",
     biography: "Verified biography approved for publication.",
     isPlaceholder: false,
   }
   ```

### How to Update Impact Metrics

1. Open [`src/content/impact.ts`](src/content/impact.ts).
2. When verified metrics are available from official records, update the corresponding metric record:
   - Set `value` to the verified figure (e.g., `2` or `"$30,000"`).
   - Change `verificationStatus` from `"commitment"` to `"verified"`.
   - Document the `reportingPeriod` and `source`.

---

## 9. Deployment Instructions (Vercel)

1. Push the repository to GitHub (`habesha-impact-fund`).
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new) or link via the Vercel CLI:
   ```bash
   vercel link
   vercel deploy
   ```
3. Configure environment variables in **Vercel Project Settings → Environment Variables** based on `.env.example`.
4. Verify the preview deployment URL before promoting to production (`vercel --prod`).
   - *Note:* Ensure your chosen Vercel plan complies with your organization's nonprofit usage terms (Vercel offers a dedicated Nonprofit / Open Source sponsorship program, or standard Pro plans).

---

## 10. Future Development Recommendations

- **Headless CMS Migration:** When non-technical staff need browser-based editing, the strongly typed modules in `src/content/` can be mapped 1:1 to Sanity, Contentful, or Keystatic collections without changing any UI components.
- **Webhook-Driven Fundraising Totals:** Once Stripe or PayPal is active, a Next.js webhook route can update `verifiedAmountRaised` automatically via ISR (`revalidateTag`).
- **Multilingual Support (Amharic / Tigrinya / Afaan Oromo):** Next.js App Router internationalized routing (`[locale]`) can be layered over `src/content/` to serve diaspora and local communities in multiple languages.
