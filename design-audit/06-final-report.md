# 06. Final report

Date: 2026-11-16. Scope: every route of the ALFS site, English and Arabic, at 390 / 768 / 1440 px.

## Outcome in one paragraph

The whole site was rebuilt on one design system: new tokens, type scale, shared primitives, header, mobile menu, footer, forms and skeletons, and every page restructured. Brand colours are unchanged. All measured checks pass (build, types, overflow, images, automated accessibility, form and navigation behaviour). Independent critics scored the result at roughly **7/10**, up from a baseline they were not asked to score but which the audit documents in detail. **The 9/10 target in the brief was not reached**; the reasons and the remaining gaps are listed below without softening.

## What changed, and why

| Area | Before | After | Reason |
|---|---|---|---|
| Colour | Lavender neutrals, 23 hex literals, orange on everything, white text on orange (2.76:1) | Navy-tinted neutrals, tokens only, orange limited to the main action and small marks, navy text on orange (5.56:1) | Brand rule "orange is an accent", contrast |
| Type | 45 arbitrary sizes, 11 to 13 px descriptions, 12 px navigation | Seven-step scale, 16 px body, 15 px navigation, Arabic scaled up 6% with its own line heights | Readability, especially Arabic on phones |
| Photography | Hidden under 78% navy overlays; posters with baked-in headlines used as card backgrounds | Shown clear; scrim only behind the text column on desktop, a separate image block on phones; four cropped copies remove baked-in logos, a QR code and lettering | The photos carry the brand better than flat fills |
| Header | 56 px, tiny logo, plain mobile list | 72 px, readable logo, full-height mobile sheet with services and call / WhatsApp / email, skip link, Escape to close, scroll lock | First impression, mobile reach |
| Home | Four shortcut cards (one a dead end), empty half-section, orange band, 4,230 px | Services directly under the hero, why-ALFS, coverage teaser, closing band; 3,600 px | Next step is choosing a service |
| Services index | 7,852 px of posters, hover-only text, mismatched buttons | In-page index, six consistent rows with "Request a quote" as the button, 6,500 px | Scannable catalogue |
| Service detail (x6) | Quote form 8th of 10 sections; 25 look-alike cards; same items listed four times | Form beside the overview and sticky on desktop; capabilities as a ruled table; duplicate chip rows removed | The form is the point of the page |
| About | Logo printed over the hero text; clipped diagram | Clean hero, statements and values on navy, team, coverage link | Legibility, less repetition |
| Contact | Form began 740 px down | Compact text header, form and channels in the first screen, one location block | The page exists to make contact |
| Careers | Highlights shown twice, orange band | Text header, team photo with highlights, process beside the form | Say it once |
| Coverage | A home-page anchor that scrolled | **Own page at `/coverage`**, linked from the header, footer, home and about; new imagery | Requested by the owner during the run |
| Forms | "* *" legend bug, no error association, 40 px inputs | Linked labels and errors (`aria-invalid`, `aria-describedby`), 48 px controls, announced result, loading state, success state that replaces the fields | Accessibility and clarity |
| 404 | Developer wording | Plain language, three exits | Tone |
| Skeletons | Matched the old layouts | Rebuilt for each new layout, including coverage | Project rule |
| Trust | "Track Shipment" links that looped; "24/7" claim; "View Routes" going to a quote form | Removed or relabelled | The site should not promise what it does not do |

Brand and colour detail: `03-brand-and-colors.md`. System reference: `05-design-system.md`.

## Deviations from the written strategy (decided during critic rounds)

- The closing band became **light** (white with a short orange rule) instead of navy, because navy on the navy footer merged into one block.
- The "How it works" band on home was removed: its three steps had three-word descriptions and contradicted the five- and six-step sequences elsewhere.
- The location block was removed from home and about (it duplicated the footer) and kept on contact and coverage.
- The hand-drawn hub diagram on about was dropped in favour of a link to the coverage page.
- Contact and careers use a text header instead of a photograph so the form starts sooner.

## Verified (measured, final build)

Run against `next build` + `next start`, harness in `cook/harness/`.

| Check | Result |
|---|---|
| `next build` | Passes, 13 routes |
| `tsc --noEmit` | Clean |
| Page captures | 78 (13 routes x 2 locales x 3 widths) |
| Horizontal overflow | 0 px on 78/78 |
| Broken images | 0 |
| Exactly one `h1` per page | 78/78 |
| Console errors | None, except the browser's own 404 resource line on the not-found route |
| axe-core, WCAG 2 A/AA + best practice | 52 page states scanned, **0 violations** (3 rules failed mid-project and were fixed) |
| Mobile menu | Opens; closes on Escape (EN and AR, 390 and 768) |
| Forms | All three mark fields invalid on empty submit; quote form shows the status notice on a mocked success |
| Keyboard | Skip link is first in tab order and visible; focus ring visible on header links |
| Transition skeleton | Renders during a held navigation |
| Navigation | Header and footer "Coverage" open `/coverage` at scroll 0 with the nav item active; home quote CTA lands on `/contact#inquiry-form`; legacy `/en/...` redirects; language switch flips to RTL |
| Message files | `en.json` and `ar.json` have identical key sets |

Not verified, stated plainly:
- **No real form was ever submitted.** `.env` holds a live Resend key, so `/api/contact` was mocked in every test. The API route, validation schemas and email code were not modified, but end-to-end delivery was not exercised.
- The careers file upload was not exercised with a real file.
- The Google Maps embed is stubbed in captures; it was not visually checked.
- No screen-reader session, no real iOS or Android device, no Safari or Firefox. Chrome only.
- There is no test suite or lint config in the project, so "tests pass" means build, types and the browser harness.
- A zero from axe is not proof of accessibility.

## Critic scores (subjective, fresh-context agents, same model, screenshots only)

| Dimension | Round 3 desktop | Round 3 mobile | Round 5 desktop | Round 5 mobile |
|---|---|---|---|---|
| Visual hierarchy | 6 | 7 | 7 | 7 |
| Layout and composition | 6 | 6 | 6 | 7 |
| Typography | 6 | 6 | 6 | 7 |
| Colour consistency | 7 | 8 | 7 | 8 |
| Component consistency | 6 | 7 | 6 | 7 |
| UX clarity | 6 | 6 | 7 | 6 |
| Responsive | 6 | 7 | 6 | 7 |
| Accessibility (visual) | - | 6 | - | 6 |

Changes made **after** round 5 were not re-scored: services rows collapse to one column below desktop (the one layout the desktop critic called broken at 768 px), tile links pinned to the card bottom, one icon style, lighter step rules, header actions under the text on contact and careers, white sub-headings on navy, the directions button restyled, and the new coverage page. They are verified by the measured checks above only.

My own estimate was about 8 before the first critic round. The critics were right that this was too high.

## Remaining limitations

Design: the six items listed in the first version of this report were addressed in round 7 (see "Round 7" below). What is still open:
1. Service detail pages are still about 7,600 px on a phone. The content is the client's and is now said once; shortening further means cutting copy.
2. Section patterns are now two (ruled rows, bordered grid) plus numbered steps. That is deliberate, and it is still a restrained system rather than a varied one.
3. Button wording still differs where the supplied copy differs ("Get a Quote", "Request Sea Freight Quote"); casing is now consistent.

Needs the business (cannot be designed around or invented):
1. **No proof content**: years in business, volumes, licences, client names, testimonials. Both critics ranked this first. It is the largest single lift available.
2. **"FOB" is used where the description means FCL** ("exclusive use of a container"), in both languages, on home, services and the whole sea freight page. Freight buyers will notice. I did not change it because it may be deliberate; please confirm.
3. The quote forms collect free text only. Structured fields (origin, destination, cargo, weight) would make them real quote forms but need schema, API and email-template changes.
4. Email domain `aurora-lfs.com` does not obviously match "ALFS".
5. Careers refers to listed roles; none are listed.
6. The coverage imagery was changed using photographs already in the repo (road, sea, air). If a specific new image was intended, drop it in and point `src/app/coverage/page.tsx` and the home teaser at it.
7. `contact.offices.description` says "Jordan and Palestine" while one office exists; that sentence is no longer rendered.

## Files

- Audit and system: `design-audit/01` to `06`
- Before / after: `design-audit/screenshots/before/` (72 pages + states, dev build) and `after/` (78 pages + 40 states, production build). Same naming: `<page>__<locale>__<width>.jpg`.
- Iteration ledger: `cook/ROUNDS.md`, brief: `cook/BRIEF.md`
- Harness: `cook/harness/` (`shoot.mjs`, `sheet.mjs`, `crop.mjs`, `axe.mjs`; run `npm i` there first)
- New code: `src/components/ui/`, `src/app/coverage/`
- Removed: `tailwind.config.ts` (unused under Tailwind v4), `HeroBackdropWithSkeleton`, `CoreServiceCard`, `NotFoundSkeleton`
- New image copies: `public/images/homepage/hero-clean.jpg`, `regional-core-clean.jpg` (now unreferenced), `public/images/about/about-hero-clean.jpg`, `our-team-clean.jpg`

Nothing was committed, pushed or deployed.

## Round 7 (remaining design issues)

Done after the report above, at the owner's request. Not scored by critics; verified by the measured checks only.

| Issue | Fix | Measured |
|---|---|---|
| Services page too long on phones | Per-service detail lists show from 768 px up; shorter images; tighter rows | 9,457 px to 6,734 px at 390 px |
| Quote form buried on service pages (phones) | Form now follows the overview directly; on desktop it stays sticky beside both text blocks | Form starts at 1,580 px at 390 px (was after capabilities and "why" lists) |
| Tall process lists on phones | Step number sits beside the text instead of above it | Service detail 7,943 px to about 7,600 px |
| One repeated section pattern | New `FeatureGrid` (bordered cells) for "when to choose" and the about values; rows kept for sequences and specs | - |
| Floating WhatsApp over controls | Appears only after 60% of the first screen is scrolled, steps aside near the footer, hidden while a form field is focused, 48 px on phones | Opacity 0 at top, 1 mid-page |
| Tall mobile footer | Services and Company side by side on phones | - |
| Two navies | Footer uses the same navy as sections, with a hairline above | - |
| Nine orange buttons on services | Orange only in the hero and closing band; row quote buttons are navy | - |
| Label casing | New English labels follow the supplied Title Case | - |
| "Our Network" vs "Coverage" | Footer link uses the header label | - |
| Contact header had no primary action | "Send a Message" restored beside "Call Our Team" | - |
| 404 half empty | Service links fill the far side; two actions instead of three | - |
| Screenshots in git | `/design-audit/screenshots/` added to `.gitignore` | - |

Final build after round 7: `next build` passes, tsc clean, 78 page captures with 0 overflow, 0 broken images and one h1 each, 40 state checks pass, axe 52 states with 0 violations.
