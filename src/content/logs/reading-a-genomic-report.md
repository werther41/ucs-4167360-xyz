---
title: Reading a genomic report the way a clinician does
date: 2026-04-06
summary: Notes from watching people use the thing I build, which is humbling every single time.
tags:
  - genomics
  - notes
project: oncology-interpretation
kind: log
---

I sat in on four tumour boards this quarter, which is the most useful thing I did all quarter and also the least comfortable.

## The first thirty seconds

Nobody reads a report. They scan it for the thing that changes the plan, and if they do not find it in about thirty seconds they go back to the summary and start again in a worse mood.

I had designed for the second reading — the careful one, where you work down the list and weigh each variant. That reading does happen, but it happens after the fast one has already formed an opinion, and by then the layout has done most of its work.

## Vocabulary is interface

Half the confusion I watched was not about the data. It was about a word. The report said "actionable", the guideline the room was working from used "actionable" to mean something narrower, and for a couple of minutes two people disagreed with each other while meaning the same thing.

You cannot fix that with a tooltip. You fix it by not using the contested word at all, or by putting the definition inline where nobody has to go looking.

## What I changed

The summary now leads with the variants that have an associated therapy, named, in the same words the guideline uses. Everything else moved down. The full list is still one click away and still complete, because a report that hides things is not a report.

None of that is a technical change. All of it came from watching somebody squint.
