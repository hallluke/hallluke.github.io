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
description: "Rules, randomness and recombination used to turn lists of words and phrases into something more interesting."
project_url_slug: "tracery-experiments"
project_link_label: "Visit the collection"
---

These are some of my early text experiments with Tracery, a procedural generation library, brought together here after originally running as social media bots hosted elsewhere. I wanted to give them a more permanent home, where I could preserve the original work and continue developing the collection.

They explore different ways of generating text using controlled randomness. For example: Cumberbot9000 combines lists of words to produce humorous and unexpected names; while Ghost Echoes simply draws from a collection of creative prompts. Both demonstrate how even relatively simple patterns can offer very different possibilities, from playful nonsense to something more practical.

The new versions have kept the original grammars intact, but I've added a layer of analysis tailored to each experiment. The methods are *slightly* more serious than some of the material being examined: Cumberbot9000 compares the generated names with their inspiration using Jaro–Winkler similarity, a measure of how closely two strings match; while Ghost Echoes highlights the most distinct vocabulary across all the possible selections using a measure called inverse document frequency. Expandable explanations show how the scores are calculated and small labels draw attention to particularly interesting results.
