export type GalleryProject = {
  slug: string;
  title: string;
  service: string;
  location: string; // neighborhood/city level only, never a full street address
  beforeSrc: string; // path under /public/images/gallery/
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
};

/**
 * To add a real project:
 * 1. Drop `before.jpg` and `after.jpg` into
 *    /public/images/gallery/<project-slug>/
 * 2. Add an entry below pointing at those files.
 * 3. Write real, specific alt text (not "before photo" / "after photo").
 *
 * See /public/images/gallery/README.md for the full naming convention.
 */
export const galleryProjects: GalleryProject[] = [
  {
    slug: "lakeway-exterior-windows-01",
    title: "From hazy to clear",
    service: "Exterior Window Cleaning",
    location: "Lakeway, TX",
    beforeSrc: "/images/gallery/lakeway-exterior-windows-01/before.jpg",
    afterSrc: "/images/gallery/lakeway-exterior-windows-01/after.jpg",
    beforeAlt:
      "Sliding glass window with a hazy, dust-filmed exterior pane blurring the plantation shutters and yard behind it",
    afterAlt:
      "Same sliding glass window after cleaning, glass fully clear with the shutters, brick sill, and yard sharply visible",
  },
];
