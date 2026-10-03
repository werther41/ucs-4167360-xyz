---
title: ucs-server, explained
date: 2026-10-02
summary: The name, the printer that started it all, and why the whole homelab
  runs on less than a dollar a year.
tags:
  - homelab
  - self-hosting
kind: log
project: uncommon-solid
draft: false
---
The home server's hostname is `ucs-server`. UCS is UnCommon Solid — which itself was an auto-generated Xbox username I kept — plus "server", because at some point the laptop in the closet needed a name.

## The printer did it

The homelab did not start with a plan. It started with a printer. My wife kept sending me Amazon return labels to print, and the old USB-only laser printer was attached to my desktop — the only machine it talked to. So I took the 2010 MacBook Pro, wiped it, and put a lightweight headless Debian on it. CUPS was the first service, and it remains the one the household actually depends on. Wife can now print from her iPhone.

Then I wanted file sharing and a place to host Docker apps, and CasaOS was the easiest way to get there. I use Proxmox at work; felt like overkill for a closet.

## What earned its slot

- **Jellyfin** — local media.
- **Navidrome** — music on the go. Tempus on Android, CLIAMP on the laptop.
- **Syncthing** — file sync; originally how my Obsidian notes moved between phone and ThinkPad.
- **fast-note-sync-service** — my own realtime Obsidian sync over WebSocket, replacing Syncthing for notes.
- **Hermes** — an AI agent assistant. Third thing installed, right after CUPS and CasaOS.

Hermes has a footnote in this site's history: I briefly planned to make it the chief editor of Uncommon Solid. It was linked to my OpenRouter account, pay-per-API-usage, and I did the math. So the editor job went to Milo instead — the ghost who now interviews me for these logs.

## How the outside world gets in

There is no grand policy. I started with Cloudflare tunnels, and many services sit behind Cloudflare Access authentication. Tailscale is what we use at work, and I did not want to juggle clients and accounts — so Tailscale on the homelab exists for exactly one purpose: so Milo can SSH in. Special treatment for a special agent.

## The sub-dollar budget

I am not sure this is typical of the self-hosting crowd, but we like open source and free stuff. The only thing I have paid for in this whole setup is the domain: a 7-digit numeric .xyz, less than a dollar a year, because that was my old QQ ID and it qualified for the cheapest tier.

That is also why there is a home-grown note sync service instead of Obsidian Sync. I love Obsidian and would happily support the developer — I just think he is doing very well without my money.

## The box itself

It sits in the home office next to the printer, on its own UPS(built-in battery), silent, with no constraints to speak of — unlike the Parabricks box, which has a noise curfew. How long a 16-year-old laptop keeps this up is an open question. For now it just hums along.