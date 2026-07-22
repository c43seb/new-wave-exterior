import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.businessName} collects and uses information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-[70ch]">
          <h1 className="text-[2rem] sm:text-[2.6rem]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-ink-faint">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              This is a plain description of what information this website collects and how it is
              used — not a formal legal document, and not a claim of compliance with any specific
              law or regulation. If you need a legally reviewed policy, have one drafted by a
              qualified professional.
            </p>

            <div>
              <h2 className="text-[18px] font-bold text-ink">What we collect</h2>
              <p className="mt-2">
                When you submit the quote form on this site, we collect the information you enter:
                your name, phone number, email address (if provided), property address or ZIP
                code, the services you&rsquo;re interested in, and any additional details you
                choose to share. If you call or text us directly, we receive your phone number and
                whatever you tell us.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold text-ink">How we use it</h2>
              <p className="mt-2">
                We use the information you submit only to respond to your quote request — to
                contact you, estimate the job, and schedule work if you decide to move forward.
                We do not sell your information, and we do not use it for unrelated marketing
                without your consent.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold text-ink">Where it goes</h2>
              <p className="mt-2">
                Quote form submissions are sent directly to {siteConfig.businessName}&rsquo;s
                email inbox via a transactional email service. They are not stored in a public
                database or shared with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold text-ink">Analytics</h2>
              <p className="mt-2">
                {siteConfig.analyticsId
                  ? "This site uses basic analytics to understand how visitors use it (page views and button clicks). No personally identifying information is tied to analytics events."
                  : "Analytics are not currently active on this site."}
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about this policy or your information? Reach out at{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-accent-strong underline underline-offset-2">
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
