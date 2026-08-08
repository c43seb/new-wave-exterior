import Image from "next/image";
import type { GalleryProject } from "@/data/gallery";

const arrow = (
  <svg
    className="h-4 w-4 flex-shrink-0 text-ink-faint"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Slot({
  src,
  alt,
  tag,
}: {
  src: string;
  alt: string;
  tag: "Before" | "After";
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-bg-sunken">
      <span className="absolute left-2 top-2 z-10 rounded-full border border-line bg-bg-raised px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
        {tag}
      </span>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 16vw, 33vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
}

export function RealBeforeAfter({ project, label }: { project: GalleryProject; label: string }) {
  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold">{label}</p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Slot src={project.beforeSrc} alt={project.beforeAlt} tag="Before" />
        {arrow}
        <Slot src={project.afterSrc} alt={project.afterAlt} tag="After" />
      </div>
    </div>
  );
}
