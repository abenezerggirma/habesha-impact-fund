import type { Metadata } from "next";
import { Hero } from "@/components/shared/hero";
import { ContactForm } from "@/components/shared/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationContent } from "@/content/organization";
import {
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Habesha Impact Fund for general inquiries, partnership proposals, volunteer opportunities, or donation questions.",
  alternates: {
    canonical: "/contact",
  },
};

interface ContactPageProps {
  searchParams: Promise<{ type?: string; subject?: string }>;
}

const validTypes = [
  "General Inquiry",
  "Partnership Inquiry",
  "Volunteer Inquiry",
  "Donation Question",
] as const;

type InquiryCategory = (typeof validTypes)[number];

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { type, subject } = await searchParams;
  const initialInquiryType: InquiryCategory = validTypes.includes(
    type as InquiryCategory
  )
    ? (type as InquiryCategory)
    : "General Inquiry";

  return (
    <div>
      <Hero
        compact
        badgeText="Connect With Us"
        headline="We Welcome Your Questions & Ideas."
        subheadline="Reach out to our team regarding general inquiries, charitable partnerships, volunteering, or contribution questions."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Inquiry Channels */}
            <div className="space-y-6 lg:col-span-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#102A43] sm:text-3xl">
                  Direct Inquiry Channels
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#243746]">
                  Select the appropriate topic in the contact form or reach out directly via email.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Card className="border-slate-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2.5 text-[#16856A]">
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <CardTitle className="text-base">General Inquiries</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-relaxed text-[#243746]">
                    Questions about Habesha Impact Fund&apos;s mission, governance, or upcoming
                    community updates.
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2.5 text-[#16856A]">
                      <Handshake className="h-4 w-4" aria-hidden="true" />
                      <CardTitle className="text-base">
                        Partnership Inquiries
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-relaxed text-[#243746]">
                    For schools, local NGOs, and community organizations interested in
                    collaborating on educational or youth programs.
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2.5 text-[#16856A]">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <CardTitle className="text-base">
                        Volunteer Inquiries
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-relaxed text-[#243746]">
                    For professionals and community members offering skills in project evaluation,
                    engineering, education, or outreach.
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2.5 text-[#16856A]">
                      <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                      <CardTitle className="text-base">
                        Donation Questions
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs leading-relaxed text-[#243746]">
                    Questions regarding pledges, institutional giving, or payment provider
                    configuration status.
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#102A43] p-6 text-white">
                <h3 className="font-serif text-lg font-bold text-[#D6A84B]">
                  Organization Contact Details
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#16856A]" aria-hidden="true" />
                    <a
                      href={`mailto:${organizationContent.contact.email}`}
                      className="font-medium text-white hover:underline"
                    >
                      {organizationContent.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                    <span>{organizationContent.contact.location}</span>
                  </div>
                  <p className="pt-2 text-xs leading-relaxed text-slate-300">
                    {organizationContent.contact.mailingAddressNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm
                initialInquiryType={initialInquiryType}
                initialSubject={subject || ""}
                contactEmail={organizationContent.contact.email}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
