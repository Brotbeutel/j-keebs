#!/usr/bin/env python3
"""HTML tag-balance check on built pages. Prints per-page problems (mismatched / unclosed tags)."""
import glob, os, sys
from html.parser import HTMLParser
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}
class B(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.problems = []
    def handle_starttag(self, tag, attrs):
        if tag not in VOID: self.stack.append((tag, self.getpos()[0]))
    def handle_startendtag(self, tag, attrs): pass
    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.stack and self.stack[-1][0] == tag: self.stack.pop(); return
        # tolerate optional end tags only if a matching opener exists deeper
        idx = next((i for i in range(len(self.stack)-1, -1, -1) if self.stack[i][0] == tag), None)
        if idx is None: self.problems.append(f"stray </{tag}> line {self.getpos()[0]}")
        else:
            for t, ln in self.stack[idx+1:]: self.problems.append(f"unclosed <{t}> (line {ln}) before </{tag}> line {self.getpos()[0]}")
            del self.stack[idx:]
site = sys.argv[1]
total = 0
for f in sorted(glob.glob(f"{site}/*.html")):
    b = B(); b.feed(open(f, encoding="utf-8").read())
    probs = b.problems + [f"unclosed <{t}> (line {ln}) at EOF" for t, ln in b.stack]
    total += len(probs)
    if probs: print(os.path.basename(f), probs[:5])
print(f"{site}: pages={len(glob.glob(site+'/*.html'))} tag-balance problems={total}")
