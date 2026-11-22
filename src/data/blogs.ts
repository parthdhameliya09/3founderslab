export const blogCategories = ["All", "Web Development", "Business Growth", "UI/UX Design", "AI & Automation", "SEO & Digital Marketing", "Technology Trends"] as const;
export type BlogCategory = Exclude<(typeof blogCategories)[number], "All">;

export type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "embed"; src: string; title: string };

export type Author = { name: string; role: string };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO date, shown on the page
  /** Date + time ("2026-11-22T14:30"), used only to order posts. */
  publishedAt?: string;
  readMinutes: number;
  author: Author;
  featured?: boolean;
  /** Cover image URL. Without one, the generated colour cover is shown. */
  cover?: string;
  coverAlt?: string;
  /** Structured content (hand-written posts) ... */
  body?: Block[];
  /** ... or pre-rendered HTML from a Markdown file in src/content/blogs/. */
  html?: string;
};

const team: Author = { name: "3FoundersLab Team", role: "Editorial" };

/** Shape produced by plugins/blog-markdown.ts for each Markdown file. */
type MarkdownPost = {
  slug: string; title: string; excerpt: string; category: string; date: string; publishedAt: string;
  readMinutes: number; author: string; featured: boolean; cover?: string; coverAlt: string; html: string;
};

const isCategory = (c: string): c is BlogCategory =>
  (blogCategories as readonly string[]).includes(c) && c !== "All";

const markdownPosts: Post[] = Object.entries(
  import.meta.glob<MarkdownPost>("../content/blogs/*.md", { eager: true, import: "default" }),
).map(([file, p]) => {
  if (!isCategory(p.category)) {
    console.warn(`[blogs] ${file}: unknown category "${p.category}", using "Technology Trends". Valid: ${blogCategories.slice(1).join(", ")}`);
  }
  return {
    ...p,
    category: isCategory(p.category) ? p.category : "Technology Trends",
    author: p.author ? { name: p.author, role: "Author" } : team,
  };
});

/** All posts, newest first. Add a blog by dropping a .md file in src/content/blogs/. */
export const posts: Post[] = [...markdownPosts].sort((a, b) =>
  (b.publishedAt ?? b.date).localeCompare(a.publishedAt ?? a.date) || a.title.localeCompare(b.title),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
