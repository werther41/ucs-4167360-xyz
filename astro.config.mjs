// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

import { shikiTheme } from "./src/styles/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://4167360.xyz",
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  image: {
    // Markdown images in src/ (Pages CMS writes relative paths into
    // src/assets/images) get srcset at build. Article column is 700px.
    layout: "constrained",
    breakpoints: [640, 750, 828, 1080],
    responsiveStyles: false,
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
      wrap: true,
    },
  },
});
