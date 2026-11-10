import { Project } from "@/types";

export const projectsContent: Project[] = [
  {
    id: "proj-classroom-construction-ethiopia",
    slug: "classroom-construction-in-ethiopia",
    title: "Classroom Construction in Ethiopia",
    shortDescription:
      "Draft initiative to construct safe, weather-resilient classroom facilities and furnish essential learning spaces for underserved students in Ethiopia.",
    description:
      "This proposed educational infrastructure initiative aims to address overcrowded and structurally inadequate learning spaces in underserved Ethiopian communities. Currently in the planning and partner-vetting phase, the project is structured around constructing durable classrooms, providing student desks and chalkboards, and establishing safe sanitation facilities to support primary and secondary learners.",
    category: "Education",
    location: "Ethiopia (Site Selection in Progress)",
    goal: 30000,
    verifiedAmountRaised: null,
    status: "Planned",
    publicationStatus: "draft",
    isFeatured: true,
    coverImage: {
      src: "/images/projects/classroom-construction.svg",
      alt: "Architectural illustration of a bright, durable community school classroom in Ethiopia with desks and natural light",
      caption:
        "Illustrative architectural concept for the Classroom Construction initiative. Not a photograph of a completed facility.",
      credit: "Habesha Impact Fund Design Illustration (CC0)",
      isIllustrative: true,
      width: 1200,
      height: 800,
    },
    galleryImages: [
      {
        src: "/images/projects/classroom-construction.svg",
        alt: "Architectural concept showing proposed classroom layout and natural ventilation",
        caption:
          "Draft concept illustration: Weather-resilient masonry and ventilated roof structure.",
        isIllustrative: true,
        width: 1200,
        height: 800,
      },
      {
        src: "/images/projects/education-supplies.svg",
        alt: "Illustration of classroom desks, books, and learning materials for students",
        caption:
          "Draft concept illustration: Essential classroom furnishings and learning materials.",
        isIllustrative: true,
        width: 1200,
        height: 800,
      },
    ],
    problemStatement:
      "In many rural and peri-urban areas of Ethiopia, students attend school in overcrowded or deteriorating structures that lack adequate seating, weather protection, and basic learning materials. These physical barriers disrupt instruction during seasonal rains and limit educational continuity.",
    proposedSolution:
      "Work alongside vetted local educational authorities and construction partners to build and equip structurally sound classrooms with durable seating, writing surfaces, and natural lighting—designed for long-term maintenance by the local school community.",
    beneficiaries:
      "School-aged children and teachers in an underserved Ethiopian community (specific school site and enrollment metrics will be published once partner agreements are finalized).",
    projectGoals: [
      "Complete site assessment and formal partnership agreement with local educational stewards.",
      "Construct weather-resilient classroom space built to local structural and safety standards.",
      "Equip classrooms with student desks, benches, instructor stations, and chalkboards.",
      "Publish milestone engineering reviews, cost breakdowns, and post-construction verification updates.",
    ],
    transparencyNotes:
      "DRAFT CAMPAIGN CONFIGURATION: This project is currently in the planning stage and is not yet an active fundraising campaign. Fundraising progress is shown at $0 / unverified until formal campaign launch and payment provider activation.",
    implementationPartner: "Partner selection and due diligence in progress (Draft)",
    fundAllocation: [
      {
        category: "Structural Construction & Materials",
        percentage: 65,
        description:
          "Estimated allocation for foundation, masonry, roofing, doors, windows, and skilled local labor.",
      },
      {
        category: "Classroom Furnishings & Equipment",
        percentage: 20,
        description:
          "Estimated allocation for student desks, seating, chalkboards, and basic instructional fixtures.",
      },
      {
        category: "Site Assessment, Permits & Engineering Oversight",
        percentage: 10,
        description:
          "Estimated allocation for site evaluation, local compliance, and milestone quality inspections.",
      },
      {
        category: "Project Documentation & Reporting",
        percentage: 5,
        description:
          "Estimated allocation for financial auditing, progress photography, and donor reporting.",
      },
    ],
    donationLink: process.env.NEXT_PUBLIC_DONATION_CLASSROOM_URL || "",
    updates: [
      {
        id: "upd-classroom-01",
        projectId: "proj-classroom-construction-ethiopia",
        date: "2026-11-01",
        title: "Initial Project Scope & Preliminary Budget Defined (Draft)",
        content:
          "Habesha Impact Fund has established the initial $30,000 target framework for our flagship Classroom Construction initiative. Active fundraising will open once site selection, partner vetting, and payment processing configuration are formally approved by the Board.",
        isDraft: true,
      },
    ],
  },
  {
    id: "proj-supporting-children-in-need",
    slug: "supporting-children-in-need",
    title: "Supporting Children in Need",
    shortDescription:
      "Draft initiative focused on providing essential educational supplies, nutritional support, and basic well-being resources for vulnerable children.",
    description:
      "This planned program is designed to support vulnerable and underserved children by removing everyday barriers to school attendance and healthy development. Prepared as a draft campaign configuration, the initiative focuses on delivering school kits, basic clothing/uniform assistance, and community-based child support resources through vetted local partners.",
    category: "Children and Youth",
    location: "Ethiopia (Community Partner Selection in Progress)",
    goal: 10000,
    verifiedAmountRaised: null,
    status: "Planned",
    publicationStatus: "draft",
    isFeatured: true,
    coverImage: {
      src: "/images/projects/supporting-children.svg",
      alt: "Warm editorial illustration representing educational supplies, books, and care packages for children",
      caption:
        "Illustrative representation of the Supporting Children in Need initiative. Not a photograph of actual beneficiaries.",
      credit: "Habesha Impact Fund Design Illustration (CC0)",
      isIllustrative: true,
      width: 1200,
      height: 800,
    },
    galleryImages: [
      {
        src: "/images/projects/supporting-children.svg",
        alt: "Illustration of school backpacks, notebooks, and essential child support kits",
        caption:
          "Draft concept illustration: Student learning kits and essential Youth support supplies.",
        isIllustrative: true,
        width: 1200,
        height: 800,
      },
    ],
    problemStatement:
      "Children from economically vulnerable households often face compounding obstacles—including lack of notebooks, uniforms, writing Supplies, and basic daily necessities—that prevent consistent school participation and hinder overall well-being.",
    proposedSolution:
      "Coordinate with accountable local community organizations and school administrators to distribute essential student learning kits, school readiness supplies, and targeted child assistance packages directly where need is greatest.",
    beneficiaries:
      "Underserved children and youth facing economic hardship (specific partner communities and beneficiary criteria will be published prior to campaign activation).",
    projectGoals: [
      "Finalize partnership criteria and distribution protocols with vetted local child-welfare and school partners.",
      "Procure essential school supplies—including notebooks, pens, backpacks, and foundational learning materials—locally where possible.",
      "Provide targeted basic needs support to help vulnerable students remain enrolled in school.",
      "Document distribution records and publish verified post-delivery reports for supporters.",
    ],
    transparencyNotes:
      "DRAFT CAMPAIGN CONFIGURATION: This project is currently a planned draft configuration with an initial target of $10,000. It is not presented as an active fundraising campaign until formally approved.",
    implementationPartner: "Local partner verification in progress (Draft)",
    fundAllocation: [
      {
        category: "School Kits & Educational Supplies",
        percentage: 55,
        description:
          "Estimated allocation for notebooks, stationery, backpacks, Uniforms, and reading materials.",
      },
      {
        category: "Child Well-Being & Basic Assistance",
        percentage: 30,
        description:
          "Estimated allocation for essential hygiene items and community-coordinated nutritional support.",
      },
      {
        category: "Local Distribution & Partner Coordination",
        percentage: 10,
        description:
          "Estimated allocation for local transport, safe storage, and partner distribution logistics.",
      },
      {
        category: "Verification & Impact Reporting",
        percentage: 5,
        description:
          "Estimated allocation for inventory verification and transparent donor reporting.",
      },
    ],
    donationLink: process.env.NEXT_PUBLIC_DONATION_CHILDREN_URL || "",
    updates: [
      {
        id: "upd-children-01",
        projectId: "proj-supporting-children-in-need",
        date: "2026-11-01",
        title: "Program Framework Prepared for Review (Draft)",
        content:
          "The initial $10,000 program blueprint for Supporting Children in Need has been prepared as a draft campaign configuration. Partner evaluation and distribution safeguards are being established prior to opening contributions.",
        isDraft: true,
      },
    ],
  },
];
