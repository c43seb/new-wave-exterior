import { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-body text-[12.5px] font-semibold uppercase tracking-[0.13em] text-accent-strong before:block before:h-px before:w-[22px] before:bg-accent-strong">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-[1.9rem] sm:text-[2.7rem]">{title}</h2>
      </div>
      {note ? <p className="max-w-[36ch] text-[15px] text-ink-soft">{note}</p> : null}
    </div>
  );
}
