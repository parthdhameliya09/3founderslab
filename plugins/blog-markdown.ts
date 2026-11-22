import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Marked, type Token, type Tokens } from "marked";
import type { Plugin } from "vite";

const BLOG_DIR = "/src/content/blogs/";
const IMAGE_CACHE = "node_modules/.cache/blog-images";
const PLACEHOLDER = /__BLOGIMG_(\d+)__/;
const MIME_EXT: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif",
  "image/webp": "webp", "image/svg+xml": "svg",
};

type Image = { specifier: string; width?: number; height?: number };

export function blogMarkdown(): Plugin {
  let root = process.cwd();
  return {
    name: "blog-markdown",
    enforce: "pre",
    configResolved(config) {
      root = config.root;
    },
    load(id) {
      const file = (id.split("?")[0] ?? id).replace(/\\/g, "/");
      if (!file.endsWith(".md") || !file.includes(BLOG_DIR)) return null;
      this.addWatchFile(file);
      try {
        return compile(file, root, (dep) => this.addWatchFile(dep));
      } catch (err) {
        this.error(`Blog "${path.basename(file)}": ${(err as Error).message}`);
      }
    },
  };
}

function compile(file: string, root: string, watch: (f: string) => void): string {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const { data: front, body: source } = parseFrontmatter(raw);
  const images: Image[] = [];

  // 1. Pull embedded base64 images out into files before parsing (keeps the parser fast).
  const body = source.replace(/data:(image\/[a-z0-9+.-]+);base64,([A-Za-z0-9+/=\s]+)/gi, (_m, mime: string, b64: string) => {
    const ext = MIME_EXT[mime.toLowerCase()];
    if (!ext) throw new Error(`unsupported embedded image type ${mime}`);
    const buf = Buffer.from(b64.replace(/\s+/g, ""), "base64");
    const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);
    const dir = path.join(root, IMAGE_CACHE);
    const out = path.join(dir, `${hash}.${ext}`);
    if (!fs.existsSync(out)) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(out, buf);
    }
    images.push({ specifier: `/${IMAGE_CACHE}/${hash}.${ext}`, ...imageSize(buf) });
    return `__BLOGIMG_${images.length - 1}__`;
  });

  const marked = new Marked({ gfm: true });
  const tokens = marked.lexer(body);

  // 2. Relative image paths (e.g. ./images/chart.png next to the .md file) are bundled too.
  marked.walkTokens(tokens, (t) => {
    if (t.type !== "image") return;
    const img = t as Tokens.Image;
    if (PLACEHOLDER.test(img.href) || /^(https?:|\/|data:)/i.test(img.href)) return;
    const abs = path.resolve(path.dirname(file), decodeURI(img.href));
    if (!fs.existsSync(abs)) throw new Error(`image not found: ${img.href}`);
    watch(abs);
    images.push({ specifier: abs.replace(/\\/g, "/"), ...imageSize(fs.readFileSync(abs)) });
    img.href = `__BLOGIMG_${images.length - 1}__`;
  });

  // 3. Drop blank lines and empty headings (Google Docs exports blank "## " lines).
  let blocks = tokens.filter((t) => t.type !== "space" && !(t.type === "heading" && !plain(t).trim()));

  // 4. Title: frontmatter, otherwise the first heading.
  let title = front.title;
  if (!title && blocks[0]?.type === "heading") {
    title = plain(blocks[0]);
    blocks = blocks.slice(1);
  }
  title = title?.replace(/^\s*\d+[.)]\s+/, "").trim();
  if (!title) throw new Error('no title. Start the file with a heading or add "title:" to the header.');

  // 5. Cover, in order: "cover:" in the header, an image in src/content/assets/ with the same
  //    name as this .md file, or an image placed directly after the title.
  let cover: string | undefined;
  let coverIndex: number | undefined;
  const coverFile = findCoverFile(file, front.cover, watch);
  if (coverFile) {
    images.push({ specifier: coverFile.replace(/\\/g, "/"), ...imageSize(fs.readFileSync(coverFile)) });
    coverIndex = images.length - 1;
  } else if (front.cover) {
    cover = front.cover; // a full URL or a /public path
  }
  const first = blocks[0];
  if (first?.type === "paragraph" && imageOnly(first as Tokens.Paragraph) && cover === undefined && coverIndex === undefined) {
    const img = (first as Tokens.Paragraph).tokens.find((t) => t.type === "image") as Tokens.Image;
    const m = img.href.match(PLACEHOLDER);
    if (m) coverIndex = Number(m[1]);
    else cover = img.href;
    blocks = blocks.slice(1);
  }

  // 6. SEO heading structure: the page title is the only <h1>.
  const usedIds = new Set<string>();
  for (const t of blocks) {
    if (t.type !== "heading") continue;
    const h = t as Tokens.Heading;
    h.depth = Math.min(Math.max(h.depth, 2), 4);
    h.tokens = unwrapEmphasis(h.tokens);
  }

  marked.use({
    renderer: {
      heading({ tokens: inline, depth }) {
        let id = slugify(plain({ tokens: inline } as Token)) || "section";
        for (let i = 2; usedIds.has(id); i++) id = `${id.replace(/-\d+$/, "")}-${i}`;
        usedIds.add(id);
        return `<h${depth} id="${id}">${this.parser.parseInline(inline)}</h${depth}>\n`;
      },
      paragraph({ tokens: inline }) {
        if (imageOnly({ tokens: inline } as Tokens.Paragraph)) {
          return inline.filter((t) => t.type === "image").map((t) => this.parser.parseInline([t])).join("");
        }
        return false;
      },
      // ![alt](path "caption")               ->  full-width image with a caption under it.
      // ![alt](path "small")                 ->  logo/icon size; starts a bordered card.
      // ![alt](path "medium | caption")      ->  centred, narrower than the text column.
      // ![alt](path "large | caption")       ->  screenshots; full width of the text column.
      image({ href, text, title: caption }) {
        const idx = href.match(PLACEHOLDER)?.[1];
        const size = idx !== undefined ? images[Number(idx)] : undefined;
        const dims = size?.width ? ` width="${size.width}" height="${size.height}"` : "";
        const alt = escapeAttr(text || title!);
        // Title may be "size", "size | caption" or just "caption".
        const m = caption?.trim().match(/^(small|medium|large)\s*(?:\|\s*([\s\S]*))?$/i);
        const sizeClass = m ? m[1]!.toLowerCase() : "";
        const text2 = m ? (m[2] ?? "").trim() : (caption ?? "").trim();
        const fig = text2 && sizeClass !== "small" ? `<figcaption>${escapeHtml(text2)}</figcaption>` : "";
        const cls = sizeClass ? ` class="img-${sizeClass}"` : "";
        return `<figure${cls}><img src="${href}" alt="${alt}"${dims} loading="lazy" decoding="async">${fig}</figure>\n`;
      },
      link({ href, title: linkTitle, tokens: inline }) {
        const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?3founderslab\.in/i.test(href);
        const t = linkTitle ? ` title="${escapeAttr(linkTitle)}"` : "";
        const ext = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeAttr(href)}"${t}${ext}>${this.parser.parseInline(inline)}</a>`;
      },
    },
  });

  const html = renderWithCards(blocks, (list) => marked.parser(list) as string, (tokens as { links?: unknown }).links)
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  const text = stripTags(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  const firstParagraph = blocks.find((t) => t.type === "paragraph" && !imageOnly(t as Tokens.Paragraph));
  const excerpt = front.excerpt || truncate(firstParagraph ? plain(firstParagraph) : text, 160);
  // "date: 2026-11-22" or "date: 2026-11-22 14:30". The time only decides the order of posts
  // published on the same day; pages show the date alone.
  const rawDate = front.date || fs.statSync(file).mtime.toISOString().slice(0, 16).replace("T", " ");
  const dm = rawDate.match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{1,2}):(\d{2}))?$/);
  if (!dm) throw new Error(`date must look like 2026-11-22 or 2026-11-22 14:30 (got "${rawDate}")`);
  const date = dm[1]!;
  const publishedAt = `${date}T${(dm[2] ?? "00").padStart(2, "0")}:${dm[3] ?? "00"}`;

  // 7. Emit a JS module. Image placeholders become imports so Vite fingerprints and serves them.
  const used = new Set<number>();
  const expr = (s: string) =>
    s.split(/(__BLOGIMG_\d+__)/).filter(Boolean).map((part) => {
      const m = part.match(/^__BLOGIMG_(\d+)__$/);
      if (!m) return JSON.stringify(part);
      used.add(Number(m[1]));
      return `__img${m[1]}`;
    }).join(" + ") || '""';

  const coverExpr = coverIndex !== undefined ? expr(`__BLOGIMG_${coverIndex}__`) : cover ? JSON.stringify(cover) : "undefined";
  const htmlExpr = expr(html);
  const imports = [...used].map((i) => `import __img${i} from ${JSON.stringify(images[i]!.specifier)};`).join("\n");

  const meta = {
    slug: front.slug || slugify(title),
    title,
    excerpt,
    category: front.category || "",
    date,
    publishedAt,
    readMinutes: Math.max(1, Math.round(words / 200)),
    author: front.author || "",
    featured: /^(true|yes)$/i.test(front.featured ?? ""),
    coverAlt: front.coverAlt || title,
  };

  return `${imports}\nexport default { ...${JSON.stringify(meta)}, cover: ${coverExpr}, html: ${htmlExpr} };\n`;
}

/** True for a paragraph holding only an image marked ![alt](path "small"). */
function isSmallImage(t: Token): boolean {
  if (t.type !== "paragraph" || !imageOnly(t as Tokens.Paragraph)) return false;
  const img = (t as Tokens.Paragraph).tokens.find((x) => x.type === "image") as Tokens.Image | undefined;
  return /^small\b/i.test(img?.title?.trim() ?? "");
}

/**
 * Renders blocks, grouping each "small" image and the paragraphs after it into a bordered card.
 * A card ends at the next small image or any non-paragraph block (heading, list, table...).
 * Back-to-back cards are placed in one grid.
 */
function renderWithCards(blocks: Token[], render: (list: Token[]) => string, links: unknown): string {
  const run = (list: Token[]) => render(Object.assign([...list], { links: links ?? {} }));
  let out = "";
  let cards: string[] = [];
  const flushGrid = () => {
    if (cards.length) out += `<div class="card-grid">\n${cards.join("")}</div>\n`;
    cards = [];
  };
  for (let i = 0; i < blocks.length; i++) {
    const t = blocks[i]!;
    if (!isSmallImage(t)) {
      flushGrid();
      out += run([t]);
      continue;
    }
    const group = [t];
    while (i + 1 < blocks.length && blocks[i + 1]!.type === "paragraph" && !isSmallImage(blocks[i + 1]!)) group.push(blocks[++i]!);
    cards.push(`<div class="content-card">\n${run(group)}</div>\n`);
  }
  flushGrid();
  return out;
}

const COVER_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"];

/** Resolves the cover image file, or undefined when the cover is a URL or there is none. */
function findCoverFile(mdFile: string, coverField: string | undefined, watch: (f: string) => void): string | undefined {
  const mdDir = path.dirname(mdFile);
  const assetsDir = path.resolve(mdDir, "../assets");
  if (coverField) {
    if (/^(https?:|\/)/i.test(coverField)) return undefined;
    // Accept a path relative to the .md file, or just a file name inside src/content/assets/.
    for (const candidate of [path.resolve(mdDir, coverField), path.join(assetsDir, coverField)]) {
      if (fs.existsSync(candidate)) {
        watch(candidate);
        return candidate;
      }
    }
    throw new Error(`cover image not found: ${coverField} (put it in src/content/assets/)`);
  }
  const base = path.basename(mdFile, ".md");
  for (const ext of COVER_EXTS) {
    const candidate = path.join(assetsDir, base + ext);
    watch(candidate); // so adding the image later refreshes the page in dev
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

/** Slug and date of a blog file, computed the same way as the full build (used by the sitemap). */
export function readBlogMeta(file: string): { slug: string; date: string } {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const { data: front, body } = parseFrontmatter(raw);
  let title = front.title;
  if (!title) {
    const heading = new Marked({ gfm: true }).lexer(body.replace(/data:image\/[^)>\s]+/g, "")).find(
      (t) => t.type === "heading" && plain(t).trim(),
    );
    title = heading ? plain(heading) : path.basename(file, ".md");
  }
  title = title.replace(/^\s*\d+[.)]\s+/, "").trim();
  const date = (front.date ?? "").slice(0, 10) || fs.statSync(file).mtime.toISOString().slice(0, 10);
  return { slug: front.slug || slugify(title), date };
}

type Front = Partial<Record<"title" | "slug" | "date" | "category" | "excerpt" | "cover" | "coverAlt" | "author" | "featured", string>>;

/** Optional "---" header block with simple `key: value` lines. */
function parseFrontmatter(raw: string): { data: Front; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of (m[1] ?? "").split("\n")) {
    const kv = line.match(/^\s*([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv?.[1]) data[kv[1]] = (kv[2] ?? "").trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data: data as Front, body: raw.slice(m[0].length) };
}

function plain(token: Token | { tokens?: Token[]; text?: string }): string {
  const t = token as { tokens?: Token[]; text?: string; type?: string };
  if (t.type === "image") return "";
  if (t.tokens?.length) return t.tokens.map(plain).join("");
  return t.text ?? "";
}

function unwrapEmphasis(tokens: Token[]): Token[] {
  return tokens.flatMap((t) => (t.type === "strong" || t.type === "em" ? unwrapEmphasis((t as Tokens.Strong).tokens) : [t]));
}

function imageOnly(p: { tokens: Token[] }): boolean {
  const hasImage = p.tokens.some((t) => t.type === "image");
  return hasImage && p.tokens.every((t) => t.type === "image" || t.type === "br" || (t.type === "text" && !t.raw.trim()));
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, s.lastIndexOf(" ", max)).replace(/[,.;:]$/, "") + "…";
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

/** Reads pixel size from PNG/JPEG headers so images reserve space and don't shift the layout. */
function imageSize(buf: Buffer): { width?: number; height?: number } {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1] ?? 0;
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  }
  return {};
}
