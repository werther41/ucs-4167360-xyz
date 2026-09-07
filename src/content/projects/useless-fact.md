---
name: Tide Clock
blurb: A dial that turns very slowly, for a coast I do not live on.
status: live
started: '2026.02'
stack:
  - Astro
  - Cloudflare Workers
source: https://github.com/handle/tide-clock
demo: https://tide.4167360.xyz
tags:
  - astro
  - cloudflare
  - tide-clock
featured: true
order: 3
---

A single dial showing the state of the tide at one station on the Pacific coast. No map, no forecast, no chart — just a hand that goes around twice a day and a number underneath it.

It exists because I wanted to know whether a Worker could hold a small amount of state for free. It can, and now I have a clock.
