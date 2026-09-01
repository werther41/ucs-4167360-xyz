---
title: Rebuilding the squadron page as static files
date: 2025-09-14
summary: Rescuing a 2006 frameset from a Wayback snapshot, without pretending it was ever good.
tags:
  - flight-sim
  - archive
kind: workshop
---

The first site I ever made went offline in 2008 with no backup. All that is left is a handful of Wayback Machine snapshots, one of which includes the front page with its banner intact.

I spent a weekend turning those snapshots into files that render in a modern browser.

## Rules I set myself

Do not improve it. The temptation to fix the alignment, the contrast, the spelling in the news items, was constant and completely wrong. The interesting thing about the artefact is that it is bad in the specific ways sites were bad in 2006.

So the frameset stays. The `<font>` tags stay. The banner is still an animated GIF and still slightly too wide.

## What had to change

The hit counter and the guestbook were server-side and both are gone. I replaced them with static images of their last known state, which felt like the honest move: the page shows what it showed, and nothing pretends to still be counting.

A few images were only in the snapshot at thumbnail size. Those are left small rather than upscaled.

## Was it worth it

For about four hours, no. Then I got the front page rendering and read my own news post from March 2006 about a squadron night that got cancelled for snow, and yes.
