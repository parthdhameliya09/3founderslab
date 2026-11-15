import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPost, posts, formatDate, type Block } from "@/data/blogs";
import { BlogCard, BlogCover, CtaSection, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | 3FoundersLab` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: `${loaderData.post.title} | 3FoundersLab` },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Blog not found | 3FoundersLab" }, { name: "robots", content: "noindex" }],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="container-site section-y text-center">
      <h1 className="text-4xl font-bold">Blog not found</h1>
      <p className="mt-3 text-muted-foreground">This blog doesn't exist or has been moved.</p>
      <Link to="/blogs" className="btn btn-dark mt-8">Back to Blogs</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="container-site section-y text-center">
      <h1 className="text-3xl font-bold">Couldn't load this blog.</h1>
      <Link to="/blogs" className="btn btn-dark mt-8">Back to Blogs</Link>
    </div>
  ),
});

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2": return <h2 key={i}>{b.text}</h2>;
    case "h3": return <h3 key={i}>{b.text}</h3>;
    case "p": return <p key={i}>{b.text}</p>;
    case "quote": return <blockquote key={i}>{b.text}</blockquote>;
    case "ul": return <ul key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case "ol": return <ol key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ol>;
    case "code": return <pre key={i}><code>{b.code}</code></pre>;
    case "table":
      return (
        <div key={i} className="overflow-x-auto">
          <table>
            <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure key={i} className="my-8">
          <img src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-lg" />
          {b.caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{b.caption}</figcaption>}
        </figure>
      );
    case "embed":
      return (
        <div key={i} className="my-8 aspect-video overflow-hidden rounded-lg bg-surface">
          <iframe
            src={b.src} title={b.title} loading="lazy" allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        </div>
      );
  }
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="container-site pt-12 md:pt-20">
          <Link to="/blogs" className="link-arrow text-muted-foreground"><ArrowLeft className="h-4 w-4" /> All blogs</Link>
          <p className="eyebrow mt-10">{post.category}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-y py-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <BlogCover post={post} className="mt-10 aspect-[16/7] rounded-xl" />
        </header>

        <div className="container-site section-y">
          <div className="prose-article mx-auto max-w-3xl">
            {post.body.map(renderBlock)}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t bg-surface pt-12 pb-12">
          <div className="container-site">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">More blogs</h2>
            <div className="grid gap-10 md:grid-cols-3">
              {related.map((p, i) => <Reveal key={p.slug} delay={i * 80}><BlogCard post={p} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
