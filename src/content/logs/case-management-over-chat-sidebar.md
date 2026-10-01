---
title: Case management is more than a chat sidebar
date: 2026-03-03
summary: Realizing clinicians don't need conversational chatbot companions—they need a deterministic, persona-focused workspace.
tags:
  - genomics
  - ux
  - web
project: oncology-interpretation
kind: log
draft: false
---

I used to think that the ultimate AI application in genomics was a smart chat window parked next to a PDF. It is what most developers build first, because it is easy and it makes for a fantastic demo.

But after watching how secondary and tertiary analysis actually happen in a clinic, I realized a conversational companion is almost useless. 

A clinician does not want to ask a chatbot "What mutations are in this sample?" They want to see a structured variant table, evaluate peer-reviewed evidence tiers, write their interpretation, and sign their name to a diagnostic report that will decide a patient's chemotherapy course.

So, I built a Case Management system.

## The Case Management PoC

I wanted to move the entire workflow out of terminal scripts and chat windows and into a single, cohesive web application. It is deployed on our local *twin turbo* server and exposed securely behind a login page via Cloudflare (`workspace-node-1.clearcloud.ai`).

The app covers three core pillars of the oncology pipeline:

### 1. Sample & Patient Management
A database tracking patients, clinical histories, and sample statuses. A sample comes in, gets registered, and is assigned an analysis slot.

### 2. Parabricks Run Management
Instead of SSHing into the server to kick off bash scripts, the web interface communicates with the backend to trigger the secondary analysis pipeline (`FQ2BAM` and `DeepSomatic`). It streams execution logs, calculates GPU resource usage, and notifies the team when a somatic variant file (VCF) is ready.

### 3. Clinician Report Workspace
This is where the agent actually belongs. The system takes the annotated variant list and assists the clinician in writing report summaries, categorizing variants by clinical significance, and composing recommendations. 

Crucially, the UI enforces a multi-step review workflow:
* **Compose:** The draft interpretation is assembled.
* **Review:** A peer clinician reviews the proposed therapy links.
* **Sign:** The final report is digitally signed, generated as an un-editable clinical document, and locked.

## Why we gate the demo

I have kept this proof-of-concept gated behind a strict authentication wall. While it is incredibly rewarding to see the pipeline running live on Cloudflare, letting strangers trigger raw genomic alignments on our GPUs is a quick way to melt the office electricity bill and lock up our development environment for several hours. 

The biggest takeaway from this build: UX is not about conversation. It is about flow, safety, and deterministic control. The agent is there to suggest words, not to run the system.
