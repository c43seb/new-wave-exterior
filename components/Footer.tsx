"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { footerLinks } from "@/data/nav";
import { SocialLinks } from "@/components/SocialLinks";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="border-t border-line pb-9 pt-9 sm:pb-11 sm:pt-13">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-[32ch]">
            <div className="mb-2.5 font-display text-xl font-extrabold uppercase tracking-wide">
              New Wave <span className="text-accent">Exterior</span>
            </div>
            <p className="text-sm text-ink-soft">
              Window, screen, and pressure washing for homes in {siteConfig.serviceAreas[0]}{" "}
              and the surrounding Austin area.
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              Contact
            </h4>
            <a
              href={siteConfig.phoneHref}
              onClick={() => trackEvent("phone_click", { location: "footer" })}
              className="mb-1.5 block text-sm text-ink-soft hover:text-accent-strong"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEvent("email_click", { location: "footer" })}
              className="mb-1.5 block text-sm text-ink-soft hover:text-accent-strong"
            >
              {siteConfig.email}
            </a>
            <p className="text-sm text-ink-soft">
              Serving {siteConfig.serviceAreas.join(", ")}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              Hours
            </h4>
            {siteConfig.businessHours.map((h) => (
              <p key={h.days} className="mb-1.5 text-sm text-ink-soft">
                {h.days}: {h.hours}
              </p>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              Site
            </h4>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mb-1.5 block text-sm text-ink-soft hover:text-accent-strong"
              >
                {link.label}
              </Link>
            ))}
            {siteConfig.googleBusinessProfileUrl ? (
              <a
                href={siteConfig.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-1.5 block text-sm text-ink-soft hover:text-accent-strong"
              >
                Leave a Review
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-[12.5px] text-ink-faint">
          <p>&copy; {new Date().getFullYear()} New Wave Exterior. Locally owned and operated.</p>
          <p>Free quotes, no obligation.</p>
        </div>
      </div>
    </footer>
  );
}
