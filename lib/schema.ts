import { siteConfig } from "@/lib/config";
import { enabledServices } from "@/data/services";
import { faqs } from "@/data/faqs";

const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// schema.org's OpeningHoursSpecification wants individual day names, not a
// display-friendly range like "Monday – Sunday" — expand it here so the
// human-readable copy in lib/config.ts can stay simple.
function expandDayRange(range: string): string[] {
  const parts = range.split("–").map((s) => s.trim());
  const start = parts[0];
  const end = parts[1];
  if (!start) return [range];
  if (!end) return [start];
  const startIdx = DAY_ORDER.indexOf(start);
  const endIdx = DAY_ORDER.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [range];
  const days: string[] = [];
  for (let i = startIdx; ; i = (i + 1) % 7) {
    days.push(DAY_ORDER[i] as string);
    if (i === endIdx) break;
  }
  return days;
}

// schema.org wants opens/closes as 24-hour "HH:MM", not "8:00 AM" — convert
// the display-friendly time here rather than storing two formats in config.
function to24Hour(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;
  const hourStr = match[1] as string;
  const minute = match[2] as string;
  const period = match[3] as string;
  let hour = parseInt(hourStr, 10) % 12;
  if (period.toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.businessName,
    url: siteConfig.domain,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.email,
    areaServed: siteConfig.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    address: siteConfig.address.city
      ? {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.state,
          ...(siteConfig.address.zip ? { postalCode: siteConfig.address.zip } : {}),
        }
      : undefined,
    openingHoursSpecification: siteConfig.businessHours
      .filter((h) => h.hours !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: expandDayRange(h.days),
        opens: to24Hour(h.hours.split("–")[0]?.trim() ?? ""),
        closes: to24Hour(h.hours.split("–")[1]?.trim() ?? ""),
      })),
    makesOffer: enabledServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
      },
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  shortDescription: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.businessName,
    },
    areaServed: siteConfig.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    url: `${siteConfig.domain}/services#${service.slug}`,
  };
}
