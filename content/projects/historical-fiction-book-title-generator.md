---
title: "Historical Fiction Book Title Generator"
date: 2026-10-22
status: "Completed"
tags:
  - JavaScript
  - Generative
  - Creative Coding
featured: true
featuredOrder: 3
draft: false
description: "A playful novel generator, complete with descriptions, reviews and illustrated book spines."
project_url_slug: "historical-fiction-generator"
project_link_label: "Try the generator"
gallery:
  - src: "book-cover.png"
    alt: "A fictional historical novel cover titled The Bookbinder of Ephesus by L. S. Webb, promotional tagline and review quote."
    caption: "Your next favourite novel?"
    featured: true
    thumbnail:
      zoom: 1
      x: 50
      y: 50
  - src: "illustrated-bookshelf.png"
    alt: "A row of illustrated book spines with varying heights and widths, each displaying a different, imaginary historical fiction title."
    caption: "An entire collection on display"
    thumbnail:
      zoom: 1
      x: 50
      y: 50
---

I enjoy writing text generators because they can produce unexpected results from a few simple rules and carefully constructed collections of words, phrases and patterns. I started with the familiar historical fiction title formula "The <Occupation> of <Place>", then explored the larger publishing world around the imaginary books it produced.

{{< project-gallery label="Check the reviews" >}}

Inspired by [Tracery](https://tracery.io/)'s approach to text generation, I designed the generator in JavaScript using nested templates to assemble titles, descriptions, reviews and other details. Weighted probabilities control how frequently different variations appear while editorial rules prevent repeated word choices and alliteration. The generator also avoids recently used templates, helping each book feel like a distinct result rather than another variation on the same formula. Each book is given its own illustrated SVG spine and added to a scrollable bookshelf, where it can be selected again to view.

{{< project-gallery label="Peruse the bookshelf" image="illustrated-bookshelf.png" >}}

I particularly enjoyed coming up with the different possibilities, from plausible occupations and locations to increasingly elaborate descriptions and literary praise. I wanted the results to feel convincing at first glance, with just enough room for the occasional surprise.
