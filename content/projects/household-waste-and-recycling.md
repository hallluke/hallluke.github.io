---
title: "Household Waste & Recycling Data"
date: 2026-11-02
status: "Active"
tags:
  - Python
  - JavaScript
  - Data Analysis
  - Data Visualisation
  - Information Design
featured: true
featuredOrder: 1
draft: false
description: "A visualisation of what one household puts out for residential collection, refreshed every day."
project_url_slug: "data-and-design-work"
project_link_label: "Explore the visualisation"
---

I've been weighing my household waste to get a clearer picture of how much I throw away and how much I recycle. Here I explore how even fairly ordinary data can be interesting and insightful given a little curiosity and some analytical expertise.

Measurements are recorded in a private Google Sheet, which is processed by a Python data pipeline that checks for and validates any new data, calculates summaries and produces estimates where monthly records are incomplete. The results are then formatted, stored and imported into the webpage using JavaScript and, finally, presented as interactive charts created with Observable Plot and D3, and also as contextual data tables.

The visualisations offer different perspectives on the data: comparing quantities and categories; highlighting changes and their scale; communicating proportions clearly; and revealing patterns over time. I've included explanatory methodology notes for each one.
