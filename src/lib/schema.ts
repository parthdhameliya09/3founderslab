/**
 * schema.org structured data shared across pages.
 *
 * Every entity has a stable "@id" (e.g. https://3founderslab.in/#organization), so pages that
 * mention the company or a founder point to the same entity and Google can connect them.
 * Pages pass these objects to seo({ jsonLd }) in src/lib/seo.ts.
 */
import { absUrl, SITE_NAME, SITE_URL } from "./seo";
import { siteConfig, socialLinks } from "@/data/site";
import { services } from "@/data/services";
import { team, type TeamMember } from "@/data/people";
import logo from "@/assets/logo.webp";

const CONTEXT = "https://schema.org";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Company facts used in the structured data. Update here if they change. */
const COMPANY_SIZE = 3;
const LEGAL_NAME = "3FoundersLab";
const FOUNDING_DATE = "2026-11-09";
const LANGUAGES = ["English", "Gujarati", "Hindi"];

const abs = (src: string) => new URL(src, SITE_URL).href;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const personId = (m: TeamMember) => `${absUrl("/about")}#${slug(m.name)}`;

/** Bios contain emoji for the website; structured data gets plain text. */
const plainText = (s: string) => s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "").replace(/\s+/g, " ").trim();

/** Short reference to the company, for use inside other entities. */
export const orgRef = { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL };

export function personSchema(m: TeamMember) {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": personId(m),
    name: m.name,
    jobTitle: m.role === "Founder" ? "Co-Founder" : m.role,
    description: plainText(m.bio),
    // A personal site is the person's own page; otherwise their section on the About page.
    url: m.website ?? absUrl("/about"),
    ...(m.photo ? { image: abs(m.photo) } : {}),
    ...([m.linkedin, m.website].some(Boolean) ? { sameAs: [m.linkedin, m.website].filter((x): x is string => Boolean(x)) } : {}),
    ...(m.expertise?.length ? { knowsAbout: m.expertise } : {}),
    worksFor: orgRef,
    nationality: { "@type": "Country", name: "India" },
    knowsLanguage: LANGUAGES,
  };
}

export function organizationSchema() {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    foundingDate: FOUNDING_DATE,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs(logo) },
    image: abs(logo),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phone.replace(/\s+/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
    areaServed: "Worldwide",
    numberOfEmployees: { "@type": "QuantitativeValue", value: COMPANY_SIZE },
    knowsLanguage: LANGUAGES,
    founder: team.map((m) => ({ "@type": "Person", "@id": personId(m), name: m.name })),
    knowsAbout: services.map((s) => s.title),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: siteConfig.phone.replace(/\s+/g, ""),
      areaServed: "Worldwide",
      availableLanguage: LANGUAGES,
      // Same hours as shown on the contact page (Mon–Sat, 10am–7pm IST).
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
      url: absUrl("/contact"),
    },
    sameAs: socialLinks.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** WebPage-type node (AboutPage, ContactPage, CollectionPage...) tied to the website and company. */
export function webPageSchema(type: string, o: { path: string; name: string; description: string; extra?: object }) {
  return {
    "@context": CONTEXT,
    "@type": type,
    "@id": `${absUrl(o.path)}#webpage`,
    url: absUrl(o.path),
    name: o.name,
    description: o.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...o.extra,
  };
}

/** ItemList of links, used on the blog and work listing pages. */
export function itemList(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absUrl(it.path) })),
  };
}
