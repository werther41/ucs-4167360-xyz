---
title: Parsing VCF without losing your mind
date: 2025-06-02
summary: The spec is short, the files are not, and every field you trust is optional somewhere.
tags:
  - genomics
kind: workshop
project: oncology-interpretation
---

VCF is a tab-separated format with a header, eight fixed columns, and two columns whose contents are described by the header rather than by the spec. It is a reasonable design and it will still ruin your week.

## The part that gets everybody

The `INFO` column is a semicolon-separated bag of key-value pairs, and which keys are present depends entirely on which tools produced the file. Two files from the same lab six months apart can differ. A file from a collaborator will definitely differ.

So there is no such thing as parsing a VCF. There is parsing a VCF from a known pipeline, and there is a validation step that tells you honestly which of the fields you need are missing.

I got this wrong by writing a parser that filled in defaults for absent fields. It never threw, it always produced rows, and it was quietly wrong for one collaborator for about two months.

## What works

Parse into an intermediate that keeps every field as it was found, including the ones you do not understand. Validate as a separate pass, against a declared list of what this particular analysis requires. Fail loudly and specifically — name the field, name the record, name the line.

## Performance, briefly

The files are big and mostly irrelevant to any given question. Streaming the file and discarding rows as early as possible beat every clever thing I tried afterwards, including the afternoon I spent on parallel chunk parsing that turned out to be slower than the naive version.
