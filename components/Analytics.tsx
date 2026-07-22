import Script from "next/script";
import { siteConfig } from "@/lib/config";

/**
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set. No cookies, no script,
 * no network request happens for visitors when analytics isn't configured.
 */
export function Analytics() {
  const id = siteConfig.analyticsId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
