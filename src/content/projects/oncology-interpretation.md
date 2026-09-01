---
name: Oncology Interpretation
blurb: Turns a variant call file into something a tumour board can actually read.
status: live
started: '2024.03'
stack:
  - React
  - Rust
  - DuckDB
source: https://github.com/handle/oncology-interpretation
demo: https://onco.4167360.xyz
tags:
  - genomics
  - react
featured: true
order: 1
---

A reading surface for tumour sequencing results. It takes a variant call file, matches it against curated evidence, and lays the whole thing out so a clinician can get to the two or three variants that change a decision.

Most of the work is not the matching. It is the table — sorting, filtering, and knowing what to hide by default.
