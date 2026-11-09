import {
  Code2, ShoppingBag, PenTool, Gem, Bot, TrendingUp, LayoutGrid, Layers, type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  offerings: string[];
  benefits: string[];
  tools: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "website-development", number: "01", title: "Website Development", icon: Code2,
    short: "Fast, responsive websites and web apps — built new or rebuilt from what you have.",
    description: "We design and build business websites and custom web applications that load fast, work on every device and are easy for your team to maintain.",
    offerings: ["New website development", "Existing website redesign", "Business & corporate websites", "Custom web applications", "Responsive development", "Maintenance & bug fixing"],
    benefits: ["A credible first impression", "Faster pages, better conversions", "Code that is easy to extend"],
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    slug: "ecommerce-development", number: "02", title: "E-commerce Development", icon: ShoppingBag,
    short: "Online stores that are simple to manage and smooth to buy from.",
    description: "From Shopify setups to fully custom storefronts, we build stores with clean product pages, reliable checkout and the integrations your operations need.",
    offerings: ["Shopify development", "WooCommerce", "WordPress e-commerce", "Custom e-commerce solutions", "Payment gateway integration", "Store optimization"],
    benefits: ["Fewer abandoned carts", "Easier inventory & order handling", "Room to scale"],
    tools: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "Headless commerce"],
  },
  {
    slug: "ui-ux-design", number: "03", title: "UI/UX & Creative Design", icon: PenTool,
    short: "Interfaces that look considered and feel effortless to use.",
    description: "We research, wireframe and prototype before we polish — so every screen has a clear purpose and a clear next step for the user.",
    offerings: ["Website UI/UX design", "Landing page design", "Web application design", "Wireframing & prototyping", "Design systems", "UX optimization"],
    benefits: ["Clearer user journeys", "Consistent product visuals", "Faster handoff to development"],
    tools: ["Figma", "FigJam", "Framer", "Design tokens"],
  },
  {
    slug: "branding-logo-design", number: "04", title: "Branding & Logo Design", icon: Gem,
    short: "Identity systems that make your business recognisable and consistent.",
    description: "We shape the visual foundation of your brand — logo, typography, colour and guidelines — so it stays consistent across every touchpoint.",
    offerings: ["Logo design", "Brand identity", "Visual identity systems", "Brand guidelines", "Creative assets"],
    benefits: ["Instant recognition", "Consistency across channels", "A professional presence"],
    tools: ["Figma", "Illustrator", "Photoshop"],
  },
  {
    slug: "ai-automation", number: "05", title: "AI & Automation", icon: Bot,
    short: "Automate repetitive work and add practical AI to everyday operations.",
    description: "We map your workflows, find the manual steps worth removing and connect your tools — adding AI only where it genuinely saves time.",
    offerings: ["AI-powered business solutions", "Workflow automation", "AI chatbot integration", "Process automation", "API integrations", "Custom AI/ML solutions"],
    benefits: ["Hours saved every week", "Fewer manual errors", "Faster responses to customers"],
    tools: ["OpenAI", "n8n", "Zapier", "Python", "REST APIs"],
  },
  {
    slug: "digital-marketing-seo", number: "06", title: "Digital Marketing & SEO", icon: TrendingUp,
    short: "Get found, get visited and turn visits into enquiries.",
    description: "Technical SEO, on-page improvements and focused campaigns that bring the right people to your website — measured and reported clearly.",
    offerings: ["Search engine optimization", "Technical SEO", "On-page SEO", "Social media marketing", "Digital advertising", "Performance optimization"],
    benefits: ["Better search visibility", "More qualified traffic", "Clear reporting"],
    tools: ["Google Search Console", "GA4", "Meta Ads", "Google Ads", "Lighthouse"],
  },
  {
    slug: "cms-website-management", number: "07", title: "CMS & Website Management", icon: LayoutGrid,
    short: "Update your own content without calling a developer.",
    description: "We set up content systems your team can actually use, with structured content models and editing workflows that fit how you work.",
    offerings: ["Webflow", "WordPress", "Directus", "Strapi", "Supabase", "Headless CMS solutions"],
    benefits: ["Independent content updates", "Structured, reusable content", "Lower maintenance cost"],
    tools: ["Webflow", "WordPress", "Directus", "Strapi", "Supabase"],
  },
  {
    slug: "mern-stack-development", number: "08", title: "MERN Stack Development", icon: Layers,
    short: "Full-stack platforms, dashboards and products built to scale.",
    description: "End-to-end JavaScript applications — from database design to API and interface — for dashboards, portals and SaaS products.",
    offerings: ["MongoDB", "Express.js", "React.js", "Node.js", "Full-stack web applications", "Custom dashboards & platforms"],
    benefits: ["One consistent tech stack", "Scalable architecture", "Faster iteration"],
    tools: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
  },
];
