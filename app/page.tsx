import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading, Eyebrow } from "@/components/SectionHeading";
import { LinkButton } from "@/components/Button";
import { IllustratedBeforeAfter } from "@/components/IllustratedBeforeAfter";
import { RealBeforeAfter } from "@/components/RealBeforeAfter";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ReviewSection } from "@/components/ReviewSection";
import { siteConfig } from "@/lib/config";
import { enabledServices } from "@/data/services";
import { processSteps } from "@/data/process";
import { galleryProjects } from "@/data/gallery";
import { faqSchema } from "@/lib/schema";

const windowGalleryProject = galleryProjects.find(
  (p) => p.slug === "lakeway-exterior-windows-01"
);

export const metadata: Metadata = {
  title: "Window Cleaning in Lakeway, Bee Cave & Austin, TX",
  description:
    "Crystal-clear windows without the hassle. Residential window, screen, and pressure washing in Lakeway, Bee Cave, West Lake Hills, The Hills, and Austin, TX. Free quotes.",
  alternates: { canonical: "/" },
};

const reasons = [
  {
    title: "We answer the phone",
    body: "Text or call and get a real response, not a voicemail loop.",
  },
  {
    title: "We treat your home like our own",
    body: "Careful with landscaping, furniture, and everything in between.",
  },
  {
    title: "Locally owned",
    body: `Based in the ${siteConfig.serviceAreas[0]} area, not a franchise call center.`,
  },
  {
    title: "Straightforward pricing",
    body: "You'll know the scope and price before we start, no surprises after.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-9 pt-12 sm:pb-12 sm:pt-16">
        <Container>
          <div className="max-w-[640px]">
            <Eyebrow>Residential window cleaning &middot; {siteConfig.serviceAreas[0]}, TX</Eyebrow>
            <h1 className="mt-4 text-[2.4rem] leading-[0.98] tracking-tight sm:text-[3.6rem]">
              Crystal-clear windows without the hassle.
            </h1>
            <p className="mt-4 max-w-[46ch] text-[16px] text-ink-soft sm:text-[18.5px]">
              Reliable window, screen, and pressure washing for homeowners in {siteConfig.serviceAreas[0]},{" "}
              {siteConfig.serviceAreas[1]}, and the surrounding Austin area. Request a free quote
              and hear back {siteConfig.responseTime}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/quote">Get a Free Quote</LinkButton>
              <LinkButton href={siteConfig.textHref} variant="ghost">
                Text Us
              </LinkButton>
            </div>
            <p className="mt-5 text-[13.5px] text-ink-faint">
              Free, no-obligation quotes &middot; Serving {siteConfig.serviceAreas.join(", ")}
            </p>
          </div>
        </Container>
      </section>

      {/* Before / after */}
      <section className="py-10 sm:py-12">
        <Container>
          <SectionHeading
            eyebrow="See the difference"
            title="Before & after"
            note="One real job below — screen and pressure washing are illustrated until we have real photos for those too."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {windowGalleryProject ? (
              <RealBeforeAfter project={windowGalleryProject} label="Window cleaning" />
            ) : (
              <IllustratedBeforeAfter pair="window" />
            )}
            <IllustratedBeforeAfter pair="screen" />
            <IllustratedBeforeAfter pair="pressure-washing" />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-line bg-bg-raised py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Services"
            note="Book one service or bundle several — the quote form covers it either way."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enabledServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reasons to choose us */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why homeowners choose us" title="Built on the details" />
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title}>
                <h3 className="text-[17px] font-bold">{r.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-soft">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-bg-raised py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="Three simple steps" />
          <div className="grid gap-8 sm:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={step.title} className="border-t-2 border-line-strong pt-4">
                <span className="mb-2 block font-display text-[15px] font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Service area" title="Proudly serving the Austin area" />
          <div className="flex flex-wrap gap-3">
            {siteConfig.serviceAreas.map((city) => (
              <span
                key={city}
                className="rounded-full border border-line-strong bg-bg-raised px-4 py-2 text-[14px] font-medium text-ink-soft"
              >
                {city}, TX
              </span>
            ))}
            <span className="rounded-full border border-dashed border-line-strong px-4 py-2 text-[14px] font-medium text-ink-faint">
              {siteConfig.serviceAreaNote}
            </span>
          </div>
        </Container>
      </section>

      <ReviewSection />

      {/* FAQ */}
      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="max-w-[720px]">
            <FAQAccordion />
          </div>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
        />
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-bg-raised py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[1.9rem] sm:text-[2.4rem]">Ready for clean windows?</h2>
              <p className="mt-2 max-w-[46ch] text-[15px] text-ink-soft">
                Get a free quote in a couple minutes, or call/text us directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/quote">Get a Free Quote</LinkButton>
              <LinkButton href={siteConfig.phoneHref} variant="ghost">
                Call {siteConfig.phone}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
