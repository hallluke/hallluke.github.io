---
title: "Generative Experiments"
date: 2017-03-13
status: "Revisited"
tags:
  - JavaScript
  - Tracery
  - Generative
  - Creative Coding
featured: false
draft: false
description: "A collection of imaginative little text generators ranging from thoughtful to useful to nonsensical."
project_url_slug: "tracery-experiments"
project_link_label: "Visit the collection"
gallery:
  - src: "tablet-layout.png"
    alt: "This is how the page would display on a tablet"
  - src: "cumberbot-list.png"
    alt: "Some example output from the Cumberbot9000 grammar"
    featured: true
  - src: "cumberbot-scoring.png"
    alt: "Name similarity scores"
  - src: "oblique-list.png"
    alt: "Oblique Strategy cards"
  - src: "oblique-scoring.png"
    alt: "Lexical uniqueness scores"
---

These are some of my early text experiments with Tracery, a procedural generation library, brought together here after originally running as social media bots hosted elsewhere. I wanted to give them a more permanent home, where I could preserve the original work and continue developing the collection.

{{< project-gallery label="View some examples" >}}

They explore different ways of generating text using controlled randomness. For example: Cumberbot9000 combines lists of words to produce humorous and unexpected names; while Ghost Echoes simply draws from a collection of creative prompts. Both demonstrate how even relatively simple patterns can offer very different possibilities, from playful nonsense to something more practical.

{{< project-gallery label="Scores for each output" image="oblique-scoring.png" >}}

The new versions have kept the original grammars intact, but I've added a layer of analysis tailored to each experiment. The methods are _slightly_ more serious than some of the material being examined: Cumberbot9000 compares the generated names with their inspiration using Jaro–Winkler similarity, a measure of how closely two strings match; while Ghost Echoes highlights the most distinct vocabulary across all the possible selections using a measure called inverse document frequency. Expandable explanations show how the scores are calculated and small labels draw attention to particularly interesting results.
