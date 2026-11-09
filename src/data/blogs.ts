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
  date: string; // ISO
  readMinutes: number;
  author: Author;
  featured?: boolean;
  body: Block[];
};

const team: Author = { name: "3FoundersLab Team", role: "Editorial" };

export const posts: Post[] = [
  {
    slug: "what-makes-a-business-website-work", title: "What Makes a Business Website Actually Work",
    excerpt: "Beyond good looks: the structural decisions that turn a website into a reliable source of enquiries.",
    category: "Web Development", date: "2026-10-28", readMinutes: 6, author: team, featured: true,
    body: [
      { type: "p", text: "A website is often the first conversation a business has with a potential client. Whether that conversation goes well depends less on decoration and more on clarity." },
      { type: "h2", text: "Start with one clear message" },
      { type: "p", text: "Visitors decide within seconds whether they are in the right place. Your headline should say who you help and how." },
      { type: "ul", items: ["State what you do in plain language", "Make the primary action obvious", "Show proof close to the call-to-action"] },
      { type: "h2", text: "Performance is part of design" },
      { type: "p", text: "Slow pages lose visitors. A few simple habits go a long way:" },
      { type: "code", lang: "html", code: '<img src="hero.webp" width="1200" height="630"\n     loading="lazy" decoding="async" alt="..." />' },
      { type: "h3", text: "A quick comparison" },
      { type: "table", head: ["Practice", "Impact"], rows: [["Compressed images", "Faster first load"], ["Fewer third-party scripts", "Less blocking"], ["Clear hierarchy", "Higher engagement"]] },
      { type: "quote", text: "Good websites don't ask visitors to think. They show the next step." },
      { type: "ol", items: ["Audit your current pages", "Remove what doesn't help", "Measure, then improve"] },
    ],
  },
  {
    slug: "automations-every-small-business-can-start-with", title: "Automations Every Small Business Can Start With",
    excerpt: "Practical, low-risk automations that save hours each week — no large IT project required.",
    category: "AI & Automation", date: "2026-10-14", readMinutes: 5, author: team,
    body: [
      { type: "p", text: "Automation doesn't need to start big. The best first projects remove a repetitive task your team already dislikes." },
      { type: "h2", text: "Good first candidates" },
      { type: "ul", items: ["Routing website enquiries to the right person", "Sending appointment reminders", "Syncing orders to your accounting tool"] },
      { type: "embed", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Placeholder embedded video" },
      { type: "p", text: "Replace the embedded media above with your own walkthrough." },
    ],
  },
  {
    slug: "design-systems-for-growing-brands", title: "Why Growing Brands Need a Design System",
    excerpt: "How a small set of shared rules keeps your product and marketing consistent as you scale.",
    category: "UI/UX Design", date: "2026-09-30", readMinutes: 4, author: team,
    body: [
      { type: "p", text: "As teams grow, small inconsistencies add up. A design system gives everyone the same building blocks." },
      { type: "h2", text: "What to include first" },
      { type: "ul", items: ["Colour and type tokens", "Buttons and form fields", "Spacing rules"] },
    ],
  },
  {
    slug: "technical-seo-checklist", title: "A Practical Technical SEO Checklist",
    excerpt: "The foundational checks that help search engines understand and rank your website.",
    category: "SEO & Digital Marketing", date: "2026-09-12", readMinutes: 7, author: team,
    body: [
      { type: "p", text: "Before investing in content, make sure search engines can crawl and understand your pages." },
      { type: "ol", items: ["Unique titles and descriptions", "Clean URL structure", "XML sitemap", "Fast mobile performance"] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
