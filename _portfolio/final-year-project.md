---
title: "Study of subsampling strategies in place images matching"
excerpt: "Local Descriptors in Visual Place Recognition<br/><img src='/images/FYP.png'>"
collection: portfolio
venue: "Final Year Project, Nanyang Technological University"
---

## Project Overview
This research focuses on enhancing Visual Place Recognition (VPR), a crucial component in robotic SLAM (Simultaneous Localization and Mapping) systems. VPR is essential for Loop Closure Detection, which helps eliminate accumulated errors in SLAM applications.

## Problem Definition
The project addresses three key aspects:
- **Database Creation**: Managing a set of places {P₁, P₂, ..., Pₙ} with corresponding images
- **Query Image Processing**: Identifying the location of a query image q within the database
- **Similarity Measurement**: Minimizing the distance d(Iᵢ, q) between database and query images

## Research Gap & Innovation
Traditional approaches often face limitations:
- Insufficient attention to discriminative features
- Over-emphasis on repetitive elements (e.g., sky regions)

Our solution introduces:
- Novel local descriptor subsampling strategies
- Adaptive threshold implementation
- Enhanced attention to discriminative image features

## Key Achievements
- Developed improved subsampling strategies for local descriptors
- Implemented an adaptive threshold system
- Achieved superior accuracy compared to the original attentive-patch method
- Maintained computational efficiency without speed sacrifice

## Technical Approach
The system utilizes a multi-stage process:
1. Initial anchor point selection
2. Patch creation around selected anchors
3. Secondary filtering with adaptive thresholding
4. Final feature set generation

## Results
The implemented improvements demonstrated:
- Enhanced accuracy over the baseline attentive-patch approach
- Maintained computational efficiency
- Robust performance in real-world scenarios

## Supervisor
Prof. Lam Siew Kei, Nanyang Technological University