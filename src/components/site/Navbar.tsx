import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/site";
import logo from "@/assets/logo.webp";

function useRouteProgress() {
  const routerLoading = useRouterState({ select: (s) => s.isLoading || s.status === "pending" });
  // Starts true so the server-rendered HTML already contains the bar on a hard reload.
  const [docLoading, setDocLoading] = useState(true);
  const isLoading = routerLoading || docLoading;
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  // Hydration means the page is usable, so finish the bar then instead of waiting for
  // slow images/fonts. Before that, a CSS animation (no JS needed) keeps the bar moving.
  useEffect(() => {
    const bar = barRef.current;
    if (bar?.parentElement) {
      const pct = (bar.getBoundingClientRect().width / bar.parentElement.getBoundingClientRect().width) * 100;
      setProgress(Math.max(pct || 0, 15));
    }
    requestAnimationFrame(() => setDocLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      if (docLoading) return; // initial page load: handled by the CSS animation above
      setProgress(15);
      const id = setInterval(() => setProgress((p) => (p < 85 ? p + (90 - p) * 0.12 : p)), 120);
      return () => clearInterval(id);
    }
    setProgress((p) => (p > 0 ? 100 : 0));
    const hide = setTimeout(() => setVisible(false), 250);
    const reset = setTimeout(() => setProgress(0), 600);
    return () => {
      clearTimeout(hide);
      clearTimeout(reset);
    };
  }, [isLoading]);

  return { progress, visible, barRef, docLoading };
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { progress, visible, barRef, docLoading } = useRouteProgress();

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        open
          ? "border-b bg-background"
          : scrolled
          ? "border-b bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background"
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-20" aria-label="Main">
        <a href="/" target="_self" rel="noopener noreferrer">
          <img
            src={logo}
            alt="3FoundersLab Logo"
            fetchPriority="high"
            className="h-8 w-auto object-contain cursor-pointer"
          />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-dark hidden !py-2.5 text-sm sm:inline-flex">
            Let's Talk <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-background overflow-y-auto transition-all duration-300 md:hidden z-50 ${
          open ? "visible opacity-100 translate-y-0" : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="container-site flex flex-col justify-between min-h-full pt-6 pb-12">
          <ul className="flex flex-col gap-1">
            {[...navLinks, { to: "/contact", label: "Contact" } as const].map((l, i) => (
              <li
                key={l.to}
                style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                className={`transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 py-4 text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-blue w-full shadow-md"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Route loading progress bar */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] w-full overflow-hidden"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease-out" }}
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className={`h-full rounded-r-full ${docLoading ? "boot-progress" : ""} bg-gradient-to-r from-black via-brand to-brand-deep shadow-[0_0_10px_rgba(37,99,235,0.6)]`}
          style={{ ...(docLoading && progress === 0 ? {} : { width: `${progress}%` }), transition: progress === 0 ? "none" : "width 250ms ease-out" }}
        />
      </div>
    </header>
  );
}
