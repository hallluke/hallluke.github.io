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
gallery:
  - src: "monthly-bars.png"
    alt: "A screenshot of the top of the dashboard including an introductory paragraph and a monthly bar chart showing total imputed collection amounts. It shows dark bars for completed months, lighter bars for provisional estimates and controls to filter the chart."
    caption: "Imputed monthly figures since January 2025, showing completed and provisional records"
    featured: true
    thumbnail:
      zoom: 2.39
      x: 10
      y: 100
  - src: "weekly-calendar.png"
    alt: "A calendar heatmap of daily household waste records, arranged by month and weekday. Squares range from pale grey to dark charcoal according to recorded weight. There is an expanded methodology section explaining the measurements beneath the chart."
    caption: "Daily measured results, darker squares represent greater recorded weights"
    thumbnail:
      zoom: 2.64
      x: 94
      y: 16
---

I've been weighing my household waste to get a clearer picture of how much I throw away and how much I recycle. Here I explore how even fairly ordinary data can be interesting and insightful given a little curiosity and some analytical expertise.

{{< project-gallery label="Monthly breakdown" >}}

Measurements are recorded in a private Google Sheet, which is processed by a Python data pipeline that checks for and validates any new data, calculates summaries and produces estimates where monthly records are incomplete. The results are then formatted, stored and imported into the webpage using JavaScript and, finally, presented as interactive charts created with Observable Plot and D3, and also as contextual data tables.

{{< project-gallery label="Calendar heat-map" image="weekly-calendar.png" >}}

The visualisations offer different perspectives on the data: comparing quantities and categories; highlighting changes and their scale; communicating proportions clearly; and revealing patterns over time. I've included explanatory methodology notes for each one.
