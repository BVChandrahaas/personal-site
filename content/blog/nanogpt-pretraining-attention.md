---
title: "Pre-training a 13M GPT on a GTX 1650"
date: "2026-08-10"
readTime: "7 min"
tag: "ML systems"
excerpt: "An experiment log: building a tokenizer, model, and training loop from scratch, and running it on 4GB of VRAM."
---

Most explanations of attention start with the matrix math. Mine started with a GTX 1650 Ti that couldn't fit a micro-batch larger than 12, which forced me to actually understand what I was computing rather than just calling a library function.

This is a record of that run: what I built, how it was sized to fit, and what I noticed along the way. The code is at [nano-slm](https://github.com/BVChandrahaas/nano-slm).

## The setup

- **Hardware:** GTX 1650 Ti (4GB VRAM), 16GB system RAM, Windows
- **Data:** TinyStories, short children's stories written in simple English
- **Model:** a decoder-only transformer, written from scratch in PyTorch

| | |
|---|---|
| Vocabulary | 8,000 (custom BPE) |
| Context length | 256 tokens |
| Layers / heads | 6 / 6 |
| Embedding size | 384 (64 per head) |
| Parameters | 13.82M |

Every hyperparameter lives in one `config.py`, so the whole run can be reproduced from a single file.

## Starting with the tokenizer, not the model

Building a custom byte-level BPE tokenizer before writing a single line of the transformer turned out to be the right call. It forced me to confront vocabulary size, merge rules, and encoding edge cases before they became invisible bugs three layers deep in a forward pass.

Byte-level means there is no such thing as an unknown token: anything that can't be merged falls back to raw bytes. I trained it to 8,000 tokens with a single special token, `<|endoftext|>`, used to separate documents. A small vocabulary suits TinyStories, which barely uses rare words, and it keeps the embedding table, which is one of the largest pieces of a small model, under control.

The whole corpus is then tokenized once and written to disk as a flat stream of `uint16` IDs, split 90/10 into train and validation. During training, batches are just random 256-token windows sliced out of that stream.

## Where the 13.8M parameters go

My first estimate in the config file was about 11M parameters. The model printed 13.82M on startup. The gap is almost exactly the embedding table:

| Component | Parameters |
|---|---|
| Token embedding (shared with the output layer) | 3.07M |
| Position embedding | 0.10M |
| 6 transformer blocks | 10.65M |
| Final layer norm | <0.01M |

Inside each block, the MLP (384 → 1536 → 384) takes about two-thirds of the parameters and attention takes the remaining third. The input embedding and the output projection share one weight matrix (weight tying). Without that, the output layer would add another 3.07M, and nearly a fifth of the model would be spent mapping to and from the vocabulary.

## What changed when I could see every shape

Once I started tracing tensor shapes through every operation by hand, attention stopped feeling like a black box. Query, key, and value projections are just linear layers. The "magic" is entirely in how the softmax redistributes weight across the sequence dimension.

Here is one attention layer with the actual numbers from this run (batch 12, sequence 256, width 384, 6 heads):

```
x:              (12, 256, 384)
qkv = Linear:   (12, 256, 1152)       # one projection, split into q, k, v
q, k, v:        (12, 6, 256, 64)      # 6 heads of 64 dims each
att = q @ kᵀ:   (12, 6, 256, 256)     # every token scores every other token
att / √64                             # keeps softmax out of its flat regions
mask future → -inf                    # causal: no peeking ahead
softmax(dim=-1)                       # each row is a distribution over the past
y = att @ v:    (12, 6, 256, 64)      # weighted mix of value vectors
merge heads:    (12, 256, 384)  →  output projection
```

The `(256, 256)` score matrix is the whole story. Each row is one token deciding how much to borrow from every token before it. It's also why memory grows with the square of the context length, which is the main reason the context is capped at 256 here.

## Fitting it in 4GB

The memory budget shaped the training loop more than anything else:

- **Micro-batches of 12 sequences, accumulated over 8 steps.** Gradients are summed across 8 forward/backward passes before each optimizer step, so the effective batch is 96 sequences (24,576 tokens) without ever holding 96 in memory at once.
- **Mixed precision (fp16 autocast).** Activations take half the memory. The catch is that small gradients can underflow to zero in fp16, so a gradient scaler multiplies the loss up before the backward pass and divides the gradients back down before the update.
- **Gradient clipping at 1.0**, and a learning rate that warms up for 200 steps to 3e-4, then follows a cosine decay down to 3e-5.

Over 6,000 optimizer steps, that comes to roughly 147M tokens seen.

Training on a single consumer GPU like this wasn't a limitation I fought against. It was the reason I understood memory layout, mixed precision, and batching well enough to reason about them instead of just tuning until numbers looked right.

## What the model actually learned

The full run took about two and a half hours on the 1650 Ti. Loss started around 9.0, which is close to ln 8000, the value you get from guessing uniformly over 8,000 tokens. It finished around 1.8.

Prompted with *"Once upon a time"*, the samples moved through three recognizable phases:

- **Early checkpoints:** near-random tokens, with common words like "the" and "was" showing up long before any grammar did.
- **Mid-training:** grammatically plausible sentences that don't mean much. Characters appear, act, and vanish without a reason.
- **Final checkpoint:** short, coherent stories in the TinyStories style, with named characters, simple dialogue, and basic cause and effect.

What it still gets wrong is anything that needs memory beyond a few sentences. A character's name drifts, or a problem set up at the start never gets resolved. With a 256-token context, that's expected: the model literally cannot see the beginning of a long story by the time it reaches the end.

## What I'd do differently

- **Test the tokenizer round trip first.** Check that `decode(encode(text)) == text` across the corpus before training on it.
- **Overfit a single batch.** If the model can't drive the loss to near zero on 12 examples, the bug is in the code, not the hyperparameters.
- **Write shape assertions before the model.** A shape bug that broadcasts silently doesn't crash. It just shows up later as a bad loss curve.

Next up is fine-tuning: QLoRA on a small pretrained model, the second stage of the roadmap. Same idea: keep it small enough that I can see every piece.
