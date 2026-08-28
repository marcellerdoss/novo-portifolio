---
version: 1.0
name: Marcelle-Rocha-portfolio-design-system
description: "An editorial navy-and-magenta system on a warm off-white canvas, interrupted by oversized hand-cut pastel color-block sections. The chrome is quiet and confident (Inter variable type at fine weights, navy ink, pill CTAs, hairline borders) while story sections drop into saturated cream, pink, coral, or deep-navy panels. Ships a full class-based dark theme and a WCAG high-contrast mode. The result reads as a serious strategy tool made by someone who likes colour."

colors:
  # ─── Core ───
  primary: "#131226"          # navy — every primary CTA, headline ink, logo
  on-primary: "#ffffff"
  ink: "#000000"
  canvas: "#ffffff"
  inverse-canvas: "#000000"
  inverse-ink: "#ffffff"
  accent-magenta: "#B4225E"   # the single brand accent — eyebrows, links, dark-mode primary CTA
  semantic-success: "#1ea64a"

  # ─── Semantic — light theme ───
  bg: "#FEF4EF"               # warm off-white page canvas
  bg-secondary: "#ececea"
  fg: "#131226"
  fg-muted: "#404040"
  fg-subtle: "#666666"
  border: "#e6e6e6"
  surface-soft: "#ececea"
  case-preview-bg: "#F9F7F8"
  hairline: "#e6e6e6"
  hairline-soft: "#f1f1f1"

  # ─── Semantic — dark theme (.dark) ───
  bg-dark: "#121124"
  bg-secondary-dark: "#1f1d3d"
  fg-dark: "#ffffff"
  fg-muted-dark: "#e4e4e7"
  fg-subtle-dark: "#a1a1aa"
  border-dark: "rgba(255,255,255,0.12)"
  surface-soft-dark: "#1a1836"
  case-preview-bg-dark: "#131226"

  # ─── Pastel color blocks — light ───
  block-cream: "#f4ecd6"
  block-pink: "#efd4d4"
  block-coral: "#f3c9b6"
  block-navy: "#211F4A"
  cases-section-bg: "#FDFAF4"   # near-cream ground behind the home Cases list

  # ─── Pastel color blocks — dark equivalents ───
  block-cream-dark: "#1e1c31"
  block-pink-dark: "#261724"
  block-coral-dark: "#2b1410"

  # ─── Named stops used inside components ───
  navy-200: "#FAFAFA"          # hero headline ink, dark theme
  navy-600: "#38347E"          # hero headline ink, light theme
  navy-800: "#211F4A"          # trajectory cards bg, dark
  magenta-300: "#EC83B0"       # nav link hover, dark
  magenta-500: "#DB337C"       # primary button hover, dark
  pink-50: "#FDF5F5"           # trajectory cards bg, light
  neutral-100: "#ECECEA"       # device-mockup screen, light
  neutral-500: "#808080"
  neutral-700: "#404040"
  neutral-900: "#1A1A1A"       # device-mockup bezel, light
  footer-bg: "#09081c"         # near-black — footer and the top accessibility bar

  # ─── High-contrast mode (.high-contrast) ───
  hc-bg: "#000000"
  hc-fg: "#ffffff"
  hc-subtle: "#FFFE80"
  hc-border: "#ffffff"

typography:
  display-xl:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: 340
    lineHeight: 1.00
    letterSpacing: -1.60px
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.32px
  headline:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 540
    lineHeight: 1.30
    letterSpacing: -0.24px
  subhead:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 340
    lineHeight: 1.30
    letterSpacing: -0.24px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 330
    lineHeight: 1.40
    letterSpacing: -0.20px
  body:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 320
    lineHeight: 1.45
    letterSpacing: -0.18px
  body-strong:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 480
    lineHeight: 1.45
    letterSpacing: -0.18px
  body-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 330
    lineHeight: 1.45
    letterSpacing: -0.14px
  body-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 330
    lineHeight: 1.45
    letterSpacing: -0.10px
  btn:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 480
    lineHeight: 1.00
    letterSpacing: -0.14px
  button:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 480
    lineHeight: 1.40
    letterSpacing: -0.10px
  caption:
    fontFamily: mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: 0.60px
    textTransform: uppercase

rounded:
  xs: 4px
  sm: 8px
  md: 8px
  lg: 24px
  xl: 32px
  pill: 50px
  full: 9999px

spacing:
  hair: 1px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.btn}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
  button-primary-dark:
    backgroundColor: "{colors.accent-magenta}"
    textColor: "{colors.on-primary}"
    typography: "{typography.btn}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.fg}"
    border: "1px solid {colors.fg}"
    typography: "{typography.btn}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.fg}"
    typography: "{typography.btn}"
    rounded: "{rounded.full}"
    padding: 12px 20px
  button-icon:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    size: 40px
  badge-default:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: 8px 12px
  badge-category:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.fg-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: 8px 12px
  badge-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: 8px 12px
  tag-pill:
    backgroundColor: transparent
    textColor: "{colors.fg-subtle}"
    border: "1px solid {colors.border}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    border: "1px solid {colors.border}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-hover:
    backgroundColor: "{colors.bg}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: 24px
    shadow: "0 4px 24px rgba(0,0,0,0.06)"
    transform: "scale(1.02)"
  case-card-image:
    backgroundColor: "{colors.case-preview-bg}"
    rounded: "{rounded.xl}"
    aspectRatio: "4 / 3"
    shadow: "0 4px 20px rgba(0,0,0,0.07)"
  color-block-cream:
    backgroundColor: "{colors.block-cream}"
    textColor: "{colors.fg}"
    typography: "{typography.subhead}"
    rounded: "{rounded.lg}"
    padding: 48px
  color-block-pink:
    backgroundColor: "{colors.block-pink}"
    textColor: "{colors.fg}"
    typography: "{typography.subhead}"
    rounded: "{rounded.lg}"
    padding: 48px
  color-block-coral:
    backgroundColor: "{colors.block-coral}"
    textColor: "{colors.fg}"
    typography: "{typography.subhead}"
    rounded: "{rounded.lg}"
    padding: 48px
  color-block-navy:
    backgroundColor: "{colors.block-navy}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.subhead}"
    rounded: "{rounded.lg}"
    padding: 48px
  top-nav:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-sm}"
    height: 56px
  accessibility-bar:
    backgroundColor: "{colors.footer-bg}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    height: 44px
  marquee-strip:
    backgroundColor: "{colors.block-navy}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    height: 36px
  footer:
    backgroundColor: "{colors.footer-bg}"
    textColor: "{colors.on-primary}"
    border: "1px solid rgba(255,255,255,0.10)"
    typography: "{typography.caption}"
    padding: 48px 24px
  link-card:
    backgroundColor: transparent
    textColor: "{colors.fg-muted}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: 10px 16px
---

## Overview

Marcelle Rocha's portfolio is, at the system level, an **editorial navy frame on warm paper**. The chrome, top nav, body copy, footer, primary CTA, stays quiet: `Inter` variable type at unusually fine weights (320 to 540), navy `{colors.primary}` ink on a warm off-white `{colors.bg}` canvas, hairline `{colors.border}` dividers, and pill-shaped CTAs. There are no gradients and only one soft shadow role; hierarchy is carried by type weight and by colour, not by elevation.

What gives the system its character is what happens **between** the quiet sections: the page drops into oversized **pastel color-block sections**, cream, pink, coral, and a deep navy, that span the content width with `{rounded.lg}` corners and `{spacing.xxl}` interior padding. On the home page the Cases list sits on a near-cream `{colors.cases-section-bg}` ground; inside case studies the story panels rotate through the block palette. These blocks read like hand-cut paper placed on a clean desk, technical and warm at once.

A single accent, `{colors.accent-magenta}`, does all the pointing: mono eyebrows, inline link hovers, the active nav item, and, in dark mode, the primary button fill itself. It is never a section colour.

Unlike a marketing site, this portfolio ships **three themes**: the light editorial default, a full class-based **dark theme** (`.dark`) with a parallel navy palette, and a WCAG **high-contrast mode** (`.high-contrast`) that collapses everything to pure black, pure white, and a single yellow for subtle text.

**Key Characteristics:**
- Navy-on-warm-paper core: `{colors.primary}` and `{colors.bg}` carry every headline, body line, and primary CTA in light mode.
- Oversized pastel **color-block sections** (`{colors.block-cream}`, `{colors.block-pink}`, `{colors.block-coral}`, `{colors.block-navy}`) define the narrative rhythm of the home page and every case study.
- One accent only: `{colors.accent-magenta}` for eyebrows, link hover, active state, and the dark-mode primary button. No second accent.
- `Inter` variable at fine weight increments (320, 330, 340, 480, 540, 700) reads as a single voice flexing, not a stepped weight family.
- Pill for every text CTA (`{rounded.pill}`), circle for every icon button (`{rounded.full}`). No square buttons.
- Tight negative letter-spacing that scales with size (-1.60px at 80px, near-zero at body) for an editorial display cadence.
- Monospace reserved for uppercase eyebrows and captions, `{typography.caption}`, never body.
- Full dark theme + high-contrast mode are first-class, not afterthoughts.
- Motion is restrained: `fadeInUp` + `stagger` on scroll-in (Framer Motion), an expanding clip-path circle when opening a case, all suppressed under `prefers-reduced-motion`.

## Colors

### Brand & Accent
- **Navy** (`{colors.primary}` `#131226`): the system primary. Every primary CTA in light mode, every headline, the logo, body ink. Also the value of `{colors.fg}`.
- **On-Primary** (`#ffffff`): text on navy and magenta surfaces.
- **Accent Magenta** (`{colors.accent-magenta}` `#B4225E`): the only accent. Uppercase mono eyebrows (`type-caption`), inline link hover, the active nav item (`font-weight: 540`), the footer role line, and, in dark mode, the entire fill of `button-primary`. Use once or twice per view, never as a decorative wash.
- **Success Green** (`{colors.semantic-success}` `#1ea64a`): glyph fill for positive/validated states. Not a surface.

### Surface — light
- **Canvas** (`{colors.bg}` `#FEF4EF`): warm off-white page background. Every plain `Card` also uses this.
- **Secondary** (`{colors.bg-secondary}` `#ececea`): category chips, muted fills.
- **Surface Soft** (`{colors.surface-soft}` `#ececea`): icon-button background on light ground.
- **Case Preview** (`{colors.case-preview-bg}` `#F9F7F8`): the neutral ground behind device mockups in case cards.
- **Border / Hairline** (`{colors.border}` `#e6e6e6`): 1px dividers, card strokes, secondary-button outline, tag-pill outline.

### Surface — dark (`.dark`)
- **Canvas** (`#121124`), **Secondary** (`#1f1d3d`), **Surface Soft** (`#1a1836`), **Case Preview** (`#131226`).
- **Border** `rgba(255,255,255,0.12)`.
- **Text**: `fg` `#ffffff`, `fg-muted` `#e4e4e7`, `fg-subtle` `#a1a1aa`.

### Text — light
- **Ink** (`{colors.fg}` `#131226`): headlines and primary body.
- **Muted** (`{colors.fg-muted}` `#404040`): descriptions, secondary body, the default paragraph colour inside case prose.
- **Subtle** (`{colors.fg-subtle}` `#666666`): captions, tag pills, metadata.

### Color Blocks
Full-width pastel panels, `{rounded.lg}` corners, `{spacing.xxl}` interior padding. Each has a documented dark-mode equivalent.
- **Cream** (`{colors.block-cream}` `#f4ecd6` / dark `#1e1c31`): the default / most common block. Home Cases ground uses a lighter sibling, `{colors.cases-section-bg}` `#FDFAF4`.
- **Pink** (`{colors.block-pink}` `#efd4d4` / dark `#261724`).
- **Coral** (`{colors.block-coral}` `#f3c9b6` / dark `#2b1410`).
- **Navy** (`{colors.block-navy}` `#211F4A`): the one inverse block; also the fill of the `marquee-strip`. Text goes `{colors.inverse-ink}`.

### Named component stops
`navy-600` `#38347E` and `navy-200` `#FAFAFA` are the hero headline inks (light / dark). `magenta-300` `#EC83B0` and `magenta-500` `#DB337C` are dark-mode nav-hover and button-hover. `footer-bg` `#09081c` is the near-black shared by the footer and the top accessibility bar.

### High-contrast mode (`.high-contrast`)
`bg` `#000000`, `fg` `#ffffff`, `fg-subtle` `#FFFE80` (yellow), `border` `#ffffff`. All color blocks flatten to `#111111` / `#000000`. The logo is forced to pure white via `filter: brightness(0) invert(1)`. Accent magenta is retained. Honour this mode when designing any new surface.

## Typography

### Font Family
- **Inter** — loaded via `next/font` as a variable font (`--font-inter`), weight axis exercised at 320, 330, 340, 480, 540, 700. Fallback stack: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`. This is the single voice of the system.
- **Mono** — `ui-monospace, "JetBrains Mono", Menlo, monospace` (no custom mono is bundled; a system monospace renders). Used **only** for `{typography.caption}`: uppercase, 12px, positive `0.60px` tracking. Eyebrow labels and captions only, never a paragraph.

Base body on `<body>` is 18px / weight 320 / line-height 1.45 / `-0.26px`.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80px | 340 | 1.00 | -1.60px | Hero headline (via `clamp(2rem, 4.5vw, 4.5rem)` in practice) |
| `{typography.display-lg}` | 32px | 700 | 1.15 | -0.32px | Section opener headings (`Cases` title, page H1s) |
| `{typography.headline}` | 24px | 540 | 1.30 | -0.24px | Case-card titles, footer brand, story-block titles |
| `{typography.subhead}` | 24px | 340 | 1.30 | -0.24px | Near-headline intro paragraphs inside color blocks |
| `{typography.body-lg}` | 20px | 330 | 1.40 | -0.20px | Lead paragraphs |
| `{typography.body}` | 18px | 320 | 1.45 | -0.18px | Default body, case descriptions (`{colors.fg-muted}`) |
| `{typography.body-strong}` | 18px | 480 | 1.45 | -0.18px | Emphasis within body |
| `{typography.body-sm}` | 16px | 330 | 1.45 | -0.14px | Nav links, badges, footer links, card body |
| `{typography.body-xs}` | 12px | 330 | 1.45 | -0.10px | Fine print |
| `{typography.btn}` | 16px | 480 | 1.00 | -0.14px | Button label (all Button sizes) |
| `{typography.button}` | 20px | 480 | 1.40 | -0.10px | Large inline link / button emphasis |
| `{typography.caption}` | 12px | 400 | 1.00 | +0.60px | **mono**, uppercase — eyebrows, metadata, footer captions |

### Responsive type

| Token | Tablet (641–1536px) | Mobile (≤640px) |
|---|---|---|
| `display-xl` | 44px, -1px | 36px, 1.10, -0.5px |
| `display-lg` | 24px, -0.2px | 28px |
| `headline` / `subhead` | 20px, 1.35 | 20px, 1.40, -0.20px |
| `body` | 16px, 1.55 | — |

Section vertical padding (`py-section`) drops from **96px** to **48px** at both the tablet and mobile breakpoints.

### Principles
- **Weight, not size, carries body hierarchy.** An 18px paragraph at 320 sits beside 18px emphasis at 480; the eye reads emphasis without a scale jump.
- **Negative tracking scales with size.** -1.60px at display, near-zero at body.
- **Mono is taxonomy.** Uppercase 12px captions flag category; never set a sentence in mono.
- **Tight leading on display (1.00–1.15), generous on body (1.40–1.45).**

## Layout

### Spacing System
- **Base unit 8px.** Tokens: `{spacing.hair}` 1 · `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.section}` 96.
- Color-block interior padding: `{spacing.xxl}` (48px).
- Card interior padding: `{spacing.lg}` (24px).
- Section rhythm: `{spacing.section}` (96px desktop → 48px tablet/mobile).
- Case-list item gap: 96px desktop / 64px mobile (`space-y-24` / `space-y-16`).

### Grid & Container
- Max content width **1152px** (`max-w-6xl`), centred, side gutters `{spacing.lg}`–`{spacing.xl}` (16–24px on the nav, 24px on sections).
- Case rows are a 2-column grid (`1fr 1fr`) with `gap: 32–48px`, image and text swapping order on alternate rows (`md:order-*`).
- Hero uses a `3fr / 2fr` grid with explicit row/column placement; the description sits under the headline aligned to the 2fr column.

### Fixed chrome stack (top of viewport)
1. **Accessibility bar** — `height: 44px`, `{colors.footer-bg}` ground, at `top: 0`, `z-50`.
2. **Header** — `height: 56px`, `{colors.bg}` ground, `border-b {colors.border}`, at `top: 44px`, `z-40`.

Content offsets below both. `scroll-mt` of ~112px (`scroll-mt-28`) keeps anchored sections clear of the fixed chrome.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Color-block sections, hero, marquee, footer |
| 1 (hairline) | 1px `{colors.border}` on `{colors.bg}` | Cards, secondary button, tag pills, nav bottom edge |
| 2 (soft) | `0 4px 24px rgba(0,0,0,0.06)` light · `0 4px 24px rgba(0,0,0,0.35)` dark | `Card` hover, case-card image hover (paired with `translateY(-4px)` / `scale(1.02)`) |

Shadow is rare and only ever appears on hover. The change from warm canvas to a pastel block **is** the section break, colour does the work elevation would do elsewhere. Never put a drop shadow on a color-block section.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Small inline decorations, focus-ring rounding |
| `{rounded.sm}` / `{rounded.md}` | 8px | Inputs, image frames, small tiles |
| `{rounded.lg}` | 24px | `Card`, color-block sections, large containers |
| `{rounded.xl}` | 32px | Case-card image frames, the footer rationale link-card |
| `{rounded.pill}` | 50px | All text CTAs and badges |
| `{rounded.full}` | 9999px | Icon buttons, tag pills, contrast toggles |

### Geometry notes
- Case-card images: `{rounded.xl}` frame, `aspect-ratio: 4 / 3`, filled with `{colors.case-preview-bg}` and a CSS-drawn **device mockup** (a phone bezel at ~42% width with a notch, or a laptop lid with a stand). Bezel is `{colors.neutral-900}` in light / white in dark.
- No avatar circles in chrome; the About page photo uses rounded corners matching the CV button radius, not a circle.

## Components

### Buttons

Shared: `inline-flex`, `gap: 8px`, `type-btn` label, `transition-all 150ms`, `focus-visible: ring-2 ring-{colors.fg} ring-offset-2`, `active: scale(0.97)` (icon: `scale(0.95)`), `disabled: opacity 0.5`.

**`button-primary`** — navy pill. `{colors.primary}` bg, `{colors.on-primary}` text, `{rounded.pill}`, hover `opacity: 0.85`.
- **Dark mode (`button-primary-dark`)**: fill becomes `{colors.accent-magenta}`, hover `{colors.magenta-500}` at full opacity. This magenta-in-dark swap is a brand signature.

**`button-secondary`** — outline pill. Transparent bg, `1px solid {colors.fg}`, `{colors.fg}` text, `{rounded.pill}`, hover `bg: {colors.fg}/10` (dark: `white/10`). The "See case" / "Ver case" button uses this at size `sm` with a trailing `ArrowUpRight` 12px icon.

**`button-ghost`** — text only. `{colors.fg}` text, `{rounded.full}` hit area, hover `underline` with `4px` offset.

**`button-icon`** — `40 × 40`, `{rounded.full}`, `{colors.surface-soft}` bg, hover `bg: {colors.fg}/10`.

**Sizes** (all variants except icon): `xs` 12/4 · `sm` 16/8 · `md` 20/12 · `lg` 24/16 (px horizontal / py vertical, in px).

### Badges & Tags

**`badge-default`** — `{colors.bg}` bg, `1px {colors.border}`, `{colors.fg}` text, `{rounded.pill}`, `8px 12px`, `type-body-sm`. Interactive variant adds `cursor-pointer`, hover `border-color: {colors.fg}`.

**`badge-category`** — `{colors.bg-secondary}` bg, `{colors.fg-muted}` text, no border.

**`badge-active`** — `{colors.primary}` bg, `{colors.on-primary}` text. Selected filter state.

**`tag-pill`** — the skill/keyword pill on case cards. Transparent, `1px {colors.border}`, `{colors.fg-subtle}` text, `{typography.caption}` (uppercase mono), `{rounded.full}`, `4px 12px`.

### Cards

**`card`** — `{colors.bg}` bg, `1px {colors.border}`, `{rounded.lg}` (24px), `{spacing.lg}` (24px) padding.

**`card-hover`** — adds `transition-all 200ms ease-out`, `hover: scale(1.02)` + soft shadow (`0 4px 24px rgba(0,0,0,0.06)`, dark `0.35`).

**`case-card`** — a 2-column editorial row, not a boxed card. Left: a `{rounded.xl}` image frame on `{colors.case-preview-bg}` with a CSS device mockup, hover `translateY(-4px)` + shadow. Right: mono eyebrow `{company} · {category}` in `{colors.accent-magenta}`, `{typography.headline}` title, a row of `tag-pill`s, `{typography.body}` description in `{colors.fg-muted}`, then a `button-secondary` size `sm`.

### Color-Block Sections (signature)

Full-content-width panel, `{rounded.lg}` corners, `{spacing.xxl}` interior padding, no shadow. Variants: `color-block-cream` (default), `color-block-pink`, `color-block-coral`, `color-block-navy` (inverse text). Each has a dark-mode background equivalent (see Colors). Let the warm canvas return between two blocks so each reads as deliberate; don't stack two blocks in one viewport.

### Navigation

**`top-nav`** — fixed bar, `{colors.bg}` ground, `border-b {colors.border}`, `height: 56px`, max-width 1152px. Left: SVG logo (monogram on mobile, full wordmark ≥768px), 28px tall. Right: two nav links + a hairline-divided cluster of `LanguageSwitcher` and `ThemeToggle`.
- **Nav link** — `{typography.body-sm}`, `{colors.fg}`, hover `{colors.accent-magenta}` (dark: `{colors.magenta-300}`). Active page: `{colors.accent-magenta}` at weight 540.

**`accessibility-bar`** — fixed above the header, `{colors.footer-bg}` ground, `height: 44px`. Skip links (uppercase 11px, `letter-spacing 0.06em`) on the left; contrast toggle (two 24px circles, black + white) and A-/A+ font-size controls on the right. Focus rings are white here.

**`marquee-strip`** — `{colors.block-navy}` ground, `height: 36px`, a single infinite `translateX` scroll (`32s linear`) of `{typography.caption}` skill keywords in `{colors.on-primary}/70` separated by `·` in `/30`. `aria-hidden`; animation removed under `prefers-reduced-motion`.

### Footer

**`footer`** — `{colors.footer-bg}` `#09081c` ground, `border-top: rgba(255,255,255,0.10)`, `{spacing.xxl}` vertical padding, max-width 1152px. Two columns: left is the brand (`{typography.headline}` white name + `{typography.body-sm}` magenta role line "Product Designer | UX | CX"); right is a mono credit caption over a `link-card` (`{rounded.xl}`, `1px rgba(255,255,255,0.15)`, hover border `/35` + `bg white/0.04`) linking to `/racional` with a trailing arrow. A hairline bottom bar holds the mono copyright.

## Do's and Don'ts

### Do
- Keep `{colors.primary}` for genuine primary CTAs and headline ink. In dark mode the primary CTA is `{colors.accent-magenta}` — keep that swap.
- Pick **one** block colour per story section and let it span full content width with `{rounded.lg}` corners and `{spacing.xxl}` padding.
- Set type in `Inter` at the documented weights (320, 330, 340, 480, 540, 700). Don't reach for weights outside that set.
- Use mono (`{typography.caption}`) only for uppercase eyebrows, metadata, and captions.
- Compose every text CTA as a pill (`{rounded.pill}`), every icon button as a circle (`{rounded.full}`).
- Design every new surface for all three themes: light, `.dark`, and `.high-contrast`.
- Let the warm canvas return between two color blocks.
- Suppress non-essential motion under `prefers-reduced-motion`.

### Don't
- Don't introduce a second accent colour. Magenta is the only one; a new brand hue breaks the system.
- Don't rely on opacity for text hierarchy on light ground, use the `fg` / `fg-muted` / `fg-subtle` steps.
- Don't put a drop shadow on a color-block section, colour is the depth device.
- Don't square off CTAs or use a rectangular icon button.
- Don't set body copy in mono.
- Don't stack two color blocks inside a single viewport.
- Don't use pure `{colors.ink}` `#000000` as the light-mode text colour, the ink is navy `#131226`.

## Responsive Behavior

### Breakpoints
Tailwind v4 defaults, with two custom media ranges in `globals.css`:

| Name | Width | Key changes |
|---|---|---|
| Mobile | ≤640px | `display-xl` → 36px; section padding 96 → 48px; single-column grids; header shows monogram only |
| Tablet / notebook | 641–1536px | `display-xl` → 44px; `headline`/`subhead` → 20px; `body` → 16px/1.55; section padding 96 → 48px |
| `md` | ≥768px | Case rows go 2-column; full logo wordmark; nav labels inline |
| `2xl` | ≥1536px | Hero top padding grows to `{spacing.section}` scale |

### Touch targets
- Header logo link carries `min-height: 44px`.
- Icon button 40px; contrast toggles 24px inside a 44px bar.
- Nav and skip links keep `py` padding to stay ≥ 44px effective.

### Collapsing strategy
- **Header**: full wordmark → monogram below `md`; nav stays inline (only two items).
- **Case rows**: 2-column → stacked single column below `md`, image always first when stacked.
- **Color blocks**: keep `{rounded.lg}` corners at all sizes; interior padding may relax on mobile.
- **Accessibility bar**: skip links 2–4 hide below `sm`, leaving "Content" + controls.

## Motion

- **Library**: Framer Motion. Shared variants in `src/lib/animations.ts`.
- **`fadeInUp`**: `opacity 0 → 1`, `y 24 → 0`, `duration 0.5`, ease `[0, 0, 0.58, 1]`. The default scroll-in for sections (`whileInView`, `viewport once`).
- **`stagger`**: `staggerChildren 0.12` (fast variant `0.05`).
- **`slideInLeft`**: `x -28 → 0` for lateral reveals.
- **Hero scroll indicator**: a `ChevronDown` bobbing `y: [0, 6, 0]` on a 1.6s loop.
- **Preloader**: concentric target-rings animation on first load; must release on route change (owned by React state, never DOM removal).
- **Case open transition**: an overlay `motion.div` with an animated `clip-path: circle()` expanding from the click point, covering the screen before `router.push` and fading out after the pathname changes. Defined in `CaseTransitionProvider`.
- All decorative motion is disabled under `@media (prefers-reduced-motion: reduce)`.

## Known Gaps

- No custom monospace is bundled; `{typography.caption}` renders in whatever system mono is available (`JetBrains Mono` if installed, else `ui-monospace`). If a bundled mono is added later, wire it to `--font-jetbrains`.
- Form input / error-state styling is minimal in the current build (hairline border, `{rounded.md}`); validation treatment is not yet systematised.
- The `{colors.block-*}` dark equivalents are hand-tuned approximations of the light pastels, not algorithmic.
- Per-project case accent tokens exist (`--color-project-*`) but currently almost all resolve to the same cream/pink/coral set; treat them as a hook for future per-case theming rather than a live varied palette.
