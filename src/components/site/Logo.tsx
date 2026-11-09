import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-foreground" />
      <rect x="7" y="8" width="4" height="16" rx="1" className="fill-background" />
      <rect x="14" y="12" width="4" height="12" rx="1" className="fill-background" />
      <rect x="21" y="16" width="4" height="8" rx="1" className="fill-brand" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="3FoundersLab home">
      <LogoMark />
      <span className="text-[1.05rem] font-bold tracking-tight">
        3Founders<span className="text-brand">Lab</span>
      </span>
    </Link>
  );
}
