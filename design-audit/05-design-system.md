# 05. Design system

The system lives in two places:

- **Tokens and base classes:** `src/app/globals.css` (Tailwind v4 `@theme` plus a small `@layer components`).
- **React primitives:** `src/components/ui/` and `src/components/forms/FormPrimitives.tsx`.

Rule for page code: compose primitives and use token utilities (`bg-navy-900`, `text-ink-soft`, `border-line`). No raw hex values, no arbitrary font sizes outside the scale, no one-off shadows.

## Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `navy-950` | `#081543` | Footer |
| `navy-900` | `#0D1F5C` | Dark sections, headings on light, ink on orange |
| `navy-800` | `#1A2F7A` | Links, icons |
| `navy-700` | `#1E3DA8` | Link hover, focus ring on light |
| `navy-100` | `#E6EAF6` | Icon wells, quiet fills |
| `navy-50` | `#F1F4FB` | Hover fill |
| `orange-500` | `#F47920` | Primary action fill, small marks |
| `orange-600` | `#E8650A` | Primary hover |
| `orange-700` | `#A8480A` | Small orange text on light |
| `orange-300` | `#FFB07A` | Marks and labels on navy, focus ring on dark |
| `paper` | `#F6F7FA` | Page background |
| `surface` | `#FFFFFF` | Cards, header, form surfaces |
| `sunken` | `#ECEFF5` | Recessed band, note boxes |
| `line` / `line-strong` | `#DCE1EC` / `#B8C0D4` | Hairlines / control borders |
| `ink` / `ink-soft` / `ink-faint` | `#0E1630` / `#4A5270` / `#5B6480` | Strong text / body / captions |
| `on-dark` / `on-dark-soft` / `on-dark-faint` | `#FFFFFF` / `#C8CFE6` / `#AAB4D6` | Text on navy |
| `success`, `success-bg`, `success-line` | `#14603A`, `#EAF7EF`, `#B5E0C5` | Form success |
| `danger`, `danger-bg`, `danger-line` | `#B3261E`, `#FDEFEC`, `#F2C4BD` | Errors |
| `whatsapp` | `#1FA855` | Floating WhatsApp button only |

Legacy aliases `alfs-navy`, `alfs-deep-blue`, `alfs-royal-blue`, `alfs-orange`, `alfs-amber` still resolve.

Usage rules are in `03-brand-and-colors.md`. The short version: navy leads, orange is one action per view plus small marks, ink on orange is navy.

### Typography

Montserrat for Latin, Cairo for Arabic, loaded with `next/font`. Seven steps, fluid between 390 and 1440 px:

| Class | Size (min to max) | Line height | Use |
|---|---|---|---|
| `.t-display` | 38 to 72 px | 1.04 | Home hero only |
| `.t-h1` | 34 to 56 px | 1.08 | Page titles |
| `.t-h2` | 28 to 42 px | 1.14 | Section titles |
| `.t-h3` | 19 to 22 px | 1.3 | Sub-section titles |
| `.t-lead` | 17 to 20 px | 1.6 | Intro paragraph of a section |
| `.t-body` | 16 px | 1.7 | Body |
| `.t-small` | 14 px | 1.6 | Captions, legal |
| `.t-label` | 13 px semibold | 1.4 | Column labels (footer, menu) |

Item titles inside lists use 17 px semibold; item descriptions 15 px. Nothing below 13 px anywhere; nothing below 14 px for sentences.

**Arabic:** letter-spacing is reset to 0 for every heading class and line heights are raised (display 1.28, h1 1.3, h2 1.36, body 1.85), because Cairo's joined script collides at Latin line heights.

### Space and layout

| Token | 390 | 640+ | 1024+ |
|---|---|---|---|
| `--gutter` | 20 px | 32 px | 48 px |
| `--section-y` (`.section-y`) | 64 px | 80 px | 112 px |
| `.section-y-tight` | 62% of the above | | |
| `--header-h` | 64 px | 64 px | 72 px |

- `.shell`: one container for the whole site, 1240 px content width plus gutters.
- Grids: two-column splits use `gap-12` to `gap-20`; lists use `gap-x-10`.
- Any element with an `id` gets `scroll-margin-top` equal to the header plus 20 px, so anchor jumps never hide under the fixed header.

### Radius

`--radius-control` 8 px (buttons, inputs), `--radius-card` 14 px (cards, form surface, note boxes), `--radius-media` 18 px (photographs, map). Pills are reserved for tags and step numbers.

### Elevation

Tone first: white on `paper` or `sunken` separates surfaces without a shadow.

| Token | Use |
|---|---|
| `shadow-card` | Form surface; linked tiles on hover |
| `shadow-float` | Floating WhatsApp button |
| `shadow-header` | Header after scroll, and while the mobile menu is open |

### Motion

One easing, `--ease-out-soft` (`cubic-bezier(0.2, 0.7, 0.2, 1)`). Colour and border transitions 160 ms; image zoom on tile hover 500 ms; hero image fade-in 700 ms; mobile sheet 220 ms. `prefers-reduced-motion` turns all of it off, including smooth scrolling.

### Focus

2 px outline, 3 px offset: `navy-700` on light, `orange-300` inside any `.on-dark` container. Form controls show a 3 px ring in the same blue (red when invalid).

## Components

### Button (`ui/Button.tsx`, `.btn`)

| Variant | Look | Use |
|---|---|---|
| `primary` | Orange fill, navy text (5.56:1) | The one main action in view |
| `navy` | Navy fill, white text | Strong secondary on light ("Service details", "Get directions") |
| `secondary` | White, grey border, navy text | Quiet action on light |
| `onDark` | Translucent white border | Secondary action on navy or over photographs |

Sizes: `sm` 40 px, `md` 48 px, `lg` 56 px. States: hover (colour), active (1 px press), focus-visible (ring), disabled (60%, no pointer), loading (`SubmitButton` shows a spinner and the "Sending..." label, `aria-busy`).

`ButtonLink` picks the right element: router link with the page-transition skeleton for internal routes and anchors, plain `<a>` for `tel:`, `mailto:` and external URLs.

`ArrowLink` is the text link: navy, semibold, arrow that flips in RTL and nudges on hover.

### Section and headings (`ui/Section.tsx`)

`Section` sets tone (`paper`, `surface`, `sunken`, `navy`), vertical rhythm and the shell. `SectionHeader` is the one section-title pattern: start-aligned h2, optional lead, optional action on the far side. There is no underline bar and no eyebrow label.

### Page headers (`ui/PageHero.tsx`)

- `PageHero`: photograph at full strength with a directional navy scrim behind the text column only (vertical scrim on mobile). Sizes `lg` (home) and `md`. Slots: breadcrumb, title, lead, actions.
- `PageHeader`: text on navy, no image, for pages whose job is a form (contact, careers).

### Closing band (`ui/ClosingBand.tsx`)

The single end-of-page pattern: navy, a 2 px orange rule, a sentence, one primary and optionally one secondary button.

### Content blocks (`ui/Blocks.tsx`)

| Block | What it is | States |
|---|---|---|
| `FeatureList` | Ruled rows: optional icon well, title, description. 1 to 4 columns. Light and dark. | Static |
| `Steps` | Numbered sequence for real ordered processes. | Static |
| `CheckList` | Short statements with a tick. | Static |
| `ServiceTile` | Linked photograph tile; collapses to a compact row under 640 px. | Hover (border, shadow, image zoom, arrow), focus |
| `Tag` | Non-interactive label for cargo types. | Static |
| `IconWell` | 44 px icon square, navy on light, orange-300 on dark. | Static |

### Header, menu, footer

- `PublicNavbar`: fixed, white, 72 px on desktop. Active link is navy with a 2 px orange underline on the header's bottom edge and `aria-current="page"`. Shadow appears after 8 px of scroll. First focusable element is a skip link to `#main`.
- Mobile menu: full-height sheet. Large links, the six services, then "Get a quote" and call / WhatsApp / email. Body scroll is locked while open; closes on Escape, on navigation and when the viewport reaches desktop width. The toggle reports `aria-expanded` and its label switches between "Open menu" and "Close menu".
- `LocaleSwitch`: one quiet button naming the other language in its own script.
- `PublicFooter`: `navy-950`, brand description, three link groups, contact with readable phone numbers (`+962 79 101 0199`).
- `PublicMap`: location block with address, hours, phone, email, "Get directions" and the map.
- `FloatingWhatsApp`: 56 px, bottom end corner (flips in RTL).

### Forms (`forms/FormPrimitives.tsx`, `.field-control`)

| Part | Behaviour |
|---|---|
| `Field` | Label above with a real `for`, required asterisk, "Optional" on the far side, hint or error below |
| `.field-control` | 48 px, 16 px text (no iOS zoom), 8 px radius. States: default, hover, focus (blue ring), invalid (red border and ring), disabled (sunken fill) |
| `select.field-control` | Custom chevron that moves to the left in RTL |
| `fieldProps()` | Adds `id`, `aria-invalid` and `aria-describedby` pointing at the error or hint |
| `FieldError` | Red text with an icon, so colour is not the only signal |
| `SubmissionNotice` | `role="status"` (success) or `role="alert"` (error), icon, scrolls itself into view |
| `SubmitButton` | Loading state with spinner, disabled while sending |
| `FormCard` | White surface with border and `shadow-card` |
| File drop zone (careers) | Dashed area, whole surface clickable, shows the chosen file name, error and focus states |

Inputs carry `autocomplete` and `inputmode`; email, phone and URL fields are `dir="ltr"` so they read correctly inside Arabic pages.

Empty, loading, error and success states exist for all three forms. There are no other data-driven empty states on the site.

### Skeletons (`skeletons/PageSkeleton.tsx`)

One skeleton per route type (home, about, services index, service detail, contact, careers), built from the same shell, section rhythm and hero heights as the pages. Dark blocks use `.skeleton-on-dark`.

## RTL

Everything uses logical properties (`ms-`, `pe-`, `start-`, `text-start`), so Arabic is the same code path. Direction-aware pieces: arrows (`.flip-rtl`, `.link-arrow`), the hero scrim (`rtl:bg-gradient-to-l`), select chevron, floating button, back link.

## Images

The service photographs in `public/images/services/<service>/` are clean and are used for every service image. Four source images had artwork baked in (logo, QR code, company name); cropped copies were added and are the ones now referenced:

| New file | Source | Removed by the crop |
|---|---|---|
| `homepage/hero-clean.jpg` | `hero-image.png` | Logo (top), QR code (bottom) |
| `homepage/regional-core-clean.jpg` | `regional-core.png` | Company name lettering |
| `about/about-hero-clean.jpg` | `about-hero.png` | Logo |
| `about/our-team-clean.jpg` | `our-team.png` | Logo tab |

The originals are untouched. The poster images in `services/main_page/` (with headlines baked in) are no longer referenced.

## Adding a page

1. Compose `PageHero` or `PageHeader`, then `Section`s, then `ClosingBand`.
2. Put all copy in `messages/en.json` and `messages/ar.json`.
3. Add a matching skeleton in `PageSkeleton.tsx` and a path check in `resolveSkeleton.ts`.
4. One `primary` button per view.

## Notes on the final state

- `ClosingBand` is a light band (white, short orange rule); its secondary action uses the `secondary` button.
- `PageHero` shows the photograph as a separate clear block above the text below 1024 px, and as a full-bleed background with a directional scrim from 1024 px.
- `PublicMap` shows address, hours and directions only.
- `Steps` badges are orange with navy numerals in both light and dark sections.
- In Arabic the root font size is 106.25%, so every rem-based size scales up one step.
- `regional-core-clean.jpg` is no longer referenced after the coverage change.
- `FeatureGrid` (bordered cells, icon above title) is the second list pattern, for peer items; `FeatureList` rows stay for specs and sequences.
- `Steps` puts the number beside the text below 640 px.
- The footer uses `navy-900` (one navy site-wide); `navy-950` is no longer used.
- `FloatingWhatsApp` shows after the first screen and steps aside near the footer.
