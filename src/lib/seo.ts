/**
 * Shared on-page SEO: title, description, canonical URL, Open Graph and Twitter tags.
 * Every route's head() should use `seo()` so all pages get the same complete set of tags.
 */
export const SITE_URL = "https://3founderslab.in";
export const SITE_NAME = "3FoundersLab";

/**
 * Absolute URL for a path. GitHub Pages serves each prerendered page from "<path>/index.html"
 * and redirects "/about" to "/about/", so canonical URLs use the trailing-slash form.
 */
export function absUrl(path: string): string {
  const clean = path.split(/[?#]/)[0] || "/";
  if (/^https?:\/\//.test(clean)) return clean;
  const withSlash = clean === "/" || /\.[a-z0-9]+$/i.test(clean) || clean.endsWith("/") ? clean : `${clean}/`;
  return SITE_URL + (withSlash.startsWith("/") ? withSlash : `/${withSlash}`);
}

type SeoInput = {
  /** Page title without the brand; " | 3FoundersLab" is added unless `rawTitle` is set. */
  title: string;
  rawTitle?: boolean;
  description: string;
  path: string;
  /** Share image (imported asset or absolute URL). */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Extra meta tags (e.g. article:published_time). */
  extra?: Array<Record<string, string>>;
  /** Structured data objects, each emitted as its own JSON-LD script. */
  jsonLd?: object[];
};

export function seo(input: SeoInput) {
  const title = input.rawTitle ? input.title : `${input.title} | ${SITE_NAME}`;
  const url = absUrl(input.path);
  const image = input.image ? new URL(input.image, SITE_URL).href : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: input.description },
      ...(input.noindex ? [{ name: "robots", content: "noindex, follow" }] : [{ name: "robots", content: "index, follow, max-image-preview:large" }]),
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: input.type ?? "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: input.description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: input.description },
      ...(image
        ? [
            { property: "og:image", content: image },
            { property: "og:image:alt", content: input.imageAlt ?? title },
            { name: "twitter:image", content: image },
          ]
        : []),
      ...(input.extra ?? []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: (input.jsonLd ?? []).map((data) => ({
      type: "application/ld+json",
      // Escape "<" so content can never close the script tag.
      children: JSON.stringify(data).replace(/</g, "\\u003c"),
    })),
  };
}

/** Breadcrumb structured data for inner pages. */
export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}
