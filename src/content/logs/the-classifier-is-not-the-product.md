---
title: The classifier is not the product
date: 2026-10-30
summary: A rule-constrained LLM paper from a clinical lab, and what it quietly proves about where the value in variant interpretation software actually sits.
tags:
  - genomics
  - ai
  - notes
project: oncology-interpretation
kind: workshop
draft: false
---

A colleague shared a paper with me this week: *Clinical-Grade Somatic Variant Interpretation Performance via a Rule-Constrained Large Language Model Framework*, from the molecular pathology group at the University of Chicago, in the Journal of Molecular Diagnostics. Their system is called OLIVE. It interprets somatic variants for a clinical oncology panel, and it reached 97.5% concordance with the lab's own historical classifications across 200 consecutive cases and 1,437 variant observations.

The number is not the interesting part. The architecture is.

## Lab rules in, tiers out

The biggest highlight, for me: OLIVE classifies by **pathogenicity**, using the lab's own rules. The LLM is a tier classifier working inside that rulebook — it sorts variants into pathogenic, likely pathogenic, or uncertain, and it is not allowed to wander outside the gene-specific guidance files the lab's experts wrote. It does not use the AMP/ASCO/CAP tier system at all.

That choice is doing more work than the model is. AMP tiers classify by actionability in a tumor context, which mixes three moving targets at once: the biology, the current therapy landscape, and the evidence grading. Segal's own multi-institution group measured how well humans apply those guidelines and got a Cohen's kappa of 0.35 — fair agreement, barely. Pathogenicity is the narrower question: is this variant oncogenic, per our rules? Experts genuinely agree on that most of the time, so it can be codified. Once the target is stable, the model's job shrinks to bounded sorting, which is how you get 99.2% of variants classified identically across three independent runs.

They even ran the control experiment on themselves: feed the same prompts to a different frontier model (Gemini instead of GPT-5) and concordance barely moves. The disagreements land in the same small set of variants that were already discordant against the lab. The performance lives in the guidance files, not in the model.

## How would you know if it is right?

This is the trap in the whole field: there is no ground truth for a variant call. There is only expert consensus, and the experts disagree, so every accuracy number is really a concordance number against some reference that is itself a committee.

OLIVE's 97.5% is partly circular — the lab's rules, graded against the lab's historical calls. The honest part of the paper is what they did with the 42 discordant variants: blinded re-adjudication by five experts, who split 21 to 21 between the lab and the machine. On the hard variants, everybody is close to coin-flipping, and most of the headline concordance comes from the easy majority — canonical hotspots and obvious truncations that no system gets wrong. If you want to compare two interpretation systems, the only subset worth arguing about is the few percent in the gray zone, and you need a test set deliberately built from those, not ten thousand routine cases.

Evidence also moves underneath you. Some of OLIVE's discordances were not errors; the historical call was made with older knowledge, and the system queried today's databases. A frozen benchmark grades a current system against stale truth. This is one reason I like that their rules live in version-controlled files: you can diff a rulebook. You cannot diff a model's weights, or a curator's memory.

## The same shape, at work

I will confess the paper made me grin, because the system we are building has almost exactly this shape, arrived at independently. Default SOP out of the box. The lab can write its own rules for pathogenicity, or opt for the tiers if that is their religion. Protocols are version-controlled, covering secondary and tertiary analysis. Evaluation and performance comparison between protocol versions are built in, and the test dataset is bring-your-own — a setup tab where the lab loads the cases *they* trust, because under CLIA the validation is their obligation anyway, on their assay and their case mix.

Only the lab admin can promote a new protocol version. That gate matters more than it looks. The failure mode of approval systems is the decorative human: a person clicking "approve" on the fortieth item at midnight is approving the story ("it has been fine all session"), not the action. I know this because I do it myself with coding agents — auto mode, or keep clicking approve. There is a story going around that a dedicated approval agent with no context outperformed humans at approving agent commands, and I believe it: it cannot hear the story, so it judges the command on its face. Blinded adjudication in the OLIVE paper is the same trick in human form. So the design principle is: approve at the altitude where the human is real. One version diff with evaluation numbers attached is a real decision. A thousand per-variant clicks are decoration.

## The learning loop

The piece I keep coming back to is how a system like this improves. As clinicians review and sign each report, there is an editing feature for overwrites. We capture those overrides — but an override only becomes useful if it carries its reasoning: evidence missing, rule wrong, rule absent, new literature. A labelled override is a draft rule change. An unlabelled one is an anecdote.

Beside the report review there is an agentic chat view. The agent's job is to look up new evidence and *suggest* overwrites; if the clinician approves, the reasoning label comes along, pre-filled from the agent's own evidence work. The approval click is the labelling, so it costs the clinician nothing extra. And nothing the agent or the clinicians do changes production directly — every rule change still goes through evaluation and the version-promotion gate. The loop turns, but it turns through the same door as everything else.

## So who wins?

The deterministic guideline tools (CancerVar, QCI Interpret) got reproducibility without any LLM. The LLM-first tools got flexibility without reproducibility — an unconstrained benchmark from 2025 had the best model at 0.73 accuracy on actionability classification, with a consistent bias toward over-calling. OLIVE is the first published hybrid I have seen running in a real clinical workflow, and its own swap test says the model is the replaceable part.

My conclusion, after a long Friday-night argument with myself about this paper: the classifier is a commodity. The product is the rulebook, the evaluation harness, and the approval gate — and the discipline to keep all three versioned, labelled, and human-owned. The model is just the newest hire. You still need good management.
