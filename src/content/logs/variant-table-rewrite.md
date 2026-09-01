---
title: Oncology report reader — variant table rewrite
date: 2026-08-11
summary: The third rewrite of a table, and the first one that started from what people actually do with it.
tags:
  - genomics
  - react
project: oncology-interpretation
kind: workshop
---

The variant table is the product. Everything else in the report reader is scaffolding around a list of rows that somebody has to make a decision from, and I have now rewritten that list three times.

## What was wrong

The previous version was correct and unusable. It showed every variant the pipeline called, sorted by genomic position, with every annotation column available behind a toggle. Technically complete. In practice, everyone did the same thing: sort by tier, hide two thirds of the columns, and then scroll.

That is a strong signal and I ignored it for about a year, because the request I kept getting was "can we add a filter for X" and adding a filter is easier than admitting the default is wrong.

## What it does now

The default view is the short list — tier one and tier two, the columns people actually read, sorted by clinical significance rather than by where the variant happens to sit on a chromosome. Everything else is one click away and stays open once you open it.

The interesting constraint is that nothing can be hidden silently. If the default view is suppressing forty rows, it says so, with a count, in a place you cannot miss. A filtered table that does not announce its filter is how people miss things.

## The part I got wrong again

I made the row expansion animated. It felt nice in isolation and it was actively bad in a room where somebody is talking through a case, because the content you are pointing at arrives a beat after your finger does.

Took it out. The table now snaps.
