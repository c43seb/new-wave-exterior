export type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: "Google" | "Yelp" | "Facebook" | "Nextdoor";
};

/**
 * Empty on purpose — no testimonials have been collected yet. Do not add
 * placeholder/fabricated reviews here. ReviewSection renders nothing in
 * production until this array has real entries.
 */
export const reviews: Review[] = [];
