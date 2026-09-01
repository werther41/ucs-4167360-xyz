---
title: Evidence tiers are a UI problem
date: 2025-11-19
summary: Four tiers, one column, and a year of arguing about whether a colour counts as a claim.
tags:
  - genomics
  - notes
project: oncology-interpretation
kind: workshop
---

Clinical evidence for a variant comes in tiers. The tiers are well defined, widely agreed on, and the source of more design argument than anything else in the product.

## Why it is hard

The tier is a summary of a judgement, and the moment you render it as a badge it starts to look like a fact. A tier two variant is not "less true" than a tier one variant. It is supported by a different kind of study. Those are not points on the same scale, but a coloured chip in a sorted column says they are.

We tried a few things. A numeric column read as a ranking. Icons read as a ranking with extra steps. Sorting by tier by default meant nobody ever saw tier three, which was fine right up until the case where tier three was the answer.

## Where it landed

The tier is spelled out in words, in the row, next to a short phrase describing what kind of evidence it rests on. It takes more horizontal space than a chip and it is much harder to misread at a glance, which is the entire point.

Colour still carries the tier, because scanning matters, but colour never carries it alone.

## The general version

Any time you compress a judgement into a token, you are making a claim about how comparable those judgements are. Usually that claim is not one you would make out loud.
