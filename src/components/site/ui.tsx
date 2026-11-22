import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import type { Service } from "@/data/services";
import type { Project } from "@/data/projects";
import { formatDate, type Post } from "@/data/blogs";
import type { Testimonial } from "@/data/people";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, align = "left", action }: {
  eyebrow?: string; title: ReactNode; description?: string; align?: "left" | "center"; action?: ReactNode;
}) {
  return (
    <Reveal className={`mb-12 flex flex-col gap-6 md:mb-16 ${align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">{title}</h2>
        {description && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-site relative pt-16 pb-16 md:pt-12 md:pb-12">
        <p className="eyebrow mb-5 page-in">{eyebrow}</p>
        <h1 className="page-in max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">{title}</h1>
        {description && <p className="page-in mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services"
      hash={service.slug}
      className="group relative flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-brand-soft"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted-foreground">{service.number}</span>
        <Icon className="h-6 w-6 text-brand transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.6} />
      </div>
      <h3 className="mt-10 text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <span className="link-arrow mt-6 text-sm group-hover:text-brand">Explore Service <ArrowRight className="h-4 w-4" /></span>
    </Link>
  );
}

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
      <div className={`overflow-hidden rounded-lg bg-surface ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" width={1600} height={1008}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">{project.industry} · <span className="text-brand">{project.category}</span></p>
          <h3 className="mt-1.5 text-xl font-semibold">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => <span key={t} className="rounded border px-2 py-0.5 text-xs text-muted-foreground">{t}</span>)}
          </div>
        </div>
        <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-primary-foreground" aria-hidden>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <span className="sr-only">View Case Study</span>
    </Link>
  );
}

const coverStyles = [
  "bg-brand-deep text-primary-foreground",
  "bg-brand-soft text-brand-deep",
  "bg-foreground text-background",
  "bg-surface text-foreground",
];
export function BlogCover({ post, className = "", eager = false, natural = false }: {
  post: Post; className?: string; eager?: boolean;
  /** Show the uploaded image at its own aspect ratio instead of the frame's (used on the article page). */
  natural?: boolean;
}) {
  if (post.cover) {
    // Covers often contain text, so they are never cropped: "contain" inside fixed card frames.
    return (
      <div className={`overflow-hidden bg-brand-soft ${natural ? className.replace(/\baspect-\S+/g, "") : className}`}>
        <img src={post.cover} alt={post.coverAlt ?? post.title} loading={eager ? "eager" : "lazy"} decoding="async"
          className={natural ? "block h-auto w-full" : "h-full w-full object-contain"} />
      </div>
    );
  }
  const idx = post.slug.length % coverStyles.length;
  return (
    <div className={`relative flex overflow-hidden ${coverStyles[idx]} ${className}`} aria-hidden>
      <div className="grid-lines absolute inset-0 opacity-10" />
      <div className="relative mt-auto p-6">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest opacity-70">{post.category}</span>
        <p className="mt-2 max-w-[18rem] text-lg font-bold leading-tight">{post.title}</p>
      </div>
      <div className="absolute top-6 right-6 h-14 w-14 rounded-full border border-current opacity-30" />
    </div>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link to="/blogs/$slug" params={{ slug: post.slug }} className="group block">
      <div className="overflow-hidden rounded-lg">
        <BlogCover post={post} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]" />
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-brand">{post.category}</span><span>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time><span>·</span><span>{post.readMinutes} min read</span>
      </div>
      <h3 className="mt-2 text-xl font-semibold leading-snug transition-colors group-hover:text-brand">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <span className="link-arrow mt-4">Read Blog <ArrowRight className="h-4 w-4" /></span>
    </Link>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border bg-background p-7">
      {t.highlight && <span className="mb-4 w-fit rounded bg-surface px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">{t.highlight}</span>}
      <Quote className="h-6 w-6 text-brand" strokeWidth={1.6} />
      <blockquote className="mt-4 flex-1 leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand-deep">
          {t.photo ? <img src={t.photo} alt="" className="h-full w-full rounded-full object-cover" /> : t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function CtaSection({
  title = "Have an Idea? Let's Build Something Great.",
  description = "Whether you're starting from scratch, improving an existing website, or looking to automate your business, we'd love to hear about it.",
}: { title?: string; description?: string }) {
  return (
    <section className="pt-12 pb-12">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-2xl bg-[#0f0f10] px-6 py-16 text-primary-foreground md:px-16 md:py-24">
          {/* background glow and grid */}
          <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
          {/* project brief card */}
          <div className="pointer-events-none absolute top-1/2 right-14 hidden w-80 -translate-y-1/2 lg:block" aria-hidden>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/70" /></div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white/50">New project</span>
              </div>
              <div className="mt-5 space-y-2.5">
                <div className="h-2.5 w-3/4 rounded bg-white/70" />
                <div className="h-2 w-full rounded bg-white/15" />
                <div className="h-2 w-5/6 rounded bg-white/15" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Website", "Branding", "AI"].map((t) => <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-[0.7rem] text-white/70">{t}</span>)}
              </div>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-white" /></div>
            </div>
            <div className="animate-float absolute -bottom-5 -left-10 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-foreground shadow-xl">
              <span className="h-2 w-2 rounded-full bg-green-500" /> We reply within 24h
            </div>
          </div>
          <div className="relative max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Let's work together
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">{title}</h2>
            <p className="mt-5 text-lg text-white/75">{description}</p>
            <div className="mt-8">
              <Link to="/contact" className="btn bg-white text-foreground hover:bg-white/85">Start a Project <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y py-6 bg-black background-color: black [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t}<span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}