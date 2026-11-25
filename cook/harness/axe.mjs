// axe-core scan of every route. usage: node axe.mjs [locales=en,ar] [widths=1440,390]
import { chromium } from 'playwright-core';
import { AxeBuilder } from '@axe-core/playwright';
const BASE = 'http://localhost:3111';
const routes = ['/', '/about', '/services', '/services/sea-freight', '/services/land-freight', '/services/air-freight', '/services/cargo-consolidation', '/services/warehousing', '/services/customs-clearance', '/coverage', '/careers', '/contact', '/nope-404'];
const locales = (process.argv[2] || 'en,ar').split(',');
const widths = (process.argv[3] || '1440,390').split(',').map(Number);
const b = await chromium.launch({ channel: 'chrome' });
const totals = {};
let pages = 0;
for (const locale of locales) for (const w of widths) {
  const c = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await c.addCookies([{ name: 'ALFS_LOCALE', value: locale, url: BASE }]);
  await c.route('**maps.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<html lang="en"><head><title>map</title></head><body><main><h1>map</h1></main></body></html>' }));
  const p = await c.newPage();
  for (const r of routes) {
    await p.goto(BASE + r, { waitUntil: 'load' });
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(900);
    const res = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).exclude('iframe').analyze();
    pages++;
    for (const v of res.violations) {
      const k = `${v.impact}|${v.id}`;
      (totals[k] ??= { help: v.help, count: 0, where: new Set(), sample: v.nodes[0]?.html?.slice(0, 160), detail: v.nodes[0]?.any?.[0]?.message?.slice(0, 200) });
      totals[k].count += v.nodes.length; totals[k].where.add(`${r} ${locale} ${w}`);
    }
  }
  await c.close();
}
await b.close();
console.log(`scanned ${pages} page states`);
const keys = Object.keys(totals).sort();
if (!keys.length) console.log('NO VIOLATIONS');
for (const k of keys) { const t = totals[k]; console.log(`\n${k}  nodes=${t.count} pages=${t.where.size}\n  ${t.help}\n  e.g. ${[...t.where].slice(0, 3).join(' ; ')}\n  ${t.sample}\n  ${t.detail ?? ''}`); }
