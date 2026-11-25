# 01. Product discovery

Source: full read of `src/`, `messages/`, `DESIGN.md`, `designs/`, plus the running site at 390 / 768 / 1440 px in English and Arabic.

## What the product is

A bilingual (English LTR, Arabic RTL) marketing and lead-generation website for **ALFS, Al Shafaq Al Qutbi Logistics Services**, a freight forwarder headquartered in Amman, Jordan. It sells six services: sea, land and air freight, cargo consolidation, warehousing and customs clearance.

The site has no accounts, no dashboard and no shipment tracking. Its whole job is to make a business visitor trust ALFS enough to send an inquiry.

**Value proposition as written:** one regional operator that covers every transport mode and the paperwork around it, from Jordan to the Levant, the Gulf and global trade lanes.

## Who uses it

| User | What they want | How often |
|---|---|---|
| Importer / exporter / procurement lead | Check ALFS handles their cargo type and lane, then ask for a price | Primary |
| Existing customer | Find a phone number, WhatsApp or the office | Frequent, short visits |
| Job seeker | See if ALFS is hiring and send a CV | Secondary |
| Partner / agent abroad | Verify the company is real: address, services, coverage | Secondary |

Most traffic in this market is mobile and a large share reads Arabic, so 390 px RTL is a first-class view, not an edge case.

## Journeys

1. **Get a quote (primary).** Land on home or a service page → confirm the service fits → open a form → submit. Three forms serve this: the general inquiry on `/contact#inquiry-form`, and a per-service quote form on each `/services/<slug>#quote-form`.
2. **Find the right service.** Home → `/services` → service detail → quote form.
3. **Reach a human now.** Any page → phone, WhatsApp (floating button, `wa.me/962791010199`) or email.
4. **Vet the company.** Home → `/about` → coverage, office address, map.
5. **Apply for a job.** `/careers` → application form with CV upload.
6. **Switch language.** Toggle in the header; persists in the `ALFS_LOCALE` cookie; no URL prefix.

## Route inventory

| Route | File | Purpose | Notable states |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Home | Anchors `#coverage`, `#whyAlfs`, `#track`, `#services` |
| `/about` | `src/app/about/page.tsx` | Company story, values, team, coverage | |
| `/services` | `src/app/services/page.tsx` | Service index | Anchors per service |
| `/services/sea-freight` | `ServiceDetailPage` | Service detail + quote form | `#process`, `#quote-form` |
| `/services/land-freight` | same | | |
| `/services/air-freight` | same | | |
| `/services/cargo-consolidation` | same | | |
| `/services/warehousing` | same | | |
| `/services/customs-clearance` | same | | |
| `/coverage` | `src/app/coverage/page.tsx` | Coverage (added in the redesign; was a home-page anchor) | |
| `/careers` | `src/app/careers/page.tsx` | Why join, process, application form | `#application-form` |
| `/contact` | `src/app/contact/page.tsx` | Channels, inquiry form, office, hours, map | `#inquiry-form` |
| `*` (404) | `src/app/not-found.tsx` | Not found | |
| `/en/*`, `/ar/*` | `src/proxy.ts` | Legacy locale prefix: sets cookie, redirects | |
| `POST /api/contact` | `src/app/api/contact/route.ts` | Validates and emails all three forms via Resend | 200 / 4xx with `fieldErrors` |

12 rendered pages × 2 locales. No authenticated or dynamic data routes.

### UI states that exist

- **Loading:** `src/app/loading.tsx` and `PageTransitionProvider` show a per-route skeleton (`PageSkeleton`) during navigation and language switching. Project rule (AGENTS.md): every page must have a matching skeleton.
- **Mobile menu:** open / closed (below 1024 px).
- **Forms (3):** idle, client validation errors (zod), submitting (fields disabled, button label changes), server success, server error with per-field errors. Careers adds a file picker with type and 10 MB size checks.
- **Hero image loading:** `HeroBackdropWithSkeleton` fades the image in.
- **Hover-only content:** service cards on `/services` reveal their description only on hover.
- No modals, tables, tabs or dropdown menus.

## Shared components

`PublicNavbar`, `PublicFooter`, `LocaleSwitch`, `PublicLogo`, `PublicIcon` (react-icons wrapper, 30 names), `PublicMap` (Google Maps iframe), `PublicContactDetails`, `FloatingWhatsApp`, `PageTransitionLink` / `AnchorNavLink` (navigation plus skeleton overlay), `HeroBackdropWithSkeleton`, `FormPrimitives`, `CoreServiceCard`, `ServiceDetailPage` (one template drives all six detail pages from `src/lib/service-pages.ts`), skeleton primitives.

There is **no** shared Button, Section, Heading, Card or Hero component. Every page re-types those class strings by hand, which is the root cause of most inconsistency found in the visual audit.

## Styling architecture

- Tailwind CSS v4 through `@tailwindcss/postcss`, tokens in `src/app/globals.css` (`:root` + `@theme inline`).
- Fonts through `next/font`: Montserrat (Latin), Cairo (Arabic).
- `globals.css` defines `.brand-button`, `.brand-card`, `.section-heading` and similar classes, but pages almost never use them.
- Roughly 50 Material-style colour tokens are declared; 25 of the 26 non-brand ones checked are never referenced.
- In page code: 45 distinct arbitrary font sizes, 23 hardcoded hex colours, 32 `rgba()` literals, 15 one-off shadows, 9 radius values.

## Assets

- Logo: colour and white PNG.
- 17 photographic/illustrated images (each about 2 MB PNG, served through `next/image`). **Several carry baked-in branding:** the home hero has a logo and a QR code; the about hero has a logo; `regional-core.png` has the company name; all service images are finished marketing posters with a logo, a headline ("Land Freight"), a strapline and icon captions. This limits how they can be cropped and is why the current site hides them under heavy navy overlays or letterboxes them.
- Icons: `react-icons` (Feather plus four from other sets).

## Constraints

- Next.js 16.2.6 App Router (project warns that APIs differ from older versions), React 19, next-intl 4 with cookie locale and no URL prefix.
- All copy must come from `messages/en.json` and `messages/ar.json` (945 keys each, in sync). No hardcoded strings.
- Every page needs a skeleton registered in `PageSkeleton`.
- `.env` holds a live Resend key. Submitting a real form sends a real email, so every automated form test in this project mocks `/api/contact`.
- No test suite, no ESLint config. Verification available: `tsc`, `next build`, browser automation.
- Anchor navigation (`anchor-navigation.ts`, `HomePageAnchorScroll`) and form ids (`#inquiry-form`, `#quote-form`, `#application-form`, `#coverage`, `#process`) are referenced across pages and must keep working.

## Product problems found during discovery (not visual)

1. **"Track Shipment" promises a feature that does not exist.** It appears on home and `/services` with "Real-time status updates", and links to `/#track`, which is the same row of cards the user just clicked. About lists "Shipment Tracking" as a service too.
2. **Buttons whose labels do not match their destination.** "View Routes" and "Flight Schedules" go to the home coverage section; "Explore Facilities" goes to a quote form.
3. **"24/7 expert support"** on home contradicts the stated hours on `/contact` (Sunday to Thursday, 9:00 to 17:00).
4. `/services` repeats almost everything that the six detail pages say, at 7,850 px tall on desktop and 11,850 px on mobile.
5. Copy on `/contact` mentions teams "in Jordan and Palestine" while only one Amman office is listed.

Items 1 to 3 are trust risks for a company whose pitch is reliability. The redesign removes the dead-end tracking entry points and relabels the mismatched buttons; it does not invent a tracking feature.
