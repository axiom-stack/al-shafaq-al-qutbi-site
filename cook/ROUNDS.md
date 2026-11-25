# Cook ledger: ALFS website redesign

Started: 2026-11-15 20:10 (local)
Time: no floor, no cap (functional website; see BRIEF adaptation)
Bar: hierarchy 9 | layout 9 | typography 9 | colour 9 | components 9 | UX clarity 9 | responsive 9 (all /10, eyeballed by critics)
Calibration offset: none yet
Gate: user approval of stills not required by the brief; no deploy, no push
Best so far: round 7 (final), `design-audit/screenshots/after/`

## Checklist

- [x] Cook installed (.agents/skills/cook), harness built
- [x] 01 product discovery
- [x] 02 visual audit + before screenshots (72 pages + states)
- [x] 03 brand and colours
- [x] 04 strategy
- [x] 05 design system doc
- [x] Tokens + primitives
- [x] Header / mobile menu / footer
- [x] Home
- [x] Service detail x6
- [x] Services index
- [x] Contact
- [x] About
- [x] Careers
- [x] 404
- [x] Forms
- [x] Skeletons
- [x] Critic rounds
- [x] Regression pass + after screenshots
- [x] 06 final report

## Decisions

Made without asking, one line each.
- Intake questions skipped: the brief answered everything and asked for autonomous work.
- Primary button ink is navy on orange, because white on #F47920 is 2.76:1 and the orange must not change.
- Tracking entry points removed, because no tracking feature exists and the link looped to itself.
- Harness mocks /api/contact and stubs the Google Maps iframe, because the Resend key is live and the map is third-party.
- Playwright lives in cook/harness (own package.json, node_modules gitignored), not in the app's package.json. The scratchpad copy was lost in a session reset, so the harness is now kept in the repo.

## User feedback inbox

- 2026-11-16 "GIT IGNORE THE IMAGES, AND FIX ALL THE DESIGN ISSUES LEFT" | round 7 | done, proof: `.gitignore` line for design-audit/screenshots; design-audit/06-final-report.md "Round 7"
- 2026-11-16 "move coverage to its own page, stop sending to home page and scrolling. also the coverage image should change. do all of that after this round is complete and finished only." | round 6 | done, proof: design-audit/screenshots/after/coverage__*.jpg; nav check prints `/coverage`, scrollY 0, active item Coverage

---

## Round 00 (baseline)

Focus: capture and audit the existing site.
Stills: `design-audit/screenshots/before/`
Measured: overflow 0 px on 72 captures; console errors none besides the 404 route; white on orange 2.76:1; services page 7,852 px desktop / 11,852 px mobile; 45 arbitrary font sizes, 23 hex literals, 15 shadows in page code.
Scores: not scored by critics (baseline). Findings in design-audit/02-visual-audit.md.
Next focus: tokens, primitives, shell.

## Round 01 (first build)

Focus: build the whole system in one pass so pages can be judged together.
Changes:
- `src/app/globals.css`: new tokens (navy / orange / neutral ramps, semantic), 7-step type scale (`.t-*`), `.btn*`, `.field-control`, `.shell`, section rhythm, RTL type rules.
- New primitives in `src/components/ui/`: Button (ButtonLink, ArrowLink), Section + SectionHeader, PageHero + HeroImage, ClosingBand, Blocks (FeatureList, Steps, CheckList, ServiceTile, Tag, IconWell).
- Shell: PublicNavbar (72 px, mobile sheet, skip link, Escape, scroll lock), LocaleSwitch (single endonym toggle), PublicFooter (navy-950, description, formatted phones), PublicMap (now a location block with address, hours, directions).
- Pages rewritten: home, services, service detail template, about, contact, careers, not-found.
- Forms: FormPrimitives rebuilt (Field, fieldProps with aria-invalid / aria-describedby, announced SubmissionNotice, SubmitButton); three forms restyled; logic untouched.
- Skeletons: PageSkeleton rebuilt from the same layout proportions.
- Removed: HeroBackdropWithSkeleton, CoreServiceCard, NotFoundSkeleton (dead after the rewrite).
- Copy: 22 new keys in en.json and ar.json (kept in sync).
Decisions:
- Use the six clean service photographs (`serviceHeroImages`) everywhere; the poster versions with baked-in headlines are no longer shown.
- Service detail secondary hero button now always goes to `#process` with the process heading as label (air freight's said "Track Shipment").
- Contact page uses a text header (no photograph) so the form starts in the first screen.
Own review (self-scored, not decisive): pages coherent; issues found and fixed in this round: about diagram label collision, services index reused the sea-freight photo, home hero showed the QR code baked into the photo.
Gotcha: Turbopack served a stale stylesheet after globals.css was replaced; fixed by deleting `.next` and restarting dev.
Next focus: mobile + Arabic review, then fresh-context critics.

## Round 02 (image clean-up, harness rebuild)

Changes: cropped clean copies of four images that had logos / QR / lettering baked in (`hero-clean.jpg`, `regional-core-clean.jpg`, `about-hero-clean.jpg`, `our-team-clean.jpg`); careers and contact use a text `PageHeader`; careers shows the team photo in content; dead `tailwind.config.ts` and unused component code removed; `text-ui` / `text-item` tokens replace two arbitrary sizes.
Harness: now in `cook/harness/` (`shoot.mjs`, `sheet.mjs`, `crop.mjs`, `axe.mjs`). Verification runs against `next build` + `next start -p 3111` because `next dev` kept serving a stale stylesheet after token edits.

## Round 03 (first critic round)

Stills: `cook/harness/out/r3/` (gitignored working copies). 72 page captures + 40 state checks.
Measured: overflow 0 px on 72/72; broken images 0; exactly one h1 on every page; console errors none except the 404 resource on the not-found route; `next build` passes; tsc clean. State checks passed: mobile menu opens and closes on Escape, all three forms mark fields `aria-invalid` on empty submit, mocked quote submit shows the status notice, skip link and nav focus visible, transition skeleton renders.
axe-core (48 page states, WCAG 2 A/AA + best practice): 3 rule failures. `definition-list` / `dlitem` in the location block (my markup), `color-contrast` on the decorative 404 numeral, `region` for the floating WhatsApp link outside a landmark.

Scores, eyeballed, 2 fresh-context critics (same model), raw, no calibration offset:

| Dimension | Critic A (desktop, tablet, AR desktop) | Critic B (mobile, AR mobile) |
|---|---|---|
| Visual hierarchy | 6 | 7 |
| Layout and composition | 6 | 6 |
| Typography | 6 | 6 |
| Colour consistency | 7 | 8 |
| Component consistency | 6 | 7 |
| UX clarity | 6 | 6 |
| Responsive | 6 | 7 |
| Accessibility (visual) | not scored | 6 |

Own score (logged, never decides): about 8. The critics are right that this was too high.

Top gaps from critics (both agreed on most):
1. No proof content (years, volumes, licences, clients). Content the client must supply; cannot be invented.
2. Services index: "Request a quote" is weaker than "Service details" in every row.
3. Service detail repeats the same six items in four places (two chip rows, when-to-choose, capabilities).
4. Copy uses "FOB" where the description means FCL. Content issue to raise with the client; not changed silently.
5. Contact details repeated up to four times per page; location block on home and about duplicates the footer.
6. Small text: list descriptions, footer labels; worse in Arabic.
7. Component drift: three feature-list formats in services rows, step badges navy vs orange, service names and order differ between home and services.
8. About: too long, generic lists, weak hub diagram.
9. Closing band merges with the footer (navy on navy). Careers closing band redundant.
10. Mobile: hero photo too dark, no quote button in the header at 768, floating WhatsApp overlaps the submit button, tiny WhatsApp icon in the menu, success state leaves the empty form in place.
Also: quote form has no structured fields (origin, destination). Logged as a recommendation: it needs schema, API and email-template changes, which the brief asks not to make for a redesign.

Next focus: fix 2, 3, 5 to 10 and the axe failures; rerun critics.

## Round 04 (fixes from critic round 3)

Changes: services rows lead with "Request a quote"; service detail loses both chip rows and the separate capabilities section (capabilities now a ruled table beside the form); home loses the process band and the location block; about merges values into the navy band and drops the hub diagram; contact loses the support box and duplicate numbers; careers loses its closing band; closing band is now light; step badges one colour; list descriptions 16 px; Arabic root size 106.25%; quote button in the header from 640 px; floating WhatsApp hides while a form field is focused and sits in a landmark; forms replace their fields with the confirmation on success; location block rebuilt without `dl`.
Measured: axe 48 states, 0 violations. Capture 72 pages + 40 states, no issues.

## Round 05 (second critic round)

Change before scoring: on phones and tablets the hero photograph is its own clear block above the text.
Scores, eyeballed, 2 fresh-context critics, raw:
Desktop: hierarchy 7, layout 6, typography 6, colour 7, components 6, UX 7, responsive 6.
Mobile: hierarchy 7, layout 7, typography 7, colour 8, components 7, UX 6, responsive 7, accessibility 6.
Top gaps: services rows broken at 768 px (two narrow columns); nine orange buttons on the services page; pages long on phones; one repeated section pattern; WhatsApp button overlapping controls; flat contact / careers headers; proof content and FOB/FCL (client).
Note: both critics first failed on a usage limit and were resumed.

## Round 06 (final fixes, coverage page, regression)

User feedback handled: coverage is now `/coverage` (page, skeleton, nav, footer, home and about links); coverage imagery changed to the road / sea / air photographs.
Fixes from round 5: services rows single column below 1024 px; tile links pinned to the bottom; one icon well style; lighter step rules; header actions under the text; white sub-headings with an orange rule on navy; directions button uses the secondary style; five-step row no longer orphans a step on phones; menu contact buttons 48 px.
Measured (final build): 78 page captures, overflow 0, broken images 0, one h1 each; 40 state checks pass; axe 52 states, 0 violations; navigation checks pass.
Not checked this round: critics were not re-run after these fixes; no real form submission (mocked); no non-Chrome browser.
Stop check: bar no (critics at about 7, target 9) | user asked to finish | final checked yes -> stop, with remaining gaps listed in design-audit/06-final-report.md.

## Round 07 (remaining design issues, at the user's request)

Changes: see the "Round 7" table in design-audit/06-final-report.md. New `FeatureGrid` block; compact `Steps` on phones; service detail form follows the overview on phones; services rows shorter on phones and orange rationed; floating WhatsApp appears after the first screen; footer two columns on phones and one navy; label casing; 404 with service links; screenshots gitignored.
Measured: services 390 px 9,457 -> 6,734 px; 78 captures clean; 40 state checks pass; axe 52 states, 0 violations.
Not checked: critics not re-run; no real form submission; Chrome only.
