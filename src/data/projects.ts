import p1 from "@/assets/projects/copier_bazaar.png";
import p2 from "@/assets/projects/startup_minds.png";
import p3 from "@/assets/projects/adhithyam_packaging.png";

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
  /** Extra preview images. The section is hidden when empty. */
  gallery: string[];
  liveUrl?: string;
  overview: string;
  clientIntro?: string;
  challenge?: string;
  solution?: string;
  /** Bullet list shown as "Key highlights". */
  highlights?: string[];
  services: string[];
  outcome?: string;
};

/**
 * Project screenshots live in src/assets/projects/. Missing files fall back to a placeholder,
 * so a new project can be added before its image is ready.
 */
const shots = import.meta.glob<string>("../assets/projects/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" });
const shot = (name: string, fallback: string) =>
  Object.entries(shots).find(([path]) => path.split("/").pop()?.replace(/\.\w+$/, "") === name)?.[1] ?? fallback;

const copierBazar = shot("copierbazar", p1);
const startupMinds = shot("startupminds", p2);
const adithyan = shot("karurappl", p3);

export const projects: Project[] = [
  {
    slug: "copier-bazar", name: "Copier Bazar", client: "Copier Bazar", industry: "Printing Supplies & E-commerce",
    category: "Website Development", tech: ["WordPress", "WooCommerce", "SEO", "WhatsApp Integration"],
    image: copierBazar, gallery: [], liveUrl: "https://copierbazar.com/",
    summary: "A fast WooCommerce store for 2,000+ printers, toners, inks and printing accessories.",
    overview: "Designed, developed, and optimized a fully responsive WooCommerce e-commerce website for Copier Bazar, featuring a large catalog of 2,000+ products, including printers, toner cartridges, ink, and printing accessories. Focused on delivering high performance, smooth navigation, and a seamless shopping experience while maintaining excellent loading speed despite the extensive product inventory.",
    challenge: "With 2,000+ products, the store had to stay fast, easy to browse, and visible in search. Customers needed to find the right toner or cartridge in a few clicks, on any device.",
    solution: "Implemented comprehensive SEO optimization, user-friendly product navigation, search functionality, and a streamlined shopping experience to support scalability, organic visibility, and business growth.",
    highlights: [
      "WooCommerce store with 2,000+ products.",
      "Fast performance for a large catalog.",
      "SEO-optimized site structure.",
      "Filters, search, reviews and WhatsApp integration.",
    ],
    services: ["Website Development", "E-commerce Development", "UI/UX Design", "SEO"],
  },
  {
    slug: "startup-minds", name: "Startup Minds", client: "Startup Minds", industry: "Startup Consulting & Media",
    category: "Website Development", tech: ["Responsive Web Design", "UI/UX Design"],
    image: startupMinds, gallery: [], liveUrl: "https://startupminds.com/",
    summary: "A modern website for a startup consulting and media platform focused on fundraising.",
    overview: "Designed and developed a modern, fully responsive website for Startup Minds, a startup consulting and media platform focused on fundraising, investment readiness, and business growth.",
    challenge: "Founders need to trust an advisor before booking a call. The site had to build that trust quickly and present both the consulting services and the video content without losing focus on bookings.",
    solution: "Created a professional UI/UX with engaging hero sections, founder profiles, client trust bar, service showcases, startup analysis content, and strategic call-to-action sections. Optimized the website for desktop and mobile devices to deliver a seamless browsing experience and encourage consultation bookings and business enquiries.",
    highlights: [
      "Modern, responsive UI/UX design.",
      "Founder profiles, trust bar and testimonials.",
      "Startup Minds Originals video section.",
      "Clear CTAs for consultation bookings.",
    ],
    services: ["Website Development", "UI/UX Design"],
  },
  {
    slug: "adithyan-packers", name: "Adithyan Packers", client: "Adithyan Packers Pvt. Ltd.", industry: "Packaging Manufacturing",
    category: "Website Development", tech: ["Responsive Web Design", "UI/UX Design", "WhatsApp Integration"],
    image: adithyan, gallery: [], liveUrl: "https://karurappl.in/",
    summary: "A corporate website showcasing flexible packaging solutions and manufacturing capabilities.",
    overview: "Designed and developed a modern, fully responsive corporate website for Adithyan Packers Pvt. Ltd., showcasing their flexible packaging solutions, product range, company achievements, and manufacturing capabilities.",
    challenge: "Business buyers want to see the product range, trust the manufacturer, and request a quote without a long back-and-forth. The site had to make all three simple.",
    solution: "Created an engaging UI with responsive layouts, product showcases, clear call-to-action sections, and WhatsApp integration to help generate business enquiries and quotation requests.",
    highlights: [
      "Product showcase for packaging solutions.",
      "Company statistics and achievements.",
      "Step-by-step purchasing process.",
      "WhatsApp integration for quick enquiries.",
    ],
    services: ["Website Development", "UI/UX Design"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
