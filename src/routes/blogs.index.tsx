import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { posts, blogCategories, formatDate } from "@/data/blogs";
import { PageHero, BlogCard, BlogCover, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs & Insights | 3FoundersLab" },
      { name: "description", content: "Articles on web development, UI/UX, AI automation, SEO and business growth from 3FoundersLab." },
      { property: "og:title", content: "Blogs & Insights | 3FoundersLab" },
      { property: "og:description", content: "Thoughts, ideas & digital insights." },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const [cat, setCat] = useState<(typeof blogCategories)[number]>("All");
  const [q, setQ] = useState("");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) => (cat === "All" || p.category === cat) && (!s || (p.title + p.excerpt).toLowerCase().includes(s)));
  }, [cat, q]);

  return (
    <>
      <PageHero eyebrow="Blogs" title={<>Thoughts, Ideas & <span className="text-brand">Digital Insights.</span></>}
        description="Practical writing on building, improving and growing your business online." />

      <section className="container-site pt-14">
        <Link to="/blogs/$slug" params={{ slug: featured.slug }} className="group grid items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl"><BlogCover post={featured} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]" /></div>
          <div>
            <p className="eyebrow">Featured · {featured.category}</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight group-hover:text-brand md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{featured.excerpt}</p>
            <p className="mt-4 text-sm text-muted-foreground">{formatDate(featured.date)} · {featured.readMinutes} min read</p>
            <span className="link-arrow mt-6">Read Article <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </section>

      <section className="section-y">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-5 border-b pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {blogCategories.map((c) => (
                <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${cat === c ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:border-foreground hover:text-foreground"}`}>{c}</button>
              ))}
            </div>
            <label className="relative w-full lg:w-72">
              <span className="sr-only">Search articles</span>
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="field !pl-9" maxLength={100} />
            </label>
          </div>
          <h2 className="mb-8 text-2xl font-bold">Latest articles</h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80}><BlogCard post={p} /></Reveal>)}
          </div>
          {list.length === 0 && <p className="text-muted-foreground">No articles match your search.</p>}
        </div>
      </section>
    </>
  );
}