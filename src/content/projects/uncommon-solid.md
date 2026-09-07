---
name: Uncommon Solid
blurb: Personal website, habit tracker, and the entry point for my homelab experiments.
status: live
started: '2026.06'
stack:
  - Astro
  - Cloudflare Workers
  - Plain CSS
  - Cloudflare Zero Trust
source: https://github.com/werther41/ucs-4167360-xyz
demo: https://4167360.xyz
tags:
  - astro
  - cloudflare
  - homelab
featured: true
order: 1
---

The personal hub you are looking at right now. It is a lightweight, static interface designed as both a logbook for my side projects and a portal for reaching my home network.

The project was born from a desire to strip away client-side frameworks, unnecessary JavaScript, and heavy runtimes, returning instead to a fast, dark-themed HUD layout built with plain CSS and type-safe markdown collections.

## Core Setup

- **Astro Static Build**: Driven by Astro 7 with static HTML generation. There is zero client-side JS loaded by default.
- **Plain CSS**: Built with native CSS variables and semantic tokens. No Tailwind, no utility classes, no UI frameworks.
- **Edge Deployment**: Hosted on Cloudflare Workers, automatically built and deployed when feature branches are merged into `main`.
- **Zero Trust Gateway**: Links directly to my physical home server via a Cloudflare Zero Trust tunnel, routing traffic securely without a VPN client.

For the background story on repurposing a 2010 MacBook Pro, configuring tunnels, and finding the cheapest possible domain name to tie it all together, see the log entry on [how Uncommon Solid came to be](/logs/how-uncommon-solid-came-to-be).
