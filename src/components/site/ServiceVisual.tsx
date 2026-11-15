import { useId, type ReactNode } from "react";
import {
    Check, Search, TrendingUp, ShoppingBag, MousePointer2, Bot, Zap, Mail, Database, Server, Layers, FileText, Image as ImageIcon, Star,
} from "lucide-react";

/** Small helpers */
const Dot = ({ c = "bg-border" }: { c?: string }) => <span className={`h-2 w-2 rounded-full ${c}`} />;
const Line = ({ w, c = "bg-border" }: { w: string; c?: string }) => <div className={`h-1.5 rounded ${w} ${c}`} />;
const Float = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
    <div className={`animate-float absolute ${className}`} style={{ animationDelay: `${delay}s` }}>{children}</div>
);
const Chip = ({ children }: { children: ReactNode }) => (
    <span className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold shadow-md">{children}</span>
);
const Window = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={`overflow-hidden rounded-lg border bg-background shadow-lg ${className}`}>
        <div className="flex items-center gap-1.5 border-b bg-surface px-3 py-2"><Dot c="bg-red-300" /><Dot c="bg-amber-300" /><Dot c="bg-green-300" /></div>
        {children}
    </div>
);

function Website() {
    return (
        <>
            <Window className="absolute top-[14%] left-[8%] w-[62%]">
                <div className="space-y-2 p-4">
                    <Line w="w-1/2" c="bg-foreground/80" /><Line w="w-3/4" /><Line w="w-2/3" />
                    <div className="mt-3 flex gap-2"><span className="h-6 w-16 rounded bg-brand" /><span className="h-6 w-14 rounded border" /></div>
                    <div className="mt-3 grid grid-cols-3 gap-2"><span className="h-10 rounded bg-brand-soft" /><span className="h-10 rounded bg-brand-soft" /><span className="h-10 rounded bg-brand-soft" /></div>
                </div>
            </Window>
            <div className="absolute right-[7%] bottom-[12%] w-[26%] overflow-hidden rounded-xl border bg-background shadow-lg">
                <div className="mx-auto mt-1.5 h-1 w-6 rounded bg-border" />
                <div className="space-y-1.5 p-2.5"><Line w="w-2/3" c="bg-foreground/80" /><Line w="w-full" /><span className="block h-9 rounded bg-brand-soft" /><span className="block h-4 rounded bg-brand" /></div>
            </div>
            <Float className="top-[10%] right-[8%]" delay={0.8}><Chip><Zap className="h-3.5 w-3.5 text-brand" /> 98 speed</Chip></Float>
        </>
    );
}

function Ecommerce() {
    return (
        <>
            <div className="absolute top-[14%] left-[8%] grid w-[58%] grid-cols-2 gap-3">
                {[0, 1].map((i) => (
                    <div key={i} className="rounded-lg border bg-background p-2.5 shadow-md">
                        <div className={`flex h-14 items-center justify-center rounded ${i ? "bg-foreground" : "bg-brand-soft"}`}><ShoppingBag className={`h-6 w-6 ${i ? "text-background" : "text-brand"}`} strokeWidth={1.5} /></div>
                        <div className="mt-2 space-y-1"><Line w="w-3/4" c="bg-foreground/70" /><Line w="w-1/3" c="bg-brand" /></div>
                    </div>
                ))}
            </div>
            <Float className="right-[7%] bottom-[14%]" delay={0.5}>
                <div className="w-36 rounded-lg border bg-background p-3 shadow-xl">
                    <p className="text-[0.65rem] font-semibold text-muted-foreground">Cart Â· 2 items</p>
                    <div className="mt-2 space-y-1.5"><Line w="w-full" /><Line w="w-2/3" /></div>
                    <div className="mt-3 flex items-center justify-center gap-1.5 rounded bg-brand py-1.5 text-[0.7rem] font-semibold text-white"><Check className="h-3 w-3" /> Pay securely</div>
                </div>
            </Float>
            <Float className="top-[10%] right-[10%]" delay={1.4}><Chip><Check className="h-3.5 w-3.5 text-green-600" /> Order placed</Chip></Float>
        </>
    );
}

function Design() {
    const sw = ["bg-foreground", "bg-brand-deep", "bg-brand", "bg-brand-soft"];
    return (
        <>
            <div className="absolute top-[14%] left-[8%] w-[56%] rounded-lg border bg-background p-3 shadow-lg">
                <div className="grid h-24 grid-cols-3 gap-2">
                    <span className="col-span-2 rounded bg-brand-soft" /><span className="rounded border border-dashed border-brand" />
                    <span className="rounded border" /><span className="col-span-2 rounded bg-surface" />
                </div>
            </div>
            <Float className="top-[34%] left-[46%]" delay={0.6}><MousePointer2 className="h-6 w-6 fill-foreground text-foreground drop-shadow" /></Float>
            <Float className="right-[7%] bottom-[12%]" delay={1.2}>
                <div className="rounded-lg border bg-background p-3 shadow-xl">
                    <p className="text-[0.65rem] font-semibold text-muted-foreground">Colours</p>
                    <div className="mt-2 flex gap-1.5">{sw.map((c) => <span key={c} className={`h-6 w-6 rounded-full border ${c}`} />)}</div>
                    <p className="mt-3 text-lg font-bold leading-none">Aa</p>
                </div>
            </Float>
        </>
    );
}

/** Sample brand mark ("Apex"): gradient app-icon style tile with a clean peak symbol. */
function BrandMark({ className = "h-14 w-14" }: { className?: string }) {
    const id = useId();
    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden>
            <defs>
                <linearGradient id={`${id}-bg`} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#60A5FA" />
                    <stop offset="0.5" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id={`${id}-gloss`} x1="20" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#${id}-bg)`} />
            <rect x="1" y="1" width="38" height="20" rx="11" fill={`url(#${id}-gloss)`} />
            <path fillRule="evenodd" fill="#fff" d="M20 9 31.5 30.5h-5.8L20 19.8l-5.7 10.7H8.5z" />
            <path fill="#fff" fillOpacity="0.55" d="M20 19.8 23.2 26h-6.4z" />
            <circle cx="29.5" cy="11" r="2.4" fill="#fff" fillOpacity="0.85" />
            <rect x="1.5" y="1.5" width="37" height="37" rx="10.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
        </svg>
    );
}

function Wordmark({ light = false }: { light?: boolean }) {
    return (
        <div className="mt-2 text-center leading-none">
            <p className={`text-base font-extrabold tracking-[0.28em] ${light ? "text-white" : "text-foreground"}`}>APEX</p>
            <p className={`mt-1 text-[0.5rem] uppercase tracking-[0.3em] ${light ? "text-white/50" : "text-muted-foreground"}`}>Consulting</p>
        </div>
    );
}

function Branding() {
    return (
        <>
            <div className="absolute top-[12%] left-[8%] flex h-[46%] w-[34%] flex-col items-center justify-center rounded-xl bg-foreground shadow-lg">
                <BrandMark className="h-14 w-14 drop-shadow-[0_6px_14px_rgba(37,99,235,0.55)]" />
                <Wordmark light />
            </div>
            <div className="absolute top-[12%] left-[46%] w-[44%] rounded-lg border bg-background p-3 shadow-md">
                <p className="text-sm font-bold leading-tight">Brand Guidelines</p>
                <div className="mt-2 flex gap-1.5">{["bg-foreground", "bg-brand-deep", "bg-brand", "bg-brand-soft"].map((c) => <span key={c} className={`h-5 w-5 rounded-full border ${c}`} />)}</div>
                <div className="mt-3 space-y-1.5"><Line w="w-full" /><Line w="w-2/3" /></div>
            </div>
            <Float className="right-[8%] bottom-[10%]" delay={0.8}>
                <div className="w-32 -rotate-3 rounded-md border bg-background p-3 shadow-xl">
                    <BrandMark className="h-7 w-7" />
                    <div className="mt-3 space-y-1.5"><Line w="w-3/4" c="bg-foreground/70" /><Line w="w-1/2" /></div>
                </div>
            </Float>
        </>
    );
}

function AI() {
    return (
        <>
            <div className="absolute top-[14%] left-[8%] flex items-center gap-2.5">
                {[Mail, Bot, Database].map((Icon, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-md ${i === 1 ? "bg-brand text-white" : "bg-background text-brand"}`}><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                        {i < 2 && <span className="h-px w-5 border-t border-dashed border-brand/60" />}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-[12%] left-[8%] w-[60%] space-y-2 rounded-lg border bg-background p-3 shadow-lg">
                <div className="w-3/4 rounded-lg rounded-bl-none bg-surface px-3 py-2 text-[0.7rem] text-muted-foreground">Can you send me a quote?</div>
                <div className="ml-auto w-2/3 rounded-lg rounded-br-none bg-brand px-3 py-2 text-[0.7rem] text-white">Sure! Sent to your inbox.</div>
            </div>
            <Float className="top-[40%] right-[8%]" delay={0.7}><Chip><Zap className="h-3.5 w-3.5 text-brand" /> 12 hrs saved</Chip></Float>
        </>
    );
}

function Marketing() {
    return (
        <>
            <div className="absolute top-[12%] left-[8%] flex w-[62%] items-center gap-2 rounded-full border bg-background px-3 py-2 shadow-md">
                <Search className="h-4 w-4 text-muted-foreground" /><Line w="w-1/2" c="bg-foreground/40" />
            </div>
            <div className="absolute top-[30%] left-[8%] w-[62%] space-y-2 rounded-lg border bg-background p-3 shadow-lg">
                {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-[0.6rem] font-bold text-brand">{i + 1}</span>
                        <div className="flex-1 space-y-1"><Line w="w-3/4" c={i ? "bg-foreground/40" : "bg-brand"} /><Line w="w-full" /></div>
                    </div>
                ))}
            </div>
            <Float className="right-[7%] bottom-[12%]" delay={0.9}>
                <div className="w-32 rounded-lg border bg-background p-3 shadow-xl">
                    <div className="flex items-center justify-between"><p className="text-[0.65rem] font-semibold text-muted-foreground">Traffic</p><TrendingUp className="h-4 w-4 text-green-600" /></div>
                    <div className="mt-2 flex h-12 items-end gap-1">{[30, 45, 40, 65, 85].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: 0.4 + i * 0.15 }} />)}</div>
                </div>
            </Float>
        </>
    );
}

function CMS() {
    return (
        <>
            <Window className="absolute top-[12%] left-[8%] w-[64%]">
                <div className="grid grid-cols-[28%_1fr]">
                    <div className="space-y-2 border-r bg-surface p-3">{[FileText, ImageIcon, Layers].map((I, i) => <I key={i} className={`h-4 w-4 ${i === 0 ? "text-brand" : "text-muted-foreground"}`} />)}</div>
                    <div className="space-y-2 p-3"><Line w="w-1/2" c="bg-foreground/70" /><span className="block h-8 rounded border" /><span className="block h-8 rounded border" /><span className="block h-5 w-14 rounded bg-brand" /></div>
                </div>
            </Window>
            <Float className="right-[7%] bottom-[14%]" delay={0.6}><Chip><Check className="h-3.5 w-3.5 text-green-600" /> Published</Chip></Float>
            <Float className="top-[8%] right-[8%]" delay={1.3}><Chip>Draft saved</Chip></Float>
        </>
    );
}

function MERN() {
    return (
        <>
            <div className="absolute top-[14%] left-[8%] flex items-center gap-2.5">
                {[["M", "bg-green-600"], ["E", "bg-foreground"], ["R", "bg-cyan-500"], ["N", "bg-green-700"]].map(([l, c]) => (
                    <span key={l} className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-extrabold text-white shadow-md ${c}`}>{l}</span>
                ))}
            </div>
            <div className="absolute bottom-[12%] left-[8%] w-[56%] rounded-lg border bg-background p-3 shadow-lg">
                <div className="flex items-end gap-1.5 h-14">{[40, 65, 50, 80, 60, 90].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: 0.45 + i * 0.1 }} />)}</div>
                <div className="mt-2 flex gap-2"><Line w="w-1/3" c="bg-foreground/60" /><Line w="w-1/4" /></div>
            </div>
            <Float className="top-[40%] right-[8%]" delay={0.5}><Chip><Server className="h-3.5 w-3.5 text-brand" /> API live</Chip></Float>
            <Float className="right-[10%] bottom-[10%]" delay={1.5}><Chip><Star className="h-3.5 w-3.5 text-brand" /> Scalable</Chip></Float>
        </>
    );
}

const visuals: Record<string, () => ReactNode> = {
    "website-development": Website,
    "ecommerce-development": Ecommerce,
    "ui-ux-design": Design,
    "branding-logo-design": Branding,
    "ai-automation": AI,
    "digital-marketing-seo": Marketing,
    "cms-website-management": CMS,
    "mern-stack-development": MERN,
};

/** Unique illustration for each service, shown in the service page. */
export function ServiceVisual({ slug }: { slug: string }) {
    const Visual = visuals[slug];
    return (
        <div className="relative mt-8 aspect-[5/3] overflow-hidden rounded-xl border bg-gradient-to-br from-brand-soft via-background to-brand-soft" aria-hidden>
            <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
            {Visual && <Visual />}
        </div>
    );
}
