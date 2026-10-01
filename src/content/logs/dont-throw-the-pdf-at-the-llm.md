---
title: Don't throw the PDF at the LLM
date: 2026-09-30
summary: A hallucinated variant report led to a CIViCdb-grounded RAG app, a Parabricks server running multi-hour pipelines, and agent skills. Where it goes next.
tags:
  - genomics
  - ai
project: oncology-interpretation
kind: log
draft: false
---

Some context first, because it explains every wrong turn below. I'm a software engineer doing system integration. The company I work for builds turnkey NGS solutions for pathogen detection: sample intake, library prep on a liquid handler, sequencing, data upload to the cloud, and a bio-pipeline that calls out pathogens at the species level. During COVID that meant food manufacturers and public health labs tracking SARS-CoV-2 variants. Recently we've pivoted into oncology — same idea, but automating the library prep side, working with a partner company that owns the assay and the bio-pipeline, and generating basic reports on mutations. My job is connecting the pieces so the whole thing runs hands-free, sample to insights.

I am not a bioinformatician. I am not a clinician. Keep that in mind.

## The PDF

Back in 2024, LLMs were the new hotness and RAG was still a new word. The obvious question for our oncology work: what can AI do for this product? A more digestible report seemed like the answer, plus a way to ask follow-up questions.

So, like everyone else, I threw the PDF report at the LLM.

It hallucinated. Quite a lot.

## Ground it

The next logical thought: if the problem is grounding, add retrieval. I went looking at oncology knowledge bases and picked CIViCdb, mostly because it doesn't need a license for proof-of-concept work. I briefly considered downloading their TSV release, but live queries were simpler and always current — so why not just query it directly?

GraphQL made that almost suspiciously easy. One query returned everything in a hierarchical structure ([here it is](https://github.com/werther41/onco-query-assistant/blob/main/src/lib/civic/queries.ts)). I converted the JSON to Markdown, generated reference links programmatically so every claim pointed back at the CIViCdb website, and let the LLM write the report on top of that. There was a chat window on the side for follow-up questions. The whole thing is at [onco-query-assistant](https://github.com/werther41/onco-query-assistant).

v1 came together in early 2025, and the generated reports looked good.

## The part where I learned what I didn't know

Here's the honest version: all of v1 was built on my clueless imagination of how oncologists work. It wasn't until later — learning how secondary analysis and tertiary analysis actually work, what the expectations are, what a report is actually *for* — that I understood what I'd built. It was a cool demo. Mostly it was a learning experience.

## A very loud server

Mid-2025, we got a Parabricks server from Nvidia. The plan wasn't just genomics — the idea was to run local AI models on it too. So v1 moved onto that box and switched to a local 12B model served through vLLM.

Then the agent wave hit: OpenClaw, Hermes, agent skills — [ToolUniverse](https://aiscientist.tools/) in particular got my attention. We deployed Hermes on the server, wrote agent skills, and I built skills for driving the hours-long FQ2BAM and DeepSomatic runs, plus the oncology interpretation skills. The outcomes looked good.

That turned into a proof-of-concept app: case management for samples, patients, and reports; report composing with clinician review and sign-off; run management for the Parabricks secondary analysis. It lives on that server — nicknamed twin turbo, for the two GPUs — exposed through Cloudflare, behind a login. There is no reason to let strangers spin up several hours of GPU pipeline. It is also, by the way, really loud: loud enough that it only runs at night.

Somewhere in there I also went down the pipeline-tuning hole: alignment with FQ2BAM, variant calling with mutect2 plus filtering, DeepSomatic, trying combinations to chase a better F1 score.

## What's next

The notes for the next iteration:

- New app, new tech stack.
- Dump Hermes — it's just too heavy. I want a pure agent framework. (Plenty of agent tooling is already built on the [Pi coding agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent): OpenClaw, K-dense BYOK.)
- User management with real personas: lab admin vs. clinician.
- Secondary analysis as a deterministic bio-pipeline on Parabricks: FQ2BAM → DeepSomatic → OpenCRAVAT → [PCGR](https://sigven.github.io/pcgr/).
- Tertiary analysis as an agent workflow, taking PCGR output as its input.

That's the shape of it: deterministic where it must be, agentic where it helps. v1 taught me what the report is for. The next one gets built knowing.
