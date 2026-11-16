# 03. Brand identity and colour system

## What the brand is

From the logo, `DESIGN.md` and the photography: a deep **navy** family carrying trust and scale, and one **orange** carrying speed. The photography (sunset over ports and highways) repeats exactly that pairing. That identity is kept in full. No brand hue changes in this redesign.

## Colours found in the codebase

### Declared brand tokens (kept, values unchanged)

| Token | Hex | Role today |
|---|---|---|
| `alfs-deep-blue` | `#0D1F5C` | Dark sections, footer, hero overlay |
| `alfs-navy` | `#1A2F7A` | Headings on light, icons |
| `alfs-royal-blue` | `#1E3DA8` | Rare: a glow, one icon |
| `alfs-orange` | `#F47920` | Buttons, links, icons, bars, bands, pills |
| `alfs-amber` | `#E8650A` | Button hover |

### Everything else in use

| Group | Values | Where |
|---|---|---|
| Page and band backgrounds | `#fbf8ff` (21 uses), `#f2eff8` (13), `#f7f5fb`, `#f5f5f5` | Hardcoded in pages |
| Borders | `#ebe8f3`, `#e8e4ef`, `#e1deec`, `#e2e1ec`, `outline-variant #c5c5d3` at 20/30/40/70% | Hardcoded |
| Text | `on-surface #1b1b20`, `on-surface-variant #454651`, `#3a3d4e`, white at 72/76/78/80/82/84/86/88/90% | Mixed |
| Semantic | error `#d93025`; success `#1d5f35` on `#f3fbf6`; error `#9f2f22` on `#fff5f3` | Hardcoded in forms |
| Third party | WhatsApp `#25D366` | Floating button |
| Unused | 25 Material tokens (`primary #00185f`, `secondary #9a4600`, `tertiary`, `inverse-*`, `surface-dim`...) | Declared, never referenced |

Totals in page code: 23 distinct hex literals, 32 `rgba()` literals. There is no dark theme.

## Answers to the audit questions

**1. Are the colours good, or is their application the problem?**
The brand colours are good. Navy plus one warm accent is a strong, ownable pair, and it matches the photography. The problem is application, in four specific ways listed below.

**2. Is the accent overused?**
Yes. On the home page orange is used for: the primary button, the language pill, every icon in dark sections, check bullets, the bar under every heading, all "Learn more" links, a panel border, the footer top border and a full-width band. When everything is orange, the one thing that should be (the quote button) has no priority. `DESIGN.md` itself forbids orange as a large background; three pages break that.

**3. Is there hierarchy between background, surface and interactive elements?**
Weak. `#fbf8ff` page, `#ffffff` card and `#f2eff8` band differ by 1 to 4% lightness, so cards need a border and a shadow to be seen at all. On dark sections, cards are white at 6 to 14% with blur, which reads as fog.

**4. Is contrast sufficient?**

| Pair | Ratio | AA normal text |
|---|---|---|
| White on orange `#F47920` (every primary button) | 2.76 | Fail |
| Orange on white (links, kickers) | 2.76 | Fail |
| White on amber (hover) | 3.33 | Fail |
| Royal blue on deep blue (icon) | 1.67 | Fail (non-text 3:1) |
| Body grey `#454651` on `#fbf8ff` | 8.89 | Pass |
| Orange on deep blue | 5.56 | Pass |
| **Deep blue on orange** | **5.56** | **Pass** |

**5. Is the palette used consistently across pages?**
No. Home, contact and careers close on an orange band; about and service pages close on navy. Section tints are chosen per page from four lavender values. Icon colour is navy on home and orange elsewhere.

**6. Can the brand feel more premium without changing its colours?**
Yes. The fixes are about quantity, neutrals and imagery, not hue:
- spend orange on less,
- replace the lavender neutrals,
- let the photography supply the warmth instead of flat orange fills,
- use two depths of navy so dark sections have structure.

**7. What supporting shades are missing?**
- A neutral ramp tinted toward navy (the current one is tinted toward purple).
- A darker navy for the footer and for layering inside dark sections.
- An accessible orange for text on light backgrounds.
- A light orange for marks on navy.
- Proper semantic sets (success, danger) with background, border and text.
- Tints of navy for quiet fills.

## Refined system

### Brand (unchanged hues)

| Token | Hex | Before | Use |
|---|---|---|---|
| `navy-950` | `#081543` | new | Footer, deepest layer |
| `navy-900` | `#0D1F5C` | `alfs-deep-blue` | Dark sections, hero scrim, ink on orange |
| `navy-800` | `#1A2F7A` | `alfs-navy` | Headings on light, links, icons |
| `navy-700` | `#1E3DA8` | `alfs-royal-blue` | Hover on links, focus ring on light |
| `navy-100` | `#E6EAF6` | new | Quiet fills, icon wells |
| `navy-50` | `#F1F4FB` | new | Tinted band |
| `orange-500` | `#F47920` | `alfs-orange` | Primary action fill, small marks |
| `orange-600` | `#E8650A` | `alfs-amber` | Primary hover |
| `orange-700` | `#A8480A` | new | Orange text on light (5.84:1 on white) |
| `orange-300` | `#FFB07A` | new | Marks and small text on navy (8.59:1) |
| `orange-50` | `#FFF3EA` | new | Rare highlight background |

The old names (`alfs-navy`, `alfs-orange`...) stay as aliases so nothing else in the repo breaks.

### Neutrals (replacing the lavender set)

| Token | Hex | Replaces | Use |
|---|---|---|---|
| `paper` | `#F6F7FA` | `#fbf8ff` | Page background |
| `surface` | `#FFFFFF` | same | Cards, forms, header |
| `sunken` | `#ECEFF5` | `#f2eff8`, `#f7f5fb` | Band behind white cards, input wells |
| `line` | `#DCE1EC` | 6 border hexes | Hairlines, borders |
| `line-strong` | `#B8C0D4` | `outline-variant` | Input borders (3:1 against white is not required for borders with labels, but this reaches 1.9:1 and is paired with a visible label) |
| `ink` | `#0E1630` | `#1b1b20` | Body headings, strong text |
| `ink-soft` | `#4A5270` | `#454651`, `#3a3d4e` | Body copy (7.69:1 on white) |
| `ink-faint` | `#5B6480` | grey at opacities | Captions, placeholders (5.87:1) |

On navy: `on-dark` `#FFFFFF`, `on-dark-soft` `#C8CFE6` (11.28:1 on `navy-950`), `on-dark-faint` `#AAB4D6` (7.46:1 on `navy-900`), `line-dark` white at 14%.

### Semantic

| Token | Text | Background | Border |
|---|---|---|---|
| success | `#14603A` | `#EAF7EF` | `#B5E0C5` |
| danger | `#B3261E` | `#FDEFEC` | `#F2C4BD` |
| focus | 2 px ring `navy-700` on light, `orange-300` on dark, 2 px offset | | |

### Usage rules

1. **Navy leads.** Headings, links and icons are navy. Dark sections use `navy-900`; only the footer uses `navy-950`.
2. **Orange is a signal, with a budget.** Per viewport: one filled orange button, plus small marks (a 2 px rule, a step number, a bullet). No orange section backgrounds. No orange body links.
3. **Ink on orange is navy.** Primary button text is `navy-900` on `orange-500` (5.56:1). This is the one visible change to an existing brand rule (`DESIGN.md` specifies white text), and it is made for accessibility: white cannot pass on this orange without darkening the orange, and darkening the orange would change the brand colour. Changing the ink keeps the brand hue exact.
4. **Orange text on light uses `orange-700`**, and only for small labels. Links are navy with an arrow.
5. **On navy, orange text uses `orange-300`** for small sizes; `orange-500` is fine for icons and large numerals (5.56:1).
6. **Photography supplies warmth.** Where a section needs energy, show the image; do not add an orange fill.
7. **Elevation by tone first.** White on `paper` or `sunken` separates surfaces. Shadows are reserved for things that float (header on scroll, form card, menus).
8. **No raw hex in components.** Everything resolves to a token.
