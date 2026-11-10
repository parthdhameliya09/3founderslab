import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { PageHero, Reveal, CtaSection } from "@/components/site/ui";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web, E-commerce, Design, Branding & AI | 3FoundersLab" },
      { name: "description", content: "Website development, e-commerce, UI/UX, branding, AI automation, SEO, CMS and MERN stack development by 3FoundersLab." },
      { property: "og:title", content: "Services | 3FoundersLab" },
      { property: "og:description", content: "Digital solutions designed around your business." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Digital Solutions Designed Around <span className="text-brand">Your Business.</span></>}
        description="From building your first website to transforming your existing digital infrastructure, we provide solutions that help your business move forward.">
      </PageHero>

      {services.map((s, idx) => {
        const Icon = s.icon;
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-20 section-y ${idx % 2 ? "bg-surface" : ""}`}>
            <div className="container-site grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <span className="font-mono text-sm text-brand">{s.number}</span>
                <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="mt-8 flex aspect-[5/3] items-center justify-center rounded-xl border bg-brand-soft grid-lines">
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-sm">
                    <Icon className="h-9 w-9 text-brand" strokeWidth={1.5} />
                  </span>
                </div>
              </Reveal>
              <Reveal className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7" delay={120}>
                <div className="sm:col-span-2">
                  <h3 className="eyebrow !text-muted-foreground">What we offer</h3>
                  <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                    {s.offerings.map((o) => <li key={o} className="flex items-center gap-2.5 border-b py-3 text-[0.95rem]"><Check className="h-4 w-4 shrink-0 text-brand" />{o}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow !text-muted-foreground">Business benefits</h3>
                  <ul className="mt-4 space-y-2.5 text-[0.95rem]">{s.benefits.map((b) => <li key={b}>— {b}</li>)}</ul>
                </div>
                <div>
                  <h3 className="eyebrow !text-muted-foreground">Tools & tech</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">{s.tools.map((t) => <span key={t} className="rounded border bg-background px-2.5 py-1 text-sm">{t}</span>)}</div>
                </div>
                <div className="sm:col-span-2">
                  <Link to="/contact" search={{ service: s.title }} className="btn btn-dark">Discuss {s.title} <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
      <CtaSection />
    </>
  );
}
