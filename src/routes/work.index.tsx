import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projects, projectCategories } from "@/data/projects";
import { PageHero, ProjectCard, Reveal, CtaSection } from "@/components/site/ui";
import { seo, breadcrumbs } from "@/lib/seo";
import { webPageSchema, itemList } from "@/lib/schema";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo({
      title: "Our Work: Website & E-commerce Portfolio",
      description: "Selected websites, WooCommerce stores and UI/UX projects by 3FoundersLab, including Copier Bazar, Startup Minds and Adithyan Packers.",
      path: "/work",
      jsonLd: [
        webPageSchema("CollectionPage", {
          path: "/work",
          name: "3FoundersLab Work & Portfolio",
          description: "Website, e-commerce and UI/UX projects built by 3FoundersLab.",
          extra: { mainEntity: itemList(projects.map((p) => ({ name: p.name, path: `/work/${p.slug}` }))) },
        }),
        breadcrumbs([{ name: "Work", path: "/work" }]),
      ],
    }),
  component: WorkPage,
});

function WorkPage() {
  const [cat, setCat] = useState<(typeof projectCategories)[number]>("All");
  const shown = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <>
      <PageHero eyebrow="Work" title={<>Some Things <span className="text-brand">We've Built.</span></>}
        description="Ideas turned into real products. Take a look at what we've created." />
      <section className="section-y !pt-14">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {projectCategories.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${cat === c ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:border-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {shown.map((p, i) => <Reveal key={p.slug} delay={(i % 2) * 100}><ProjectCard project={p} large /></Reveal>)}
          </div>
          {shown.length === 0 && <p className="text-muted-foreground">No projects in this category yet.</p>}
        </div>
      </section>
      <CtaSection />
    </>
  );
}