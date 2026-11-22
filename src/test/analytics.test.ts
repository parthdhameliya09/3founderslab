import { describe, expect, it, vi, beforeEach } from "vitest";
import { isGAEnabled, trackPageView, trackEvent } from "@/lib/analytics";

describe("Analytics utility", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    delete window.gtag;
    delete window.dataLayer;
  });

  it("does not enable GA with a placeholder or empty ID", () => {
    expect(isGAEnabled()).toBe(false);
  });

  it("safely handles trackPageView when GA is not initialized", () => {
    expect(() => trackPageView("/about", "About Us")).not.toThrow();
  });

  it("safely handles trackEvent when GA is not initialized", () => {
    expect(() => trackEvent("button_click", { id: "cta" })).not.toThrow();
  });
});
