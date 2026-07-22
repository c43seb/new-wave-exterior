export type FAQ = {
  question: string;
  answer: string;
};

/**
 * Only FAQs that are actually rendered on the page belong here — FAQ
 * structured data is generated from this exact list, and search engines
 * penalize FAQ schema that doesn't match visible page content.
 */
export const faqs: FAQ[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve Lakeway, Bee Cave, West Lake Hills, The Hills, Austin, and nearby communities. If you're not sure whether your address is in range, send a quote request and we'll let you know.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Fill out the quote form with your address, the services you want, and a rough window count, or call/text us directly. We'll follow up to confirm details and pricing.",
  },
  {
    question: "Do you clean interior and exterior windows?",
    answer:
      "Yes — you can request exterior only, interior only, or both when you submit your quote.",
  },
  {
    question: "How soon can you get to my property?",
    answer:
      "Availability depends on the season and current schedule. Let us know your preferred date on the quote form and we'll confirm what's realistic when we follow up.",
  },
  {
    question: "What's the difference between pressure washing and soft washing?",
    answer:
      "Pressure washing uses high water pressure and works well on durable surfaces like concrete driveways. Soft washing uses lower pressure with a cleaning solution and is better suited to more delicate surfaces like siding or painted surfaces. We'll recommend the right approach for your surface.",
  },
];
