import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/site";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b bg-background/90 backdrop-blur-md" : "border-b border-transparent bg-background"
        }`}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-20" aria-label="Main">
        <img src={logo} alt="3FoundersLab Logo" className="h-8 w-auto object-contain" />
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

      <div
        className={`fixed inset-x-0 top-16 bottom-0 bg-background transition-all duration-300 md:hidden ${open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
      >
        <ul className="container-site flex flex-col gap-1 pt-6">
          {[...navLinks, { to: "/contact", label: "Contact" } as const].map((l, i) => (
            <li key={l.to} style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }} className={`transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <Link to={l.to} onClick={() => setOpen(false)} className="block border-b py-4 text-2xl font-semibold tracking-tight">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-site mt-8">
          <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-blue w-full">Start a Project</Link>
        </div>
      </div>
    </header>
  );
}
