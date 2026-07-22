import { z } from "zod";

export const propertyTypes = ["Single-family home", "Townhouse / condo", "Multi-unit / commercial"] as const;
export const windowSides = ["Exterior only", "Interior only", "Both interior and exterior"] as const;
export const contactMethods = ["Phone call", "Text", "Email"] as const;
export const windowCountRanges = ["1–10", "11–20", "21–30", "31+", "Not sure"] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .regex(/^[0-9()+\-.\s]{7,20}$/, "Enter a valid phone number."),
  email: z
    .union([z.string().trim().email("Enter a valid email address."), z.literal("")])
    .optional(),
  address: z.string().trim().min(5, "Enter your property address or ZIP code."),
  services: z.array(z.string()).min(1, "Select at least one service."),
  windowSide: z.enum(windowSides).optional().or(z.literal("")),
  windowCount: z.enum(windowCountRanges).optional().or(z.literal("")),
  propertyType: z.enum(propertyTypes).optional().or(z.literal("")),
  contactMethod: z.enum(contactMethods, {
    errorMap: () => ({ message: "Select how you'd like to be contacted." }),
  }),
  preferredDate: z.string().optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you'd like us to contact you." }),
  }),
  // Spam protection — not shown as real fields in the UI copy above.
  company: z.string().max(0, "Spam check failed.").optional().default(""), // honeypot
  renderedAt: z.coerce.number(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const quoteFormDefaults = {
  name: "",
  phone: "",
  email: "",
  address: "",
  services: [] as string[],
  windowSide: "" as const,
  windowCount: "" as const,
  propertyType: "" as const,
  contactMethod: undefined as unknown as (typeof contactMethods)[number],
  preferredDate: "",
  message: "",
  consent: false as unknown as true,
  company: "",
  renderedAt: 0,
};
