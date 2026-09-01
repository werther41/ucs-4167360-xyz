---
title: 'Reading a HUD: what the symbology actually means'
date: 2023-02-27
summary: The velocity vector, the pitch ladder, and why the little circle is the only thing that matters.
tags:
  - flight-sim
  - notes
kind: log
---

A head-up display looks like clutter until somebody explains the order to read it in, at which point it becomes one of the tidiest interfaces ever designed. Here is the order.

## The velocity vector

The small circle with three stubs is where the aircraft is actually going. Not where it is pointing — where it is going. Put it on the runway threshold and you will arrive at the runway threshold, regardless of the attitude the nose happens to be in.

This one symbol does most of the work, and it is a good example of showing the answer rather than the inputs. The alternative is displaying pitch, angle of attack, and drift and letting the pilot do the arithmetic. Nobody wants that job at two hundred feet.

## The pitch ladder

Horizontal lines above and below the horizon, marked in degrees, with the below-horizon ones dashed. The dashes are the important detail: you can tell whether you are climbing or descending from the line style alone, without reading the number.

That is redundancy done properly. The same fact encoded twice, in two channels, so a glance is enough and a careful look confirms it.

## The rest

Airspeed on the left, altitude on the right, heading across the top. Fixed positions, always. The layout does not adapt, does not reflow, and does not helpfully hide things it thinks you do not need.

## Why I keep coming back to it

Because it is an interface that respects a reader who is busy. It assumes you have thirty milliseconds, it puts the answer where you are already looking, and it never makes you hunt.

Almost everything I build is read by somebody who is busy. Very little of it is that considerate.
