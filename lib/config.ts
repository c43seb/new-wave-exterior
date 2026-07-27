/**
 * CENTRAL BUSINESS CONFIGURATION
 * ================================
 * Every business-specific value used across the site lives here.
 * Change a value once, it updates everywhere (header, footer, structured
 * data, metadata, quote form, etc).
 *
 * Fields marked "PLACEHOLDER" are NOT real business information — nothing
 * was invented. Replace them with real values before launch. See
 * LAUNCH_CHECKLIST.md for the full list of what must be filled in.
 */

export const siteConfig = {
  // ---- Identity -----------------------------------------------------
  businessName: "New Wave Exterior",
  shortName: "New Wave",
  tagline: "Crystal-clear windows without the hassle.",

  // ---- Contact --------------------------------------------------------
  // Real, provided by the business owner.
  phone: "(512) 758-9518",
  phoneHref: "tel:+15127589518",
  textNumber: "(512) 758-9518",
  textHref: "sms:+15127589518",
  email: "greystokesebastian@gmail.com",

  // PLACEHOLDER — no street address has been provided. Leave blank
  // (renders nothing) or fill in once the business has a public address.
  // Many home-service businesses intentionally omit a street address and
  // rely on service-area language instead, which is fine for local SEO.
  address: {
    street: "", // PLACEHOLDER
    city: "Lakeway",
    state: "TX",
    zip: "", // PLACEHOLDER
  },

  // ---- Domain ----------------------------------------------------------
  // newwaveexterior.com was confirmed available (WHOIS + DNS check) and
  // selected as the production domain. It still needs to actually be
  // purchased and pointed at the deployment before this URL is real —
  // see LAUNCH_CHECKLIST.md. This value feeds canonical URLs, Open Graph
  // tags, sitemap.xml, and JSON-LD structured data.
  domain: "https://newwaveexterior.com",

  // ---- Service area -----------------------------------------------------
  serviceAreas: [
    "Lakeway",
    "Bee Cave",
    "West Lake Hills",
    "The Hills",
    "Austin",
  ],
  serviceAreaNote: "and nearby Austin-area communities",

  // ---- Hours ------------------------------------------------------------
  // Confirmed by the business owner 2026-07-27.
  businessHours: [{ days: "Monday – Sunday", hours: "8:00 AM – 5:00 PM" }],

  // Shown on the quote page / after form submission.
  responseTime: "within 1 business day",

  // ---- Trust claims -------------------------------------------------------
  // PLACEHOLDER — every flag defaults to false/null. Nothing here was
  // confirmed by the business owner, so nothing renders on the site until
  // it's explicitly turned on. Do not flip these to true unless verified
  // (insurance certificate exists, licensing confirmed, etc) — showing an
  // unverified insurance or licensing claim to homeowners is a real legal
  // and trust risk.
  trustClaims: {
    licensedInsured: false, // PLACEHOLDER — confirm before enabling
    yearsInBusiness: null as number | null, // PLACEHOLDER
    satisfactionGuarantee: false, // PLACEHOLDER — confirm the actual policy before enabling
  },

  // ---- Social + review links --------------------------------------------
  // PLACEHOLDER — none provided yet. Leave any value empty to hide that
  // icon/link automatically (see components/SocialLinks.tsx).
  socialLinks: {
    facebook: "",
    instagram: "",
    nextdoor: "",
    tiktok: "",
  },

  // Google Business Profile is live and verified (confirmed 2026-07-26).
  // This is the direct "leave a review" link generated from the profile's
  // own "Ask for reviews" tool — clicking it takes a customer straight to
  // the review form, no search required.
  googleBusinessProfileUrl: "https://g.page/r/Cf_5Kdd5JCHCEBM/review",
  reviewUrl: "https://g.page/r/Cf_5Kdd5JCHCEBM/review",

  // ---- Pricing ------------------------------------------------------------
  // No real prices were provided. Keep hidden until the owner sets real
  // starting prices — never show invented numbers to homeowners.
  pricingVisibility: "hidden" as "hidden" | "visible",
  startingPrices: {
    // Example shape once real prices are ready:
    // "window-cleaning-exterior": 149,
  } as Record<string, number>,

  // ---- Analytics ------------------------------------------------------------
  // Optional. Leave empty to keep analytics off entirely (no script loads,
  // no cookies set). Set via environment variable, never hardcode here.
  analyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  // ---- Lead form ------------------------------------------------------------
  // Where the quote form's server route sends the email. Defaults to the
  // business email above; override via env var if a different inbox
  // should receive leads.
  leadRecipientEmail:
    process.env.LEAD_RECIPIENT_EMAIL ?? "greystokesebastian@gmail.com",
};

export type SiteConfig = typeof siteConfig;
