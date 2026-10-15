---
title: "What frugality at startups taught me about engineering"
date: "2026-07-14"
readTime: "5 min"
tag: "Startups"
excerpt: "Constraints aren't the enemy of good engineering. Sometimes they're the reason for it."
---

Working at early-stage startups, budget isn't a footnote, it shapes almost every technical decision before a single line of code gets written. Every extra GPU hour, every managed service, every "just add a queue for this" has a cost someone is watching closely. That constraint felt limiting at first. Now, it's one of the more useful things I've learned as an engineer.

## Good product decisions absorb complexity

The default instinct when solving a hard problem is to build more: more abstraction, more infrastructure, more configurability for cases that might come up later. Frugal constraints forced a different question first, one that had nothing to do with code: does this actually need to be solved in engineering, or can a narrower product decision make the hard case disappear entirely?

More often than expected, the answer was the product decision. Scoping a feature tightly, saying no to an edge case that would only ever apply to a handful of users, or picking a simpler workflow upfront, each of these routinely avoided an entire category of engineering complexity before it existed. Not the complexity of writing the code, the complexity of maintaining it, monitoring it, and explaining it to the next engineer six months later.

The best infrastructure decision, a surprising number of times, was not building the infrastructure. That only becomes visible when the constraint forces the question to actually get asked.

## A concrete case

At mTouch Labs, we needed document processing engine to keep up with incoming volume. The "proper" design was obvious: a queue, autoscaling workers, a managed OCR service. It would have cost $300 a month before we had a single paying customer depending on it.

What we shipped instead was an asynchronous OCR-based text extraction service with 4 workers rotating over pending documents on a 8GB RAM server. It hit 45 documents/min, which was 2x what the business actually needed. It also had a known ceiling, and we wrote it down: past a sustained 45 documents a minute, the backlog grows faster than four workers can clear it, and here's what replaces it.

We hit that ceiling 4 months later. Because the limit was written down, the upgrade was a planned change instead of an outage. The expensive version would have spent those 4 months, about $1200, paying for capacity we didn't need yet.

## Choosing limitations on purpose

The harder lesson was watching real growth happen inside technical limitations that were chosen deliberately, not stumbled into from a lack of knowledge. A team looks at the "correct" way to build something, understands it fully, and still decides to run on a smaller footprint, skip a dependency, or defer the proper solution, on purpose, with eyes open.

As an engineer, that's uncomfortable. Every part of the job trains you to reach for the resilient version, the scalable version, the version that won't need revisiting. Conscious limitation asks you to build something that works today, knowing exactly where it will break, and to be at peace with that tradeoff because it's the right one for where the product is.

## Where frugality goes wrong

None of this means cheap is always right. A constraint chosen on purpose is different from technical debt picked up out of laziness. The test I use: can you say where it will break, and roughly when? If you can, it's a tradeoff. If you can't, it's just risk you haven't priced in.

Some things were never worth saving on: [backups, auth, logging/observability, evaluation sets for LLM features]. Being cheap there doesn't save money. It moves the cost to the worst possible moment.

## What I'd tell a new engineer

Before reaching for the resilient, scalable version, ask three questions. Can a product decision remove this problem? What's the cheapest version that works today? Where exactly will that version break? Write the answer to the last one down. That note is the difference between a constraint you chose and one that just happened to you.

Building under constraints is slower and less comfortable. It's also where most of my engineering judgment actually came from.
