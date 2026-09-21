#!/usr/bin/env python3
"""Link/asset/anchor check for the built site (_site/), as required by ai/CONVENTIONS.md 'Verification'.
Resolves every href/src against the page's public URL (/j-keebs/<file>), URL-decodes, checks the file
exists in _site/, and checks #anchors against the target page's ids. Also checks CSS url() references
and re-resolves 404.html at deep paths."""
import glob, os, re, sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse, unquote

SITE = sys.argv[1] if len(sys.argv) > 1 else "_site"
ORIGIN = "https://brotbeutel.github.io"
BASE = "/j-keebs/"

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []; self.ids = set(); self.base = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: self.ids.add(a["id"])
        if tag == "a" and "name" in a: self.ids.add(a["name"])
        if tag == "base": self.base.append(a.get("href"))
        for k in ("href", "src"):
            if k in a and a[k] is not None:
                self.refs.append((tag, k, a[k]))
        if "srcset" in a and a["srcset"]:
            for part in a["srcset"].split(","):
                self.refs.append((tag, "srcset", part.strip().split()[0]))

def parse(path):
    p = P(); p.feed(open(path, encoding="utf-8").read()); return p

pages = {os.path.basename(f): parse(f) for f in sorted(glob.glob(f"{SITE}/*.html"))}
errors = []; checked = 0

def check(page_name, page_url, tag, attr, ref):
    global checked
    if ref.startswith(("mailto:", "tel:", "data:", "javascript:")): return
    if ref.startswith("#") and not (page_name in pages and pages[page_name].base):
        # pure in-page anchor without <base>: stays in the current document
        checked += 1
        if ref[1:] and unquote(ref[1:]) not in pages[page_name].ids:
            errors.append((page_name, page_url, ref, "in-page anchor target id missing"))
        return
    base_href = pages[page_name].base[0] if page_name in pages and pages[page_name].base else None
    full = urljoin(ORIGIN + page_url, ref) if not base_href else urljoin(urljoin(ORIGIN + page_url, base_href), ref)
    u = urlparse(full)
    if u.netloc and u.netloc != urlparse(ORIGIN).netloc: return   # external
    checked += 1
    path = unquote(u.path)
    if not path.startswith(BASE):
        errors.append((page_name, page_url, ref, f"resolves outside {BASE}: {path}")); return
    rel = path[len(BASE):] or "index.html"
    target = os.path.join(SITE, rel)
    if not os.path.isfile(target):
        errors.append((page_name, page_url, ref, f"missing file {rel}")); return
    if u.fragment and rel.endswith(".html"):
        tp = pages.get(rel)
        if tp is None or unquote(u.fragment) not in tp.ids:
            errors.append((page_name, page_url, ref, f"missing anchor #{u.fragment} in {rel}"))

for name, p in pages.items():
    for tag, attr, ref in p.refs:
        check(name, BASE + name, tag, attr, ref)

# 404 at other depths (GitHub Pages serves 404.html under the requested URL)
if "404.html" in pages:
    p404 = pages["404.html"]
    if p404.base:
        errors.append(("404.html", "-", "<base>", f"404.html has a <base> element: {p404.base}"))
    for depth in ("/j-keebs/foo", "/j-keebs/foo/bar", "/j-keebs/a/b/c/d/e"):
        for tag, attr, ref in p404.refs:
            check("404.html", depth, tag, attr, ref)

# CSS url() references, relative to /j-keebs/style.css
css = open(f"{SITE}/style.css", encoding="utf-8").read()
for m in re.finditer(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', css):
    check("style.css", BASE + "style.css", "css", "url", m.group(1))

print(f"pages: {len(pages)}, references checked: {checked}, errors: {len(errors)}")
for e in errors[:40]: print("  ERR", e)
sys.exit(1 if errors else 0)
