---
title: "Reflections on publishing the Demeter framework"
date: "2026-06-02"
readTime: "10 min"
tag: "Research"
excerpt: "What reviewer feedback changed about the final paper."
---

Packaging Demeter, an ensemble framework for paddy disease classification, into a reproducible HPC-ready repository taught me more about research engineering than the modeling work itself.

## The reviewer note that changed the paper

A request for LMSE threshold sensitivity analysis pushed the evaluation from a single reported number to a full sensitivity study. It was more work, but it made the final claims far more defensible.

## Deployability as a first-class concern

Evaluating the two-tier quantized MobileNet architecture for IoT deployability wasn't in the original scope, but it turned out to be the detail reviewers cared about most: a model that works on a lab GPU but not in the field is a weaker contribution.
