# Gallery images

This folder holds real before/after job photos. It starts empty on purpose —
the site does not display fake or stock "sample" projects in the gallery.

## Folder structure

Create one subfolder per project, named with a short slug:

```
public/images/gallery/
  lakeway-exterior-windows-01/
    before.jpg
    after.jpg
  bee-cave-pressure-wash-01/
    before.jpg
    after.jpg
```

## Naming convention

- Folder name: `<city>-<service>-<number>` (lowercase, hyphenated)
  e.g. `lakeway-exterior-windows-01`, `westlakehills-screen-cleaning-01`
- Files inside: always `before.jpg` and `after.jpg` (or `.webp` / `.png`)

## Image guidelines

- Use real, unedited photos of actual completed jobs only.
- Landscape or square orientation both work; keep before/after pairs the
  same aspect ratio so the comparison lines up.
- Reasonable size: ~1600px on the longest edge is plenty — Next.js will
  generate optimized responsive sizes automatically. Avoid uploading
  multi-megabyte camera originals directly.
- Never include identifying details you don't have permission to publish
  (house numbers, license plates, faces of people who haven't consented).

## Registering a project

After adding photos, add an entry to `data/gallery.ts`:

```ts
{
  slug: "lakeway-exterior-windows-01",
  title: "Exterior window cleaning — Lakeway",
  service: "Exterior Window Cleaning",
  location: "Lakeway, TX",
  beforeSrc: "/images/gallery/lakeway-exterior-windows-01/before.jpg",
  afterSrc: "/images/gallery/lakeway-exterior-windows-01/after.jpg",
  beforeAlt: "Hazy, streaked exterior window before cleaning",
  afterAlt: "Same window after cleaning, glass clear and streak-free",
}
```

Write specific alt text for each photo — not generic "before photo" /
"after photo" — it materially helps both accessibility and image SEO.
