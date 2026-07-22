import { faqs } from "@/data/faqs";

/**
 * Native <details>/<summary> — fully keyboard operable and accessible
 * without any custom JS or ARIA wiring.
 */
export function FAQAccordion() {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-bg-raised">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-5 sm:p-6">
          <summary className="tap-target flex cursor-pointer list-none items-center justify-between gap-4 font-body text-[15.5px] font-semibold text-ink marker:content-none">
            {faq.question}
            <svg
              className="h-4 w-4 flex-shrink-0 text-ink-faint transition-transform group-open:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
