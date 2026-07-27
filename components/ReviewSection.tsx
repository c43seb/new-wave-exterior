import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/config";
import { SectionHeading, Eyebrow } from "@/components/SectionHeading";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";

export function ReviewSection() {
  const hasReviews = reviews.length > 0;
  const hasReviewLink = Boolean(siteConfig.reviewUrl);

  // Nothing fabricated is ever shown to homeowners. If there's genuinely
  // nothing to show (no real reviews, no review link) the section is
  // omitted from production entirely, with a dev-only reminder instead.
  if (!hasReviews && !hasReviewLink) {
    if (process.env.NODE_ENV === "production") return null;

    return (
      <section className="py-10">
        <Container>
          <div className="rounded-card border border-dashed border-line-strong bg-bg-sunken p-6 text-sm text-ink-faint">
            <p className="font-semibold text-ink-soft">
              [Dev note — not shown in production] Reviews section
            </p>
            <p className="mt-1">
              No real reviews are in <code>data/reviews.ts</code> yet, and
              <code>reviewUrl</code> isn&rsquo;t set in <code>lib/config.ts</code> either, so this
              section is hidden from the live site.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Reviews exist — show them plus a "read more" link to the profile.
  if (hasReviews) {
    return (
      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What homeowners say" title="Reviews" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-card border border-line bg-bg-raised p-6">
                <div className="mb-2 text-sun" aria-hidden="true">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>
                <blockquote className="text-[14.5px] text-ink-soft">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-[13px] font-semibold text-ink">
                  {r.name} <span className="font-normal text-ink-faint">via {r.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          {hasReviewLink ? (
            <p className="mt-6 text-sm text-ink-soft">
              <a
                href={siteConfig.reviewUrl}
                className="text-accent-strong underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more reviews
              </a>
            </p>
          ) : null}
        </Container>
      </section>
    );
  }

  // No reviews yet, but a real review link exists — invite the first ones
  // instead of showing nothing (or, worse, a fabricated testimonial).
  return (
    <section className="border-t border-line py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Just getting started</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] sm:text-[2.4rem]">Be one of our first reviews</h2>
            <p className="mt-2 max-w-[52ch] text-[15px] text-ink-soft">
              {`We’re building our reputation in ${siteConfig.serviceAreas[0]} one job at a time. If we’ve cleaned your windows, a quick review helps other homeowners find us.`}
            </p>
          </div>
          <LinkButton href={siteConfig.reviewUrl} external>
            Leave a Google Review
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
