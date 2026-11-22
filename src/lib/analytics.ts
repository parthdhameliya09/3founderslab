declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();

/**
 * Returns true if Google Analytics is enabled with a valid measurement ID
 */
export const isGAEnabled = (): boolean => {
  return (
    typeof window !== "undefined" &&
    Boolean(
      GA_MEASUREMENT_ID &&
      GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" &&
      GA_MEASUREMENT_ID.startsWith("G-")
    )
  );
};

/**
 * Track a page view in Google Analytics 4
 */
export const trackPageView = (path: string, title?: string) => {
  if (!isGAEnabled() || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title || document.title,
  });
};

/**
 * Track custom events in Google Analytics (e.g. form submissions, leads, button clicks)
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (!isGAEnabled() || !window.gtag) return;

  window.gtag("event", eventName, eventParams);
};
