# Brief: ALFS website redesign

Target: audit and fully redesign the ALFS logistics marketing site (12 pages x EN/AR) as one coherent product. Stack: Next.js 16 App Router, Tailwind v4, next-intl, react-hook-form + zod.
References: no external references. The bar rests on the rubric, fresh-context critics and the "before" captures in `design-audit/screenshots/before/`.
Bar (UI mapping, /10): visual hierarchy 9, layout and composition 9, typography 9, colour-system consistency 9, component consistency 9, UX clarity 9, responsive quality 9. Accessibility: no known critical violations. Function: no known regressions.
Calibration offset: none yet (no user estimate).
Rules: keep the brand colours (navy family, orange #F47920). Existing photos and logo may be used. No new dependencies. All copy through messages/en.json and messages/ar.json. Every page keeps a matching skeleton. Slop bans: eyebrow labels, glass panels, glow blobs, dotted backgrounds, purple or lavender neutrals, decorative gradients, 01/02/03 counters as decoration.
Adaptation: Cook's video, offline-render, zero-asset and time-floor rules do not apply to a functional website. "Stills" are browser screenshots at 390 / 768 / 1440 in EN and AR.
Deliverable: implemented redesign, design-audit/01..06, before/after screenshots, this ledger.
Permissions: download no, push no, publish no, deploy no. Do not commit unless asked.
Safety: `.env` has a live Resend key. Never submit a real form; the harness mocks /api/contact.
Harness: scratchpad `pw/shoot.mjs <outDir> [--routes] [--vp] [--locales] [--states]`, `pw/sheet.mjs` folds tall captures. Dev server: `npx next dev -p 3111`.
Source of truth: design-audit/04-redesign-strategy.md and 05-design-system.md.
User's words: "Your objective is not to make the existing website slightly prettier. Your objective is to make it feel like a thoughtfully designed, professionally built product from end to end."
