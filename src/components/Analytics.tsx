"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    _lt?: (...args: any[]) => void;
    _ltq?: any[];
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

export default function Analytics({ gaId }: { gaId?: string }) {
  const id = gaId || process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {id && (
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
              gtag('config', '${id}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
