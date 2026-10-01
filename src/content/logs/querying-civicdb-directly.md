---
title: Querying CIViCdb directly with GraphQL
date: 2025-02-12
summary: Why we chose real-time GraphQL hierarchy queries over stale TSV downloads for onco-query-assistant.
tags:
  - genomics
  - graphql
project: oncology-interpretation
kind: workshop
draft: false
---

If you are trying to build any kind of clinical assistant with an LLM, the first thing you learn is that standard PDF parsing is a recipe for hallucinations. A language model looking at a flat medical PDF will hallucinate variant annotations with complete, terrifying confidence.

Grounding is the only path. For the initial proof of concept of `onco-query-assistant`, I chose CIViCdb (Clinical Interpretation of Variants in Cancer) because its database is open, curated, and license-free for research.

## The flat file temptation

Most bioinformatics workflows start with a download: you pull a massive TSV or JSON data release from an FTP server, parse it into a local database, and query it.

I almost did that. But data releases are static. They are stale the moment they finish downloading, and managing a database schema locally for a quick proof of concept is a chore. I wanted something that queried the live, curated truths directly.

## One query to rule them all

It turns out CIViCdb exposes a beautiful GraphQL endpoint. If you've ever dealt with REST APIs in bioinformatics where you have to make five sequential round-trips to resolve a variant, its genes, its evidence items, and the primary sources, GraphQL feels like magic.

I wrote a [single nested query](https://github.com/werther41/onco-query-assistant/blob/main/src/lib/civic/queries.ts) that fetches:
* The gene and its molecular profile.
* The specific variant and its therapeutic context.
* The clinical significance tier (A through D).
* The underlying evidence items, including PubMed IDs and direct publication details.

Because GraphQL lets you shape the response, the nested JSON comes back exactly matching the hierarchical medical relationship.

## Grounding the output

Instead of letting the LLM read the JSON directly (which wastes tokens and confuses the attention mechanism with raw syntax), I wrote a quick translator. 

It parses the GraphQL JSON, formats it into clean, structured Markdown, and programmatically appends direct URL reference links to every evidence item backlinking to the CIViCdb web portal.

```json
{
  "evidenceItem": {
    "id": "EID123",
    "clinicalSignificance": "SENSITIVE",
    "source": { "citationId": "12345678" }
  }
}
```
Becomes:
* **EID123 (Sensitive)**: Supported by [PubMed 12345678](https://civicdb.org/links/evidence_items/EID123).

When you feed this Markdown to the LLM, you are not asking it to remember oncology. You are asking it to act as a structured synthesizer. It generates a readable clinical summary, but every single claim is anchored by a real reference link. It feels simple, but it's the difference between a toy that lies and a demo that teaches.
