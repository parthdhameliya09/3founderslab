import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export const projectCategories = ["All", "Website Development", "E-commerce", "UI/UX", "Branding", "Automation"] as const;
export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  category: ProjectCategory;
  tech: string[];
  summary: string;
  image: string;
  gallery: string[];
  liveUrl?: string;
  overview: string;
  clientIntro: string;
  challenge: string;
  solution: string;
  services: string[];
  outcome: string;
};

// SAMPLE PROJECTS — placeholder case studies. Replace with real portfolio data.
export const projects: Project[] = [
  {
    slug: "saas-website", name: "SaaS Website", client: "", industry: "Software",
    category: "Website Development", tech: ["React", "TypeScript", "Tailwind CSS"], image: p1, gallery: [p1, p4],
    summary: "a marketing website and dashboard preview for a software product.",
    overview: "A fast, conversion-focused marketing site for a software product, built in six weeks. We handled design, development and launch.",
    clientIntro: "An early-stage software company offering a project management tool to small teams.",
    challenge: "The old site was slow and unclear. Visitors couldn't tell what the product did, and few signed up for a demo.",
    solution: "We rewrote the messaging, added an interactive dashboard preview and rebuilt the site in React for speed, with a single clear call to action on every page.",
    services: ["Website Development", "UI/UX Design"],
    outcome: "A faster site with a clearer story, and noticeably more demo requests in the first month after launch.",
  },
  {
    slug: "online-store", name: "Online Store", client: "", industry: "Retail",
    category: "E-commerce", tech: ["Shopify", "Liquid", "Razorpay"], image: p2, gallery: [p2, p1],
    summary: "a mobile-first storefront with streamlined checkout.",
    overview: "A mobile-first Shopify store with a custom theme and simplified checkout, delivered in five weeks.",
    clientIntro: "A growing retail brand selling home and lifestyle products, mostly to shoppers on their phones.",
    challenge: "Most visitors browsed on mobile but abandoned at checkout. Managing products and orders was also slow for the team.",
    solution: "We built a lightweight custom theme, cut checkout to fewer steps, added Razorpay for local payments and set up simple product management.",
    services: ["E-commerce Development", "UI/UX Design"],
    outcome: "Smoother mobile checkout, fewer abandoned carts and a store the team can update without developer help.",
  },
  {
    slug: "brand-identity", name: "Brand Identity", client: "", industry: "Consulting",
    category: "Branding", tech: ["Figma", "Illustrator"], image: p3, gallery: [p3, p2],
    summary: "a logo, visual identity and stationery system.",
    overview: "A complete brand identity: logo, colours, typography and stationery, with a short guidelines document.",
    clientIntro: "A boutique consulting firm preparing to take on larger corporate clients.",
    challenge: "Their branding looked inconsistent across proposals, the website and social media, which hurt credibility with new clients.",
    solution: "We designed a simple, confident logo, defined a colour and type system, and packaged it into templates the team can reuse.",
    services: ["Branding & Logo Design"],
    outcome: "A consistent, professional look across every touchpoint, and proposals the team is proud to send.",
  },
  {
    slug: "workflow-automation", name: "Workflow Automation", client: "", industry: "Operations",
    category: "Automation", tech: ["n8n", "OpenAI", "Node.js"], image: p4, gallery: [p4, p3],
    summary: "connecting business tools to automate lead handling.",
    overview: "An automated lead-handling workflow that connects the website, CRM and email, delivered in three weeks.",
    clientIntro: "A services business receiving daily enquiries from its website, email and social channels.",
    challenge: "Leads were copied by hand between tools. Replies were slow and some enquiries were missed entirely.",
    solution: "We connected the forms, CRM and inbox with n8n, used OpenAI to sort and summarise enquiries, and sent instant acknowledgements.",
    services: ["AI & Automation"],
    outcome: "Hours of manual work removed each week, faster first replies and no more lost enquiries.",
  },
  {
    slug: "product-design", name: "Product UI", client: "", industry: "Fintech",
    category: "UI/UX", tech: ["Figma", "Design System"], image: p1, gallery: [p1, p2],
    summary: "a design system and app interface for a web product.",
    overview: "A design system and redesigned app interface for a web-based finance product.",
    clientIntro: "A fintech startup whose product had grown quickly, one feature at a time.",
    challenge: "Screens had become inconsistent and hard to use, and developers were rebuilding the same components repeatedly.",
    solution: "We audited the product, defined shared components and styles in Figma, and redesigned the key flows around clear next steps.",
    services: ["UI/UX & Creative Design"],
    outcome: "A cleaner, easier-to-use interface and a shared design system that speeds up every new feature.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
