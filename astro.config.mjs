// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

import { shikiTheme } from './src/styles/shiki-theme.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://4167360.xyz',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
      wrap: true,
    },
  },
});
