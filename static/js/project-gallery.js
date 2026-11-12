(() => {
  // The page template outputs one viewer; every shortcode provides a trigger.
  const component = document.querySelector(".project-gallery-viewer");
  if (!component || component.dataset.galleryInitialized === "true") return;
  {
    const data = component.querySelector(".project-gallery-data");
    const dialog = component.querySelector(".project-gallery");
    if (!data || !dialog) return;
    let images;
    try {
      images = JSON.parse(data.textContent);
    } catch (error) {
      console.error("Invalid project gallery data", error);
      return;
    }
    if (!Array.isArray(images) || images.length === 0) return;
    component.dataset.galleryInitialized = "true";
    const image = component.querySelector(".gallery-image");
    const viewport = component.querySelector(".gallery-viewport");
    const caption = component.querySelector(".gallery-caption");
    const counter = component.querySelector(".gallery-counter");
    const originalLink = component.querySelector(".gallery-original");
    let index = 0;
    let zoom = 1;
    let panX = 0;
    let panY = 0;
    let drag = null;
    let suppressClick = false;
    let imageRequest = 0;

    // Only offer native-resolution zoom when the fitted image is below 70%.
    function canZoom() {
      if (!image.naturalWidth || !image.naturalHeight) return false;
      const fitRatio = Math.min(
        viewport.clientWidth / image.naturalWidth,
        viewport.clientHeight / image.naturalHeight
      );
      return fitRatio < 0.7;
    }

    function applyZoom() {
      const limitX = (viewport.clientWidth * (zoom - 1)) / 2;
      const limitY = (viewport.clientHeight * (zoom - 1)) / 2;
      panX = Math.max(-limitX, Math.min(limitX, panX));
      panY = Math.max(-limitY, Math.min(limitY, panY));
      // Render at the actual zoomed CSS dimensions, without transform: scale().
      const width = Math.round(viewport.clientWidth * zoom);
      const height = Math.round(viewport.clientHeight * zoom);
      image.style.width = `${width}px`;
      image.style.height = `${height}px`;
      image.style.left = `${(viewport.clientWidth - width) / 2 + panX}px`;
      image.style.top = `${(viewport.clientHeight - height) / 2 + panY}px`;
      viewport.classList.toggle("is-zoomed", zoom > 1);
      const zoomAvailable = canZoom();
      viewport.style.cursor = zoom > 1 ? "grab" : zoomAvailable ? "zoom-in" : "default";
    }

    function resetZoom() {
      zoom = 1;
      panX = 0;
      panY = 0;
      drag = null;
      viewport.classList.remove("is-dragging");
      applyZoom();
    }

    function toggleZoom() {
      if (zoom > 1) {
        resetZoom();
      } else {
        if (!canZoom()) return;
        // Stop at native image dimensions (one source pixel per CSS pixel).
        const maxZoom = Math.min(
          image.naturalWidth / Math.max(1, viewport.clientWidth),
          image.naturalHeight / Math.max(1, viewport.clientHeight)
        );
        if (maxZoom <= 1) return;
        zoom = maxZoom;
        panX = panY = 0;
        applyZoom();
      }
    }

    // A click/tap zooms; moving more than 6px becomes a pan instead.
    viewport.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || !event.isPrimary || (zoom === 1 && !canZoom())) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: panX, startY: panY, moved: false };
      viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener("pointermove", (event) => {
      if (!drag || drag.id !== event.pointerId || zoom === 1) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (Math.hypot(dx, dy) > 6) drag.moved = true;
      if (drag.moved) {
        viewport.classList.add("is-dragging");
        panX = drag.startX + dx;
        panY = drag.startY + dy;
        applyZoom();
      }
    });
    viewport.addEventListener("pointerup", (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const moved = drag.moved;
      drag = null;
      viewport.classList.remove("is-dragging");
      if (moved) {
        suppressClick = true;
      } else {
        toggleZoom();
        suppressClick = true; // Avoid a synthetic click toggling again.
      }
    });
    viewport.addEventListener("pointercancel", () => {
      drag = null;
      viewport.classList.remove("is-dragging");
    });
    // Pointer events also work for touch, so suppress the subsequent synthetic click.
    viewport.addEventListener("click", (event) => {
      if (suppressClick) { suppressClick = false; return; }
      if (event.detail === 0) toggleZoom(); // Keyboard-generated activation if provided.
    });

    // Keep the dialog only as wide as the displayed image (+ its 16px padding).
    // Height is reserved for the toolbar, caption, controls and dialog margins.
    function sizeImage(naturalWidth, naturalHeight) {
      // Use the dimensions of the image we have JUST loaded, not the dimensions
      // left in the visible <img> by the previous slide.
      if (!naturalWidth || !naturalHeight) return;
      const outerGap = window.innerWidth <= 600 ? 12 : 16;
      const paddingAndBorders = 34; // 16px padding each side + 1px borders.
      const maxWidth = Math.max(1, Math.min(960, window.innerWidth - outerGap * 2 - paddingAndBorders));
      const maxHeight = Math.max(1, Math.min(750, window.innerHeight - outerGap * 2 - 148));
      const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1);
      const displayWidth = Math.floor(naturalWidth * scale);
      const displayHeight = Math.floor(naturalHeight * scale);
      // Set the containing dialog width first: otherwise the viewport can be
      // temporarily constrained by the previous (narrower) image, causing
      // applyZoom() to write an incorrect image width and height.
      dialog.style.width = `${displayWidth + paddingAndBorders}px`;
      viewport.style.width = `${displayWidth}px`;
      viewport.style.height = `${displayHeight}px`;
      resetZoom();
    }
    window.addEventListener("resize", () => {
      if (dialog.open && image.complete && image.naturalWidth) {
        sizeImage(image.naturalWidth, image.naturalHeight);
      }
    });

    function show(indexToShow) {
      const request = ++imageRequest;
      index = (indexToShow + images.length) % images.length;
      const slide = images[index];

      // Load off-screen first. The current slide remains visible until the
      // replacement is genuinely ready; no stale dimensions or blank viewer.
      const incoming = new Image();
      incoming.onload = () => {
        // Rapid Previous/Next clicks can finish loading out of order.
        if (request !== imageRequest || !dialog.open) return;

        image.src = incoming.src;
        image.alt = slide.alt || "";
        viewport.title = image.alt;
        caption.textContent = slide.caption || "";
        originalLink.href = slide.src;
        counter.textContent = `${index + 1} / ${images.length}`;
        sizeImage(incoming.naturalWidth, incoming.naturalHeight);
        image.style.visibility = "visible";
      };
      incoming.onerror = () => {
        if (request !== imageRequest || !dialog.open) return;
        // Keep the previous image visible rather than leaving an empty dialog.
        caption.textContent = "Image could not be loaded.";
        console.warn("Could not load gallery image", slide.src);
      };
      incoming.src = slide.src;
    }

    // All preview and text triggers use the same modal and start at their image.
    document.querySelectorAll(".gallery-open[data-gallery-index]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const requestedIndex = Number.parseInt(trigger.dataset.galleryIndex, 10);
        dialog.showModal();
        show(Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < images.length ? requestedIndex : 0);
      });
    });
    dialog.addEventListener("close", () => {
      // Ignore images that finish loading after the viewer has closed.
      imageRequest++;
    });
    component.querySelector(".gallery-close").addEventListener("click", () => dialog.close());
    component.querySelector(".gallery-prev").addEventListener("click", () => show(index - 1));
    component.querySelector(".gallery-next").addEventListener("click", () => show(index + 1));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();


// Thumbnail crops use the same cover/zoom/position maths as the local editor.
// This code affects only shortcode previews, never the lightbox's full images.
(() => {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const readNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  document.querySelectorAll(".gallery-thumbnail-frame img").forEach((img) => {
    const frame = img.closest(".gallery-thumbnail-frame");
    if (!frame) return;
    const render = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const width = frame.clientWidth;
      const height = frame.clientHeight;
      if (!width || !height) return;

      const fit = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      // At zoom=1 the image covers the frame; never exceed native pixel size.
      const maxZoom = Math.max(1, Math.min(3, 1 / fit));
      const zoom = clamp(readNumber(img.dataset.thumbZoom, 1), 1, maxZoom);
      const x = clamp(readNumber(img.dataset.thumbX, 50), 0, 100);
      const y = clamp(readNumber(img.dataset.thumbY, 50), 0, 100);
      const displayedWidth = img.naturalWidth * fit * zoom;
      const displayedHeight = img.naturalHeight * fit * zoom;
      const overflowX = Math.max(0, displayedWidth - width);
      const overflowY = Math.max(0, displayedHeight - height);

      img.style.width = `${displayedWidth}px`;
      img.style.height = `${displayedHeight}px`;
      img.style.left = `${-overflowX * x / 100}px`;
      img.style.top = `${-overflowY * y / 100}px`;
      img.style.objectFit = "fill";
    };
    img.addEventListener("load", render);
    if (img.complete && img.naturalWidth) render();
    // Recompute if the thumbnail frame changes size due to responsive layout.
    if ("ResizeObserver" in window) new ResizeObserver(render).observe(frame);
  });
})();
