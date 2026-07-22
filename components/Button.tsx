import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const base =
  "tap-target inline-flex items-center justify-center gap-2 rounded-sm font-body font-semibold leading-none whitespace-nowrap transition-[background,border-color,transform] duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-accent-strong hover:border-accent-strong",
  ghost:
    "bg-transparent text-ink border border-line-strong hover:border-ink-faint hover:bg-bg-sunken",
};

const sizes: Record<Size, string> = {
  md: "px-[22px] py-[13px] text-[15px]",
  sm: "px-4 py-[9px] text-[13.5px]",
};

type LinkButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: undefined;
};

export function LinkButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  external,
  onClick,
}: LinkButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isProtocolLink =
    href.startsWith("tel:") || href.startsWith("sms:") || href.startsWith("mailto:");

  if (external || isProtocolLink) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...buttonProps
}: NativeButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
