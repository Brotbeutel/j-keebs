#!/usr/bin/env python3
"""Compare the German HTML defaults with the German i18n dictionaries.

Why: the site is client-side i18n (`data-i18n`). On load `applyLang()` replaces every `data-i18n` element's
text with the dictionary value, so the German text written in the template is only what no-JS visitors,
crawlers and the first paint see. If the template text and the German dictionary value differ, JS visitors
silently see different copy than the owner wrote (found 2026-10-14: About page `story.body`).
`ai/CONVENTIONS.md` requires them to be identical.

Usage (repo root, after `npm run build`):
    python scripts/de_default_audit.py [_site]
Needs: Python 3, Node (to read the dictionaries out of main.js and src/_data/i18n/*.js).
Exit code: 1 if any template default differs from its German dictionary value, else 0.

Reports two kinds of finding:
  HTML!=DE-dict       template text and German dictionary value differ (whitespace/entities normalised)
  HAS-CHILD-ELEMENTS  a data-i18n element contains child elements; textContent replacement would flatten them
Limits: values that contain markup are skipped; keys used only from JavaScript are not covered.
"""
import glob, html, json, os, re, subprocess, sys
from html.parser import HTMLParser

SITE = sys.argv[1] if len(sys.argv) > 1 else "_site"

DUMP = r"""
const fs=require('fs'),path=require('path');
const src=fs.readFileSync('main.js','utf8');
const s=src.indexOf('window.J_KEEBS_I18N_COMMON = ');
if(s<0){console.error('main.js: J_KEEBS_I18N_COMMON not found');process.exit(2);}
let i=src.indexOf('{',s),d=0,e=-1;
for(let k=i;k<src.length;k++){const c=src[k];if(c==='{')d++;else if(c==='}'){d--;if(d===0){e=k+1;break;}}}
const out={_common:eval('('+src.slice(i,e)+')')};
for(const f of fs.readdirSync('src/_data/i18n'))if(f.endsWith('.js'))out[f.slice(0,-3)]=require(path.resolve('src/_data/i18n',f));
console.log(JSON.stringify(out));
"""

def norm(s):
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

class Page(HTMLParser):
    VOID = {"img", "br", "input", "meta", "link", "hr", "source", "wbr"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.items = [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.stack and tag != "br":
            self.stack[-1]["children"] += 1
        if tag in self.VOID:
            return
        self.stack.append({"tag": tag, "key": a.get("data-i18n"), "text": "", "children": 0})
    def handle_endtag(self, tag):
        if tag in self.VOID:
            return
        while self.stack:
            node = self.stack.pop()
            if node["key"]:
                self.items.append(node)
            if node["tag"] == tag:
                break
    def handle_data(self, data):
        for node in self.stack:
            if node["key"]:
                node["text"] += data

def main():
    try:
        dicts = json.loads(subprocess.check_output(["node", "-e", DUMP]))
    except (OSError, subprocess.CalledProcessError) as exc:
        print(f"cannot read dictionaries (run from the repo root, Node required): {exc}")
        return 2
    common = dicts["_common"].get("de", {})
    findings, checked = [], 0
    for path in sorted(glob.glob(os.path.join(SITE, "*.html"))):
        slug = os.path.basename(path)[:-5]
        page = Page()
        page.feed(open(path, encoding="utf8").read())
        page_de = (dicts.get(slug, {}) or {}).get("de", {}) or {}
        for node in page.items:
            key = node["key"]
            de = page_de.get(key, common.get(key))
            if de is None:
                continue
            checked += 1
            text = norm(node["text"])
            if node["children"]:
                findings.append((slug, key, "HAS-CHILD-ELEMENTS", text[:70], ""))
            if norm(de) != text and not re.search(r"<[a-z]", de):
                findings.append((slug, key, "HTML!=DE-dict", text[:90], norm(de)[:90]))
    for slug, key, kind, a, b in findings:
        print(f"{slug}.html | {key} | {kind}\n    HTML: {a}" + (f"\n    DICT: {b}" if b else ""))
    print(f"checked {checked} keyed elements, findings: {len(findings)}")
    return 1 if findings else 0

if __name__ == "__main__":
    sys.exit(main())
