---
title: "What pretraining a 13M parameter model taught me about attention"
date: "2026-08-10"
readTime: "8 min"
tag: "ML systems"
excerpt: "Lessons from building nanoGPT from scratch on a GTX 1650."
---

Most explanations of attention start with the matrix math. Mine started with a GTX 1650 that couldn't fit a batch size larger than 8, which forced me to actually understand what I was computing rather than just calling a library function.

## Starting with the tokenizer, not the model

Building a custom byte-level BPE tokenizer before writing a single line of the transformer turned out to be the right call. It forced me to confront vocabulary size, merge rules, and encoding edge cases before they became invisible bugs three layers deep in a forward pass.

## What changed when I could see every shape

Once I started tracing tensor shapes through every operation by hand, attention stopped feeling like a black box. Query, key, and value projections are just linear layers. The "magic" is entirely in how the softmax redistributes weight across the sequence dimension.

## Constraints as a teacher

Training on a single consumer GPU with gradient accumulation and AMP wasn't a limitation I fought against. It was the reason I understood memory layout, mixed precision, and batching well enough to reason about them instead of just tuning until numbers looked right.

More on the fine-tuning stage of this project soon.
