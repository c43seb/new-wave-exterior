"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { navLinks } from "@/data/nav";
import { LinkButton } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-1 whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-wide"
          onClick={() => setOpen(false)}
        >
          New Wave <span className="text-accent">Exterior</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[14.5px] font-medium ${
                  active ? "text-ink" : "text-ink-soft"
                } hover:text-ink`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LinkButton
            href={siteConfig.phoneHref}
            variant="ghost"
            size="sm"
            onClick={() => trackEvent("phone_click", { location: "header" })}
          >
            Call Now
          </LinkButton>
          <LinkButton href="/quote" size="sm">
            Get a Free Quote
          </LinkButton>
        </div>

        <button
          type="button"
          className="tap-target inline-flex items-center justify-center rounded-sm border border-line-strong lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-bg-raised px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="tap-target flex items-center rounded-sm px-2 text-[15px] font-medium text-ink hover:bg-bg-sunken"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5">
            <LinkButton href={siteConfig.phoneHref} variant="ghost">
              Call {siteConfig.phone}
            </LinkButton>
            <LinkButton href="/quote">Get a Free Quote</LinkButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
