# Launch checklist

Everything below is a real step. Items checked off were completed for you
already — you can verify by reading the referenced file. Everything else
needs an action only you can take (an account, a payment, a decision) — each
has the exact link and click path so there's no guessing involved.

## 1. Real business information

- [ ] Confirm business hours in `lib/config.ts` (`businessHours`) — the
      current value is a placeholder guess (Mon–Sat 8–6, closed Sunday)
      and was never explicitly confirmed. Just edit the strings directly.
- [ ] Decide whether to publish a street address. If yes, fill in
      `address.street` and `address.zip` in `lib/config.ts`.
- [x] **Domain picked and set in code**: `newwaveexterior.com` (confirmed
      available via WHOIS + DNS lookup). `lib/config.ts` `domain` now
      reads `https://newwaveexterior.com`.
  - [ ] **You still need to buy it.** Any registrar works; here are three
        with the domain pre-filled in the search so you can go straight to
        checkout:
        [Namecheap](https://www.namecheap.com/domains/registration/results/?domain=newwaveexterior.com) ·
        [Porkbun](https://porkbun.com/checkout/search?q=newwaveexterior.com) ·
        [Google Domains successor / Squarespace](https://domains.squarespace.com/search?query=newwaveexterior.com)
        — expect roughly $10–15/year. Porkbun and Namecheap are generally
        the least expensive with the fewest upsells.
- [ ] If you have social media accounts, add the URLs to `socialLinks` in
      `lib/config.ts`. Any left blank simply won't show an icon.
- [ ] Once a Google Business Profile exists (see section 7), add its URL to
      `googleBusinessProfileUrl` in `lib/config.ts`.

## 2. Trust claims — do not skip this

- [ ] Do **not** enable `trustClaims.licensedInsured` in `lib/config.ts`
      unless you have actually confirmed current insurance coverage.
      Showing an unverified insurance claim to homeowners is a real
      liability risk.
- [ ] Same for `trustClaims.satisfactionGuarantee` — only enable it once
      you've decided what the actual guarantee policy is.
- [ ] Only fill in `trustClaims.yearsInBusiness` with a real number.

## 3. Content

- [x] **Copy reviewed** — read through every page and checked for typos/
      repeated words/awkward phrasing programmatically and by hand. Clean.
- [x] **Placeholder audit** — confirmed no `PLACEHOLDER` text renders on
      any live page (only in code comments and docs, grep-verified).
- [ ] Add at least a few real before/after photos (see
      `public/images/gallery/README.md`) before heavily promoting the
      Gallery page — right now it correctly shows an empty state instead
      of fake photos, but an empty gallery undersells real work once you
      have it to show.
- [ ] Once you have real reviews, add them to `data/reviews.ts` (never
      fabricate these).

## 4. Lead form (get real emails from quote submissions)

- [ ] [Sign up for Resend](https://resend.com/signup) — free tier covers
      3,000 emails/month, no credit card required to start.
- [ ] Once logged in, go to
      [API Keys](https://resend.com/api-keys) → **Create API Key** → copy
      it.
- [ ] Paste that key into `.env.local` (already created for you at
      `/Users/sebigreystoke/new-wave-exterior/.env.local`) as
      `RESEND_API_KEY=re_...`
- [ ] Restart `npm run dev` and submit a real test quote request on
      `localhost:3000/quote` — you should get a real email this time
      instead of the "not configured" message.
- [ ] Optional but recommended before real launch: in Resend, go to
      [Domains](https://resend.com/domains) → **Add Domain** → enter
      `newwaveexterior.com` (once purchased) and add the DNS records they
      give you at your registrar. This lets emails send from
      `quotes@newwaveexterior.com` instead of Resend's shared test address
      — set that as `RESEND_FROM_EMAIL` once verified.
- [ ] When you deploy (section 6), add the same `RESEND_API_KEY` (and
      `RESEND_FROM_EMAIL` if set) in Vercel's environment variables —
      `.env.local` only works on your own machine.

## 5. Analytics (optional — skip if you don't want it)

- [ ] [Create a Google Analytics account](https://analytics.google.com/analytics/web/#/provision)
      → create a GA4 property → Web data stream → copy the **Measurement
      ID** (looks like `G-XXXXXXX`).
- [ ] Paste it into `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXX`, and add
      the same value in Vercel's environment variables when you deploy.
- [ ] Confirm events show up: open the live site, click a Call/Text button
      or submit the quote form, then check
      [GA4 Realtime](https://analytics.google.com/analytics/web/#/report/rt-overview)
      — you should see `phone_click`/`text_click`/`quote_form_submit`
      events within a minute.

## 6. Deploy

- [x] **Git repo initialized and first commit made locally** — nothing has
      been pushed anywhere; this only exists on your machine so far.
- [ ] Create a GitHub repo: go to
      [github.com/new](https://github.com/new), name it
      `new-wave-exterior`, leave it **empty** (no README/gitignore — this
      project already has them), click **Create repository**.
- [ ] GitHub will show you push commands — from
      `/Users/sebigreystoke/new-wave-exterior` run the `git remote add
      origin ...` and `git push -u origin main` lines it gives you.
- [ ] [Sign up for Vercel](https://vercel.com/signup) (their free Hobby
      tier is enough for this site) — signing in with your GitHub account
      is fastest.
- [ ] [Add New Project](https://vercel.com/new) → import the
      `new-wave-exterior` repo. Framework preset auto-detects as Next.js —
      don't change anything.
- [ ] Before clicking Deploy, expand **Environment Variables** and add
      whichever of `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
      `LEAD_RECIPIENT_EMAIL`, `NEXT_PUBLIC_GA_ID` you've set up. You can
      also add these later in Project → Settings → Environment Variables
      and redeploy.
- [ ] Click **Deploy**. You'll get a working `*.vercel.app` URL in about a
      minute — that's already a real, shareable, working site even before
      you connect a domain.
- [ ] Once `newwaveexterior.com` is purchased: in the Vercel project, go
      to **Settings → Domains**, add `newwaveexterior.com`, and follow the
      DNS records it shows you — add those at your registrar (Namecheap/
      Porkbun/etc, wherever you bought it). Usually live within minutes,
      sometimes up to 24-48 hours.

## 7. Search visibility

- [ ] [Google Search Console](https://search.google.com/search-console/welcome) →
      add `newwaveexterior.com` as a property → verify ownership (DNS
      TXT record is easiest if you're already editing DNS for the domain
      connection above — add both records at once).
- [ ] Once verified, go to **Sitemaps** in the left sidebar and submit
      `sitemap.xml` (the site already generates this automatically at
      `/sitemap.xml`).
- [ ] [Create/claim your Google Business Profile](https://business.google.com/create) —
      this is what makes the business show up on Google Maps and in local
      search. Once approved, copy the profile URL into
      `googleBusinessProfileUrl` in `lib/config.ts`.
- [ ] Visit `https://newwaveexterior.com/robots.txt` and
      `https://newwaveexterior.com/sitemap.xml` directly once live to
      confirm they load.

## 8. Final pass

- [ ] Click every nav link and every button on a real phone.
- [ ] Put the URL on business cards, social bios, etc. once everything
      above is done.
