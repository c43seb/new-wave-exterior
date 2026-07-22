export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Request a quote",
    description: "Tell us your address, the services you want, and roughly how many windows.",
  },
  {
    title: "We confirm details",
    description: "We follow up by phone or text to confirm scope, pricing, and a date.",
  },
  {
    title: "We clean, you check",
    description: "Our crew does the work, then you take a look before we call it done.",
  },
];
