---
name: Oncology Interpretation
blurb: From CIViCdb RAG queries to Nvidia Parabricks secondary analysis and
  clinician sign-off workflows.
status: live
started: "2025.01"
stack:
  - Nvidia Parabricks
  - React
  - Node.js
  - GraphQL
  - Cloudflare
source: https://github.com/werther41/onco-query-assistant
demo: https://workspace-node-1.clearcloud.ai/
tags:
  - genomics
  - react
  - agents
featured: true
order: 1
---
What started as a simple RAG experiment to ground hallucinating language models using CIViCdb's GraphQL API has evolved into a comprehensive Case Management system. 

It connects patient files, raw NGS data run management, and multi-hour secondary analysis workflows (FQ2BAM, DeepSomatic) with a clinician-focused reporting workspace where variant interpretations are composed, peer-reviewed, and digitally signed.

The entire stack is deployed on a dedicated local dual-GPU Nvidia Parabricks server ("twin turbo") and served securely via Cloudflare.