---
title: A tide clock nobody asked for
date: 2026-08-24
summary: Sum-of-sines maths, a Cloudflare Worker holding two numbers, and a dial I check once a week.
tags:
  - astro
  - tide-clock
  - cloudflare
project: tide-clock
kind: log
---

I live nowhere near the ocean, which makes this the least useful thing I have built in a while. It started because I wanted to see whether a Cloudflare Worker could hold a tiny bit of state without me paying for anything, and it ended with a dial that turns very slowly on a page I check maybe once a week.

## Why a tide clock

The honest answer is that I needed a problem small enough to finish. Every side project I had started that year was really three projects wearing a coat, and I wanted something I could describe in one sentence and then actually ship.

A tide clock qualifies. There is one number, it changes on a known schedule, and the whole interface is a hand going around a circle. If I could not finish that, the problem was me and not the scope.

## Sum of sines

The maths is public domain and mostly a sum of sines. Every tide station has a set of harmonic constituents — amplitudes and phases for the moon, the sun, and a long tail of smaller effects with names like M2 and S2 and K1. You add the waves together and you get a height at a moment in time.

The important part is that the constituents are constant. They are measured once, published, and then good for years. So the clock does not need a live feed at all. It needs a table of numbers baked in at build time and a function that evaluates them for `Date.now()`.

That realisation removed most of the project. No fetch, no cache, no API key, no rate limit. The Worker holds two numbers — the station and the last time I checked it was still sane — and the rest is arithmetic in the browser.

## Time zones, again

The hard part, as always, was the part I did not plan for: time zones, and the fact that tide stations report in local standard time whether or not the country observes daylight saving.

This is one of those problems that looks like an off-by-one and is actually a modelling error. I had been treating "the station's time" as a display concern, something to fix at the last step before rendering. It is not. It is part of the input. The phases are anchored to a specific reference meridian, and if you evaluate them against the wrong clock you get an answer that is confidently wrong by an hour for half the year.

> Every project I finish quickly turns out to be a project I misunderstood.

I fixed it by refusing to have a local time at all. Everything internally is UTC, the constituents carry their own offset, and the only conversion happens when a string is written to the page.

## What I would change

I would not add features. The temptation was to put in a chart, then a week view, then a second station, and each of those would have been a reasonable afternoon that made the thing worse.

The one change I would make is to the failure mode. Right now, if the constituents for a station are wrong, the dial still turns — smoothly, confidently, and incorrectly. A clock that is quietly wrong is worse than one that has stopped. It should refuse to draw a hand it cannot justify.

If you want the source it is on the workshop page, along with a note about the one station whose data I still cannot parse.
