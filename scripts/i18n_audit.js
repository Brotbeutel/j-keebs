#!/usr/bin/env node
/* DE/EN dictionary audit for the client-side i18n (`data-i18n`, `data-i18n-attr`).

   Usage (repo root, after `npm run build`):  node scripts/i18n_audit.js [_site]
   Exit code: 1 on any ERROR, else 0.

   ERROR  key only in one language (common dictionary in main.js, or a page module in src/_data/i18n/)
   ERROR  a data-i18n / data-i18n-attr key used in the built HTML is missing from the merged dictionary
          (common + page module) in DE or EN
   ERROR  a page module exists but the built page does not emit it (`window.J_KEEBS_I18N`)
   INFO   page-module keys the page's own HTML never references (often used by JS or by neighbouring
          articles' prev/next links, so this alone is not a defect)
   Limits: keys built dynamically in main.js are not seen; values are not compared across languages. */
const fs = require('fs'), path = require('path');
const SITE = process.argv[2] || '_site';
const src = fs.readFileSync('main.js', 'utf8');
const start = src.indexOf('window.J_KEEBS_I18N_COMMON = ');
if (start < 0) { console.error('main.js: J_KEEBS_I18N_COMMON not found (run from the repo root)'); process.exit(2); }
let i = src.indexOf('{', start), depth = 0, end = -1;
for (let k = i; k < src.length; k++) { const c = src[k]; if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = k + 1; break; } } }
const COMMON = eval('(' + src.slice(i, end) + ')');
const dir = 'src/_data/i18n';
const pages = {};
for (const f of fs.readdirSync(dir)) if (f.endsWith('.js')) pages[f.replace(/\.js$/, '')] = require(path.resolve(dir, f));

const errors = [], info = [];
const cd = Object.keys(COMMON.de || {}), ce = Object.keys(COMMON.en || {});
cd.filter(k => !(k in COMMON.en)).forEach(k => errors.push(`common key only in DE: ${k}`));
ce.filter(k => !(k in COMMON.de)).forEach(k => errors.push(`common key only in EN: ${k}`));
for (const [name, d] of Object.entries(pages)) {
  const a = Object.keys(d.de || {}), b = Object.keys(d.en || {});
  a.filter(k => !(k in (d.en || {}))).forEach(k => errors.push(`${name}: key only in DE: ${k}`));
  b.filter(k => !(k in (d.de || {}))).forEach(k => errors.push(`${name}: key only in EN: ${k}`));
}
for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  const slug = f.replace(/\.html$/, '');
  const pd = pages[slug] || {};
  const keys = new Set();
  for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) keys.add(m[1]);
  for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) m[1].split(',').forEach(p => { const k = p.trim().split(':')[1]; if (k) keys.add(k); });
  for (const lang of ['de', 'en']) {
    const dict = Object.assign({}, COMMON[lang] || {}, pd[lang] || {});
    const missing = [...keys].filter(k => !(k in dict));
    if (missing.length) errors.push(`${f} [${lang}] missing ${missing.length} key(s): ${missing.slice(0, 12).join(', ')}`);
  }
  const emits = html.includes('window.J_KEEBS_I18N =') || html.includes('window.J_KEEBS_I18N=');
  if (!emits && Object.keys(pd).length) errors.push(`${f}: has a dictionary module but the page does not emit it`);
  const unused = Object.keys(pd.de || {}).filter(k => !keys.has(k) && !(k in (COMMON.de || {})));
  if (unused.length) info.push(`${f}: ${unused.length} page key(s) not referenced by its own HTML (e.g. ${unused.slice(0, 6).join(', ')})`);
}
errors.forEach(e => console.log('ERROR ' + e));
info.forEach(e => console.log('INFO  ' + e));
console.log(`errors: ${errors.length}, info: ${info.length}`);
process.exit(errors.length ? 1 : 0);
