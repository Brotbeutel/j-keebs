#!/usr/bin/env python3
"""Per-page image byte report for P2-E (ai/PLAN.md, "Before/after numbers").

BEFORE: parses src/pages/*.njk + src/_includes/base.njk for <img src="images/...">
(the templates themselves are untouched by the P2-E build transform), resolves each
against the real file in images/, dedupes repeats of the same file within one page
(e.g. the header/footer logo share one file, so a browser would only fetch it once).

AFTER: parses the built _site/*.html for <img srcset="...">, resolves each candidate
against _site/img/, and reports both the "src" (mid-size) file alone -- the closest
analogue to the single "before" file a browser would have fetched -- and the sum of
every srcset candidate (upper bound if every density were downloaded), both deduped
per page. Pages/images the pipeline does not touch (data-no-optimize, excluded files,
non-images/ sources) fall back to their plain src.

This is a static approximation (file sizes on disk), not a live network trace. The
"Done when" owner check (ai/PLAN.md) measures real transferred bytes with browser
DevTools at set viewports/pixel densities -- that is the authoritative live number;
this script is for tracking the build-time win.
"""
import glob, os, re, sys
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(ROOT, "src", "pages")
BASE_INCLUDE = os.path.join(ROOT, "src", "_includes", "base.njk")
SITE = os.path.join(ROOT, "_site")
IMAGES = os.path.join(ROOT, "images")

IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE | re.DOTALL)
SRC_RE = re.compile(r'\bsrc="([^"]*)"')
SRCSET_RE = re.compile(r'\bsrcset="([^"]*)"')


def file_size(path):
    try:
        return os.path.getsize(path)
    except OSError:
        return None


def resolve_before_src(raw):
    # Strip the Nunjucks "{{ rp }}" variable used on 404.html's chrome images.
    raw = raw.replace("{{ rp }}", "")
    raw = unquote(raw)
    if not raw.startswith("images/"):
        return None
    return os.path.join(IMAGES, raw[len("images/"):])


def before_bytes_for_source(src_text):
    total = 0
    seen = set()
    for tag in IMG_TAG_RE.findall(src_text):
        m = SRC_RE.search(tag)
        if not m:
            continue
        path = resolve_before_src(m.group(1))
        if not path or path in seen:
            continue
        size = file_size(path)
        if size is None:
            continue
        seen.add(path)
        total += size
    return total


def resolve_after_url(url):
    url = unquote(url)
    prefix = "/j-keebs/img/"
    if url.startswith(prefix):
        return os.path.join(SITE, "img", url[len(prefix):])
    if url.startswith("images/"):
        return os.path.join(SITE, url)
    if url.startswith("/j-keebs/images/"):
        return os.path.join(SITE, url[len("/j-keebs/"):])
    return None


def after_bytes_for_page(html):
    mid_total = 0
    all_total = 0
    mid_seen = set()
    all_seen = set()
    for tag in IMG_TAG_RE.findall(html):
        srcset_m = SRCSET_RE.search(tag)
        if srcset_m:
            candidates = [c.strip().split()[0] for c in srcset_m.group(1).split(",") if c.strip()]
            # "mid" file = the one also used as the plain src attribute
            src_m = SRC_RE.search(tag)
            mid_url = src_m.group(1) if src_m else (candidates[len(candidates) // 2] if candidates else None)
            if mid_url:
                p = resolve_after_url(mid_url)
                if p and p not in mid_seen:
                    size = file_size(p)
                    if size is not None:
                        mid_seen.add(p)
                        mid_total += size
            for cand in candidates:
                p = resolve_after_url(cand)
                if p and p not in all_seen:
                    size = file_size(p)
                    if size is not None:
                        all_seen.add(p)
                        all_total += size
        else:
            src_m = SRC_RE.search(tag)
            if not src_m:
                continue
            p = resolve_after_url(src_m.group(1))
            if p and p not in mid_seen:
                size = file_size(p)
                if size is not None:
                    mid_seen.add(p)
                    all_seen.add(p)
                    mid_total += size
                    all_total += size
    return mid_total, all_total


def main():
    base_src = open(BASE_INCLUDE, encoding="utf-8").read()
    rows = []
    for path in sorted(glob.glob(os.path.join(PAGES, "*.njk"))):
        name = os.path.splitext(os.path.basename(path))[0]
        page_src = open(path, encoding="utf-8").read()
        before = before_bytes_for_source(page_src + "\n" + base_src)

        html_path = os.path.join(SITE, name + ".html")
        if not os.path.isfile(html_path):
            continue
        html = open(html_path, encoding="utf-8").read()
        mid_after, all_after = after_bytes_for_page(html)
        rows.append((name, before, mid_after, all_after))

    total_before = sum(r[1] for r in rows)
    total_mid_after = sum(r[2] for r in rows)
    total_all_after = sum(r[3] for r in rows)

    print(f"{'page':<32}{'before (KB)':>14}{'after src (KB)':>16}{'after all srcset (KB)':>24}")
    for name, before, mid_after, all_after in rows:
        print(f"{name:<32}{before/1024:>14.0f}{mid_after/1024:>16.0f}{all_after/1024:>24.0f}")
    print("-" * 86)
    print(f"{'TOTAL (sum of pages)':<32}{total_before/1024:>14.0f}{total_mid_after/1024:>16.0f}{total_all_after/1024:>24.0f}")
    if total_before:
        pct = 100 * (1 - total_mid_after / total_before)
        print(f"\nReduction (before vs. after-src): {pct:.1f}%")


if __name__ == "__main__":
    sys.exit(main())
