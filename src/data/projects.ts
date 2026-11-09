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

// SAMPLE PROJECTS — placeholders only. Replace with real portfolio data.
export const projects: Project[] = [
  {
    slug: "sample-saas-website", name: "Sample Project — SaaS Website", client: "Placeholder Client", industry: "Software",
    category: "Website Development", tech: ["React", "TypeScript", "Tailwind CSS"], image: p1, gallery: [p1, p4],
    summary: "Placeholder: a marketing website and dashboard preview for a software product.",
    overview: "Placeholder overview. Describe the project scope, timeline and your role here.",
    clientIntro: "Placeholder. Introduce the client's business, audience and goals.",
    challenge: "Placeholder. Describe the problem the client faced before the project.",
    solution: "Placeholder. Explain the approach, key decisions and what was built.",
    services: ["Website Development", "UI/UX Design"], outcome: "Placeholder. Add real, verified outcomes once available.",
  },
  {
    slug: "sample-online-store", name: "Sample Project — Online Store", client: "Placeholder Client", industry: "Retail",
    category: "E-commerce", tech: ["Shopify", "Liquid", "Razorpay"], image: p2, gallery: [p2, p1],
    summary: "Placeholder: a mobile-first storefront with streamlined checkout.",
    overview: "Placeholder overview. Describe the project scope, timeline and your role here.",
    clientIntro: "Placeholder. Introduce the client's business, audience and goals.",
    challenge: "Placeholder. Describe the problem the client faced before the project.",
    solution: "Placeholder. Explain the approach, key decisions and what was built.",
    services: ["E-commerce Development", "UI/UX Design"], outcome: "Placeholder. Add real, verified outcomes once available.",
  },
  {
    slug: "sample-brand-identity", name: "Sample Project — Brand Identity", client: "Placeholder Client", industry: "Consulting",
    category: "Branding", tech: ["Figma", "Illustrator"], image: p3, gallery: [p3, p2],
    summary: "Placeholder: a logo, visual identity and stationery system.",
    overview: "Placeholder overview. Describe the project scope, timeline and your role here.",
    clientIntro: "Placeholder. Introduce the client's business, audience and goals.",
    challenge: "Placeholder. Describe the problem the client faced before the project.",
    solution: "Placeholder. Explain the approach, key decisions and what was built.",
    services: ["Branding & Logo Design"], outcome: "Placeholder. Add real, verified outcomes once available.",
  },
  {
    slug: "sample-workflow-automation", name: "Sample Project — Workflow Automation", client: "Placeholder Client", industry: "Operations",
    category: "Automation", tech: ["n8n", "OpenAI", "Node.js"], image: p4, gallery: [p4, p3],
    summary: "Placeholder: connecting business tools to automate lead handling.",
    overview: "Placeholder overview. Describe the project scope, timeline and your role here.",
    clientIntro: "Placeholder. Introduce the client's business, audience and goals.",
    challenge: "Placeholder. Describe the problem the client faced before the project.",
    solution: "Placeholder. Explain the approach, key decisions and what was built.",
    services: ["AI & Automation"], outcome: "Placeholder. Add real, verified outcomes once available.",
  },
  {
    slug: "sample-product-design", name: "Sample Project — Product UI", client: "Placeholder Client", industry: "Fintech",
    category: "UI/UX", tech: ["Figma", "Design System"], image: p1, gallery: [p1, p2],
    summary: "Placeholder: a design system and app interface for a web product.",
    overview: "Placeholder overview. Describe the project scope, timeline and your role here.",
    clientIntro: "Placeholder. Introduce the client's business, audience and goals.",
    challenge: "Placeholder. Describe the problem the client faced before the project.",
    solution: "Placeholder. Explain the approach, key decisions and what was built.",
    services: ["UI/UX & Creative Design"], outcome: "Placeholder. Add real, verified outcomes once available.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
