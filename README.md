# New Wave Exterior — website

A Next.js (App Router, TypeScript) marketing + lead-generation site for New
Wave Exterior, a residential window/screen/pressure-washing business serving
Lakeway, Bee Cave, West Lake Hills, The Hills, Austin, and nearby communities.

Built to be genuinely deployable — not a mockup. See `LAUNCH_CHECKLIST.md`
for the exact steps to take this live on a real domain.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, driven by CSS custom properties for the
  design tokens (colors/palette) so light/dark mode work from one source
- **Zod** for form validation (same schema on client and server)
- **Resend** (optional) for sending quote-form emails from a serverless
  API route — see "Connect the lead form" below
- Self-hosted fonts (Big Shoulders Display + Libre Franklin) via
  `next/font/local`
- No database — this is a static marketing site with one serverless API
  route for the quote form. Nothing else needs a backend.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The quote form works out of the box — without
`RESEND_API_KEY` set, submissions are validated and logged to the terminal
instead of emailed (you'll see `[quote] RESEND_API_KEY not set...` in the
server console). That's expected until you connect email delivery.

Other useful commands:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no build output
npm run build      # production build
npm run start      # run the production build locally
```

## Editing business details

Everything specific to the business lives in **`lib/config.ts`** — one
file, clearly commented. Change the phone number, email, service areas,
hours, social links, domain, etc. there and it updates across the whole
site (header, footer, structured data, metadata).

Anything marked `PLACEHOLDER` in that file is **not real information** —
nothing was invented. Fill in real values before launch. Also see
`lib/config.ts`'s `trustClaims` object: insurance/licensing/guarantee
claims default to `false`/`null` and render nothing until you explicitly
confirm and enable them. Don't flip these on without being sure — showing
an unverified insurance claim to homeowners is a real liability risk, not
just a copy tweak.

## Adding / editing services

Services live in **`data/services.ts`** as a single array. Each service has
an `enabled: true/false` flag — a service only appears on the site (Home,
Services page, quote form checkboxes) when `enabled: true`. Several
services from your original list (gutter cleaning, hard-water stain
removal, track/sill detailing, Christmas lights) are already written up
and ready — just flip `enabled` to `true` when you're ready to offer them.

To add a brand-new service, copy an existing object in that file and fill
in the fields (`whatsIncluded`, `bestFor`, `result`, etc). If it needs an
icon, add a case to `components/ServiceIcon.tsx`.

## Adding gallery images

The gallery starts empty on purpose — no fake "sample" projects are shown
as real work. To add real photos:

1. Read `public/images/gallery/README.md` for the folder/naming convention.
2. Drop `before.jpg` / `after.jpg` into a new folder under
   `public/images/gallery/<project-slug>/`.
3. Add an entry to `data/gallery.ts` pointing at those files, with real
   descriptive alt text.

The Gallery page automatically switches from the empty state to a photo
grid once `data/gallery.ts` has entries.

## Adding real reviews

`data/reviews.ts` starts empty. **Do not add fabricated reviews.** Once
you have real customer feedback (from Google, Yelp, Facebook, etc), add
entries there with the reviewer's name, star rating, quote, and source.
The homepage review section is hidden entirely in production until this
array has content — in development it shows a small note reminding you
it's not wired up yet.

## Connecting the lead form (quote requests)

The quote form POSTs to `/api/quote`, a serverless route that validates
the submission server-side and, if configured, emails it via
[Resend](https://resend.com).

To connect it for real:

1. Create a free Resend account at https://resend.com.
2. Get an API key from the Resend dashboard.
3. (Recommended) Verify your own sending domain in Resend — without this,
   emails send from Resend's shared test address, which is fine for
   testing but not for production.
4. Set these environment variables (see `.env.example`):
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (an address on your verified domain)
   - `LEAD_RECIPIENT_EMAIL` (optional — defaults to the email in `lib/config.ts`)
5. Redeploy. Submit a real test through the live form and confirm the
   email arrives.

**Alternative, no-backend options:** if you'd rather not manage an API
key, you can swap the form's `fetch("/api/quote")` call in
`components/QuoteForm.tsx` for a direct POST to
[Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
instead — both accept form submissions without a server component. This
project ships with the Resend/serverless approach because it keeps
validation and spam-filtering server-side and never exposes a key to the
browser, which is the safer default, but either alternative is a
reasonable choice for a site this size.

**Spam protection currently implemented:** a hidden honeypot field, a
minimum-fill-time check (rejects submissions faster than a human could
plausibly type), and a best-effort in-memory rate limit per IP address. The
rate limit is not persisted across serverless cold starts — if spam
becomes a real problem, add a proper solution like Upstash Redis or
Vercel's Firewall rules in front of `/api/quote`.

## Analytics

Off by default. Set `NEXT_PUBLIC_GA_ID` to a GA4 Measurement ID
(`G-XXXXXXX`) to enable it — no script loads and no cookies are set until
that variable exists. Once enabled, these events fire automatically:
`quote_form_start`, `quote_form_submit`, `quote_form_error`,
`phone_click`, `text_click`, `email_click`, `service_view`,
`gallery_interaction`.

To verify analytics is working: open the site with the GA ID set, open
your browser's Network tab, and confirm requests to
`google-analytics.com/g/collect` fire when you click a Call/Text button or
submit the quote form. In GA4 itself, check **Reports → Realtime**.

## Deploying

This project deploys cleanly to [Vercel](https://vercel.com) (the
company behind Next.js) with zero config:

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, "Add New Project" → import that repo. Framework preset
   auto-detects as Next.js — no changes needed.
3. Add the environment variables from `.env.example` in the Vercel
   project settings (Settings → Environment Variables).
4. Deploy. Vercel gives you a `*.vercel.app` URL immediately.

Any other Node-hosting platform that supports Next.js (Netlify, Render,
your own server via `npm run build && npm run start`) works too — Vercel
is the path of least friction since Next.js is built by the same team.

## Connecting your own domain

1. Buy a domain (Namecheap, Google Domains successor Squarespace
   Domains, Porkbun, etc — any registrar works).
2. In Vercel: Project → Settings → Domains → add your domain.
3. Vercel shows you the DNS records to add (usually an `A` record or
   `CNAME`) — add those in your registrar's DNS settings.
4. Wait for DNS to propagate (usually minutes, sometimes up to 24-48
   hours).
5. **Update `domain` in `lib/config.ts`** to your real production URL and
   redeploy — this feeds canonical URLs, Open Graph tags, the sitemap, and
   structured data, so it must be correct.

## Search Console / Google Business Profile

- After the domain is live, add it to
  [Google Search Console](https://search.google.com/search-console),
  verify ownership (Search Console supports DNS or HTML-file
  verification), and submit `https://yourdomain.com/sitemap.xml`.
- Create or claim a Google Business Profile at
  https://business.google.com, and once you have the URL, add it to
  `googleBusinessProfileUrl` in `lib/config.ts`.

## Testing submissions

Locally: run `npm run dev`, go to `/quote`, submit the form with valid
data, and check your terminal — you'll see the logged submission (or a
real email if `RESEND_API_KEY` is set). Try submitting with missing
required fields to confirm validation errors appear inline.

In production: submit a real test quote request through the live form
and confirm the email arrives at the configured recipient. Also test the
Call/Text buttons on an actual phone to confirm they open the dialer/
messages app correctly.

## Project structure

```
app/                route pages, layouts, API route, metadata files
components/         shared UI (Header, Footer, QuoteForm, etc)
lib/                config.ts (business info), schema.ts (JSON-LD),
                     quote-schema.ts (form validation), analytics.ts
data/                services.ts, faqs.ts, gallery.ts, reviews.ts, nav.ts —
                     structured content, edit these instead of hunting
                     through components
public/             fonts, gallery images, manifest
legacy-artifact/    the original single-file HTML prototype, kept for
                     reference only — not part of the live site
```
