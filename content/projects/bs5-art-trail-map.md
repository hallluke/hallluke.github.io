---
title: "BS5 Art Trail Map"
date: 2026-08-30
status: "Archived"
tags:
  - Python
  - JavaScript
  - Mapping
  - Geospatial
featured: false
draft: false
description: "An interactive map of art trail venues across East Bristol, from September 2026."
project_url_slug: "bs5-art-trail-map"
project_link_label: "View the map"
---

I made this alternative map before visiting the BS5 Art Trail because I found the official map difficult to use. Large markers obscured nearby streets, locations were grouped together even when zoomed in, and viewing artist information meant leaving the map. I wanted something that made it easier to explore the trail and learn about the exhibitors.

I used Python to extract and prepare the data from a PDF flyer, grouping the artists by venue and processing addresses with GeoPy's Nominatim geocoder, using OpenStreetMap data. Some locations required manual checking and correction. I then used Folium and Leaflet to build an interactive map with smaller, colour-coded markers, filters for venue types and pop-ups showing artist details and opening times.

The finished map keeps individual locations visible at every zoom level and lets visitors explore the listings without navigating away. It was a useful exercise in working with imperfect location data and thinking about how relatively small design decisions can make an interactive map easier to use.

{{< project-link >}}
