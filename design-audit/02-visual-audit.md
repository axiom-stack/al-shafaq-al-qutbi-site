# 02. Visual audit (browser-based)

**Method.** Chrome driven by Playwright against `next dev`. Every route captured full-page at 390, 768 and 1440 px in English and Arabic (72 page captures), plus states: mobile menu open, each form after an empty submit, a filled quote form with a mocked success response, keyboard focus in the header. Console errors and horizontal overflow were recorded for every capture.

Evidence lives in `design-audit/screenshots/before/`. File pattern: `<page>__<locale>__<width>.jpg` and `state-<name>__<locale>__<width>.jpg`.

**Harness notes.** The Google Maps iframe is stubbed in captures, so the map area shows a placeholder. `/api/contact` is mocked so no real email is sent. The round "N" badge at the left edge is the Next.js dev indicator, not part of the site.

**Measured baseline**

| Check | Result |
|---|---|
| Horizontal overflow | 0 px on all 72 captures |
| Console errors | None except the expected 404 resource on the not-found route |
| Console warnings | `onLoadingComplete` deprecation on every hero image |
| White text on brand orange `#F47920` | 2.76:1 (WCAG AA needs 4.5:1 for normal text) |
| Orange text on white | 2.76:1 |
| Royal blue icon on deep blue | 1.67:1 |
| Page height, `/services` | 7,852 px desktop, 11,852 px mobile |
| Page height, service detail | about 6,000 px desktop, 9,560 px mobile |

Severity: **S1** blocks trust or use, **S2** clearly hurts quality, **S3** polish.

## Systemic problems

### SYS-1. The photography is hidden (S1)
Pages: all heroes. Evidence: `home__en__1440.jpg`, `svc-sea__en__1440.jpg`, `services__en__1440.jpg`.
The hero image is rendered at 48% opacity under a 78% navy layer, and service pages add a second gradient on top. The result is a flat navy rectangle with a ghost of a truck. The sunset photography is the strongest brand asset the site owns (its orange and blue are literally the brand palette) and visitors never see it.
Root cause: overlays were raised until white text passed over any part of the image, instead of placing text on a controlled scrim.
Direction: directional scrim only behind the text column, image at full opacity elsewhere, focal point set per image.

### SYS-2. Everything is a card, and all cards look the same (S2)
Pages: all. Evidence: `home__en__390.jpg`, `svc-sea__en__1440.jpg`.
Icon in a tinted circle, bold title, two lines of grey text, border, shadow. That one pattern is used for quick actions, proofs, services, values, channels, "when to choose", capabilities, related services, process steps. A service detail page has 25 of them. Nothing ranks above anything else, and the page reads as a template.
Direction: reserve the card for things that are objects (a form, a linked service). Use rows with hairlines, numbered sequences and plain lists for the rest.

### SYS-3. Type is too small and has no scale (S1)
Pages: all. Evidence: any capture; worst in Arabic at 390 px.
Navigation links are 12 px. Card descriptions are 11 to 13 px. Body copy is 15.4 px. There are 45 different arbitrary font sizes (`text-[0.82rem]`, `[0.84rem]`, `[0.96rem]`, `[0.98rem]`...). Headings use -0.04 to -0.05 em tracking, which is also applied to Arabic where letter-spacing breaks joined script.
Direction: a seven-step scale with a 16 px floor for body and 14 px for secondary text, no negative tracking in Arabic.

### SYS-4. Orange fails contrast wherever it carries text (S1, accessibility)
Pages: all. Evidence: every primary button, every "Learn more" link, kickers on white.
White on `#F47920` is 2.76:1. Orange link text on white is the same. This affects the main call to action on every page.
Direction: keep the orange exactly as is, change what sits on it (deep navy ink, 5.56:1) and stop using it as a text colour on white.

### SYS-5. Orange is overused and breaks the brand's own rule (S2)
Pages: home, contact, careers. Evidence: `home__en__1440.jpg`, `contact__en__1440.jpg`.
`DESIGN.md` says "Orange is for accents and CTAs only, never large backgrounds". Three pages end in a full-width orange band. Orange is also used for every icon, every check mark, every underline bar, every link and the active language pill, so the real call to action does not stand out.
Direction: orange becomes a signal colour with a budget: one primary action per view plus small marks.

### SYS-6. Lavender neutrals fight the brand (S2)
Pages: all. The page background is `#fbf8ff` and section bands are `#f2eff8`: purple-tinted greys inherited from a Material theme generator. Next to navy and orange they read as a third, accidental hue.
Direction: cool neutrals tinted toward the brand navy.

### SYS-7. No rhythm or alignment system (S2)
Containers are 1280 px in most places and 1360 px in the home hero; `main` is offset 56 px on most pages and 72 px on `/about`, which leaves a visible strip under the header (`about__en__1440.jpg`). Section padding varies between 48, 56, 64, 72, 80 and 96 px. Headings alternate between centred and start-aligned from one section to the next on the same page. 15 different shadows, 9 radii.

### SYS-8. Centred underline bar under every heading (S3)
The 3 px orange bar is repeated under every h2 (up to nine times per page). As a constant it stops meaning anything and adds 36 px of dead space each time.

### SYS-9. Section order does not follow intent (S2)
Service detail pages put the quote form eighth of ten sections, after "Related services" has already invited the user to leave. The home page gives its first slot after the hero to four shortcut cards that duplicate the header.

## Per-page findings

### Header and navigation
- **NAV-1 (S2).** 56 px bar, 12 px links, logo 32 px tall so its strapline is illegible. Feels like a toolbar, not a company masthead. `home__en__1440.jpg`.
- **NAV-2 (S2).** Mobile menu is an unstyled list that pushes into the hero; no contact shortcuts, no close on Escape, page behind stays scrollable. `state-menu-open__en__390.jpg`.
- **NAV-3 (S3).** Language switch is a two-button pill with an orange fill that competes with "Get a Quote" beside it.
- **NAV-4 (S3).** "Coverage" is a home-page anchor presented as a page. Kept, because the anchor logic works and the section is real.
- **NAV-5 (S2, a11y).** No skip link; `nav` has no label; menu button label does not say whether it opens or closes.

### Home `/`
- **HOME-1 (S1).** Hero image invisible (SYS-1). Heading is strong but the right-hand "Shipment Support" glass card holds 11 px text and is hidden on mobile.
- **HOME-2 (S1).** Quick-action row: "Track Shipment" is a dead end, the other three duplicate the header. On mobile the row is four stacked cards, 700 px of scroll before any content. `home__en__390.jpg`.
- **HOME-3 (S2).** Service cards: fixed 72 px description height, a grey top stripe that looks like a loading bar, orange "Learn more" at 2.76:1.
- **HOME-4 (S1).** Coverage section: the right 58% of the section is empty on desktop because the map image is at 42% opacity under a 56 to 95% overlay; the second panel icon is royal blue on deep blue (1.67:1), effectively invisible. `home__en__1440.jpg`.
- **HOME-5 (S2).** Full-bleed orange CTA band (SYS-5).
- **HOME-6 (S3).** "Our Location" is a 450 px map with no address beside it.

### Services `/services`
- **SVC-1 (S1).** The six "core service" cards use finished posters as backgrounds and then print the title again on top, so "Sea Freight" appears twice, overlapping, with the poster logo cropped at the card edge. `services__en__1440.jpg`.
- **SVC-2 (S1).** Card description and "Explore" link appear only on hover. Touch users never see them.
- **SVC-3 (S2).** Each service then gets a full-height section (`min-height: 800px`) with the same poster letterboxed inside a navy box. Seven screens of near-duplicate content.
- **SVC-4 (S2).** Mismatched button labels ("View Routes", "Flight Schedules", "Explore Facilities") and a "Track Shipment" card.
- **SVC-5 (S3).** Cards are plain `<a>` tags, so they bypass the client router and the skeleton transition.

### Service detail (six pages, one template)
- **DET-1 (S1).** Hero is a flat navy slab; six chips all carry the same icon.
- **DET-2 (S1).** Quote form is at the bottom (SYS-9).
- **DET-3 (S2).** "Why choose ALFS" is a four-line list in a half-empty 1280 px section. "Back to all services" floats alone at the far right of the overview.
- **DET-4 (S2).** 25 look-alike cards (SYS-2); "When to choose", "Capabilities" and "Use cases" say overlapping things in three different card styles.

### About `/about`
- **ABT-1 (S1).** The kicker and heading are printed on top of the logo baked into the hero photo. `about__en__1440.jpg`.
- **ABT-2 (S2).** Vision and mission are two centred white cards on dotted navy; values are four centred cards; both are low-information.
- **ABT-3 (S2).** The coverage diagram clips "Lebanon" at the right edge and its labels are 12 px SVG text.
- **ABT-4 (S3).** Team photo carries another baked-in logo tab.

### Contact `/contact`
- **CON-1 (S2).** The page's purpose (send a message, or call) starts 740 px down, under a hero and a three-card band.
- **CON-2 (S2).** Reuses the about hero image; glass panel with 11 px text.
- **CON-3 (S2).** Orange CTA band below the map asks the user to scroll back up to the form they passed.

### Careers `/careers`
- **CAR-1 (S2).** The three highlights appear twice: once in the hero glass panel and again as cards directly below.
- **CAR-2 (S2).** Orange CTA band (SYS-5).

### Forms (contact, careers, quote)
- **FORM-1 (S2).** Legend renders "* * Required fields" (asterisk in both markup and copy). `state-form-careers-errors__en__1440.jpg`.
- **FORM-2 (S2, a11y).** Errors are not linked to inputs (`aria-describedby`, `aria-invalid` missing); the success and error notices are not announced (`role="status"` / `alert` missing).
- **FORM-3 (S2).** 40 px inputs with 14 px text (iOS zooms on focus below 16 px); native unstyled select; "OPTIONAL" badge in 10 px caps.
- **FORM-4 (S3).** Missing `autocomplete` and `inputmode` hints.
- **FORM-5 (S3).** After a successful submit the form simply empties; the notice is easy to miss on mobile because it renders above the fields.

### 404
- **404-1 (S3).** Developer wording ("The requested route does not exist... localized homepage"), a navy card floating on tinted gradients, single exit.

### Footer
- **FTR-1 (S2).** Brand column holds only a logo; `footer.description` exists in the messages and is not rendered. Link text is 13 px at 75% white.
- **FTR-2 (S3).** Phone numbers in `00962...` form with no grouping are hard to read.

### Arabic / RTL
- **RTL-1 (S2).** Layout mirrors correctly, but small text is worse in Cairo at 11 to 13 px, and negative letter-spacing is applied to Arabic headings.
- **RTL-2 (S3).** Some components force `text-right` / `flex-row-reverse` by hand instead of logical properties, which double-reverses rows in the careers and contact hero panels.

## Overall

The site is functional, bilingual and free of layout breakage, which is a solid base. What makes it feel generic is the combination of SYS-1 to SYS-5: hidden imagery, one repeated card, small text, and an accent colour spent everywhere. What makes it feel less trustworthy than the company deserves is the product-level set from document 01: a tracking promise with nothing behind it and buttons that go somewhere other than they say.
