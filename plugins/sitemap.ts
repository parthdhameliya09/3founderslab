/**
 * Vite plugin: writes /sitemap.xml into the client build output.
 *
 * Pages are collected automatically, so nothing needs updating by hand:
 * - fixed pages listed in STATIC_PAGES below,
 * - every blog in src/content/blogs/*.md (with its date as <lastmod>),
 * - every project slug in src/data/projects.ts.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { readBlogMeta } from "./blog-markdown";

const SITE_URL = "https://3founderslab.in";

const STATIC_PAGES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services/", priority: "0.9", changefreq: "monthly" },
  { path: "/work/", priority: "0.8", changefreq: "monthly" },
  { path: "/blogs/", priority: "0.8", changefreq: "weekly" },
  { path: "/about/", priority: "0.7", changefreq: "monthly" },
  { path: "/contact/", priority: "0.7", changefreq: "yearly" },
  { path: "/privacy/", priority: "0.2", changefreq: "yearly" },
  { path: "/terms/", priority: "0.2", changefreq: "yearly" },
];

export function sitemap(): Plugin {
  let root = process.cwd();
  return {
    name: "sitemap",
    configResolved(config) {
      root = config.root;
    },
    generateBundle() {
      // Only the browser build ends up in the public folder.
      const env = (this as unknown as { environment?: { name?: string } }).environment;
      if (env?.name && env.name !== "client") return;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap(root) });
    },
  };
}

function buildSitemap(root: string): string {
  const entries: string[] = STATIC_PAGES.map((p) => url(p.path, { priority: p.priority, changefreq: p.changefreq }));

  const blogDir = path.join(root, "src/content/blogs");
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir).filter((n) => n.endsWith(".md")).sort()) {
      const { slug, date } = readBlogMeta(path.join(blogDir, f));
      entries.push(url(`/blogs/${slug}/`, { lastmod: date, priority: "0.7", changefreq: "monthly" }));
    }
  }

  const projectsFile = path.join(root, "src/data/projects.ts");
  if (fs.existsSync(projectsFile)) {
    const src = fs.readFileSync(projectsFile, "utf8");
    for (const m of src.matchAll(/\bslug:\s*["']([a-z0-9-]+)["']/g)) {
      entries.push(url(`/work/${m[1]}/`, { priority: "0.6", changefreq: "yearly" }));
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

function url(p: string, o: { lastmod?: string; priority: string; changefreq: string }): string {
  const loc = (SITE_URL + p).replace(/&/g, "&amp;");
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    o.lastmod ? `    <lastmod>${o.lastmod}</lastmod>` : "",
    `    <changefreq>${o.changefreq}</changefreq>`,
    `    <priority>${o.priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n");
}
