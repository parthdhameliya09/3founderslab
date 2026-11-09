import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projects, projectCategories } from "@/data/projects";
import { PageHero, ProjectCard, Reveal, CtaSection } from "@/components/site/ui";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work & Portfolio | 3FoundersLab" },
      { name: "description", content: "Selected websites, e-commerce stores, UI/UX, branding and automation projects by 3FoundersLab." },
      { property: "og:title", content: "Work & Portfolio | 3FoundersLab" },
      { property: "og:description", content: "Projects where design, technology and business goals come together." },
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
        description="Explore selected projects where design, technology, and business goals come together. The projects below are clearly marked samples until real case studies are published." />
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