# Thumbnail crop editor

Local-only image-crop audition tool for the portfolio project galleries. Its source is tracked in Git, but it is not published by Hugo because it lives under `tools/`.

## Start

From the repository root:

```sh
python3 tools/thumbnail-editor/serve.py
```

Open **http://127.0.0.1:8765/** in a browser. Keep the Python process running while using the editor; press Ctrl+C when finished.

The editor scans `static/assets/projects/` each time it opens. It uses the actual repository images, not duplicate example files. Refresh to pick up newly added images. Files selected with the manual file picker are handled locally in the browser.

The Python server listens only on your own computer (`127.0.0.1`), and serves only the editor and the image files under `static/assets/projects/`.

## Save a crop

Use zoom, X/Y sliders or drag the image to find the portion you want, then copy the YAML into that image's entry in the project Markdown front matter:

```yaml
gallery:
  - src: "map-overview.png"
    featured: true
    thumbnail:
      zoom: 1.6
      x: 65
      y: 30
```

All three settings are optional. Default: `zoom: 1`, `x: 50`, `y: 50`. The production thumbnail always has a 200 × 150px frame; the original gallery image remains unchanged.

The effective zoom is capped at the smaller of 3× or native pixel resolution relative to the cover fit. X/Y positions are 0–100%, and are ignored on axes with no extra image to pan.
