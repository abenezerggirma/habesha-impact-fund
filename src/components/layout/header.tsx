"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HeartHandshake } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-20 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] focus-visible:ring-offset-2"
        >
          <Image
            src="/logos/habesha-impact-fund-mark.svg"
            alt="Habesha Impact Fund emblem"
            width={42}
            height={42}
            className="h-10 w-10 rounded-xl shadow-2xs"
            priority
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-[#102A43] sm:text-xl">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-slate-500">
              Nonprofit Public Benefit Corporation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] ${
                  isActive
                    ? "bg-[#16856A]/10 text-[#16856A]"
                    : "text-[#243746] hover:bg-slate-100 hover:text-[#102A43]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button asChild variant="donate" size="default">
              <Link href="/donate">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                <span>Donate</span>
              </Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
