# Uncommon Solid — Implementation Spec

Astro, static output, deployed to Cloudflare Workers. Read `DESIGN.md` for tokens and screens; this covers structure.

Zero client JS by default. Nothing on this site needs hydration — no framework integrations, no islands. If a page ever does, it gets a scoped `<script>`, not React.

---

## 1. Project shape

```
src/
  content.config.ts        # collection schemas (Astro 5 — at src/, not src/content/)
  content/
    logs/                  # markdown, one file per post
    projects/              # markdown, one file per project
  layouts/
    Base.astro             # <html>, head, fonts, tokens, Header, Footer
    Page.astro             # Base + page title block, for index pages
    Entry.astro            # Base + article chrome, for log posts
  components/
    Header.astro
    NavSoftkeys.astro
    Panel.astro            # bordered box, optional corner brackets
    PanelHeader.astro      # Martian label + dashed rule
    TickRule.astro
    Softkey.astro
    Badge.astro            # log | workshop | live | wip
    EntryRow.astro         # feed row: marker, date, badge, title
    LogRow.astro           # index row: date, title, summary
    ProjectCard.astro
    ArchiveCard.astro
    TagChip.astro
    TagCloud.astro
    MetaTable.astro        # label/value rows
    Prose.astro            # markdown wrapper
    PrevNext.astro
  pages/
    index.astro            # HUD
    logs/index.astro
    logs/[...slug].astro
    workshop/index.astro
    workshop/[...slug].astro
    tags/[tag].astro
    about.astro
    404.astro
    rss.xml.ts
  styles/
    tokens.css             # custom properties only
    base.css               # reset, fonts, prose
public/
  fonts/                   # self-hosted woff2
```

---

## 2. Content collections

`src/content.config.ts` — glob loader, not the legacy `type: 'content'`.

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().max(160),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(),   // slug of a projects entry
    kind: z.enum(['log', 'workshop']).default('log'),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    blurb: z.string(),
    status: z.enum(['live', 'wip', 'dormant']),
    started: z.string(),              // "2024.03"
    ended: z.string().optional(),     // archive shelf shows "2005 – 2008"
    stack: z.array(z.string()).default([]),
    source: z.string().url().optional(),
    demo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { logs, projects };
```

Notes:
- **Tags are not a collection.** They are derived at build time from log and project frontmatter. A collection would mean maintaining a file per tag for no gain. If tags ever need descriptions, add `src/content/tags/` then — until then, derive.
- `kind` drives the badge. `log` = green, `workshop` = magenta. A workshop entry is still a log; it just concerns a project.
- `status: 'dormant'` is what puts a project on the archive shelf. One list, one flag, no second collection.
- `project` links a log to a project by slug. The project page queries logs by it.

### Shared queries

`src/lib/content.ts` — every page pulls from here, so draft filtering and sort order live in one place.

```ts
export const allLogs = async () =>
  (await getCollection('logs', ({ data }) => import.meta.env.PROD ? !data.draft : true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const logsByProject = async (slug: string) =>
  (await allLogs()).filter(e => e.data.project === slug);

export const tagIndex = async () => { /* Map<tag, count> across logs + projects */ };
```

---

## 3. Routing

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `allLogs().slice(0,6)` + featured projects | HUD |
| `/logs` | `allLogs()` | grouped by year in the template |
| `/logs/[...slug]` | `getStaticPaths` over `logs` | `render(entry)` for `<Content />` |
| `/workshop` | `projects` split by `status !== 'dormant'` | active grid + archive shelf |
| `/workshop/[...slug]` | `getStaticPaths` over `projects` | + `logsByProject(slug)` |
| `/tags/[tag]` | `getStaticPaths` over `tagIndex()` | mixed logs + projects |
| `/about` | static | |
| `/404` | static | Cloudflare serves it on miss |
| `/rss.xml` | `@astrojs/rss` over `allLogs()` | link it from the HUD softkey |

Astro 5 content API: `render()` is imported from `astro:content` and called as `render(entry)`, not `entry.render()`.

---

## 4. Styling

Plain CSS. No Tailwind, no CSS-in-JS. The design is ~30 tokens and four motifs; a utility framework would be more config than styles.

- `tokens.css` holds every custom property from `DESIGN.md` §1 on `:root`. Imported once in `Base.astro`.
- Component styles go in each `.astro` file's `<style>` block — Astro scopes them automatically.
- `base.css` carries the reset, `@font-face`, and the `.prose` rules for rendered markdown.
- Global rules for `a` / `a:hover` belong in `base.css`, not left to browser defaults.

### Fonts

Self-host both from `public/fonts/` — no Google Fonts request, no third-party origin on a site this small.

```
Martian Mono  400, 500, 700   (subset: latin, uppercase-heavy)
IBM Plex Mono 400, 500, 600
```

`font-display: swap`, `<link rel="preload">` for the two weights above the fold (Martian 700, Plex 400). Martian Mono is wide; subset it to latin only.

### The four motifs as components

- `<Panel bracket="full|corners|none">` — the bordered box. Brackets are `<span>`s positioned at `-1px`; do not fake them with `border-image`.
- `<TickRule vertical={false} />` — the repeating-gradient divider.
- `<Softkey active href label>` — nav, CTA, tag chip, footer link. One component, size via a `size` prop.
- `<Badge kind="log|workshop|live|wip|dormant">` — color mapping lives here and nowhere else.

---

## 5. Build & deploy

- `output: 'static'`, `@astrojs/cloudflare` adapter only if something later needs SSR. A fully static build deploys to Workers Static Assets with no adapter at all — prefer that.
- `site: 'https://4167360.xyz'` in `astro.config.mjs` so RSS and canonicals resolve.
- Sitemap via `@astrojs/sitemap`.
- `wrangler.toml` with `assets = { directory = "./dist" }`; deploy with `wrangler deploy`.
- Markdown: `shiki` with a custom theme matching the palette — green on black, magenta for keywords, amber for strings. Do not ship a stock theme; it will fight the design.

---

## 6. Accessibility

The palette is dark and the accents are saturated. Two things to hold to:

- Body text (`--text-body` on `--bg`) and entry titles clear 7:1. **`--label` on black is ~4.6:1** — acceptable for the 11–12px metadata it is used for, but never put body copy or anything essential in it.
- Color carries meaning (green/magenta/amber). Every badge must also carry its text label, which the design already does. Never signal state by color alone.
- Softkeys are `<a>` or `<button>`, never a styled `<span>` — the mockup uses spans for layout only.
- Skip link to `#main` in `Base.astro`.
- `<title>` per page as `{page} · Uncommon Solid`.

---

## 7. Build order

1. Tokens, fonts, `Base.astro`, `Header`, `NavSoftkeys` — get the chrome right first, everything sits inside it.
2. `Panel`, `TickRule`, `Softkey`, `Badge` — the four motifs. Every screen is these plus content.
3. Collections + `lib/content.ts`, with three real logs and three real projects as fixtures.
4. `/logs`, `/logs/[slug]` — the highest-traffic path, and it proves the prose styles.
5. `/workshop`, `/workshop/[slug]`.
6. `/` (HUD) — it composes pieces from 4 and 5, so it is cheapest last.
7. `/tags/[tag]`, `/about`, `/404`, `/rss.xml`.
8. Mobile pass at 390. The layout is single-column everywhere; mostly it is collapsing the two-column splits and the nav.
