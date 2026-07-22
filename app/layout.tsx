import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { Analytics } from "@/components/Analytics";
import { siteConfig } from "@/lib/config";
import { localBusinessSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.businessName} | Window Cleaning in Lakeway & Austin, TX`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Residential window, screen, and pressure washing in Lakeway, Bee Cave, West Lake Hills, The Hills, and Austin, TX. Request a free quote in minutes.",
  openGraph: {
    type: "website",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Window Cleaning in Lakeway & Austin, TX`,
    description:
      "Residential window, screen, and pressure washing in Lakeway, Bee Cave, West Lake Hills, The Hills, and Austin, TX.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Window Cleaning in Lakeway & Austin, TX`,
    description:
      "Residential window, screen, and pressure washing in Lakeway, Bee Cave, West Lake Hills, The Hills, and Austin, TX.",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <Analytics />
        <Header />
        <main id="main-content" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
