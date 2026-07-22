import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/SectionHeading";
import { LinkButton } from "@/components/Button";
import { galleryProjects } from "@/data/gallery";
import { ViewTracker } from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Real before-and-after window cleaning and pressure washing projects.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <ViewTracker event="gallery_interaction" params={{ type: "page_view", projectCount: galleryProjects.length }} />
      <section className="pb-8 pt-12 sm:pt-16">
        <Container>
          <Eyebrow>Our work</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-[2.2rem] sm:text-[3rem]">Gallery</h1>
          <p className="mt-3 max-w-[60ch] text-[16px] text-ink-soft">
            Real before-and-after photos from completed jobs. No stock photos, no stand-ins.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          {galleryProjects.length === 0 ? (
            <div className="rounded-card border border-dashed border-line-strong bg-bg-sunken p-10 text-center sm:p-16">
              <h2 className="text-[1.4rem]">Photos coming soon</h2>
              <p className="mx-auto mt-2 max-w-[52ch] text-[14.5px] text-ink-soft">
                We haven&rsquo;t added real job photos yet — this gallery only shows genuine
                completed work, so we&rsquo;d rather show nothing than a stand-in. Check back soon,
                or ask us directly about recent projects in your neighborhood.
              </p>
              <div className="mt-6 flex justify-center">
                <LinkButton href="/quote" size="sm">
                  Get a Free Quote
                </LinkButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryProjects.map((project) => (
                <figure key={project.slug} className="overflow-hidden rounded-card border border-line">
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-square">
                      <Image
                        src={project.beforeSrc}
                        alt={project.beforeAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative aspect-square">
                      <Image
                        src={project.afterSrc}
                        alt={project.afterAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <figcaption className="p-4">
                    <p className="text-[14.5px] font-semibold">{project.title}</p>
                    <p className="text-[13px] text-ink-faint">
                      {project.service} &middot; {project.location}
                    </p>
                    {project.caption ? (
                      <p className="mt-1 text-[13px] text-ink-soft">{project.caption}</p>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
