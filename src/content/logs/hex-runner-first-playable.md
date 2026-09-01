---
title: Hex Runner — first playable build
date: 2026-07-02
summary: The grid maths has worked for months. This is the first build where the grid is doing something.
tags:
  - games
  - canvas
project: hex-runner
kind: workshop
---

There is a version you can actually play now, which puts it about eighteen months behind the schedule I invented for it and roughly on time by every honest measure.

## What is in it

Twelve levels, a step counter, and tiles that rotate one face per move. You get from the entry hex to the exit hex before you run out of steps. That is the entire game.

The rotation is the only mechanic and it took me a long time to accept that. I had a list of additions — hazards, keys, a second mover, a timer — and every one of them made the puzzles easier to design and worse to solve. A single rule you fully understand generates better problems than four rules you are still learning.

## What I learned about hex grids

Axial coordinates, immediately, and never look back. The cube coordinate system is the one everybody recommends and it is genuinely worth the twenty minutes: neighbours become vector addition, distance becomes a one-liner, and rotation becomes a permutation of three numbers rather than a table of special cases.

I had written all of this myself first, with a two-dimensional array and a parity check for odd rows, and it worked and I hated every function that touched it.

## What is missing

Sound, a level editor, and any reason to play a level twice. The first two I will get to. The third is the actual problem and no amount of building will solve it, because it is a design question I have been avoiding by writing more code.
