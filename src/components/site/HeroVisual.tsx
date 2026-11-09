import { Code2, Palette, Zap } from "lucide-react";

/** Modular geometric composition representing websites, design systems and technology. */
export function HeroVisual() {
  return (
    <div className="page-in relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3">
        <div className="col-span-2 rounded-xl bg-brand-deep" />
        <div className="rounded-full bg-brand-soft" />
        <div className="rounded-xl border bg-surface" />
        <div className="relative rounded-xl bg-foreground">
          <div className="absolute inset-4 grid grid-cols-2 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => <span key={i} className={`rounded ${i === 3 ? "bg-brand" : "bg-background/15"}`} />)}
          </div>
        </div>
        <div className="rounded-t-full bg-brand" />
        <div className="rounded-xl bg-brand-soft" />
        <div className="col-span-2 rounded-xl border bg-background grid-lines" />
      </div>

      {/* floating UI chips */}
      <div className="animate-float absolute top-[14%] -left-4 flex items-center gap-2.5 rounded-lg border bg-background px-3.5 py-2.5 shadow-sm sm:-left-10">
        <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-soft"><Code2 className="h-4 w-4 text-brand" /></span>
        <div className="space-y-1"><div className="h-1.5 w-16 rounded bg-foreground/80" /><div className="h-1.5 w-10 rounded bg-border" /></div>
      </div>
      <div className="animate-float absolute right-[-0.5rem] bottom-[38%] flex items-center gap-2.5 rounded-lg border bg-background px-3.5 py-2.5 shadow-sm sm:-right-8" style={{ animationDelay: "1.5s" }}>
        <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-soft"><Palette className="h-4 w-4 text-brand" /></span>
        <div className="flex gap-1">{["bg-foreground", "bg-brand-deep", "bg-brand", "bg-brand-soft"].map((c) => <span key={c} className={`h-4 w-4 rounded-full border ${c}`} />)}</div>
      </div>
      <div className="animate-float absolute bottom-[6%] left-[8%] flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-xs font-medium text-background shadow-sm" style={{ animationDelay: "3s" }}>
        <Zap className="h-3.5 w-3.5 text-brand" /> Automated
      </div>
    </div>
  );
}
