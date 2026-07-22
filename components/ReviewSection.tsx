import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/config";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/Container";

export function ReviewSection() {
  if (reviews.length === 0) {
    // Nothing fabricated is ever shown to homeowners. In production this
    // section is simply omitted from the page. In development, a small
    // admin-only note reminds whoever's building the site that reviews
    // still need to be added — it never ships.
    if (process.env.NODE_ENV === "production") return null;

    return (
      <section className="py-10">
        <Container>
          <div className="rounded-card border border-dashed border-line-strong bg-bg-sunken p-6 text-sm text-ink-faint">
            <p className="font-semibold text-ink-soft">
              [Dev note — not shown in production] Reviews section
            </p>
            <p className="mt-1">
              No real reviews are in <code>data/reviews.ts</code> yet, so this section is hidden
              from the live site. Add real reviews there once collected
              {siteConfig.reviewUrl ? "" : ", and set reviewUrl in lib/config.ts"}.
            </p>
          </div>
        </Container>
      </section>
    );
  }

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
        {siteConfig.reviewUrl ? (
          <p className="mt-6 text-sm text-ink-soft">
            <a href={siteConfig.reviewUrl} className="text-accent-strong underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Read more reviews
            </a>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
