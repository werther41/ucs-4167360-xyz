---
title: Why cockpit displays are good interface design
date: 2024-12-03
summary: Constraints that most software does not have, producing decisions most software should copy anyway.
tags:
  - notes
  - flight-sim
kind: log
---

A multifunction display in a fast jet is a small screen showing a lot of information to somebody who has a fraction of a second to look at it and cannot afford to be wrong. That set of constraints produces a design language worth stealing.

## Everything is labelled

There is no decoration and there is no unlabelled state. If a number is on the screen, there is a caption next to it saying what the number is, in the same shorthand every time. You never have to remember what the top-right figure means.

Most interfaces I use daily fail this. They have a bare number in a corner that meant something to the person who put it there.

## Position is meaning

Symbols do not move around. A thing lives in one place, and when it is not applicable the place is empty rather than filled with something else. That sounds wasteful until you realise it lets you check a value without reading — you look at where it lives and the shape is either right or wrong.

Layouts that reflow to fill gaps destroy this property completely, and reflow is the default behaviour of nearly every layout system we have.

## Colour is a category, never a decoration

Green, amber, red mean specific things and nothing else is coloured at all. Because colour is scarce, it works. The moment you have eight accent colours, none of them mean anything and you have to read the label — which is fine, except colour was supposed to be the thing that saved you from reading.

## The part that does not transfer

Cockpit displays are designed for a trained operator. They are dense, abbreviated, and genuinely hard to use if nobody has taught you. Most software cannot assume that, and the failure mode of copying this style uncritically is a beautiful interface that nobody can read.

The transferable part is not the density. It is the discipline: label everything, keep positions fixed, and spend colour like it costs money.
