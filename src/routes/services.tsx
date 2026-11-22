import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { PageHero, Reveal, CtaSection } from "@/components/site/ui";
import { ServiceVisual } from "@/components/site/ServiceVisual";
import { seo, breadcrumbs, absUrl } from "@/lib/seo";
import { orgRef } from "@/lib/schema";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Services: Web Development, E-commerce, UI/UX, SEO & AI",
      description: "Website development, e-commerce, UI/UX design, branding, AI automation, SEO, CMS and MERN stack development by 3FoundersLab.",
      path: "/services",
      jsonLd: [
        breadcrumbs([{ name: "Services", path: "/services" }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              url: `${absUrl("/services")}#${s.slug}`,
              provider: orgRef,
              areaServed: "Worldwide",
            },
          })),
        },
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
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-20 section-y ${idx % 2 ? "bg-surface" : ""}`}>
            <div className="container-site grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <span className="font-mono text-sm text-brand">{s.number}</span>
                <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.description}</p>
                <ServiceVisual slug={s.slug} />
              </Reveal>
              <Reveal className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7 lg:pt-[2.3rem]" delay={120}>
                <div>
                  <h3 className="eyebrow !text-muted-foreground">What we offer</h3>
                  <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                    {s.offerings.map((o) => <li key={o} className="flex items-center gap-2.5 border-b py-3 text-[0.95rem]"><Check className="h-4 w-4 shrink-0 text-brand" />{o}</li>)}
                  </ul>
                </div>
                <div className="grid gap-10 sm:grid-cols-2 lg:my-auto">
                  <div>
                    <h3 className="eyebrow !text-muted-foreground">Business benefits</h3>
                    <ul className="mt-4 space-y-2.5 text-[0.95rem]">{s.benefits.map((b) => <li key={b}>• {b}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="eyebrow !text-muted-foreground">Tools & tech</h3>
                    <div className="mt-4 flex flex-wrap gap-1.5">{s.tools.map((t) => <span key={t} className="rounded border bg-background px-2.5 py-1 text-sm">{t}</span>)}</div>
                  </div>
                </div>
                <div>
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
