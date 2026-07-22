import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { LinkButton } from "@/components/Button";
import { enabledServices } from "@/data/services";
import { serviceSchema } from "@/lib/schema";
import { ViewTracker } from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Exterior and interior window cleaning, screen cleaning, and pressure washing for homes in Lakeway, Bee Cave, and the Austin area.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ViewTracker event="service_view" params={{ page: "services_index" }} />
      <section className="pb-8 pt-12 sm:pt-16">
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-[2.2rem] sm:text-[3rem]">Services</h1>
          <p className="mt-3 max-w-[60ch] text-[16px] text-ink-soft">
            Every service below is available to book today. Pick one or bundle a few — the quote
            form lets you select everything you need in one pass.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {enabledServices.map((service) => (
              <ServiceCard key={service.slug} service={service} detailed />
            ))}
          </div>
        </Container>
      </section>

      {enabledServices.map((service) => (
        <script
          key={service.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
        />
      ))}

      <section className="border-t border-line py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[1.7rem]">Not sure what you need?</h2>
            <LinkButton href="/quote">Get a Free Quote</LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
