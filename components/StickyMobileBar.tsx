"use client";

import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-bg-raised/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={siteConfig.phoneHref}
        onClick={() => trackEvent("phone_click", { location: "sticky_bar" })}
        className="tap-target flex flex-1 items-center justify-center gap-2 py-3 text-[14.5px] font-semibold text-ink border-r border-line"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5a2 2 0 0 1 2-2z" />
        </svg>
        Call
      </a>
      <a
        href={siteConfig.textHref}
        onClick={() => trackEvent("text_click", { location: "sticky_bar" })}
        className="tap-target flex flex-1 items-center justify-center gap-2 py-3 text-[14.5px] font-semibold text-ink border-r border-line"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M4 5h16v11H8l-4 4V5z" />
        </svg>
        Text
      </a>
      <a
        href="/quote"
        className="tap-target flex flex-1 items-center justify-center gap-2 bg-accent py-3 text-[14.5px] font-semibold text-white"
      >
        Get a Quote
      </a>
    </div>
  );
}
