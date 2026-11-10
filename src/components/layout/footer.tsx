import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { organizationContent } from "@/content/organization";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#102A43] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Organization Identity */}
          <div className="space-y-4 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logos/habesha-impact-fund-mark.svg"
                alt="Habesha Impact Fund emblem"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl border border-white/15"
              />
              <div>
                <span className="font-serif text-xl font-bold text-white">
                  {organizationContent.name}
                </span>
                <p className="text-xs text-[#D6A84B]">
                  {organizationContent.organizationType}
                </p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              {organizationContent.mission}
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D6A84B]" aria-hidden="true" />
                <span>{organizationContent.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#16856A]" aria-hidden="true" />
                <a
                  href={`mailto:${organizationContent.contact.email}`}
                  className="hover:text-white hover:underline"
                >
                  {organizationContent.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  className="font-semibold text-[#D6A84B] hover:underline"
                >
                  Donate / Support a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance, Policies & Donation Information */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
              Transparency & Legal Notices
            </h3>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-300">
              <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-[#16856A]" aria-hidden="true" />
                <span>Donation & Tax Disclosure</span>
              </div>
              <p>{organizationContent.taxStatusNotice}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-300">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Policy (Draft)
              </Link>
              <Link href="/terms" className="hover:text-white hover:underline">
                Terms of Use (Draft)
              </Link>
              <Link href="/impact" className="hover:text-white hover:underline">
                Financial Transparency
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {currentYear} {organizationContent.legalName}. All rights reserved.
          </p>
          <p>
            Incorporated in the {organizationContent.legalJurisdiction}.
          </p>
        </div>
      </div>
    </footer>
  );
}
