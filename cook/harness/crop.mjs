// Viewport-only shots. usage: node crop.mjs <outDir> <locale> <width> <path[,path]> [scrollY]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [out, locale, w, paths, scroll = '0'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: 'chrome' });
const c = await b.newContext({ viewport: { width: +w, height: +w > 1000 ? 900 : 844 }, reducedMotion: 'reduce' });
await c.addCookies([{ name: 'ALFS_LOCALE', value: locale, url: 'http://localhost:3111' }]);
await c.route('**maps.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<body style="background:#dfe5f0"></body>' }));
const p = await c.newPage();
for (const path of paths.split(',')) {
  await p.goto('http://localhost:3111' + path, { waitUntil: 'load' });
  await p.waitForTimeout(1800);
  if (+scroll) { await p.evaluate((y) => window.scrollTo(0, y), +scroll); await p.waitForTimeout(700); }
  await p.screenshot({ path: `${out}/vp${path.replace(/\//g, '_') || '_'}__${locale}__${w}${+scroll ? '_' + scroll : ''}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
