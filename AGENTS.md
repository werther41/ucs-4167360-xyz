# Uncommon Solid

Personal site at **https://4167360.xyz**. Astro 7, static output, Cloudflare Workers (`@astrojs/cloudflare` adapter retained; every page prerenders). Zero client JS by default — no framework islands, no hydration. Visual direction: F-35 MFD (phosphor green on true black). Specs live in `docs/`.

`CLAUDE.md` is a symlink to this file.

## Development

```bash
astro dev --background          # start
astro dev stop | status | logs  # manage
pnpm build                      # static build → dist/
pnpm preview                    # local preview of the build
```

Deploy with `wrangler deploy` against `wrangler.jsonc` (`assets.directory = "./dist"`).

## Specs (read before visual or structural work)

| Doc | Use |
| --- | --- |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Tokens, type, layout, the four motifs, all 8 screens |
| [`docs/IMPLEMENTATION.md`](docs/IMPLEMENTATION.md) | Project shape, collections, routing, build order |
| [`docs/project/Uncommon Solid.dc.html`](docs/project/Uncommon%20Solid.dc.html) | Pixel reference — read HTML/CSS, don't screenshot unless asked |

Match the mockup visually; do not copy its internal structure. Softkeys in the mockup are `<span>`s for layout — production uses `<a>` / `<button>`.

## Non-negotiables

- **No client JS** unless a page truly needs it, and then a scoped `<script>`, not React/Vue/Svelte.
- **Plain CSS only** — no Tailwind, no CSS-in-JS. Tokens in `src/styles/tokens.css`, reset/prose in `src/styles/base.css`, component styles in each `.astro` `<style>` block.
- **Self-hosted fonts** via Fontsource (`@fontsource/martian-mono`, `@fontsource/ibm-plex-mono`). No Google Fonts, no third-party origin. Preloads for Martian 700 and Plex 400 live in `Base.astro`.
- **Dark theme only.** No light mode.
- **No gradients, shadows, rounded corners, glows, or transitions.** Instant hover. `prefers-reduced-motion` is satisfied by having no motion.
- **Color is never the only signal.** Badges always keep their text label. Color mapping for `log | workshop | live | wip | dormant` lives only in `Badge.astro`.

## Architecture

```
src/
  site.ts                 # name, domain, github, email, location, building, nav
  content.config.ts       # logs + projects schemas (glob loader)
  content/logs/           # markdown posts
  content/projects/       # markdown projects (status: live|wip|dormant)
  lib/content.ts          # allLogs, logsByProject, tagIndex, siteCounts, dates…
  lib/types.ts            # MetaRow, shared types
  layouts/Base.astro      # html, fonts, tokens, Header, skip link
  layouts/Page.astro      # Base + page title block
  components/             # motifs + composition (see below)
  pages/                  # routes
  styles/tokens.css | base.css | shiki-theme.mjs
```

### Motifs (reuse; do not invent new ones)

| Component | Role |
| --- | --- |
| `Panel` | Bordered box. `bracket="full\|corners\|none"`, sizes 13 (hero) / 11 (panels) / 9 (cards). Use `pad` / `padSm` props — parent scoped classes do **not** reach a child root. |
| `TickRule` | Repeating-gradient divider (horizontal or vertical). |
| `Softkey` | Nav, CTA, rail link — one component, sized by prop. Always `<a>` or `<button>`. |
| `Badge` | Semantic kind → color. Nowhere else. |

Also: `Header` (`variant="hud" | "inner"`), `NavSoftkeys`, `Mark` (hex SVG), `EntryRow`, `LogRow`, `ProjectCard`, `ArchiveCard`, `TagChip`, `TagCloud`, `MetaTable`, `PanelHeader`, `PageTitle`, `Prose`, `PrevNext`.

### Content rules

- Tags are **derived** at build time from frontmatter (`tagIndex()`). No tags collection.
- Log → project link is the `project` frontmatter slug (`logsByProject`), not a shared tag.
- `status: 'dormant'` puts a project on the archive shelf. One list, one flag.
- Drafts: visible in dev, filtered in prod (`allLogs`).
- Dates: `YYYY.MM.DD` in chrome, `MM.DD` inside year-grouped lists. Helpers in `lib/content.ts`.
- Identity / chrome copy (GitHub handle, email, location, "BUILDING") → edit [`src/site.ts`](src/site.ts) only.
- Copy voice: warm first-person body; terse uppercase military shorthand in chrome (`NO TARGET ACQUIRED`, `9 LOG ENTRIES`).

### Routes

`/` HUD · `/logs` · `/logs/[...slug]` · `/workshop` · `/workshop/[...slug]` · `/tags` · `/tags/[tag]` · `/about` · `/404` · `/rss.xml`

Archive softkey → `/workshop#archive`. RSS is `/rss.xml` (not `/feed.xml`).

Astro content API: `render(entry)` from `astro:content`, not `entry.render()`.

## Astro scope gotcha

A `class` passed into a child component does **not** inherit the parent's scoped attribute. Style a child via:

1. Props that set CSS variables (`Panel`'s `pad` / `padSm`), or
2. `:global(...)` under a parent-owned ancestor.

Do not assume `class="pad"` on `<Panel>` will pick up a `.pad { … }` rule from the page.

## Accessibility

- Skip link to `#main` in `Base.astro`.
- Titles: `{page} · Uncommon Solid`.
- `--label` (~4.6:1) is metadata-only (11–12px). Never body copy.
- Focus: `1px solid var(--phos)` at 2px offset.
- Mobile tap targets ≥ 44px.

## Docs worth consulting

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)

This project does **not** use framework components, Tailwind, or i18n — skip those guides unless requirements change.
