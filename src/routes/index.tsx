import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";
import { projects, projectCategories } from "@/data/projects";
import { posts } from "@/data/blogs";
import { testimonials, team } from "@/data/people";
import {
  Reveal, SectionHeading, ServiceCard, ProjectCard, BlogCard, TestimonialCard, CtaSection, Marquee,
} from "@/components/site/ui";
import { HeroVisual } from "@/components/site/HeroVisual";
import { seo } from "@/lib/seo";
import { organizationSchema, websiteSchema, personSchema } from "@/lib/schema";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "3FoundersLab | Website Development, UI/UX, SEO & AI Automation",
      rawTitle: true,
      description: "3FoundersLab builds websites, e-commerce stores, UI/UX, branding, SEO and AI automation for startups, small businesses and growing brands.",
      path: "/",
      jsonLd: [organizationSchema(), websiteSchema(), ...team.map(personSchema)],
    }),
  component: Home,
});

const why = [
  ["Complete Digital Solutions", "Branding, design, development and growth, all at one place."],
  ["Business First Approach", "We understand your business goals before suggesting technical solutions."],
  ["Modern Technology", "The right tech stack for your business, not just the trendy one."],
  ["Clean & Functional Design", "Beautiful websites that are easy to use and built with purpose."],
  ["Transparent Communication", "Clear discussions, honest timelines and regular updates."],
  ["Long-Term Partnership", "We stay with you after launch."],
];

const processSteps = [
  ["01", "Discover", "We understand your business, goals, requirements and challenges."],
  ["02", "Plan & Design", "We prepare the right strategy, structure and design direction for your project."],
  ["03", "Develop & Deliver", "We build, test, optimize and deliver a solution that meets your requirements."],
  ["04", "Support & Grow", "We provide ongoing support and help improve your digital presence as you grow."],
];

function Home() {
  const [cat, setCat] = useState<(typeof projectCategories)[number]>("All");
  const shown = projects.filter((p) => cat === "All" || p.category === cat).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <div className="container-site relative grid items-center gap-14 pt-5 pb-5 md:pt-5 lg:grid-cols-12 lg:pb-10">
          <div className="lg:col-span-7">
            <div className="page-in inline-flex items-center gap-2.5 rounded-full border bg-background px-3.5 py-1.5 text-xs font-medium">
              <span className="pulse-dot h-2 w-2 rounded-full bg-brand" /> Available for new projects
            </div>
            <h1 className="page-in mt-7 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
              Building <span className="text-brand">Digital Experiences</span> That Move Businesses <span className="text-brand-deep">Forward.</span>
            </h1>
            <p className="page-in mt-6 font-mono text-sm font-medium uppercase tracking-[0.18em] text-brand">
              Beyond Technology, Into Possibilities
            </p>
            <p className="page-in mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We help businesses grow with websites, design, technology and automation. From your first digital presence to your next big transformation, we're here to build it.
            </p>
            <div className="page-in mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-blue">Start a Project <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work" className="btn btn-outline">Explore Our Work</Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Startups", "Small businesses", "Growing brands"].map((x) => (
                <li key={x} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-brand" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5"><HeroVisual /></div>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-12 !pb-12">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5"><p className="eyebrow mb-4">Who we are</p><h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">More Than Just a Technology Partner.</h2></Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              We bring design, development, and technology together to help businesses build a stronger digital foundation. Whether you need a completely new website, improvements to your existing platform, or automation for your business operations, we turn your requirements into practical digital solutions.
            </p>
            <Link to="/about" className="link-arrow mt-6">More about us <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
      <Marquee items={["Web Development", "UI/UX Design", "E-commerce", "Branding", "AI Automation", "Digital Growth"]} />

      {/* Services */}
      <section className="pt-12 pb-12">
        <div className="container-site">
          <SectionHeading eyebrow="Services" title="Everything You Need to Build, Improve & Grow."
            description="From your brand identity to your complete digital infrastructure, we provide the expertise to take your business forward."
            action={<Link to="/services" className="btn btn-outline shrink-0">All Services</Link>} />
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => <Reveal key={s.slug} delay={(i % 4) * 70} className="h-full"><ServiceCard service={s} /></Reveal>)}
          </div>
          <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg bg-surface p-6 sm:flex-row sm:items-center md:p-8">
            <p className="text-lg font-medium">Have a specific requirement? Let's discuss your project.</p>
            <Link to="/contact" className="btn btn-dark">Discuss Your Project <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="pt-12 pb-12 bg-surface">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div>
              <p className="eyebrow mb-4">Why 3FoundersLab</p>
              <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">Good Technology. Thoughtful Design. <span className="text-brand">Meaningful Results.</span></h2>
            </div>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:col-span-7">
            {why.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 80} className="h-full">
                <div className="h-full bg-background p-7">
                  <span className="font-mono text-xs text-brand">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="pt-12 pb-12">
        <div className="container-site">
          <SectionHeading eyebrow="Our work" title="Some Things We've Built."
            description="Ideas turned into real products. Take a look at what we've created." />
          <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {projectCategories.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${cat === c ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:border-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {shown.map((p, i) => <Reveal key={p.slug} delay={(i % 2) * 100}><ProjectCard project={p} large /></Reveal>)}
            {shown.length === 0 && <p className="text-muted-foreground">No projects in this category yet.</p>}
          </div>
          <div className="mt-14 text-center"><Link to="/work" className="btn btn-dark">View All Projects <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      {/* Process */}
      <section className="pt-12 pb-12 bg-foreground text-background">
        <div className="container-site">
          <Reveal className="mb-14 max-w-2xl">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">Simple Process. Clear Communication. Better Results.</h2>
          </Reveal>
          <ol className="relative grid gap-10 pl-8 md:grid-cols-4 md:gap-6 md:pl-0">
            {/* One continuous progress line: vertical on mobile, horizontal on desktop */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-[4px] w-px bg-background/20 md:inset-x-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
            />
            {processSteps.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 100}>
                <li className="relative md:pt-6">
                  <span className="absolute top-[6px] -left-8 h-[9px] w-[9px] rounded-full bg-brand md:-top-[4px] md:left-0" />
                  <span className="font-mono text-sm text-background/50">{n}</span>
                  <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/60">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-12 pb-12 bg-surface">
        <div className="container-site">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say." />
        </div>
        {/* Auto-scrolling testimonials; second copy is hidden from assistive tech, pauses on hover */}
        <div className="testimonial-marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-marquee-slow flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-6 pr-6" aria-hidden={copy === 1 ? true : undefined}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-[85vw] max-w-sm shrink-0 sm:w-[24rem]"><TestimonialCard t={t} /></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="pt-12 pb-12">
        <div className="container-site">
          <SectionHeading eyebrow="Blogs" title="Thoughts, Ideas & Digital Insights."
            action={<Link to="/blogs" className="btn btn-outline shrink-0">Explore All Blogs</Link>} />
          <div className="grid gap-10 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 80}><BlogCard post={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}