---
title: "BS5 Art Trail Map"
date: 2026-08-30
status: "Archived"
tags:
  - Python
  - JavaScript
  - Mapping
  - Geospatial
featured: true
featuredOrder: 2
draft: false
description: "An interactive map of a recent, local art trail, including exhibitor details from the event brochure."
project_url_slug: "bs5-art-trail-map"
project_link_label: "View the map"
---

I made this alternative map before visiting the BS5 Art Trail because I found the official map difficult to use. Large markers obscured nearby streets, locations were grouped together even when zoomed in, and viewing artist information meant leaving the map. I wanted something that made it easier to navigate between venues and learn about the exhibitors.

Starting with the PDF brochure, I used Python to extract and clean the event listings, grouping artists by venue and parsing the addresses. These were then converted into map coordinates using GeoPy's Nominatim service and OpenStreetMap data. Some locations required manual checking and correction. With the location data prepared, I used Folium and Leaflet to create an interactive map with smaller, colour-coded markers, filters for venue types and pop-ups showing artist details and opening times.

The finished map keeps individual locations visible at every zoom level and lets visitors explore the listings without navigating away. It was a useful exercise in working with imperfect location data and thinking about how relatively small design decisions can make an interactive map easier to use.
