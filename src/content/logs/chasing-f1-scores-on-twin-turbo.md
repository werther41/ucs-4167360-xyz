---
title: Chasing F1 scores on a twin-turbo server
date: 2025-07-15
summary: We got our Nvidia Parabricks server and immediately went down the secondary analysis pipeline-tuning rabbit hole.
tags:
  - genomics
  - hardware
  - pipeline
project: oncology-interpretation
kind: log
draft: false
---

We got a dedicated Parabricks server from Nvidia. 

It is nicknamed *twin turbo* because of the two massive enterprise GPUs humminig inside. We wanted to see if we could use it for both local LLM inference (switching v1 from API calls to a local 12B model running via vLLM and NeMo) and raw secondary analysis.

The first thing you notice when you start a job on this server is the noise. It is incredibly loud—loud enough that we only run heavy analysis pipelines at night when the office is empty.

## The pipeline rabbit hole

I spent the last month going deep into secondary analysis, trying to build a reliable bio-pipeline from scratch. My goal was simple: take raw FASTQ sequencing files and output high-confidence variant calls (VCF).

It turns out "calling variants" is not a single command. It is a highly sensitive chain of tools, and every parameter tweak alters your precision and recall. I spent weeks chasing a better F1 score.

The flow I settled on:
1. **Alignment:** Aligning raw reads to the reference genome using Parabricks' highly optimized `FQ2BAM` (which runs in minutes instead of the hours standard BWA takes on standard CPUs).
2. **Variant Calling:** Calling somatic mutations with `Mutect2` and applying standard GATK filters, and comparing it against Nvidia’s deep-learning caller, `DeepSomatic`.
3. **Benchmarking:** Running truth sets to evaluate which combinations yielded the fewest false positives without missing critical clinical targets.

## Automating the run with Agent Skills

Since these runs take a while (and you don't want to manually baby-sit bash scripts at 2 AM), we started playing with the agent wave. We deployed Hermes directly on the server.

I wrote a set of custom agent skills to monitor the jobs. Instead of polling terminal windows, the agent is granted access to:
* Trigger `FQ2BAM` or `DeepSomatic` runs.
* Read the intermediate logs to check resource allocation.
* Parse the final accuracy metrics once the pipeline outputs the VCF.

The outcomes looked incredibly promising. For the first time, we had a bridge between a language model and a high-performance compute pipeline. But as cool as it is to have an AI coordinate a multi-hour bash pipeline, it is also a reminder that some tasks are better off as hardcoded, deterministic orchestrations.
