export type Service = {
  slug: string;
  name: string;
  enabled: boolean;
  isNew?: boolean;
  shortDescription: string;
  whatsIncluded: string[];
  bestFor: string;
  result: string;
  addOns?: string[];
};

/**
 * Every service the business could ever offer lives here, enabled or not.
 * A service only appears on the site when `enabled: true`. Flip the flag
 * and its full description goes live immediately — no copy to write.
 */
export const services: Service[] = [
  {
    slug: "window-cleaning-exterior",
    name: "Exterior Window Cleaning",
    enabled: true,
    shortDescription:
      "Streak-free glass on the outside of every window, hand-cleaned and squeegeed.",
    whatsIncluded: [
      "All exterior glass panes washed and squeegeed",
      "Frames and sills wiped down",
      "Cobwebs and debris cleared from window tracks",
    ],
    bestFor:
      "Homeowners who want the view from the street (and from inside looking out) to look sharp.",
    result: "Clear, streak-free glass and tidy frames from the outside in.",
    addOns: ["Screen cleaning", "Hard-water stain removal"],
  },
  {
    slug: "window-cleaning-interior",
    name: "Interior Window Cleaning",
    enabled: true,
    shortDescription:
      "The same careful, streak-free finish on the inside of your windows.",
    whatsIncluded: [
      "All interior glass panes washed and detailed",
      "Sills and tracks wiped down",
      "Care taken around furniture, blinds, and window treatments",
    ],
    bestFor:
      "Homeowners who want both sides done at once, or just the inside after exterior-only service in the past.",
    result: "Clear glass from every room, no smudges left behind.",
  },
  {
    slug: "screen-cleaning",
    name: "Screen Cleaning",
    enabled: true,
    shortDescription:
      "Screens removed, washed, and rehung so airflow and visibility stay clear.",
    whatsIncluded: [
      "Screens removed from each window",
      "Washed to clear dust, pollen, and grime",
      "Rehung and checked for fit",
    ],
    bestFor:
      "Homes where screens have visibly gone gray or hazy from pollen and dust buildup.",
    result: "Screens you can actually see through again.",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    enabled: true,
    isNew: true,
    shortDescription:
      "Driveways, walkways, and siding rinsed clean of grime, algae, and buildup.",
    whatsIncluded: [
      "Surface assessment to set safe pressure levels",
      "Driveways, walkways, or siding washed as requested",
    ],
    bestFor:
      "Homeowners with visible algae, dirt streaks, or grime on hard exterior surfaces.",
    result: "Noticeably cleaner concrete, pavers, or siding.",
  },
  {
    slug: "track-sill-cleaning",
    name: "Track & Sill Detailing",
    enabled: false,
    shortDescription:
      "Deep-clean detailing of window tracks and sills, beyond the standard wipe-down.",
    whatsIncluded: [
      "Tracks cleared of built-up dirt and debris",
      "Sills detailed by hand",
    ],
    bestFor: "Homes overdue for a deep clean of hard-to-reach window tracks.",
    result: "Tracks and sills free of the grime standard cleaning leaves behind.",
  },
  {
    slug: "hard-water-stain-removal",
    name: "Hard-Water Stain Removal",
    enabled: false,
    shortDescription:
      "Treatment for mineral deposits and hard-water spotting on glass.",
    whatsIncluded: ["Mineral deposit treatment", "Glass restoration pass"],
    bestFor: "Homes with visible white or cloudy mineral spotting on glass.",
    result: "Clearer glass where hard-water spots had built up.",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    enabled: false,
    shortDescription: "Debris cleared from gutters to keep water flowing away from the home.",
    whatsIncluded: ["Debris removal from gutters", "Downspout check"],
    bestFor: "Homes with visible leaf or debris buildup in gutters.",
    result: "Gutters clear and flowing.",
  },
  {
    slug: "christmas-lights",
    name: "Christmas Light Installation",
    enabled: false,
    shortDescription: "Seasonal light installation and takedown.",
    whatsIncluded: ["Installation", "Takedown at season's end"],
    bestFor: "Homeowners who want holiday lights without the ladder work.",
    result: "Lights installed safely and on schedule.",
  },
];

export const enabledServices = services.filter((s) => s.enabled);
