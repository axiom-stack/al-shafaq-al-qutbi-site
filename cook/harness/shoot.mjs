// Full-site screenshot + health harness.
// usage: node shoot.mjs <outDir> [--routes a,b] [--vp 390,768,1440] [--locales en,ar] [--states] [--q 72]
// Never sends a real form: /api/contact is mocked. The Google Maps iframe is stubbed.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3111';
const args = process.argv.slice(2);
const outDir = args[0];
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i === -1 ? def : args[i + 1]; };
export const ALL = {
  home: '/', about: '/about', services: '/services',
  'svc-sea': '/services/sea-freight', 'svc-land': '/services/land-freight', 'svc-air': '/services/air-freight',
  'svc-consolidation': '/services/cargo-consolidation', 'svc-warehousing': '/services/warehousing', 'svc-customs': '/services/customs-clearance',
  coverage: '/coverage', careers: '/careers', contact: '/contact', notfound: '/this-page-does-not-exist',
};
const routeNames = opt('routes', Object.keys(ALL).join(',')).split(',');
const vps = opt('vp', '390,768,1440').split(',').map(Number);
const locales = opt('locales', 'en,ar').split(',');
const doStates = args.includes('--states');
const quality = Number(opt('q', '72'));

fs.mkdirSync(outDir, { recursive: true });
const report = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    const imgs = [...document.images];
    await Promise.race([
      Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))),
      new Promise((r) => setTimeout(r, 15000)),
    ]);
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 900));
  });
  await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
}

for (const locale of locales) {
  for (const w of vps) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w >= 1000 ? 900 : w >= 700 ? 1024 : 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await ctx.addCookies([{ name: 'ALFS_LOCALE', value: locale, url: BASE }]);
    await ctx.route('**/api/contact', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: locale === 'ar' ? 'تم إرسال النموذج بنجاح (محاكاة).' : 'Your form has been submitted successfully. (mocked)' }) }));
    await ctx.route('**maps.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<body style="margin:0;background:#dfe5f0;font:14px sans-serif;display:grid;place-items:center;height:100vh;color:#5b6275">map embed (stubbed in harness)</body>' }));
    const page = await ctx.newPage();
    for (const name of routeNames) {
      const errors = [];
      const onConsole = (m) => m.type() === 'error' && errors.push(m.text().slice(0, 300));
      const onPageErr = (e) => errors.push('pageerror: ' + String(e).slice(0, 300));
      page.on('console', onConsole); page.on('pageerror', onPageErr);
      let status = 0;
      try {
        const res = await page.goto(BASE + ALL[name], { waitUntil: 'domcontentloaded', timeout: 90000 });
        status = res?.status() ?? 0;
        await settle(page);
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight, h1: document.querySelectorAll('h1').length, dir: document.documentElement.dir, broken: [...document.images].filter((i) => !i.complete || !i.naturalWidth).length }));
        const file = `${name}__${locale}__${w}.jpg`;
        await page.screenshot({ path: path.join(outDir, file), fullPage: true, type: 'jpeg', quality });
        report.push({ name, locale, w, status, overflow: m.sw - m.cw, height: m.h, h1: m.h1, dir: m.dir, brokenImages: m.broken, errors });
        console.log(`${file} status=${status} overflow=${m.sw - m.cw} h=${m.h} h1=${m.h1} brokenImg=${m.broken} errors=${errors.length}`);
      } catch (e) {
        report.push({ name, locale, w, status, fail: String(e).slice(0, 200), errors });
        console.log(`FAIL ${name} ${locale} ${w}: ${String(e).slice(0, 200)}`);
      }
      page.off('console', onConsole); page.off('pageerror', onPageErr);
    }

    if (doStates) {
      const shot = (n, o = {}) => page.screenshot({ path: path.join(outDir, `state-${n}__${locale}__${w}.jpg`), type: 'jpeg', quality, ...o });
      const tryState = async (n, fn) => {
        try { await fn(); console.log(`state-${n} ok (${locale} ${w})`); report.push({ state: n, locale, w, ok: true }); }
        catch (e) { console.log(`state-${n} FAIL (${locale} ${w}): ${String(e).slice(0, 200)}`); report.push({ state: n, locale, w, fail: String(e).slice(0, 200) }); }
      };
      if (w < 1024) {
        await tryState('menu-open', async () => {
          await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' }); await settle(page);
          await page.locator('header button[aria-expanded]').first().click();
          await page.waitForTimeout(500); await shot('menu-open');
          await page.keyboard.press('Escape'); await page.waitForTimeout(300);
          if (await page.locator('#mobile-menu').count()) throw new Error('menu did not close on Escape');
        });
      }
      for (const [n, url, sel] of [['contact', '/contact', '#inquiry-form'], ['careers', '/careers', '#application-form'], ['quote', '/services/sea-freight', '#quote-form']]) {
        await tryState(`form-${n}-errors`, async () => {
          await page.goto(BASE + url, { waitUntil: 'domcontentloaded' }); await settle(page);
          const form = page.locator(sel).first();
          await form.scrollIntoViewIfNeeded();
          await form.locator('button[type=submit]').click();
          await page.waitForTimeout(600);
          const invalid = await form.locator('[aria-invalid="true"]').count();
          if (!invalid) throw new Error('no fields marked invalid after empty submit');
          await form.screenshot({ path: path.join(outDir, `state-form-${n}-errors__${locale}__${w}.jpg`), type: 'jpeg', quality });
        });
      }
      await tryState('form-quote-success', async () => {
        const form = page.locator('#quote-form').first();
        await form.locator('input[name=name]').fill('Test Shipper');
        await form.locator('input[name=email]').fill('shipper@example.com');
        await form.locator('textarea[name=cargoDetails]').fill('2 x 40ft containers of ceramic tiles, Aqaba to Riyadh, ready next week.');
        await form.locator('button[type=submit]').click();
        await page.locator('#quote-form [role=status]').waitFor({ timeout: 8000 });
        await page.waitForTimeout(700);
        await shot('form-quote-success');
      });
      await tryState('focus-nav', async () => {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' }); await settle(page);
        await page.keyboard.press('Tab'); await page.waitForTimeout(150);
        await shot('focus-skiplink', { clip: { x: 0, y: 0, width: w, height: 200 } });
        for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
        await page.waitForTimeout(150);
        await shot('focus-nav', { clip: { x: 0, y: 0, width: w, height: 200 } });
      });
      await tryState('skeleton', async () => {
        // Hold the next navigation so the transition skeleton stays on screen.
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' }); await settle(page);
        const hold = async (route) => { await new Promise((r) => setTimeout(r, 2600)); try { await route.continue(); } catch {} };
        await page.route('**/services?_rsc=*', hold);
        if (w < 1024) { await page.locator('header button[aria-expanded]').first().click(); await page.waitForTimeout(300); await page.locator('#mobile-menu a[href="/services"]').first().click(); }
        else await page.locator('header nav a[href="/services"]').first().click();
        await page.waitForTimeout(900); await shot('skeleton-services');
        await page.waitForTimeout(2600); await page.unroute('**/services?_rsc=*', hold);
      });
    }
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(outDir, `report-${Date.now()}.json`), JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.fail || (r.overflow ?? 0) > 0 || (r.brokenImages ?? 0) > 0 || (r.h1 !== undefined && r.h1 !== 1) || (r.errors?.length ?? 0) > 0 || (r.status && r.status >= 400 && r.name !== 'notfound'));
console.log(`\nDONE ${report.length} records, ${bad.length} with issues`);
for (const b of bad) console.log(JSON.stringify(b));
