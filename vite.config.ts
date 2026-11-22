import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { blogMarkdown } from "./plugins/blog-markdown";
import { sitemap } from "./plugins/sitemap";

export default defineConfig({
  plugins: [blogMarkdown(), sitemap()],
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});