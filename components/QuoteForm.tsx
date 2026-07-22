"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  quoteSchema,
  contactMethods,
  propertyTypes,
  windowSides,
  windowCountRanges,
} from "@/lib/quote-schema";
import { enabledServices } from "@/data/services";
import { siteConfig } from "@/lib/config";
import { Button, LinkButton } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<string, string[]>>;

const fieldClasses =
  "tap-target w-full rounded-sm border border-line-strong bg-bg-sunken px-3 py-[11px] text-ink placeholder:text-ink-faint";
const labelClasses = "text-[13px] font-semibold text-ink-soft";
const errorClasses = "mt-1 text-[13px] font-medium text-sun";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [services, setServices] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [topLevelError, setTopLevelError] = useState<string>("");
  const [deliveryNote, setDeliveryNote] = useState<string>("");
  const startedTracking = useRef(false);
  const renderedAtRef = useRef<number>(0);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const serviceLabelBySlug = useMemo(
    () => Object.fromEntries(enabledServices.map((s) => [s.slug, s.name])),
    []
  );

  function handleFirstInteraction() {
    if (!startedTracking.current) {
      startedTracking.current = true;
      trackEvent("quote_form_start");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTopLevelError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const raw = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      services,
      windowSide: String(formData.get("windowSide") || ""),
      windowCount: String(formData.get("windowCount") || ""),
      propertyType: String(formData.get("propertyType") || ""),
      contactMethod: String(formData.get("contactMethod") || ""),
      preferredDate: String(formData.get("preferredDate") || ""),
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") || ""),
      renderedAt: renderedAtRef.current,
    };

    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setStatus("error");
      setTopLevelError("Please fix the highlighted fields below.");
      trackEvent("quote_form_error", { reason: "client_validation" });
      const firstErrorField = Object.keys(parsed.error.flatten().fieldErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setTopLevelError(
          json.message || "Something went wrong submitting the form. Please call or text us instead."
        );
        trackEvent("quote_form_error", { reason: "server", status: res.status });
        return;
      }

      setStatus("success");
      setDeliveryNote(json.delivered === false ? json.message : "");
      trackEvent("quote_form_submit");
    } catch {
      setStatus("error");
      setTopLevelError("Network error — please check your connection and try again, or call/text us.");
      trackEvent("quote_form_error", { reason: "network" });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-bg-raised p-7 sm:p-10" role="status">
        <h2 className="text-[1.6rem]">Request received.</h2>
        <p className="mt-2 max-w-[55ch] text-[15px] text-ink-soft">
          Thanks — we&rsquo;ll follow up {siteConfig.responseTime}. If it&rsquo;s urgent, call or
          text us directly in the meantime.
        </p>
        {deliveryNote ? (
          <p className="mt-3 rounded-sm border border-dashed border-line-strong bg-bg-sunken p-3 text-[13px] text-ink-faint">
            {deliveryNote}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={siteConfig.phoneHref} onClick={() => trackEvent("phone_click", { location: "quote_success" })}>
            Call {siteConfig.phone}
          </LinkButton>
          <LinkButton
            href={siteConfig.textHref}
            variant="ghost"
            onClick={() => trackEvent("text_click", { location: "quote_success" })}
          >
            Text Us
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onFocus={handleFirstInteraction}
      className="rounded-card border border-line bg-bg-raised p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className={labelClasses}>
            Full name <span className="text-sun">*</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={fieldClasses} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name ? <p id="name-error" className={errorClasses}>{errors.name[0]}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-sun">*</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClasses} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone ? <p id="phone-error" className={errorClasses}>{errors.phone[0]}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClasses}>
            Email <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={fieldClasses} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email ? <p id="email-error" className={errorClasses}>{errors.email[0]}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="address" className={labelClasses}>
            Property address or ZIP <span className="text-sun">*</span>
          </label>
          <input id="address" name="address" type="text" autoComplete="street-address" className={fieldClasses} aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} />
          {errors.address ? <p id="address-error" className={errorClasses}>{errors.address[0]}</p> : null}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClasses}>
            Services wanted <span className="text-sun">*</span>
          </legend>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
            {enabledServices.map((service) => (
              <label
                key={service.slug}
                className="tap-target flex items-center gap-2.5 rounded-sm border border-line-strong bg-bg-sunken px-3 py-[10px] text-[14.5px]"
              >
                <input
                  type="checkbox"
                  name="serviceCheckbox"
                  value={service.slug}
                  checked={services.includes(service.slug)}
                  onChange={(e) => {
                    setServices((prev) =>
                      e.target.checked
                        ? [...prev, service.slug]
                        : prev.filter((s) => s !== service.slug)
                    );
                  }}
                  className="h-4 w-4 flex-shrink-0 accent-accent"
                />
                {service.name}
              </label>
            ))}
          </div>
          {errors.services ? <p className={errorClasses}>{errors.services[0]}</p> : null}
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="windowSide" className={labelClasses}>
            Interior, exterior, or both <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <select id="windowSide" name="windowSide" className={fieldClasses} defaultValue="">
            <option value="">Not sure yet</option>
            {windowSides.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="windowCount" className={labelClasses}>
            Approximate number of windows <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <select id="windowCount" name="windowCount" className={fieldClasses} defaultValue="">
            <option value="">Not sure</option>
            {windowCountRanges.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="propertyType" className={labelClasses}>
            Property type <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <select id="propertyType" name="propertyType" className={fieldClasses} defaultValue="">
            <option value="">Prefer not to say</option>
            {propertyTypes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredDate" className={labelClasses}>
            Preferred date <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input id="preferredDate" name="preferredDate" type="date" className={fieldClasses} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClasses}>
            Preferred contact method <span className="text-sun">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {contactMethods.map((method) => (
              <label key={method} className="tap-target flex items-center gap-2 text-[14.5px]">
                <input type="radio" name="contactMethod" value={method} className="h-4 w-4 accent-accent" />
                {method}
              </label>
            ))}
          </div>
          {errors.contactMethod ? <p className={errorClasses}>{errors.contactMethod[0]}</p> : null}
        </fieldset>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Anything else we should know? <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${fieldClasses} resize-y`}
            placeholder="Gate code, pets, hard-to-reach areas, hard-water staining, etc."
          />
        </div>

        {/* Honeypot — hidden from real users, visible to bots that fill every field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex items-start gap-2.5 sm:col-span-2">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 flex-shrink-0 accent-accent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label htmlFor="consent" className="text-[13.5px] text-ink-soft">
            I agree to be contacted about this request by phone, text, or email. See the{" "}
            <a href="/privacy" className="text-accent-strong underline underline-offset-2">
              privacy policy
            </a>
            . <span className="text-sun">*</span>
          </label>
        </div>
        {errors.consent ? <p id="consent-error" className={`${errorClasses} sm:col-span-2`}>{errors.consent[0]}</p> : null}
      </div>

      {topLevelError ? (
        <p role="alert" className="mt-5 rounded-sm border border-sun bg-sun-soft px-4 py-3 text-[14px] font-medium text-sun">
          {topLevelError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Quote Request"}
        </Button>
        <p className="text-[13.5px] text-ink-faint">
          Prefer to talk? Call{" "}
          <a href={siteConfig.phoneHref} className="text-accent-strong underline underline-offset-2">
            {siteConfig.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent-strong underline underline-offset-2">
            {siteConfig.email}
          </a>
        </p>
      </div>

      {preselectedService && serviceLabelBySlug[preselectedService] ? (
        <p className="mt-3 text-[12.5px] text-ink-faint">
          Pre-selected: {serviceLabelBySlug[preselectedService]}
        </p>
      ) : null}
    </form>
  );
}
