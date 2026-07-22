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
 * No real job photos exist yet, so this list starts empty on purpose —
 * the Gallery page renders a real "add your first project" empty state
 * instead of fake before/after photos standing in for real work.
 *
 * To add a real project:
 * 1. Drop `before.jpg` and `after.jpg` into
 *    /public/images/gallery/<project-slug>/
 * 2. Add an entry below pointing at those files.
 * 3. Write real, specific alt text (not "before photo" / "after photo").
 *
 * See /public/images/gallery/README.md for the full naming convention.
 */
export const galleryProjects: GalleryProject[] = [];
