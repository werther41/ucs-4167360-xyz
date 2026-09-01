# Uncommon Solid

Personal site at [4167360.xyz](https://4167360.xyz). Astro 7, static build, Cloudflare Workers.

## Commands

| Command               | Action                         |
| --------------------- | ------------------------------ |
| `pnpm install`        | Install dependencies           |
| `pnpm dev`            | Dev server at `localhost:4321` |
| `pnpm build`          | Production build → `dist/`     |
| `pnpm preview`        | Preview the production build   |
| `npx wrangler deploy` | Deploy `dist/` to Cloudflare   |

Node `>=22.12`. Package manager is pnpm.

## Day-to-day updates

Most edits are content or identity. You rarely need to touch layouts for a new post.

### Site identity

Edit [`src/site.ts`](src/site.ts) for:

- name, domain, description
- GitHub handle / URL, email
- HUD status: `location`, `building`
- colophon strings

### New log post

1. Add `src/content/logs/my-slug.md` (filename = URL slug).
2. Frontmatter:

```yaml
---
title: My title
date: 2026-08-31
summary: One line, max 160 chars. Shows on the logs index.
tags:
  - astro
project: tide-clock # optional — project filename without .md
kind: log # log (green) | workshop (magenta)
draft: false # true = visible in dev, hidden in production
---
```

3. Body is Markdown. `##` headings become the CONTENTS rail on the post page.
4. Reading time is computed from word count — no frontmatter field.

### New / updated project

1. Add or edit `src/content/projects/my-slug.md`.
2. Frontmatter:

```yaml
---
name: Tide Clock
blurb: One-liner for cards.
status: live # live | wip | dormant
started: "2026.02" # "YYYY.MM" or "YYYY"
ended: "2008" # optional — archive shelf year range
stack:
  - Astro
source: https://github.com/…
demo: https://…
tags:
  - astro
featured: true # shows on the HUD FEATURED row
order: 3 # sort among active / dormant peers
---
```

3. Body renders on `/workshop/my-slug`.
4. `status: dormant` puts it on the archive shelf. Link a log with `project: my-slug`.

### Tags

No tag files. Tags come from log/project frontmatter and are counted at build time. `/tags` and `/tags/[tag]` update automatically.

## Where things live

```text
src/
  site.ts                 identity + nav
  content/logs/           posts
  content/projects/       workshop entries
  content.config.ts       frontmatter schemas
  lib/content.ts          queries, dates, reading time
  pages/                  routes
  components/             UI (Panel, Softkey, Badge, …)
  layouts/                Base, Page
  styles/                 tokens.css, base.css, shiki theme
```

Routes: `/` · `/logs` · `/logs/[slug]` · `/workshop` · `/workshop/[slug]` · `/tags` · `/tags/[tag]` · `/about` · `/404` · `/rss.xml`

## Deploy

```sh
pnpm build
npx wrangler deploy
```

Config: [`wrangler.jsonc`](wrangler.jsonc) (`assets` → `./dist`). Site URL for RSS/canonicals: `site` in [`astro.config.mjs`](astro.config.mjs).

## Design constraints (don't break these)

- Zero client JS by default — no React/Vue islands.
- Plain CSS only — tokens in `src/styles/tokens.css`, no Tailwind.
- Self-hosted Fontsource fonts — no Google Fonts.
- Dark theme only. No transitions, shadows, or rounded corners.
- Badge colors live only in `Badge.astro`.

## Agents

Agent/dev conventions: [`AGENTS.md`](AGENTS.md). Design + implementation specs: [`docs/`](docs/).
