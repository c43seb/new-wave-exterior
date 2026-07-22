import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-wrap px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
