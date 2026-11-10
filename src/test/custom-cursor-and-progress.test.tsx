import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CustomCursor } from "@/components/site/CustomCursor";

describe("CustomCursor Component", () => {
  it("renders when fine pointer is supported", () => {
    // Mock matchMedia for pointer: fine
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(pointer: fine)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).not.toBeNull();
    expect(document.documentElement.classList.contains("has-custom-cursor")).toBe(true);
  });

  it("does not render when pointer is not fine (e.g. mobile/touch)", () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });
});

