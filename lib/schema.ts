import { siteConfig } from "@/lib/config";
import { enabledServices } from "@/data/services";
import { faqs } from "@/data/faqs";

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
        dayOfWeek: h.days,
        opens: h.hours.split("–")[0]?.trim(),
        closes: h.hours.split("–")[1]?.trim(),
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
