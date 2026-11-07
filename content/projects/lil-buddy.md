---
title: "Tiny Unicode Friend Generator"
date: 2018-03-18
status: "Revisited"
tags:
  - JavaScript
  - Generative
  - Creative Coding
featured: false
draft: false
description: "A web tool for creating characters from Unicode symbols, one lil buddy at a time."
project_url_slug: "lil-buddy"
project_link_label: "Try the generator"
---

This project began as a social media bot that periodically posted a tiny Unicode friend, or replied with one when mentioned. Each little buddy was assembled from different combinations of symbols, producing a variety of faces, bodies and arms.

The original bot used Tracery, while the current web version uses JavaScript to combine Unicode symbols directly. Although the combinations are random, they follow a few rules to keep each result visually coherent: faces are either selected as single characters or made from a separate mouth and two matching eyes; body shapes use left-and-right pairs; while arms can be selected independently or from a collection of mirrored symbols. Each generation is random and independent, with no memory of previous results.

I recreated and expanded the generator with new combinations, some animation and a deliberately imperfect typewriter aesthetic, complete with uneven ink, serial numbers and occasional printing mishaps. The little buddies can also go for a walk or take their places on a winners' podium where their randomly generated expressions give each scene its own personality.
