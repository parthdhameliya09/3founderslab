import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;

    const checkElement = (target: Element | null) => {
      if (!target) return;
      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], select, summary, [data-cursor="pointer"], label, input[type="checkbox"], input[type="radio"]'
        )
      );
      const isInputField = Boolean(
        target.closest(
          'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="url"], input[type="password"], textarea, [contenteditable="true"]'
        )
      );

      setIsHovered(isInteractive);
      setIsText(isInputField);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      checkElement(e.target as Element | null);
    };

    const onScroll = () => {
      if (mouseX >= 0 && mouseY >= 0) {
        checkElement(document.elementFromPoint(mouseX, mouseY));
      }
    };

    const onPointerDown = () => setIsClicked(true);
    const onPointerUp = () => setIsClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center will-change-transform transition-opacity duration-200 ${
        visible && !isText ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
      aria-hidden="true"
    >
      {/* Outer subtle halo ring — perfectly concentric and unified with the blue dot */}
      <div
        className={`absolute rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? "h-10 w-10 border-brand/60 bg-brand/15 shadow-[0_0_16px_rgba(59,130,246,0.3)] scale-100"
            : isClicked
            ? "h-6 w-6 border-brand bg-brand/25 scale-95"
            : "h-7 w-7 border-brand/40 bg-brand/[0.05] scale-100"
        }`}
      />

      {/* Center theme-blue dot — always anchored precisely at the mouse position */}
      <div
        className={`relative rounded-full bg-brand shadow-[0_0_8px_rgba(59,130,246,0.8)] ring-1 ring-background/60 transition-all duration-150 ease-out ${
          isHovered
            ? "h-2 w-2 scale-125"
            : isClicked
            ? "h-1.5 w-1.5 scale-90"
            : "h-2.5 w-2.5"
        }`}
      />
    </div>
  );
}
