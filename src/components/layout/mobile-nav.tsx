"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X, HeartHandshake } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation-drawer"
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#102A43]"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>

      {open ? (
        <>
          <div
            className="fixed inset-0 top-20 z-40 bg-[#102A43]/60 backdrop-blur-xs"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-x-0 top-20 z-50 border-b border-slate-200 bg-white px-6 py-6 shadow-xl"
          >
            <nav aria-label="Mobile primary navigation" className="space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-[#16856A]/10 text-[#16856A]"
                        : "text-[#102A43] hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <Button
                asChild
                variant="donate"
                size="lg"
                className="w-full justify-center"
              >
                <Link href="/donate" onClick={() => setOpen(false)}>
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  <span>Donate</span>
                </Link>
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
