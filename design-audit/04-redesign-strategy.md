# 04. Redesign strategy

## The question

If a strong product team designed this exact site today, with this brand, this content and these three forms, what would they build?

They would start from what the site is for: **a business visitor decides in under a minute whether ALFS can move their cargo, and then asks for a price.** Every structural decision below serves that.

## Direction: "Manifest"

A freight manifest is a document people trust because it is plain: what, from where, to where, in what order. The design takes its character from that, not from SaaS landing pages.

- **Photography first.** The sunset port and highway images are shown at full strength. They carry the brand colours better than any flat fill.
- **Ruled, not boxed.** Content sits on a strict grid separated by hairlines, like a shipping document. Cards are used only for objects you act on.
- **Large, calm type.** Montserrat and Cairo at confident sizes, start-aligned, with real hierarchy between a page title, a section title and body copy.
- **Navy leads, orange signals.** One orange action per view.
- **Honest.** Nothing on the page promises something the site cannot do.

It should feel like a company with trucks, not a startup with a pitch deck.

### What it deliberately avoids

Glass panels, glow blobs, dotted backgrounds, eyebrow labels above every heading, an underline bar under every heading, decorative gradients, hover-only content, and grids of identical icon cards.

## Principles

1. **One primary action per page, always reachable.** "Get a quote" in the header; the page's own form within the first two screens where a form exists.
2. **Say it once.** If two sections say the same thing, merge them.
3. **Start-aligned by default.** Centre only for short closing statements.
4. **Readable at arm's length on a phone, in Arabic.** 16 px body floor, 44 px touch targets.
5. **Structure by tone and rule; shadow only for things that float.**
6. **Logical properties everywhere** (`start`/`end`), so RTL is the same code path, not a patch.
7. **Tokens only.** No raw colours or one-off sizes in components.

## Structural changes

### Global shell
- **Header:** 72 px, logo large enough to read, 15 px links, quiet text-style language toggle, one orange button. Gains a shadow once the page scrolls. Skip link.
- **Mobile menu:** full-height sheet under the header with large links, the six services listed, and phone / WhatsApp / email at the bottom. Locks body scroll, closes on Escape and on navigation.
- **Footer:** `navy-950`, brand column with the description that already exists in the copy, three link columns, readable phone numbers.
- **One closing pattern** on every page: a navy band with a sentence and the action. No orange floods.
- **`Location`** becomes a shared two-column block: address, hours and contact on one side, map on the other.

### Home
| Before | After |
|---|---|
| Hero under 78% navy, glass "support" card | Full photograph with a directional scrim, heading, one paragraph, two buttons |
| Four quick-action cards (one dead end) | Removed. Replaced by a **services index**: six linked rows/tiles directly under the hero, since choosing a service is the real next step |
| "About" block with three cards | "Why ALFS" as text plus three ruled proof points |
| "Shipment Support" hidden on mobile | Promoted to its own **How it works** sequence (three steps), visible everywhere |
| Coverage with an empty half | Map image shown properly, two points beside it |
| Orange CTA band | Shared navy closing band |
| Map only | Shared location block |

### Services index
From 7,850 px of posters to a scannable catalogue: page header, a sticky in-page index of the six services, then six compact rows (cropped photograph, what it is, the two or three specifics that already exist in the copy, one link to the detail page and one to its quote form). The journey sequence stays, as a horizontal five-step line. The duplicate "core services" poster grid and the hover-only cards are removed. Mismatched buttons are relabelled to what they do.

### Service detail (six pages)
The quote form moves from position eight to position two, beside the overview, and stays in view on desktop while the visitor reads.

1. Hero: photograph, title, one paragraph, text chips, "Request a quote" and a secondary link.
2. **Overview + quote form** (two columns; form first under the hero on mobile after the overview text).
3. When to choose it (ruled two-column list, no cards).
4. Capabilities (ruled list with icons).
5. Typical cargo (inline tags).
6. Process (numbered sequence on navy) with "Why ALFS" beside it instead of in a half-empty section.
7. Related services (four linked tiles).
8. Closing band.

Ids `#quote-form` and `#process` are preserved.

### About
Hero with the photo positioned so the baked-in logo is out of frame. Story with three ruled points. Vision and mission as two start-aligned statements on navy. Values as a four-column ruled row. Team with the photograph. Coverage with a redrawn, correctly bounded diagram. Closing band, location.

### Contact
The page exists to make contact, so the channels and the form come first: a compact header, then a two-column block with the form on one side and phone / WhatsApp / email, office and hours on the other. Map below. The second "scroll back to the form" band is removed.

### Careers
Hero, highlights shown once (not twice), then application form beside the four-step process. Closing band.

### Forms
One field component set: 48 px controls, 16 px text, labels above, errors below and linked for assistive tech, a styled select, a real drop zone for the CV, a status region that is announced and scrolled into view, a clear success state. Autocomplete and input-mode hints. The "* *" legend bug goes.

### 404
Plain language, two exits (home, services), on the shared page shell.

### Skeletons
Rebuilt from the same layout primitives so each route's skeleton matches its new structure (project rule).

## Removed or changed on purpose

| Item | Decision | Why |
|---|---|---|
| "Track Shipment" cards and "Shipment Tracking" chip | Removed from home, services and about | No tracking feature exists; the link was a loop |
| "24/7 expert support" | Not shown | Contradicts published business hours |
| "View Routes", "Flight Schedules", "Explore Facilities" | Buttons now use the service's own "details" and "quote" labels | Label matched no destination |
| Orange CTA bands | Replaced by the navy closing band | Brand rule; contrast |
| White text on orange | Navy text on orange | Contrast 2.76 to 5.56 |
| Poster images as card backgrounds | Cropped to their photographic area | Baked-in headline collided with live text |

Unused message keys stay in the JSON files (harmless, and other tooling may read them). New copy needed for the new structure is added to both `en.json` and `ar.json`.

## Not changing

Routes, URLs, form fields and validation, the API route, email delivery, locale handling, anchor navigation logic, the stack (Next, Tailwind v4, next-intl, react-hook-form, zod, react-icons). No new dependencies.

## Priorities

1. Tokens and type scale (fixes SYS-3, 4, 6, 7 everywhere at once).
2. Shared primitives: Button, Section, headings, PageHero, ClosingBand, Location, form fields.
3. Header, mobile menu, footer.
4. Home, then service detail (highest-intent pages), then services index.
5. Contact, about, careers, 404.
6. Skeletons.
7. Responsive and RTL pass, accessibility pass, critic rounds.

## Quality bar

Targets from the brief: 9/10 on hierarchy, layout, typography, colour consistency, component consistency, UX clarity and responsive quality, scored by fresh-context critics on screenshots; no known critical accessibility violations; no functional regressions. Scores are recorded per round in `cook/ROUNDS.md` and are eyeballed unless marked measured.

## Changes made after the critic rounds

The plan above is what was set before building. Five things changed during iteration and are recorded in `06-final-report.md`: the closing band is light instead of navy; the home "How it works" band and the home / about location blocks were removed; the about hub diagram was dropped; contact and careers use a text header; and coverage became its own page at `/coverage`.
