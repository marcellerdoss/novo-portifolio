---
version: 1.0
name: marcelle-portfolio-design-system
description: "An Apple-inspired monochrome-first portfolio with a dual-mode surface system (light parchment / near-black tile) and a single Action Blue accent. Inter variable type mirrors SF Pro's weight ladder; semantic color tokens power a complete dark mode. Per-project pastel color tokens echo the case card identities without competing with the blue accent."

colors:
  # Brand accent
  primary: "#0066cc"
  primary-focus: "#0071e3"
  primary-on-dark: "#2997ff"

  # Light surfaces
  canvas: "#ffffff"
  canvas-parchment: "#f5f5f7"
  surface-pearl: "#fafafc"

  # Dark surfaces (tile system)
  surface-tile-1: "#272729"
  surface-tile-2: "#2a2a2c"
  surface-tile-3: "#252527"
  surface-black: "#000000"

  # Text
  ink: "#1d1d1f"
  ink-muted-80: "#333333"
  ink-muted-48: "#7a7a7a"
  body-on-dark: "#ffffff"
  body-muted: "#cccccc"

  # Borders
  divider-soft: "#f0f0f0"
  hairline: "#e0e0e0"

  # Project card palette (pastel, always light-text black)
  project-sellbie-redesign-bg: "#c5b0f4"
  project-sellbie-jornadas-bg: "#dceeb1"
  project-sellbie-arq-info-bg: "#c8e6cd"
  project-sellbie-metricas-bg: "#f4ecd6"
  project-sellbie-crm-bg: "#efd4d4"
  project-sellbie-cashback-bg: "#f3c9b6"
  project-jg-alfabetizacao-bg: "#dceeb1"
  project-jg-central-ajuda-bg: "#c8e6cd"

typography:
  hero:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.28px
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: 0
  display-md:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.47
    letterSpacing: -0.374px
  lead:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0.196px
  lead-airy:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  tagline:
    fontFamily: Inter
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: 0.231px
  body-strong:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.374px
  body:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: -0.374px
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.224px
  caption-strong:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.29
    letterSpacing: -0.224px
  button-large:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: 0
  button-utility:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: -0.224px
  fine-print:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px
  nav-link:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 17px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

shadows:
  product: "rgba(0, 0, 0, 0.22) 3px 5px 30px 0px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
    activeState: scale(0.95)
  button-secondary:
    backgroundColor: transparent
    border: "1px solid {colors.primary}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
    activeState: scale(0.95)
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    activeState: scale(0.95)
  button-icon:
    backgroundColor: "rgba(210,210,215,0.64)"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
    activeState: scale(0.95)
  button-sm:
    padding: 8px 16px
    typography: "{typography.button-utility}"
  button-lg:
    padding: 14px 28px
    typography: "{typography.button-large}"
  card:
    backgroundColor: "{colors.canvas}"
    darkBackgroundColor: "{colors.surface-tile-2}"
    border: "1px solid {colors.hairline}"
    darkBorder: "rgba(255,255,255,0.10)"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-hover:
    transform: scale(1.02)
    shadow: "0 4px 24px rgba(0,0,0,0.08)"
    darkShadow: "0 4px 24px rgba(0,0,0,0.35)"
  nav:
    backgroundColor: "{colors.canvas}"
    darkBackgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink}"
    darkTextColor: "{colors.body-on-dark}"
    typography: "{typography.nav-link}"
    height: 44px
  footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.fine-print}"
    padding: 64px 32px
---

## Overview

Marcelle Rocha's portfolio follows an Apple-inspired editorial frame: near-invisible UI that keeps the work front-and-center. The page is a stack of light and dark surface tiles — alternating white/parchment and near-black — with a single Action Blue accent carrying every interactive element. Per-project pastel color tokens give each case card a distinct identity without competing with the blue.

The system ships with a complete dark mode via next-themes (`.dark` class strategy). Semantic tokens (`--bg`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border-token`) switch between modes; static palette tokens remain constant. Inter (variable) stands in for SF Pro, exercising the same 300/400/600/700 weight ladder that makes the design feel Apple-tight.

**Key characteristics:**
- Single blue accent (`{colors.primary}` #0066cc) carries every interactive element — links, pill CTAs, focus rings.
- Dual-mode surface system: light (`{colors.canvas}`, `{colors.canvas-parchment}`) ↔ dark (`{colors.surface-tile-1}`, `{colors.surface-tile-2}`).
- Pill is the only CTA shape — `{rounded.pill}` for text buttons, `{rounded.full}` for icon buttons.
- Body copy at 17px, not 16px — the extra pixel defines a reading pace rather than a scanning pace.
- Weight 300 used sparingly at large sizes (`{typography.lead-airy}`, `{typography.button-large}`) as an airy cue.
- Per-project pastel tokens (`{colors.project-*-bg}`) color case cards; all use black text.
- `{shadows.product}` — the single drop-shadow in the system, reserved for product imagery only.

## Colors

### Brand Accent
- **Action Blue** (`{colors.primary}` — #0066cc): The universal "click me" signal. All pill CTAs, all text links, focus ring root. Never used as a surface.
- **Focus Blue** (`{colors.primary-focus}` — #0071e3): Reserved for the 2px `outline` keyboard focus ring on buttons.
- **Sky Link Blue** (`{colors.primary-on-dark}` — #2997ff): A brighter blue for in-copy links on dark tiles, where Action Blue would disappear.

### Light Surfaces
- **Canvas** (`{colors.canvas}` — #ffffff): Default page background, card backgrounds, and nav in light mode.
- **Parchment** (`{colors.canvas-parchment}` — #f5f5f7): Footer background; alternating section tile for visual rhythm.
- **Pearl** (`{colors.surface-pearl}` — #fafafc): Ghost button fill on parchment surfaces.

### Dark Surfaces
- **Tile 1** (`{colors.surface-tile-1}` — #272729): Primary dark tile surface; `--bg-secondary` in dark mode.
- **Tile 2** (`{colors.surface-tile-2}` — #2a2a2c): Slightly lighter; used for Card backgrounds in dark mode.
- **Tile 3** (`{colors.surface-tile-3}` — #252527): Slightly darker; embedded media/video frames.
- **Black** (`{colors.surface-black}` — #000000): Nav bar background in dark mode; pure voids.

### Text
- **Ink** (`{colors.ink}` — #1d1d1f): All headlines and body on light surfaces. Near-black (not pure black) keeps the page photographic.
- **Ink Muted 80** (`{colors.ink-muted-80}` — #333333): Ghost button text; slightly softer for secondary reads.
- **Ink Muted 48** (`{colors.ink-muted-48}` — #7a7a7a): `--fg-subtle` in light mode; disabled states, fine print.
- **Body on Dark** (`{colors.body-on-dark}` — #ffffff): All text on dark tile surfaces.
- **Body Muted** (`{colors.body-muted}` — #cccccc): Secondary copy on dark tiles; `--fg-muted` in dark mode.

### Borders
- **Divider Soft** (`{colors.divider-soft}` — #f0f0f0): Pearl Button border; `rgba(0,0,0,0.04)` equivalent.
- **Hairline** (`{colors.hairline}` — #e0e0e0): 1px borders on cards and utility inputs.

### Semantic Tokens (theme-adaptive)

| Token | Light | Dark |
|---|---|---|
| `--bg` | #ffffff | #1d1d1f |
| `--bg-secondary` | #f5f5f7 | #272729 |
| `--fg` | #1d1d1f | #f5f5f7 |
| `--fg-muted` | #333333 | #cccccc |
| `--fg-subtle` | #7a7a7a | #aaaaaa |
| `--border-token` | #e0e0e0 | rgba(255,255,255,0.1) |

In Tailwind use `text-fg`, `text-fg-muted`, `text-fg-subtle`, `bg-bg`, `bg-bg-secondary`, `border-border` — never hardcode light or dark hex values directly in components.

### Project Card Palette

Each case card receives a pastel background that echoes the project's visual identity. Text is always `#000000`. These tokens are never used as section backgrounds or UI surfaces.

| Project | Token | Color |
|---|---|---|
| Sellbie Redesign | `--color-project-sellbie-redesign-bg` | #c5b0f4 (lilac) |
| Sellbie Jornadas | `--color-project-sellbie-jornadas-bg` | #dceeb1 (lime) |
| Sellbie Arq. Info | `--color-project-sellbie-arq-info-bg` | #c8e6cd (mint) |
| Sellbie Métricas | `--color-project-sellbie-metricas-bg` | #f4ecd6 (cream) |
| Sellbie CRM | `--color-project-sellbie-crm-bg` | #efd4d4 (pink) |
| Sellbie Cashback | `--color-project-sellbie-cashback-bg` | #f3c9b6 (coral) |
| JG Alfabetização | `--color-project-jg-alfabetizacao-bg` | #dceeb1 (lime) |
| JG Central de Ajuda | `--color-project-jg-central-ajuda-bg` | #c8e6cd (mint) |

## Typography

### Font Family

**Inter** (variable, Google Fonts / Fontsource) — primary typeface. Loaded via `next/font/google` as a CSS variable (`--font-inter`), resolved through the `--font-sans` token. Exercises the same 300/400/600/700 weight ladder as SF Pro. OpenType `kern` enabled by default via browser heuristics.

Fallback stack: `var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, sans-serif`.

On macOS/iOS, the `system-ui` fallback resolves to SF Pro and the two are visually near-identical — the design works system-native on Apple platforms without the font download.

### Type Scale

| Class | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `.type-hero` | 56px | 600 | 1.07 | -0.28px | Hero section headline |
| `.type-display-lg` | 40px | 600 | 1.10 | 0 | Section opener headlines |
| `.type-display-md` | 34px | 600 | 1.47 | -0.374px | Sub-section heads |
| `.type-lead` | 28px | 400 | 1.14 | 0.196px | Hero tagline / product tile sub-copy |
| `.type-lead-airy` | 24px | 300 | 1.50 | 0 | Airy secondary leads; weight 300 is a deliberate atmosphere cue |
| `.type-tagline` | 21px | 600 | 1.19 | 0.231px | Sub-section taglines, nav category labels |
| `.type-body-strong` | 17px | 600 | 1.24 | -0.374px | Inline strong emphasis |
| `.type-body` | 17px | 400 | 1.47 | -0.374px | Default body — 17px, not 16px |
| `.type-caption` | 14px | 400 | 1.43 | -0.224px | Secondary captions, utility labels |
| `.type-caption-strong` | 14px | 600 | 1.29 | -0.224px | Emphasized captions |
| `.type-button-large` | 18px | 300 | 1.0 | 0 | CTA buttons at hero scale; weight 300 is intentional |
| `.type-button-utility` | 14px | 400 | 1.29 | -0.224px | Nav / utility button labels |
| `.type-fine-print` | 12px | 400 | 1.0 | -0.12px | Footer fine print, legal |
| `.type-nav-link` | 12px | 400 | 1.0 | -0.12px | Nav menu items |

### Principles

- **17px body, not 16px.** The extra pixel creates a reading pace rather than a scanning pace — a deliberate choice.
- **Negative tracking scales with size.** Hero: -0.28px; body: -0.374px. Below 14px tracking stays near-zero. The tightening produces the "Apple editorial" headline cadence.
- **Weight 300 is rare and atmospheric.** Used only at `{typography.lead-airy}` (24px) and `{typography.button-large}` (18px) — moments where the content should feel airy rather than assertive.
- **Weight 600 for headlines, never 700.** Except `{typography.tagline}` (21px/600), which is already 600. The ladder is 300 / 400 / 600 — 500 is deliberately absent.

## Layout

### Spacing System

Base unit: 8px. The `--spacing-md` is 17px (not 16px) — intentionally aligned to the body font size.

| Token | Value | Use |
|---|---|---|
| `--spacing-xxs` | 4px | Tight inline gaps |
| `--spacing-xs` | 8px | Icon-to-label gap |
| `--spacing-sm` | 12px | Compact internal card padding |
| `--spacing-md` | 17px | Default gap; aligned to body size |
| `--spacing-lg` | 24px | Card internal padding, column gap |
| `--spacing-xl` | 32px | Section sub-element separation |
| `--spacing-xxl` | 48px | Between major content blocks |
| `--spacing-section` | 80px | Vertical padding inside page sections |

### Grid & Container

- Max content width: ~1280px with side gutters.
- Case cards: responsive grid, 1-col (mobile) → 2-col (tablet) → 3-col (desktop).
- About stats: 3-col flex row.
- Skills: multi-row flex wrap with tag chips.
- Experience: single-column timeline.

### Whitespace Philosophy

Each section begins with `{spacing.section}` (80px) of vertical breathing room. The section color-change (white → parchment → dark tile) is the divider — no decorative rules or drop-shadows between sections.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat (0) | No shadow, no border | Section backgrounds, nav bar, footer |
| Hairline (1) | 1px `{colors.hairline}` / `rgba(255,255,255,0.10)` dark | Cards, form inputs |
| Hover elevation (2) | `0 4px 24px rgba(0,0,0,0.08)` light / `0 4px 24px rgba(0,0,0,0.35)` dark | Card hover state |
| Product shadow | `rgba(0,0,0,0.22) 3px 5px 30px 0` | Product/work imagery resting on a surface |

The single `{shadows.product}` is reserved for photography and work imagery — never applied to cards, buttons, or text. UI elevation comes from surface-color change (light ↔ dark tile) and the hairline border.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed section tiles |
| `{rounded.xs}` | 5px | Subtle chip corners |
| `{rounded.sm}` | 8px | Ghost button, dark utility button |
| `{rounded.md}` | 11px | Ghost capsule buttons; Pearl Button |
| `{rounded.lg}` | 18px | Cards (`{components.card}`), imagery frames |
| `{rounded.pill}` | 9999px | Primary and secondary text CTAs — the brand action signal |
| `{rounded.full}` | 9999px | Icon button (`{components.button-icon}`), circular avatars |

## Components

### Buttons

**`button-primary`** — Action Blue pill CTA ("Ver Cases", "Download CV").
- Background `{colors.primary}`, text white, `{typography.body}`, `{rounded.pill}`, padding 11×22px.
- Active: `scale(0.95)`. Focus: 2px `{colors.primary-focus}` outline. Hover: `opacity-90`.

**`button-secondary`** — Ghost pill with blue border and blue text.
- Background transparent, 1px solid `{colors.primary}`, text `{colors.primary}`, `{rounded.pill}`, padding 11×22px.
- Active: `scale(0.95)`. Hover: `bg-primary/5` (tinted fill).

**`button-ghost`** — Text-only for tertiary actions.
- Background transparent, text `{colors.ink-muted-80}`, `{rounded.sm}`.
- Hover: `text-fg` (promotes to full ink).

**`button-icon`** — 44×44px circular icon button floating over content.
- Background `rgba(210,210,215,0.64)` (translucent gray chip), `{rounded.full}`, size 44px.
- Hover: `rgba(210,210,215,0.80)`. Active: `scale(0.95)`.

**Size modifiers:**
- `sm`: `{typography.button-utility}` (14px), padding 8×16px.
- `md` (default): `{typography.body}` (17px), padding 11×22px.
- `lg`: `{typography.button-large}` (18px/300), padding 14×28px.

### Cards

**`card`** — The main surface for case previews and blog post tiles.
- Light: `bg-canvas border border-hairline rounded-lg p-lg`
- Dark: `bg-surface-tile-2 border border-white/10`
- Hover variant (`hover` prop): `scale(1.02)` + `{components.card-hover}` shadow.

### Navigation

**`nav`** — Sticky header bar.
- Light: `bg-canvas text-ink`; Dark: `bg-surface-black text-body-on-dark`.
- Height 44px; `{typography.nav-link}` (12px) for link labels.
- Two right-anchored pill CTAs ("Ver Cases", lang switcher) remain visible on all viewports.

### Footer

**`footer`** — Background `{colors.canvas-parchment}`, text `{colors.ink-muted-80}`.
- Typography `{typography.fine-print}` (12px) for links and labels.
- Padding 64px vertical × 32px horizontal.

## Dark Mode

Dark mode is toggled via next-themes using the `.dark` class strategy. The semantic tokens (`--bg`, `--fg`, etc.) switch automatically; static palette tokens remain constant.

In Tailwind, use the `dark:` variant exclusively through the `@custom-variant dark` defined in `globals.css`. This means `dark:` utilities only activate under `.dark, .dark *` — not via `prefers-color-scheme` media query directly.

**Transition:** `background-color 200ms ease, color 200ms ease` applied globally to `body` for a smooth mode switch.

## Do's and Don'ts

### Do
- Use `{colors.primary}` for every interactive element. No second accent color.
- Reference semantic tokens (`text-fg`, `bg-bg`, `border-border`) in components — never hardcode light or dark hex.
- Apply `{rounded.pill}` to every text CTA and `{rounded.full}` to every icon button. Pill = action.
- Run body text at 17px (`{typography.body}`), not 16px.
- Reserve `{shadows.product}` for imagery only — never on cards, buttons, or text.
- Use `transform: scale(0.95)` as the press/active state on all buttons.
- Apply `{colors.primary-on-dark}` (Sky Link Blue) for in-copy links on dark tiles; Action Blue disappears against `{colors.surface-tile-1}`.
- Use project card color tokens exactly as defined; never invent new project colors.

### Don't
- Don't add a second accent color. Every "click me" element is Action Blue.
- Don't apply `{shadows.product}` to cards or UI elements.
- Don't use weight 500 — the ladder is 300/400/600/700.
- Don't set body copy below 1.47 line-height — the generous leading is part of the reading experience.
- Don't hardcode hex values in components — always use CSS variable tokens.
- Don't use project pastel colors as section backgrounds or button fills.
- Don't add decorative gradients — depth comes from surface-color change and the product shadow only.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | ≤ 640px | Single-column case grid; nav collapses; hero type reduces |
| Tablet | 641–1023px | 2-column case grid; nav expands |
| Desktop | ≥ 1024px | 3-column case grid; full nav layout |

### Touch Targets
- `{components.button-primary}` and `{components.button-secondary}` land at ≥44px tap height via 11px vertical padding + 17px type.
- `{components.button-icon}` is exactly 44×44px.

### Collapsing Strategy
- **Case grid**: 1-col (mobile) → 2-col (tablet) → 3-col (desktop).
- **Nav**: full horizontal at ≥1024px; hamburger/mobile overlay below.
- **Hero type**: `.type-hero` (56px) scales down to `{typography.display-md}` (34px) on mobile.

## Iteration Guide

1. Reference components by token name (`{components.button-primary}`, `{components.card}`).
2. Color changes always go through semantic tokens first — `text-fg`, not `text-[#1d1d1f]`.
3. New case cards: add a `--color-project-<slug>-bg` and `--color-project-<slug>-text` pair to the `:root` block in `globals.css`. Text is always `#000000`.
4. When adding a new button state, add it as a separate variant in `Button.tsx` — do not bury states in prose.
5. `{colors.primary}` must remain the only interactive accent. If you feel the need for a second accent, reconsider the design.
6. Test every color combination in both light and dark mode before shipping.

## Known Gaps

- Form validation and error states are not yet documented (no form error states visible in current implementation).
- Blog post page typography at narrow viewport widths is not formally specified.
- Animated scroll transitions and micro-interactions are not documented (per the no-interaction policy of this file).
- The exact blur radius used for any frosted-glass effects is not formalized as a token.