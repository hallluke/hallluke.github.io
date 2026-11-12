#!/usr/bin/env python3
"""Local-only thumbnail editor. No third-party Python dependencies."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import mimetypes

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
IMAGES = (REPO / "static" / "assets" / "projects").resolve()
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        if path in ("/", "/index.html"):
            return self.send_file(HERE / "index.html", "text/html; charset=utf-8")
        if path == "/api/images":
            files = []
            if IMAGES.is_dir():
                for file in sorted(IMAGES.rglob("*")):
                    if not file.is_file() or file.suffix.lower() not in EXTENSIONS:
                        continue
                    if file.is_symlink():
                        continue
                    rel = file.relative_to(IMAGES)
                    from urllib.parse import quote
                    url = "/images/" + "/".join(quote(part) for part in rel.parts)
                    files.append({"url": url, "project": rel.parts[0], "filename": file.name})
            body = json.dumps(files, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if path.startswith("/images/"):
            rel = path[len("/images/"):]
            file = (IMAGES / rel).resolve()
            if not file.is_relative_to(IMAGES) or file.suffix.lower() not in EXTENSIONS:
                return self.send_error(404)
            if not file.is_file():
                return self.send_error(404)
            return self.send_file(file, mimetypes.guess_type(file.name)[0] or "application/octet-stream")
        self.send_error(404)

    def send_file(self, file, content_type):
        body = file.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = 8765
    print(f"Thumbnail editor: http://127.0.0.1:{port}/", flush=True)
    print(f"Reading images from: {IMAGES}", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    try:
        ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
