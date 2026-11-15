import type { ReactNode } from "react";
import { Code2, Palette, Zap } from "lucide-react";

function ReactLogo() {
  return (
    <svg viewBox="-12 -12 24 24" className="h-8 w-8" fill="none" stroke="#06B6D4" strokeWidth="1.2" aria-hidden>
      <circle r="1.9" fill="#06B6D4" stroke="none" />
      <ellipse rx="10" ry="4" />
      <ellipse rx="10" ry="4" transform="rotate(60)" />
      <ellipse rx="10" ry="4" transform="rotate(120)" />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
      <path d="M12 1.5 21 6.75v10.5L12 22.5 3 17.25V6.75z" fill="#3C873A" />
      <path d="M9 8v8M9 8l6 8M15 8v8" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MongoLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
      <path d="M12 1.5c2.6 3 5.2 5.6 5.2 10.3 0 4-2.2 6.8-4.6 8.2l-.4 2.5h-.4l-.4-2.5c-2.4-1.4-4.6-4.2-4.6-8.2C6.8 7.1 9.4 4.5 12 1.5z" fill="#47A248" />
      <path d="M12 4v16.5" stroke="#B8E0B5" strokeWidth="0.9" />
    </svg>
  );
}

function WordPressLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#21759B" aria-hidden>
      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
    </svg>
  );
}

function WebflowLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#4353FF" aria-hidden>
      <path d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z" />
    </svg>
  );
}

function DirectusLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#6644FF" aria-hidden>
      <path d="M19.187 13.909a1.74 1.74 0 0 1-.286-.092.657.657 0 0 1-.203-.139c.056-.488 0-.912.047-1.392.184-1.862 1.355-1.272 2.406-1.577.655-.184 1.31-.562 1.475-1.336a13.528 13.528 0 0 0-2.397-2.204c-2.85-2.028-6.574-2.84-9.958-2.277a5.113 5.113 0 0 0 2.238 2.074s-.917 0-1.703-.587c-.23.092-.692.274-.913.384a5.094 5.094 0 0 0 6.63.37c-.01.017-.185.285-.397 1.4-.47 2.38-1.826 2.195-3.504 1.596-3.485-1.264-5.403-.093-7.145-2.49-.507.286-.82.82-.82 1.402 0 .599.331 1.106.81 1.383.262-.348.38-.446.836-.446-.706.4-.79.75-1.094 1.718-.368 1.171-.212 2.37-1.936 2.683-.913.046-.894.664-1.226 1.586-.415 1.199-.968 1.678-2.047 2.812.443.535.904.6 1.374.406.968-.406 1.715-1.66 2.415-2.471.784-.904 2.665-.517 4.085-1.402.977-.599 1.457-1.41.811-2.784a2.72 2.72 0 0 1 .701 1.66c1.641-.213 3.836 1.788 5.836 2.12a3.574 3.574 0 0 1-.488-.82c-.23-.554-.304-1.06-.258-1.503.184 1.097 1.29 2.507 3.07 2.637.452.036.95-.019 1.466-.176.618-.184 1.19-.424 1.872-.295.507.093.977.35 1.272.784.443.645 1.41.784 1.844-.009-.977-2.554-3.67-2.72-4.813-3.015z" />
    </svg>
  );
}

function Badge({ children, className = "", size = "h-14 w-14", style }: { children: ReactNode; className?: string; size?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-float absolute flex items-center justify-center rounded-2xl border bg-background shadow-xl ring-4 ring-background/60 ${size} ${className}`} style={style}>
      {children}
    </div>
  );
}

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

      {/* floating technology badges */}
      <Badge className="top-[8%] left-[42%]" size="h-16 w-16" style={{ animationDelay: "0.4s", animationDuration: "5s" }}><ReactLogo /></Badge>
      <Badge className="top-[8%] right-[8%]" style={{ animationDelay: "2s", animationDuration: "6s" }}><WebflowLogo /></Badge>
      <Badge className="top-[42%] left-[6%]" style={{ animationDelay: "1s", animationDuration: "6.5s" }}><MongoLogo /></Badge>
      <Badge className="top-[35%] right-[8%]" size="h-12 w-12" style={{ animationDelay: "2.6s", animationDuration: "7s" }}><NodeLogo /></Badge>
      <Badge className="right-[7%] bottom-[8%]" size="h-16 w-16" style={{ animationDelay: "1.4s", animationDuration: "5.5s" }}><WordPressLogo /></Badge>
      <Badge className="bottom-[9%] left-[50%]" size="h-12 w-12" style={{ animationDelay: "3.2s", animationDuration: "7.5s" }}><DirectusLogo /></Badge>
    </div>
  );
}
