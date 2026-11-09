import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Reveal, CtaSection } from "@/components/site/ui";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.name} — Case Study | 3FoundersLab` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.name} | 3FoundersLab` },
          { property: "og:description", content: loaderData.project.summary },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Project unavailable | 3FoundersLab" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="container-site section-y text-center">
      <h1 className="text-4xl font-bold">Project not found</h1>
      <Link to="/work" className="btn btn-dark mt-8">Back to Work</Link>
    </div>
  ),
  errorComponent: () => <div className="container-site section-y text-center"><h1 className="text-3xl font-bold">Couldn't load this project.</h1></div>,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const sections: [string, string][] = [
    ["Project overview", p.overview], ["The client", p.clientIntro], ["The challenge", p.challenge], ["Our solution", p.solution],
  ];

  return (
    <>
      <section className="container-site pt-12 md:pt-20">
        <Link to="/work" className="link-arrow text-muted-foreground"><ArrowLeft className="h-4 w-4" /> All work</Link>
        <p className="eyebrow mt-10">{p.category} · Sample project</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{p.name}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
        <dl className="mt-10 grid gap-6 border-y py-6 text-sm sm:grid-cols-4">
          <div><dt className="text-muted-foreground">Client</dt><dd className="mt-1 font-medium">{p.client}</dd></div>
          <div><dt className="text-muted-foreground">Industry</dt><dd className="mt-1 font-medium">{p.industry}</dd></div>
          <div><dt className="text-muted-foreground">Services</dt><dd className="mt-1 font-medium">{p.services.join(", ")}</dd></div>
          <div><dt className="text-muted-foreground">Live project</dt><dd className="mt-1 font-medium">
            {p.liveUrl ? <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand">Visit site <ArrowUpRight className="h-3.5 w-3.5" /></a> : "Link coming soon"}
          </dd></div>
        </dl>
        <div className="mt-10 overflow-hidden rounded-xl bg-surface">
          <img src={p.image} alt={`${p.name} main preview`} width={1600} height={1008} className="w-full object-cover" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="eyebrow !text-muted-foreground">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded border px-2.5 py-1 text-sm">{t}</span>)}</div>
            </div>
          </aside>
          <div className="space-y-12 lg:col-span-8">
            {sections.map(([h, t]) => (
              <Reveal key={h}><h2 className="text-2xl font-bold md:text-3xl">{h}</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site">
        <h2 className="mb-6 text-2xl font-bold">Design & development previews</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {p.gallery.map((g, k) => <img key={k} src={g} alt={`${p.name} preview ${k + 1}`} loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full rounded-xl bg-surface object-cover" />)}
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal className="rounded-xl bg-brand-soft p-8 md:p-12">
            <p className="eyebrow">Final outcome</p>
            <p className="mt-4 max-w-3xl text-2xl font-semibold leading-snug md:text-3xl">{p.outcome}</p>
          </Reveal>
          <nav className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2" aria-label="Project navigation">
            <Link to="/work/$slug" params={{ slug: prev.slug }} className="group"><span className="flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Previous</span><span className="mt-1 block text-lg font-semibold group-hover:text-brand">{prev.name}</span></Link>
            <Link to="/work/$slug" params={{ slug: next.slug }} className="group sm:text-right"><span className="flex items-center gap-1 text-sm text-muted-foreground sm:justify-end">Next <ArrowRight className="h-4 w-4" /></span><span className="mt-1 block text-lg font-semibold group-hover:text-brand">{next.name}</span></Link>
          </nav>
        </div>
      </section>
      <CtaSection />
    </>
  );
}