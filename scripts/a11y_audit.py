#!/usr/bin/env python3
"""Static accessibility / markup hygiene scan of the built site. No browser needed, so it cannot replace
Lighthouse, a screen-reader pass or a real-device test (see ai/TOOLS.md "What these tools cannot see").

Usage (repo root, after `npm run build`):
    python scripts/a11y_audit.py [_site] [--hosts]
Exit code: 1 if any ERROR, else 0. Warnings never fail the run.
--hosts  also print every external host linked/loaded per page (input for the Lawyer role's data-flow inventory).

ERROR  duplicate id; <img> without alt; target=_blank without rel=noopener; link or button without an
       accessible name; form control without label/aria-label (wrapping <label>, <label for=id> and hidden honeypots all count); page without exactly
       one <h1>; duplicate <title> or meta description across pages
WARN   heading level skip (e.g. h1 -> h3); inline event handler (onclick, ...); focusable <div> (tabindex)
       without a role; meta description outside 50-160 characters
INFO   <html lang> per page (the site deliberately uses lang="en" everywhere, see ai/DECISIONS.md)
"""
import collections, glob, os, re, sys
from html.parser import HTMLParser

args = [a for a in sys.argv[1:] if not a.startswith("--")]
SITE = args[0] if args else "_site"
SHOW_HOSTS = "--hosts" in sys.argv

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = collections.Counter(); self.headings = []; self.noalt = []; self.blank = []
        self.inline = []; self.noname = []; self.unlabeled = []; self.tabindex = []
        self.title = ""; self.in_title = False; self.meta = {}; self.lang = None
        self.cur = None; self.cur_text = ""; self.cur_attrs = {}; self.in_label = 0
        self.hosts = set(); self.label_for = set(); self.controls = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: self.ids[a["id"]] += 1
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self.in_title = True
        if tag == "meta" and (a.get("name") or a.get("property")):
            self.meta[a.get("name") or a.get("property")] = a.get("content", "")
        if re.fullmatch(r"h[1-6]", tag): self.headings.append(int(tag[1]))
        if tag == "img":
            if "alt" not in a: self.noalt.append(a.get("src"))
            elif self.cur in ("a", "button") and a["alt"]: self.cur_text += a["alt"]
        if tag == "a":
            self.cur, self.cur_text, self.cur_attrs = "a", a.get("aria-label", ""), a
            if a.get("target") == "_blank" and "noopener" not in (a.get("rel") or ""):
                self.blank.append(a.get("href"))
        if tag == "button":
            self.cur, self.cur_text, self.cur_attrs = "button", a.get("aria-label", ""), a
        for k, v in a.items():
            if k.startswith("on") and len(k) > 2: self.inline.append(f"<{tag} {k}=…>")
        for attr in ("href", "src", "action"):
            v = a.get(attr, "")
            if v.startswith("http"):
                host = v.split("/")[2]
                if "brotbeutel.github.io" not in host: self.hosts.add(host)
        if tag == "label":
            self.in_label += 1
            if a.get("for"): self.label_for.add(a["for"])
        if tag in ("input", "textarea", "select") and a.get("type") != "hidden":
            hidden = "display:none" in a.get("style", "").replace(" ", "")
            named = bool(self.in_label or a.get("aria-label") or a.get("aria-labelledby") or hidden)
            self.controls.append((f"<{tag} name={a.get('name')}>", a.get("id"), named))
        if tag == "div" and a.get("tabindex") is not None and "role" not in a:
            self.tabindex.append(a.get("id") or "(no id)")
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "label": self.in_label -= 1
        if tag == self.cur and tag in ("a", "button"):
            if not self.cur_text.strip():
                self.noname.append(f"<{tag}> {self.cur_attrs.get('href') or self.cur_attrs.get('class') or self.cur_attrs.get('id')}")
            self.cur = None
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.cur: self.cur_text += data

errors, warns, infos = [], [], []
titles, descs, hosts = collections.defaultdict(list), collections.defaultdict(list), {}
paths = sorted(glob.glob(os.path.join(SITE, "*.html")))
for path in paths:
    name = os.path.basename(path)
    p = Page(); p.feed(open(path, encoding="utf8").read())
    # a control is labelled if wrapped by <label>, has aria-label(ledby), is a hidden honeypot, or a <label for=id> points at it
    p.unlabeled = [d for d, cid, named in p.controls if not (named or (cid and cid in p.label_for))]
    titles[p.title.strip()].append(name)
    desc = p.meta.get("description", "")
    descs[desc].append(name)
    hosts[name] = p.hosts
    for i in [k for k, v in p.ids.items() if v > 1]: errors.append(f"{name}: duplicate id '{i}'")
    for s in p.noalt: errors.append(f"{name}: <img> without alt: {s}")
    for h in p.blank: errors.append(f"{name}: target=_blank without noopener: {h}")
    for n in p.noname: errors.append(f"{name}: no accessible name: {n}")
    for u in p.unlabeled: errors.append(f"{name}: form control without label: {u}")
    if p.headings.count(1) != 1: errors.append(f"{name}: {p.headings.count(1)} <h1> elements (expected 1)")
    skips = [f"h{a}->h{b}" for a, b in zip(p.headings, p.headings[1:]) if b - a > 1]
    if skips: warns.append(f"{name}: heading skip {', '.join(skips[:4])}")
    if p.inline: warns.append(f"{name}: inline handlers {', '.join(sorted(set(p.inline))[:4])}")
    if p.tabindex: warns.append(f"{name}: focusable <div> without role: {', '.join(p.tabindex)}")
    if not 50 <= len(desc) <= 160: warns.append(f"{name}: meta description length {len(desc)}")
    infos.append((name, p.lang))
for t, n in titles.items():
    if len(n) > 1: errors.append(f"duplicate <title> '{t}': {', '.join(n)}")
for d, n in descs.items():
    if len(n) > 1 and d: errors.append(f"duplicate meta description: {', '.join(n)}")

for e in errors: print("ERROR", e)
for w in warns: print("WARN ", w)
langs = collections.Counter(l for _, l in infos)
print(f"INFO  <html lang> values: {dict(langs)}")
if SHOW_HOSTS:
    allhosts = collections.defaultdict(list)
    for n, hs in hosts.items():
        for h in hs: allhosts[h].append(n)
    for h, n in sorted(allhosts.items()):
        print(f"HOST  {h}: {len(n)} page(s), e.g. {', '.join(sorted(n)[:3])}")
print(f"pages: {len(paths)}, errors: {len(errors)}, warnings: {len(warns)}")
sys.exit(1 if errors else 0)
