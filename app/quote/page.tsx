import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/SectionHeading";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free window cleaning, screen cleaning, or pressure washing quote in ${siteConfig.serviceAreas[0]} and the surrounding Austin area.`,
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-8 max-w-[640px] sm:mb-10">
          <Eyebrow>Get started</Eyebrow>
          <h1 className="mt-4 text-[2.1rem] sm:text-[2.8rem]">Request your free quote</h1>
          <p className="mt-3 text-[15.5px] text-ink-soft">
            Fill this out with a few details and we&rsquo;ll follow up {siteConfig.responseTime}.
            Nothing is billed for a quote.
          </p>
        </div>
        <div className="max-w-[760px]">
          <Suspense fallback={<div className="h-[400px] animate-pulse rounded-card bg-bg-sunken" />}>
            <QuoteForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
