import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/SectionHeading";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.businessName} is a locally owned window cleaning business serving ${siteConfig.serviceAreas[0]} and the surrounding Austin area.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Work ethic",
    body: "We show up, do the job thoroughly, and don't cut corners to save time.",
  },
  {
    title: "Communication",
    body: "You'll know when we're coming, what's included, and what to expect — no guessing.",
  },
  {
    title: "Attention to detail",
    body: "Sills, tracks, and corners get the same care as the glass itself.",
  },
  {
    title: "Respect for your home",
    body: "We treat landscaping, furniture, and everything around the job site carefully.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-8 pt-12 sm:pt-16">
        <Container>
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-4 max-w-[22ch] text-[2.2rem] sm:text-[3rem]">
            A local crew, built around getting the details right.
          </h1>
          <div className="mt-5 max-w-[65ch] space-y-4 text-[16px] text-ink-soft">
            <p>
              {siteConfig.businessName} is locally owned and operated, serving{" "}
              {siteConfig.serviceAreas.join(", ")}, and nearby communities. We&rsquo;re a young,
              motivated team — and we take that as motivation to earn trust the direct way: by
              showing up, communicating clearly, and doing careful work every time.
            </p>
            <p>
              We&rsquo;re not trying to be the biggest crew in the area. We&rsquo;re trying to be
              the one homeowners call again next year, and the one they recommend to a neighbor.
              That means being easy to reach, straightforward about pricing and scope, and
              treating every property like it&rsquo;s the only job on the schedule that day.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-bg-raised py-12 sm:py-16">
        <Container>
          <h2 className="text-[1.7rem]">What we focus on</h2>
          <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-[16px] font-bold">{v.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[1.7rem]">Want to see if we&rsquo;re a fit?</h2>
              <p className="mt-1.5 text-[15px] text-ink-soft">
                Reach out and tell us what you need — we&rsquo;ll follow up {siteConfig.responseTime}.
              </p>
            </div>
            <LinkButton href="/quote">Get a Free Quote</LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
