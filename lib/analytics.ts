/**
 * Minimal, privacy-respecting event tracking. Entirely inert unless
 * NEXT_PUBLIC_GA_ID is set — no script loads and no events fire otherwise.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_error"
  | "phone_click"
  | "text_click"
  | "email_click"
  | "service_view"
  | "gallery_interaction";

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
