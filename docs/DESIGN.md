# Uncommon Solid — Design Spec

Personal site at **4167360.xyz**. Visual direction: **F-35 multifunction display (MFD)** — phosphor green symbology on true black, hairline strokes, dashed tick scales, corner brackets, boxed readouts. No gradients, no shadows, no rounded corners, no glow. Everything is a 1px line or a flat fill.

Reference mockup: `Uncommon Solid.dc.html` (all 8 screens, desktop 1280 + mobile 390).

---

## 1. Tokens

### Color

Single dark theme. There is no light mode — cockpit displays do not have one.

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#000000` | Page background, all panels |
| `--phos` | `#2FE07A` | Primary symbology: active borders, headings' accent rules, LOG badge, links, CTA border |
| `--phos-bright` | `#9BFFC4` | Wordmark, active nav label, section titles, blockquote text |
| `--text` | `#D8EFE1` | Entry titles, `h1` |
| `--text-body` | `#A9C4B4` | Body copy |
| `--text-dim` | `#7FA891` | Summaries, tag labels, secondary body |
| `--text-mute` | `#6B8F7C` | Inactive list items in side panels |
| `--label` | `#3F6650` | Dates, metadata labels, small caps readouts |
| `--label-dim` | `#4A7D61` | Inactive nav labels |
| `--line` | `#16281E` | Panel borders, header rule |
| `--line-soft` | `#14261C` | Row dividers, softkey borders |
| `--line-faint` | `#0F1F17` | Feed row dividers |
| `--line-bright` | `#1D4030` | Emphasised borders, dashed rules, tag chips |
| `--line-arch` | `#1B3325` | Archive shelf dashed borders |
| `--tick` | `#123021` | Tick-scale marks |
| `--amber` | `#FFC24D` | WIP status |
| `--amber-line` | `#6B5216` | WIP badge border |
| `--magenta` | `#FF6FD0` | WORKSHOP badge text |
| `--magenta-line` | `#6B2455` | WORKSHOP badge border |
| `--phos-line` | `#1D6B41` | LOG / LIVE badge border |
| `--phos-wash` | `rgba(47,224,122,0.12)` | Active nav fill, CTA fill |
| `--phos-hover` | `rgba(47,224,122,0.07)` | Feed row hover |
| `--dead` | `#2C4A3A` | Archive dates, tag counts, unlit row markers |

Color is semantic, not decorative:
- **green** = logs, live, active, navigation
- **magenta** = workshop / project entries
- **amber** = work in progress

### Type

Two families, both monospace.

- **Martian Mono** — 400/500/700. Chrome only: wordmark, nav softkeys, panel headers, section titles, badges, `h1`. Always uppercase with wide tracking (`0.10em`–`0.18em`).
- **IBM Plex Mono** — 400/500/600. Everything else: body copy, entry titles, dates, tags, metadata.

| Role | Family | Size | Tracking | Color |
| --- | --- | --- | --- | --- |
| Wordmark | Martian 700 | 13 | `.16em` | `--phos-bright` |
| Nav softkey | Martian 400 | 10 | `.12em` | `--label-dim` / `--phos-bright` active |
| Hero `h1` | Martian 500 | 38 | `.005em` | `--text` |
| Page title | Martian 400 | 22 | `.06em` | `--phos-bright` |
| Article `h1` | Martian 500 | 27 | `-.005em` | `--text` |
| Panel header | Martian 400 | 9 | `.14em` | `--phos` |
| Badge | Martian 400 | 9 | `.10em` | per semantic color |
| Entry title (feed) | Plex 400 | 15 | — | `--text` |
| Entry title (index) | Plex 400 | 17 | — | `--text` |
| Body | Plex 400 | 15–16 / lh 1.85–1.9 | — | `--text-body` |
| Summary | Plex 400 | 13 / lh 1.7 | — | `--text-dim` |
| Date, metadata | Plex 400 | 11–12 | `.06em`–`.08em` | `--label` |

Mobile scales down one step: hero `h1` 24, article `h1` 19, entry title 15, body 14. Nothing below 10px, and nothing below 12px that carries meaning.

### Layout

- Desktop content max 1280, padding `26px 30px`. Mobile 390, padding `18px 16px`.
- Vertical rhythm: `gap: 20px` between top-level page blocks, `gap: 22px` in the two-column split, `gap: 14px` between cards.
- Two-column article/feed split: `1fr 292px` (feed), `1fr 236px` (article), `1fr 300px` (project header, about).
- Feed row grid: `14px 92px 88px 1fr` with `16px` gaps — marker, date, badge, title.
- Log index row grid: `96px 1fr` with `22px` gap — date, then title + summary stacked.
- Tap targets on mobile ≥ 44px.

### Motifs

These four make the direction. Reuse them; do not invent new ones.

1. **Corner brackets** — 4 absolutely-positioned 11–13px L-shapes at the corners of a primary panel, `1px solid var(--phos)`, offset `-1px`. Only on hero, main feed panel, and project header. Cards use 2 (top-left, bottom-right) at 9px.
2. **Tick scale** — `repeating-linear-gradient(90deg, var(--line-bright) 0 1px, transparent 1px 22px)` on a 7px-tall div. Used as a section separator. Vertical variant (`180deg`, 20px pitch, `--tick`) runs down the hero's inner edges and the 404 frame.
3. **Dashed rule** — `1px dashed var(--line-bright)` under panel headers and above tag footers. Archive shelf cards use a full dashed border in `--line-arch` to read as dormant.
4. **Softkey** — bordered box, uppercase Martian, centered. Active = `--phos` border + `--phos-wash` fill. Inactive = `--line-bright` border, `--label-dim` text. Hover = `--phos` border, `--phos-bright` text. This is the nav, the CTA, the tag chip and the footer link, all the same object at different sizes.

### Interaction

Instant, no transitions. Hover on a feed row is a `--phos-hover` background wash; hover on any bordered thing swaps the border to `--phos` and the text to `--phos-bright`. Focus rings: `1px solid var(--phos)` at 2px offset. Respect `prefers-reduced-motion` — there is no motion to reduce, keep it that way.

---

## 2. Screens

Eight, all in the mockup file.

**01 HUD** (`/`) — the homepage. Named HUD, not "home" or "feed."
Header (wordmark + domain, right-side readout: log count / project count / EST. 2005) → 4-up softkey nav → hero panel with corner brackets, vertical ticks, `h1`, intro paragraph, two CTAs, and a STATUS side panel (last log / building / location) → FEATURED: 3 project cards → tick rule → two columns: RECENT ENTRIES panel (6 rows, mixed types, corner brackets) and a rail holding TAGS and a 2×2 softkey block (RSS / GITHUB / TAGS / ARCHIVE).

**02 LOGS** (`/logs`) — page title + rule + count, tag filter row right-aligned, tick rule, entries grouped by year, each row date + title + one-line summary.

**03 LOG POST** (`/logs/[slug]`) — badge + date + reading time + project tag, `h1`, prose at max 700px, blockquote as a left `--phos` bar, tag footer above a dashed rule. Sticky right rail: CONTENTS, PROJECT. Prev/next softkeys at the bottom.

**04 WORKSHOP** (`/workshop`) — page title + "Not a portfolio — a bench.", 3-up project card grid (year, status badge, name, description, tags, entry count), tick rule, then the **ARCHIVE SHELF**: 4-up dashed cards for dormant work, muted throughout, year ranges instead of status.

**05 PROJECT** (`/workshop/[slug]`) — breadcrumb, bracketed header panel splitting description (left) against a metadata table (right: status, started, stack, source, demo), then TAGGED LOGS — the project's entries pulled by tag.

**06 ABOUT** (`/about`) — page title + rule, three paragraphs at max 640px, right rail with ELSEWHERE (github, email, rss) and COLOPHON (built / hosted / type).

**07 TAG VIEW** (`/tags/[tag]`) — active filter chip with an ✕, result count, full tag cloud with counts, then a flat entry list identical to the HUD feed rows.

**08 404** — full-bleed panel, tick-scale frame on all four edges, a reticle SVG, `404`, `NO TARGET ACQUIRED`, one line of copy, two softkeys (RETURN TO HUD / SEARCH LOGS).

**Mobile (390)** — single column throughout. Nav collapses to a 4-up softkey grid plus a MENU button; the side rails move below the content or drop entirely. Feed rows restack: badge + date on one line, title beneath. Workshop cards go full-width; the archive shelf becomes name/year rows.

---

## 3. Copy

Warm and casual, first person, plain. Understatement over enthusiasm. "A dial that turns very slowly, for a coast I do not live on." Chrome is the opposite register: terse uppercase military-display shorthand (`NO TARGET ACQUIRED`, `9 LOG ENTRIES`, `EST. 2005`). The contrast between the two is the personality — keep both.

Dates render `YYYY.MM.DD` in chrome, `MM.DD` in year-grouped lists.

All content in the mockup is placeholder except the oncology app and the 2005 flight sim origin.
