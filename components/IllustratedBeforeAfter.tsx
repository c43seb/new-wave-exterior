import type { JSX } from "react";

type Pair = "window" | "screen" | "pressure-washing";

const arrow = (
  <svg
    className="h-4 w-4 flex-shrink-0 text-ink-faint"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Slot({ children, tag }: { children: React.ReactNode; tag: "Before" | "After" }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-bg-sunken">
      <span className="absolute left-2 top-2 rounded-full border border-line bg-bg-raised px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
        {tag}
      </span>
      <span className="absolute bottom-2 right-2 rounded-full bg-black/40 px-[7px] py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-white">
        Illustrative
      </span>
      {children}
    </div>
  );
}

function WindowBefore() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <rect width="100" height="100" fill="#9C9583" />
      <rect x="6" y="6" width="41" height="41" fill="#ABA48F" />
      <rect x="53" y="6" width="41" height="41" fill="#A39C87" />
      <rect x="6" y="53" width="41" height="41" fill="#A39C87" />
      <rect x="53" y="53" width="41" height="41" fill="#ABA48F" />
      <line x1="50" y1="4" x2="50" y2="96" stroke="#565042" strokeWidth="2.5" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#565042" strokeWidth="2.5" />
      <circle cx="20" cy="18" r="2.2" fill="#565042" opacity="0.45" />
      <circle cx="68" cy="20" r="1.8" fill="#565042" opacity="0.4" />
      <circle cx="78" cy="35" r="2.4" fill="#565042" opacity="0.45" />
      <circle cx="25" cy="70" r="2" fill="#565042" opacity="0.4" />
      <circle cx="85" cy="65" r="2.2" fill="#565042" opacity="0.4" />
      <path d="M10 85 L38 40" stroke="#6B644F" strokeWidth="1.4" opacity="0.5" />
      <path d="M58 92 L88 45" stroke="#6B644F" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

function WindowAfter() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <defs>
        <linearGradient id="wa1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE8F7" />
          <stop offset="1" stopColor="#7FB8E0" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#wa1)" />
      <line x1="50" y1="4" x2="50" y2="96" stroke="#1B5CA3" strokeWidth="2.5" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#1B5CA3" strokeWidth="2.5" />
      <polygon points="14,8 26,8 8,58 2,58" fill="#ffffff" opacity="0.4" />
      <polygon points="66,4 76,4 50,96 44,96" fill="#ffffff" opacity="0.22" />
    </svg>
  );
}

function ScreenBefore() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <defs>
        <pattern id="meshB" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="#8E876E" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="#D9D4C2" />
      <rect width="100" height="100" fill="url(#meshB)" />
      <ellipse cx="28" cy="32" rx="14" ry="9" fill="#6B5A3C" opacity="0.4" />
      <ellipse cx="66" cy="60" rx="17" ry="11" fill="#5C4A30" opacity="0.35" />
      <ellipse cx="76" cy="24" rx="9" ry="7" fill="#6B5A3C" opacity="0.35" />
    </svg>
  );
}

function ScreenAfter() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <defs>
        <pattern id="meshA" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="#3E7CB8" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="#EAF1F7" />
      <rect width="100" height="100" fill="url(#meshA)" />
    </svg>
  );
}

function PressureBefore() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <rect width="100" height="100" fill="#B7B2A2" />
      <line x1="0" y1="35" x2="100" y2="35" stroke="#948E7A" strokeWidth="1" />
      <line x1="0" y1="70" x2="100" y2="70" stroke="#948E7A" strokeWidth="1" />
      <ellipse cx="24" cy="18" rx="15" ry="9" fill="#4C5A3A" opacity="0.42" />
      <ellipse cx="72" cy="50" rx="19" ry="12" fill="#3D3226" opacity="0.38" />
      <ellipse cx="40" cy="82" rx="17" ry="10" fill="#4C5A3A" opacity="0.32" />
      <ellipse cx="88" cy="86" rx="10" ry="7" fill="#3D3226" opacity="0.32" />
    </svg>
  );
}

function PressureAfter() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="block h-full w-full">
      <rect width="100" height="100" fill="#E7E4D9" />
      <line x1="0" y1="35" x2="100" y2="35" stroke="#C9C4B2" strokeWidth="1" />
      <line x1="0" y1="70" x2="100" y2="70" stroke="#C9C4B2" strokeWidth="1" />
      <polygon points="0,92 100,58 100,66 0,98" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

const graphics: Record<Pair, { before: JSX.Element; after: JSX.Element; label: string }> = {
  window: { before: <WindowBefore />, after: <WindowAfter />, label: "Window cleaning" },
  screen: { before: <ScreenBefore />, after: <ScreenAfter />, label: "Screen cleaning" },
  "pressure-washing": {
    before: <PressureBefore />,
    after: <PressureAfter />,
    label: "Pressure washing",
  },
};

export function IllustratedBeforeAfter({ pair }: { pair: Pair }) {
  const g = graphics[pair];
  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold">{g.label}</p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Slot tag="Before">{g.before}</Slot>
        {arrow}
        <Slot tag="After">{g.after}</Slot>
      </div>
    </div>
  );
}
