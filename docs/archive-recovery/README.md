# Archive recovery — Werther's 2000s flight-sim sites

Review material for the Uncommon Solid project pages. **Nothing here is newly
written history**: the files under each site's `raw/` directory are byte-for-byte
copies of pages served by the Internet Archive's Wayback Machine (downloaded
2026-10-01 via `https://web.archive.org/web/<timestamp>id_/<original-url>`),
i.e. unmodified archived originals. The `text/` files are plain-text
extractions made for readability (decoded as GB18030/GB2312 where the pages
declare it, scripts/styles/tags stripped); `raw/` is canonical.

File naming: `<page-key>-<capture-timestamp>.html` where the timestamp is the
Wayback capture time (UTC), e.g. `home-20010607005717.html` was captured
2001-06-07 00:57:17. `meta/manifest.json` maps every file to its original URL
and Wayback replay URL.

## Sites

| dir | original site | captures (HTTP 200) | files |
|---|---|---|---|
| `virtualfly-v1/` | `go2.163.com/~werther/` — VirtualFly V1, static HTML on 163.com | 76 captures, 62 URLs, 2001-04-04 → 2001-07-02 | 12 pages |
| `virtualfly-v2/` | `591fly.cpgl.net` — VirtualFly V2, PHPNuke portal | 88 captures, 10 URLs, 2002-05-30 → 2005-07-28 | 9 pages |
| `falcon-cn/` | `falconcn.com` / `www.falconcn.com` — FalconCN + CN101TF squadron | 443 captures, 167 URLs, 2002-12-26 → 2022 (his CMS era ends ~2005) | 12 pages |
| `cn101tf/` | `cn101tf.com` / `www.cn101tf.com` — squadron domain | squadron-era captures 2004-08-04 → 2007 (later captures are a different site, excluded) | 11 pages |
| `myrice-link/` | `f16-falcon.myrice.com` — linked from his 2002 article as "CN101中队的网站" | 57 captures, 19 URLs, 2001-06-23 → 2005-02-11 | 5 pages |

## Caveats — read before quoting

- **virtualfly-v2 `/newss/` and `/service/` captures (Dec 2004) are CPGL's own
  portal content** (全国电子体育联盟 — the free host's CMS: hosting help,
  e-sports news), not VirtualFly content. Kept for provenance; the actual
  VirtualFly portal is the PHPNuke snapshot `v2-8080-index-20030201.html`
  (2003-02-01) and the `Flight Simulation Net` redirect stub from 2002-05-30.
- **cn101tf.com 2009-03-09 homepage is a "Buy WoW Gold" seller** — the domain
  changed hands. Excluded from this directory; only the 2004–2007 ASP-era
  captures (same CMS as falconcn.com) are kept.
- **falconcn.com captures after ~2005 are mostly `robots.txt`** — the domain
  outlived the site. His CMS-era content is 2002–2005.
- **myrice-link discrepancy**: his 2002 VirtualFly article links to
  `http://f16-falcon.myrice.com` as "CN101中队的网站", but he doesn't
  recognize that host — his squadron sites were falconcn.com and cn101tf.com.
  Every archived capture of the myrice host (2001–2005) shows a site titled
  "3GO空军基地 F16-Falcon 战隼大队" instead. His guess: someone
  took the squadron's web presence over around 2003, after his time.
- **Privacy**: `falcon-cn/raw/member-list-20030801060711.html` is the 2003
  squadron roster and contains members' 2003-era email addresses. It is
  preserved unmodified as an archived original; do not republish the
  addresses in new copy.
- **Behance**: both gallery pages returned HTTP 403 to the fetcher and were
  not retried. The intro texts in `meta/behance-notes.md` are Werther's own
  words, pasted by him verbatim on 2026-10-01. He later saved the gallery
  screenshots himself (2026-10-01); they live at
  `src/assets/images/falcon-cn/falconcn-homepage-behance.webp` and
  `src/assets/images/virtualfly-net/virtualfly-portal-behance.webp` and are
  embedded in the draft project pages.
- `virtualfly.net` (the original domain) was not checked — long lost, per
  Werther.

## Not recovered

- VirtualFly V1: the forums (`forum.gif` template image exists in CDX but no
  forum page captures were found), the guestbook/message board content.
- VirtualFly V2: forum threads and download files themselves (only index and
  section pages captured); the PHPNuke "贴图画廊" (gallery) and "偶有猛料"
  sections have no captures.
- FalconCN: flight-report and score-board page *contents* (the nav proves the
  Squadron Member Register System had them; only the roster list page was
  captured), member-edit/verify flows, BBS threads beyond the index.
