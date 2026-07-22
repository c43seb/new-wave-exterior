const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  "aria-hidden": true,
} as const;

export function ServiceIcon({ slug, className = "h-11 w-11" }: { slug: string; className?: string }) {
  switch (slug) {
    case "window-cleaning-exterior":
    case "window-cleaning-interior":
      return (
        <svg {...common} className={className}>
          <rect x="6" y="5" width="36" height="38" rx="1.5" />
          <line x1="24" y1="5" x2="24" y2="43" />
          <line x1="6" y1="24" x2="42" y2="24" />
          <line x1="27" y1="10" x2="37" y2="19" strokeWidth={1.2} opacity={0.55} />
        </svg>
      );
    case "screen-cleaning":
      return (
        <svg {...common} className={className}>
          <rect x="6" y="5" width="36" height="38" rx="1.5" />
          <g opacity={0.9}>
            {[13, 24, 35].flatMap((y) =>
              [14, 24, 34].map((x) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="currentColor" stroke="none" />
              ))
            )}
          </g>
        </svg>
      );
    case "pressure-washing":
      return (
        <svg {...common} className={className}>
          <path d="M8 40 L20 18" strokeWidth={1.8} />
          <rect x="17" y="12" width="7" height="7" rx="1" transform="rotate(28 20 15)" />
          <path d="M27 15 Q34 13 39 17" strokeWidth={1.2} opacity={0.6} />
          <path d="M29 21 Q37 20 42 25" strokeWidth={1.2} opacity={0.6} />
          <path d="M25 27 Q33 28 37 34" strokeWidth={1.2} opacity={0.6} />
        </svg>
      );
    case "track-sill-cleaning":
      return (
        <svg {...common} className={className}>
          <rect x="6" y="20" width="36" height="6" rx="1" />
          <path d="M10 26v12M38 26v12" strokeWidth={1.2} opacity={0.6} />
        </svg>
      );
    case "hard-water-stain-removal":
      return (
        <svg {...common} className={className}>
          <path d="M24 6c7 9 11 15 11 21a11 11 0 1 1-22 0c0-6 4-12 11-21z" />
        </svg>
      );
    case "gutter-cleaning":
      return (
        <svg {...common} className={className}>
          <path d="M6 14h36v6H6z" />
          <path d="M20 20v10a4 4 0 0 0 8 0V20" strokeWidth={1.4} />
        </svg>
      );
    case "christmas-lights":
      return (
        <svg {...common} className={className}>
          <path d="M4 14c8 8 32 8 40 0" strokeWidth={1.4} />
          {[8, 16, 24, 32, 40].map((x) => (
            <circle key={x} cx={x} cy={x % 16 === 0 ? 18 : 20} r="2" fill="currentColor" stroke="none" />
          ))}
        </svg>
      );
    default:
      return (
        <svg {...common} className={className}>
          <circle cx="24" cy="24" r="18" />
        </svg>
      );
  }
}
