# Visual Sensitivity Test (VST) for Cognitive Health

## Overview

This web application implements a simplified version of the Visual Sensitivity Test (VST) based on research conducted by [insert authors' names] in their study [insert study title and year]. The VST is designed to measure visual processing speed, which has been associated with cognitive health and potential risk of future dementia.

## How It Works

1. The test consists of two parts: a simple VST and a complex VST.
2. In each part, users are presented with visual stimuli and must respond as quickly as possible by pressing the spacebar.
3. The test measures reaction times, which are then log-transformed and compared to baseline data from the original study.

## Interpretation of Results

The test provides a basic assessment by comparing your scores to the mean scores from the original study:

- Simple VST mean: 6.48 (SD = 0.27)
- Complex VST mean: 7.72 (SD = 0.46)

Scores more than one standard deviation above these means may suggest slower visual processing speed, which the original study associated with an increased risk of future cognitive decline.

## Important Limitations and Disclaimers

1. **Simplified Version**: This online test is a simplified version of the methodology used in the original research. It does not replicate the full complexity of the study's analysis.

2. **Not Diagnostic**: This test is not a diagnostic tool. It cannot determine if an individual has or will develop dementia.

3. **Lack of Longitudinal Data**: The original study was longitudinal, following participants over time. This online version provides only a snapshot assessment.

4. **Limited Factors**: The original research considered various demographic and health factors which are not accounted for in this simplified version.

5. **Individual Variation**: Many factors can affect test performance on a given day, including fatigue, distractions, or technical issues.

6. **Professional Advice**: For accurate assessment of cognitive health and dementia risk, always consult with qualified healthcare professionals.

## Research Basis

This test is based on the study: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10904745/pdf/41598_2024_Article_55637.pdf

For those interested in the full research methodology and findings, please refer to the original paper.

## Technical Implementation

The test is implemented using HTML, CSS, and JavaScript. The core logic includes:

- Randomized presentation of visual stimuli
- Accurate reaction time measurement
- Log transformation of reaction times
- Calculation of z-scores based on study means and standard deviations

## Feedback and Contributions

We welcome feedback and contributions to improve this tool. Please submit issues or pull requests through our GitHub repository.
