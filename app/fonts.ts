import localFont from "next/font/local";

export const displayFont = localFont({
  src: "../public/fonts/big-shoulders.woff2",
  variable: "--font-display",
  weight: "600 900",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../public/fonts/libre-franklin.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../public/fonts/libre-franklin-italic.woff2",
      weight: "400 600",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
