import type { JSX } from "react";
import { siteConfig } from "@/lib/config";

const icons: Record<string, JSX.Element> = {
  facebook: (
    <path d="M13.5 21v-7h2.3l.35-2.7h-2.65V9.5c0-.78.22-1.32 1.34-1.32h1.44V5.77c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2.03H8.5V14h2.3v7h2.7z" />
  ),
  instagram: (
    <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm4 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  ),
  nextdoor: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-.9 4.6h1.9l3.4 5v-5h1.9v9h-1.9l-3.4-5v5h-1.9v-9z" />,
  tiktok: (
    <path d="M14 3h2.2c.2 1.6 1.4 2.9 3 3.2v2.2c-1.1 0-2.2-.3-3.1-.9v5.6a4.9 4.9 0 1 1-4.9-4.9c.2 0 .4 0 .6.03v2.24a2.7 2.7 0 1 0 2.2 2.65V3z" />
  ),
};

const labels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  nextdoor: "Nextdoor",
  tiktok: "TikTok",
};

export function SocialLinks() {
  const entries = Object.entries(siteConfig.socialLinks).filter(([, url]) => url);

  if (entries.length === 0) return null;

  return (
    <ul className="flex items-center gap-3" aria-label="Social media">
      {entries.map(([key, url]) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[key] ?? key}
            className="tap-target inline-flex items-center justify-center rounded-sm border border-line-strong text-ink-soft hover:border-ink-faint hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {icons[key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
