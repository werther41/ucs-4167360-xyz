---
title: The demo is the product
date: 2026-11-07
summary: Two advisors, one skipped slide deck, and three lessons about where the value in clinical AI software actually sits.
tags:
  - genomics
  - ai
  - notes
project: oncology-interpretation
kind: workshop
draft: false
---

“How is this different from just using ChatGPT?”

That was the pathologist, about ten minutes into our advisor demo, and he was not being rude. He was being tired. It is the correct question to ask any AI product in 2026, and our slide deck had no good answer to it, because a slide deck is exactly the thing a chatbot can imitate: claims, diagrams, adjectives.

My manager skipped the rest of the deck and had me run the actual app. By the end of the meeting, the same man was comparing it to commercial products he knew. Nothing about the product changed in between. The *evidence* changed. Slides get compared to a chatbot. Working software gets compared to products.

That is the first lesson, and I keep relearning it: the demo is not a presentation of the product. The demo is the product, the first time anyone meets it.

## What I did wrong in the demo

His feedback was good, and half of it was my fault. The report needs more polish — true. And the app seems too complicated — also true, but that one I manufactured.

I was trying to prove the app is legitimate. So I showed everything: the bioinformatics side, a full pipeline run, the evidence bundle, every artifact the system produces, and then the pathologist’s side on top of it. Two personas, the whole machine room, in one sitting. Of course it looked complicated. I had presented the factory tour as if it were the product.

Legitimacy is not a feature tour. The machinery should be there when someone asks — one drill-down away — not spread across the table before anyone has seen the thing do its one job.

## How a report is actually read

The second lesson explains the first critique. In the workflow our advisors described, the pathologist signs the report, and then it goes to the oncologist — who scans the first page in a reversed L and mostly stops there. Everything after page one is, in their words, largely there because it is legally required.

I had heard versions of this before and not paid attention. It shows in our default report template, which leads with test methodology. That is a builder’s instinct: prove the assay is real before you say anything else. But a signed report does not need to open with its credentials. The signature is the credential. Page one belongs to the person scanning it: what was found, what it means, what to do. The methodology is the legal tail, and it should live in the tail.

Our reporting tools do let each lab compose reports their own way — their prompt, their template, their agent skills, all working from the same evidence bundle the pipeline produces. But “customizable” is not an excuse for a careless default. Most people meet the default first, and the default is the product’s judgment, printed. Polishing it is now on the list — the list is still first-round ideas, not decisions, and I want to be careful about which is which.

## The hardware tail

The third lesson came from our own benchmark, not from the advisors. We priced a desktop-form-factor version of our GPU analysis box: roughly $40–50k with the workstation variant of the same GPU, capped at 300W instead of the server card’s 600W.

The 300W card is about 20% slower. That sounds like a compromise until you price the tail. The server version costs about twice as much, wants a dedicated 240V outlet, an electrician, and a permit — and it is loud enough that our current one only runs at night. Doubling the power buys the last stretch of a benchmark curve and a small construction project. In a lab, the trade is not close: take the 80%, skip the construction project.

## Where this leaves the product

One decision did come out of all this: we will build the lightweight version. Local AI and the interpretation/reporting layer, no secondary analysis on the box. The wet-lab advisor endorsed it without being sold — his version was that the tertiary side is where the money is anyway. Secondary analysis may belong to the assay; we may still pair our own assay with its pipeline someday, but it matters less than it did a month ago.

A previous note here argued the classifier is not the product. This round adds the corollary list: not the deck, not the methodology page, not the last 15% of a GPU curve. The product is the working thing, shaped like the way its readers actually read, running on a box a lab can actually install.
