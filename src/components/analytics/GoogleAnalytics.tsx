import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { GA_MEASUREMENT_ID, isGAEnabled, trackPageView } from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFirstRender = useRef(true);

  // 1. Initialize Google Tag Manager / gtag.js on client mount
  useEffect(() => {
    if (!isGAEnabled()) return;

    // Prevent duplicate script injection
    if (!document.getElementById("ga-gtag-script")) {
      const script = document.createElement("script");
      script.id = "ga-gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      // Configure GA without auto-firing page_view, since we manually track SPA navigation
      gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
      });

      // Send initial page view
      trackPageView(window.location.pathname, document.title);
    }
  }, []);

  // 2. Track route transitions in the Single Page Application (SPA)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isGAEnabled()) return;

    // Small timeout to allow TanStack Router and page document.title to update
    const timer = setTimeout(() => {
      trackPageView(pathname, document.title);
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
