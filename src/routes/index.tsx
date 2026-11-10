import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/services";
import { projects, projectCategories } from "@/data/projects";
import { posts } from "@/data/blogs";
import { testimonials } from "@/data/people";
import {
  Reveal, SectionHeading, ServiceCard, ProjectCard, BlogCard, TestimonialCard, CtaSection, Marquee,
} from "@/components/site/ui";
import { HeroVisual } from "@/components/site/HeroVisual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "3FoundersLab - Building Digital Experiences That Move Businesses Forward" },
      { name: "description", content: "3FoundersLab builds websites, e-commerce, UI/UX, branding, SEO and AI automation for startups, small businesses and growing brands." },
      { property: "og:title", content: "3FoundersLab — Digital Experiences That Move Businesses Forward" },
      { property: "og:description", content: "Websites, design, smart technology and intelligent automation — under one roof." },
    ],
  }),
  component: Home,
});

const why = [
  ["Complete Digital Solutions", "Everything from branding and design to development and digital growth."],
  ["Business-First Approach", "We understand your business goals before suggesting technical solutions."],
  ["Modern Technology", "We use reliable, scalable and modern technologies."],
  ["Clean & Functional Design", "Beautiful websites that are easy to use and built with purpose."],
  ["Transparent Communication", "Clear discussions, honest timelines and regular updates."],
  ["Long-Term Partnership", "We help maintain, improve and grow your digital presence."],
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
            <p className="page-in mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We help businesses grow through powerful websites, thoughtful design, smart technology & intelligent automation. From your first digital presence to your next big transformation, we're here to build it.
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
            <div className="lg:sticky lg:top-32">
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
          <SectionHeading eyebrow="Selected work" title="Some Things We've Built."
            description="Explore selected projects where design, technology, and business goals come together. (Sample projects shown — real case studies coming soon.)" />
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
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {processSteps.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 100}>
                <li className="relative border-t border-background/20 pt-6">
                  <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-brand" />
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
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => <Reveal key={i} delay={i * 80} className="h-full"><TestimonialCard t={t} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="pt-12 pb-12">
        <div className="container-site">
          <SectionHeading eyebrow="Insights" title="Thoughts, Ideas & Digital Insights."
            action={<Link to="/blogs" className="btn btn-outline shrink-0">Explore All Articles</Link>} />
          <div className="grid gap-10 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 80}><BlogCard post={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}