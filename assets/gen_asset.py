#!/usr/bin/env python3
"""
setup_assets.py — Black Lama Tours and Travels

Creates the /assets/images folder structure required by the website prompt
and downloads freely-licensed placeholder photos from Wikimedia Commons
(Public Domain / CC0 / CC-BY / CC-BY-SA) for every image slot the site needs.

USAGE
-----
    pip install Pillow
    python3 setup_assets.py

Requires Python 3.8+ and Pillow (for image compression/resizing). Everything
else uses only the standard library. If Pillow isn't installed, the script
still runs and downloads full-size originals — it just skips compression and
prints a warning telling you to install Pillow or compress manually.

OUTPUT
------
assets/
  images/
    hero/       -> hero-himalaya-panorama.jpg
    tours/      -> kathmandu-durbar-square.jpg, pokhara-phewa-lake.jpg, ...
    gallery/    -> gallery-prayer-flags.jpg, gallery-sherpa-village.jpg, ...
  ATTRIBUTIONS.md   -> author/license/source for every downloaded image
  images-manifest.json -> filename -> alt text mapping, for wiring up <img alt="">

LICENSING NOTE
--------------
Wikimedia Commons hosts only freely-licensed media, but many CC-BY / CC-BY-SA
images legally require photographer credit. ATTRIBUTIONS.md is generated
automatically — check it before you publish, and keep the credits (e.g. in
your site footer or a /credits page) for any image whose license requires it.
Public Domain / CC0 images need no credit but are listed anyway for your records.

These are real, relevant placeholder photos meant to make the site look good
immediately. Swap in your own professional photography whenever you're ready —
just keep the same filenames (or update the <img> src in your HTML/JS).

COMPRESSION
-----------
If Pillow is installed, every downloaded image is automatically resized
(hero <=1920px wide, tour cards <=1000px, gallery <=800px) and re-encoded as
an optimized JPEG at quality 78 — a good balance of quality vs. file size for
a fast-loading static site. Console output shows the before/after size for
each file.
"""

import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request

try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False

# ---------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------

BASE_DIR = "assets/images"
ATTRIBUTIONS_PATH = "assets/ATTRIBUTIONS.md"
MANIFEST_PATH = "assets/images-manifest.json"

# Compression targets — tuned for a fast-loading tours website.
MAX_WIDTH = {
    "hero": 1920,     # full-bleed hero banner, needs the most resolution
    "tours": 1000,    # card images
    "gallery": 800,   # smaller scattered gallery shots
}
JPEG_QUALITY = 78  # good balance of quality vs file size

USER_AGENT = (
    "BlackLamaToursAssetBot/1.0 "
    "(https://github.com/; purpose: sourcing freely-licensed static site assets)"
)
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
REQUEST_DELAY = 1.0  # seconds between API calls — be polite to Wikimedia's servers

# Each entry: (subfolder, filename, alt_text, search_query)
IMAGE_PLAN = [
    # HERO ------------------------------------------------------------------
    ("hero", "hero-himalaya-panorama.jpg",
     "Panoramic view of the snow-capped Himalayan mountain range at sunrise",
     "Himalaya mountain range panorama Nepal"),

    # TOURS — by destination -------------------------------------------------
    ("tours", "kathmandu-durbar-square.jpg",
     "Kathmandu Durbar Square historic temples and pagodas",
     "Kathmandu Durbar Square"),

    ("tours", "pokhara-phewa-lake.jpg",
     "Boats on Phewa Lake in Pokhara with the Annapurna range behind",
     "Phewa Lake Pokhara"),

    ("tours", "chitwan-national-park-rhino.jpg",
     "One-horned rhinoceros in Chitwan National Park",
     "Chitwan National Park rhinoceros"),

    ("tours", "everest-basecamp.jpg",
     "Trekkers near Everest Base Camp with the Khumbu Icefall in view",
     "Everest Base Camp trek"),

    ("tours", "everest-mountain-flight.jpg",
     "Aerial view of Mount Everest and the Himalayan range",
     "Mount Everest aerial view"),

    ("tours", "lumbini-buddha-birthplace.jpg",
     "Maya Devi Temple and sacred garden at Lumbini, birthplace of Buddha",
     "Lumbini Maya Devi Temple"),

    ("tours", "nagarkot-sunrise.jpg",
     "Sunrise over the Himalayan range viewed from Nagarkot",
     "Nagarkot sunrise Himalaya view"),

    ("tours", "bhaktapur-patan-heritage.jpg",
     "Ancient Newari architecture and pagoda temples in Bhaktapur Durbar Square",
     "Bhaktapur Durbar Square"),

    ("tours", "annapurna-circuit.jpg",
     "Trekking trail through the Annapurna Circuit with mountain backdrop",
     "Annapurna Circuit trek"),

    ("tours", "upper-mustang.jpg",
     "Arid desert landscape and cliffs of Upper Mustang, Nepal",
     "Upper Mustang Nepal landscape"),

    ("tours", "bardia-national-park.jpg",
     "Wildlife and dense forest of Bardia National Park",
     "Bardia National Park Nepal"),

    ("tours", "honeymoon-pokhara.jpg",
     "Scenic viewpoint over Pokhara valley and lake at golden hour",
     "Pokhara valley view"),

    # GALLERY — smaller scattered images -------------------------------------
    ("gallery", "gallery-prayer-flags.jpg",
     "Colorful Tibetan Buddhist prayer flags against a mountain sky",
     "Tibetan prayer flags Nepal"),

    ("gallery", "gallery-sherpa-village.jpg",
     "Traditional Sherpa village in the Khumbu region",
     "Sherpa village Khumbu Nepal"),

    ("gallery", "gallery-kathmandu-streets.jpg",
     "Bustling street scene in Thamel, Kathmandu",
     "Thamel Kathmandu street"),

    ("gallery", "gallery-mountain-flight-view.jpg",
     "View of Himalayan peaks from an airplane window",
     "Himalaya mountain flight window view"),

    ("gallery", "gallery-rafting-trishuli.jpg",
     "White-water rafting on the Trishuli River in Nepal",
     "Trishuli River rafting Nepal"),
]

# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

TAG_RE = re.compile(r"<[^>]+>")


def strip_html(text):
    """Strip HTML tags Wikimedia sometimes embeds in metadata fields."""
    if not text:
        return ""
    return TAG_RE.sub("", text).strip()


def api_get(params, retries=3):
    url = COMMONS_API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except (urllib.error.URLError, TimeoutError) as e:
            print(f"    ! API error (attempt {attempt}/{retries}): {e}")
            time.sleep(2)
    return None


def search_commons_file(query):
    """Return the Commons File: title of the best match for a query, or None."""
    data = api_get({
        "action": "query",
        "list": "search",
        "srnamespace": "6",  # File namespace
        "srsearch": f"{query} filetype:bitmap",
        "srlimit": "5",
        "format": "json",
    })
    if not data:
        return None
    for result in data.get("query", {}).get("search", []):
        title = result["title"]
        if title.lower().endswith((".jpg", ".jpeg", ".png")):
            return title
    return None


def get_image_info(title):
    """Return dict with url/artist/license/etc for a Commons File: title."""
    data = api_get({
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size",
        "format": "json",
    })
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        infos = page.get("imageinfo")
        if not infos:
            return None
        info = infos[0]
        meta = info.get("extmetadata", {})
        return {
            "title": title,
            "url": info.get("url"),
            "width": info.get("width"),
            "height": info.get("height"),
            "artist": strip_html(meta.get("Artist", {}).get("value", "Unknown")),
            "license": meta.get("LicenseShortName", {}).get("value", "Unknown"),
            "license_url": meta.get("LicenseUrl", {}).get("value", ""),
            "credit": strip_html(meta.get("Credit", {}).get("value", "")),
            "description_url": f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}",
        }
    return None


def download_file(url, dest_path):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(dest_path, "wb") as f:
        f.write(data)


def ext_from_url(url, fallback=".jpg"):
    path = urllib.parse.urlparse(url).path
    _, ext = os.path.splitext(path)
    return ext.lower() if ext.lower() in (".jpg", ".jpeg", ".png") else fallback


def compress_image(path, subfolder):
    """Resize + re-encode an image in place. Returns (jpg_path, before_kb, after_kb) or None if skipped."""
    if not PILLOW_AVAILABLE:
        return None

    before_kb = os.path.getsize(path) / 1024
    max_width = MAX_WIDTH.get(subfolder, 1000)

    try:
        with Image.open(path) as img:
            img = img.convert("RGB")  # normalize (drops alpha/CMYK edge cases, matches .jpg output)
            if img.width > max_width:
                new_height = round(img.height * (max_width / img.width))
                img = img.resize((max_width, new_height), Image.LANCZOS)
            # Force output to .jpg regardless of source format, for consistent small file sizes
            jpg_path = os.path.splitext(path)[0] + ".jpg"
            img.save(jpg_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
            if jpg_path != path and os.path.exists(path):
                os.remove(path)  # remove original (e.g. a .png) now that we have the .jpg
        after_kb = os.path.getsize(jpg_path) / 1024
        return jpg_path, before_kb, after_kb
    except Exception as e:
        print(f"    ! Compression failed: {e} — keeping original file.")
        return None


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    print("Black Lama Tours — asset folder setup\n" + "-" * 40)

    # 1. Create folder structure
    subfolders = sorted(set(item[0] for item in IMAGE_PLAN))
    for sub in subfolders:
        path = os.path.join(BASE_DIR, sub)
        os.makedirs(path, exist_ok=True)
        print(f"Created folder: {path}/")
    os.makedirs("assets", exist_ok=True)
    print()

    manifest = {}
    attributions = []
    missing = []

    # 2. Search + download each image
    for i, (sub, filename, alt_text, query) in enumerate(IMAGE_PLAN, 1):
        print(f"[{i}/{len(IMAGE_PLAN)}] {filename}  (query: \"{query}\")")

        title = search_commons_file(query)
        time.sleep(REQUEST_DELAY)
        if not title:
            print("    ! No match found on Wikimedia Commons — skipping (add manually).")
            missing.append((sub, filename, alt_text, query))
            continue

        info = get_image_info(title)
        time.sleep(REQUEST_DELAY)
        if not info or not info.get("url"):
            print("    ! Could not fetch image info — skipping (add manually).")
            missing.append((sub, filename, alt_text, query))
            continue

        # Keep the intended filename base, but match the real file extension
        base, _ = os.path.splitext(filename)
        real_ext = ext_from_url(info["url"])
        final_filename = base + real_ext
        dest_path = os.path.join(BASE_DIR, sub, final_filename)

        try:
            download_file(info["url"], dest_path)
            size_kb = os.path.getsize(dest_path) / 1024
            print(f"    Downloaded -> {dest_path} ({size_kb:.0f} KB)")
        except Exception as e:
            print(f"    ! Download failed: {e} — skipping (add manually).")
            missing.append((sub, filename, alt_text, query))
            continue

        # Compress + resize (also normalizes everything to .jpg)
        result = compress_image(dest_path, sub)
        if result:
            dest_path, before_kb, after_kb = result
            final_filename = os.path.basename(dest_path)
            pct = 100 * (1 - after_kb / before_kb) if before_kb else 0
            print(f"    Compressed -> {before_kb:.0f} KB -> {after_kb:.0f} KB ({pct:.0f}% smaller)")
        elif not PILLOW_AVAILABLE:
            print("    ! Pillow not installed — skipping compression (run: pip install Pillow)")

        manifest[f"{sub}/{final_filename}"] = {
            "alt": alt_text,
            "source": "Wikimedia Commons",
            "commons_page": info["description_url"],
        }
        attributions.append({
            "file": f"{sub}/{final_filename}",
            "alt": alt_text,
            "artist": info["artist"] or "Unknown",
            "license": info["license"] or "Unknown",
            "license_url": info["license_url"],
            "source": info["description_url"],
        })

    # 3. Write manifest (alt text lookup for wiring up <img> tags)
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"\nWrote {MANIFEST_PATH}")

    # 4. Write attributions file
    with open(ATTRIBUTIONS_PATH, "w", encoding="utf-8") as f:
        f.write("# Image Attributions — Black Lama Tours and Travels\n\n")
        f.write(
            "All images below were sourced from Wikimedia Commons (freely licensed: "
            "Public Domain, CC0, CC-BY, or CC-BY-SA). CC-BY / CC-BY-SA images legally "
            "require photographer credit — keep this list handy (e.g. link it from "
            "your site footer) for any image whose license requires attribution.\n\n"
        )
        for a in attributions:
            f.write(f"## {a['file']}\n")
            f.write(f"- Alt text: {a['alt']}\n")
            f.write(f"- Artist: {a['artist']}\n")
            f.write(f"- License: {a['license']}" + (f" ({a['license_url']})" if a['license_url'] else "") + "\n")
            f.write(f"- Source: {a['source']}\n\n")
        if missing:
            f.write("## Not auto-downloaded (add manually)\n\n")
            for sub, filename, alt_text, query in missing:
                f.write(f"- `{sub}/{filename}` — alt: \"{alt_text}\" — try searching: \"{query}\"\n")
    print(f"Wrote {ATTRIBUTIONS_PATH}")

    # 5. Summary
    print("\n" + "-" * 40)
    print(f"Done: {len(attributions)} images downloaded, {len(missing)} missing.")
    if missing:
        print("Missing images (search manually on Unsplash/Pexels/Commons and drop into the matching folder):")
        for sub, filename, alt_text, query in missing:
            print(f"  - {sub}/{filename}  (\"{query}\")")


if __name__ == "__main__":
    main()