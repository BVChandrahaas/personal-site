---
title: "Demeter: Enhancing paddy disease detection using deep ensembles"
date: "2026-06-02"
readTime: "6 min"
tag: "Research"
excerpt: "How a gated ensemble of diverse models reached 97.84% on Paddy Doctor, and why the biggest model made it worse."
---

Demeter is my latest publication, presented at AVSS 2026 in Lecce, Italy. It's an ensemble framework for detecting paddy diseases from leaf images, and it reached 97.84% test accuracy on the Paddy Doctor dataset, ahead of the previously reported results we compared against. This post walks through the approach and what the experiments taught us.

## The problem

Paddy diseases are estimated to cost 20–40% of rice yield every year, and climate change keeps pushing outbreaks into new regions. Deep learning models can spot many of these diseases from a photo of a leaf, but two problems kept showing up in existing work:

- **Ensembles combine models blindly.** Every model gets a vote, including the unreliable ones.
- **Rare diseases get ignored.** With only a few hundred examples of some classes, standard CNNs learn to mostly predict the common ones.

We worked with the Paddy Doctor dataset: 16,225 images across 12 disease classes and one healthy class, collected from paddy fields in Tirunelveli, Tamil Nadu, using drones and mobile phones.

## Choosing models that see differently

An ensemble only helps if its members make different mistakes. So instead of stacking several versions of the same architecture, we picked models that look at an image in structurally different ways:

| Model | What it brings | Parameters |
|---|---|---|
| Octave ResNet50 | Splits features into high-frequency detail and low-frequency structure | 23.5M |
| DenseNet121 | Every layer reuses the features of all earlier layers | 6.9M |
| MobileNetV2 | Lightweight depthwise convolutions | 3.2M |
| DPN92 | Combines residual and dense connections | 35.0M |
| Few-shot module (C-ViT) | Learns an embedding space where classes can be told apart from very few examples | — |

Octave convolution was a deliberate pick for this task. Disease lesions are small, fine-grained textures sitting on top of larger leaf structure, which is exactly the split between high and low frequencies that octave convolution makes explicit.

## The core idea: a gate before the vote

The main contribution is a quality check before aggregation. Each model's predictions on the validation set are scored with a Logarithmic Mean Squared Error:

```
LMSE = (1/N) · Σ log(1 + (yᵢ − ŷᵢ)²)
```

The log keeps a few badly wrong predictions from dominating the score, so it measures how reliable a model is overall rather than how badly it fails at its worst. After experimenting with different values, we set the threshold at 0.15: a model scoring below it gets a vote, and anything above it is excluded from the final prediction.

The accepted predictions are then combined. Their order is shuffled before averaging, so the result doesn't depend on which model happened to come first. In the best-performing configuration, a logistic regression meta-learner sits on top and learns how much to trust each model.

## Handling imbalance, and evaluating fairly

Two smaller decisions mattered more than they look:

- **Borderline-SMOTE for rare classes.** Instead of duplicating minority samples, it generates synthetic ones near the decision boundaries, where the model is most likely to confuse classes. After resampling, every class has a roughly equal share of training data.
- **A KNN-guided validation set.** Rather than a purely random split, the validation set is built from samples similar to the test set. Since the LMSE gate is decided on validation, a representative validation set means the gate makes its decision on data that looks like what the model will face.

All models were trained on 64×64 images with Adam (learning rate 1e-4), a batch size of 64, up to 50 epochs with early stopping, and a 75/10/15 split.

## What the ablation taught us

The most useful part of the paper is the ablation study, where we added components one at a time:

| Configuration | Accuracy | AUC |
|---|---|---|
| Mobile + Dense | 96.48% | 0.9798 |
| Mobile + Dense + Octave | 97.07% | 0.9836 |
| Mobile + Dense + Few-Shot | 97.31% | 0.9848 |
| Mobile + Dense + Octave + DPN | 97.75% | 0.9875 |
| **Mobile + Dense + Octave + Few-Shot** | **97.84%** | **0.9881** |

Two things stood out.

**The few-shot module consistently helped.** Ensembles with it matched or beat their DPN counterparts of the same size: Mobile + Dense + Few-Shot reached 97.31% against 97.00% for Mobile + Dense + DPN. Octave + Few-Shot alone reached 97.65%, which is high for a two-model ensemble. The two complement each other: Octave captures fine spatial detail, and the few-shot model recalls the rare classes.

**The biggest model made things worse.** DPN92 is the largest and most complex model in the set, at 105M total parameters and 267MB. It should have been the strongest member. Instead, Mobile + DPN was the weakest ensemble of any size, at 94.40%. Its LMSE of 0.15 sat right at the edge of the gate, and its predictions added noise. Swapping DPN for the few-shot module in the four-model ensemble produced the best result in the paper.

## Where it landed

Compared with recent methods on the same dataset, Demeter came out ahead on both accuracy and F1:

| Method | Year | Accuracy | F1 |
|---|---|---|---|
| Fine-tuned CNN ensemble | 2025 | 97.10% | 96.90 |
| ViT-CNN hybrid | 2024 | 96.50% | 96.30 |
| VGG19 + ResNet50 hybrid | 2024 | 96.30% | 96.00 |
| **Demeter (LMSE ensemble)** | 2026 | **97.84%** | **97.84** |

Per-class ROC curves had AUCs between 0.96 and 1.00, so the improvement wasn't coming from the easy classes alone.

## Open questions

A few things I'd want to explore next:

- **Image resolution.** Everything was trained at 64×64. Lesions are small, and higher resolution might help the models that rely on fine texture most.
- **The threshold.** 0.15 worked well, but a full sweep would show how sensitive the results are to it, especially for models like DPN92 that sit right at the boundary.
- **More combinations.** Compute limited how many ensemble combinations we could evaluate, so the best configuration is the best one we tried, not necessarily the best one possible.
- **Deployment.** Running four models is expensive on the low-power devices used in the field, which is where a system like this would actually live.

The main takeaway is the one the DPN result made obvious: choosing the right models mattered more than how complex any of them were.
