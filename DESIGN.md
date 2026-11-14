---
name: Atelier Brum
colors:
  surface: '#f1fbff'
  surface-dim: '#d2dce0'
  surface-bright: '#f1fbff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf5f9'
  surface-container: '#e6eff3'
  surface-container-high: '#e0eaee'
  surface-container-highest: '#dae4e8'
  on-surface: '#141d20'
  on-surface-variant: '#41484a'
  inverse-surface: '#293235'
  inverse-on-surface: '#e9f2f6'
  outline: '#71787b'
  outline-variant: '#c1c7ca'
  surface-tint: '#41636e'
  primary: '#032d36'
  on-primary: '#ffffff'
  primary-container: '#1f434d'
  on-primary-container: '#8bafbb'
  inverse-primary: '#a8ccd9'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fdae43'
  on-secondary-container: '#6d4400'
  tertiary: '#002d36'
  on-tertiary: '#ffffff'
  tertiary-container: '#17444e'
  on-tertiary-container: '#86b0bc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4e9f5'
  primary-fixed-dim: '#a8ccd9'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#284c56'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95e'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#beeaf6'
  tertiary-fixed-dim: '#a2ceda'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#214c57'
  background: '#f1fbff'
  on-background: '#141d20'
  surface-variant: '#dae4e8'
  canvas-cream: '#faf8f5'
  surface-linen: '#f2eee8'
  surface-petroleum-deep: '#16333b'
  gold-light: '#fef3df'
  gold-hover: '#d98c25'
  slate-tint: '#eef4f5'
  border-subtle: '#e6e2dc'
  border-petroleum: '#2c5661'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.015em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lead:
    fontFamily: TikTok Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-default:
    fontFamily: TikTok Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-strong:
    fontFamily: TikTok Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 24px
  caption:
    fontFamily: TikTok Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  eyebrow-caps:
    fontFamily: TikTok Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
  price-lg:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
  price-sm:
    fontFamily: TikTok Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2.5rem
  margin: 2rem
  margin-mobile: 1.25rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system translates the warmth, comfort, and quiet luxury of high-end home textiles—linens, Egyptian cottons, plush bath sheets, and artisan tableware—into a digital commerce flagship. Combining the editorial precision and cinematic discipline of modern storefront architecture with an organic, tactile soul, the interface balances generous breathing room, refined contrast, and warm artisanal accents.

The aesthetic fuses **Editorial Minimalism** with **Warm Organic Tactility**:
- **Editorial Proportion**: Deep margins, generous white space, structured tabular alignments, and deliberate typographic contrast between high-contrast transitional display serifs and clean, utilitarian body grotesque sans.
- **Sensory Atmosphere**: Rich petroleum slate grounds the canvas in serene luxury, while warm golden amber sparks energy into organic badges, price highlights, and celebratory micro-interactions.
- **Dual Track Navigation**: Cinematic brand moments (immersive lookbooks, artisan masteries, texture close-ups) command deep petroleum and off-canvas foundations, while transactional flows (collection grids, cart sheets, checkout pathways) glide smoothly over crisp milk white and warm natural linen surfaces.

## Colors

The chromatic language is anchored in the deep, serene hue of artisanal petroleum slate paired with the radiant warmth of raw honey and gold leaf embroidery:

- **Primary (`#1f434d`)**: The bedrock tone. Applied to major display titles on light backgrounds, primary pill buttons, structural borders, active states, and dark editorial section bands.
- **Secondary (`#f3a63b`)**: Warm honey amber drawn directly from the handcrafted floral insignia. Reserved for high-value accents, promotion chips, product availability badges, star ratings, and subtle interactive highlights.
- **Tertiary (`#406a75`)**: Softened sea-slate that handles supporting subheadings, hover strokes, auxiliary iconography, and metadata badges.
- **Neutral (`#121b1e`)**: Deep obsidian-petroleum ink providing high-legibility typographic output without the clinical severity of pure `#000000`.

### Background Surfaces & Track Logic
- **Light Track (Commerce & Browsing)**: Default canvas is `#ffffff` paired with `canvas-cream` (`#faf8f5`) for section striping and `surface-linen` (`#f2eee8`) for container cards and texture samples. Hairlines adopt `border-subtle` (`#e6e2dc`).
- **Dark Track (Lookbooks & Feature Immersion)**: Deep canvas utilizes `surface-petroleum-deep` (`#16333b`) and the brand primary (`#1f434d`), contrasted against crisp white typography and illuminated with delicate `gold-light` (`#fef3df`) or amber strokes.

## Typography

The typographic hierarchy pairs the literary grace of high-contrast display serif (`Playfair Display`) with the functional precision of `TikTok Sans`.

- **Playfair Display**: Evokes heirloom craftsmanship, weave density, and European boutique pedigree. Display styles employ deliberate tracking and generous vertical line heights to evoke an editorial magazine spread. It serves hero headlines, collection banners, product titles in featured tiers, and pricing callouts.
- **TikTok Sans**: Governs all functional e-commerce interactions—swatches, descriptions, specs, checkout forms, filters, and dense tabular comparison matrices.
- **Eyebrows & Micro-copy**: Rendered in uppercase with generous tracking (`0.12em`), referencing haute couture textile labeling and fabric blend stamps.

## Layout & Spacing

The layout is built upon an 8pt modular rhythm structured within an editorial 12-column grid.

### Breakpoints & Container Logic
- **Mobile (< 768px)**: 4 columns, `margin-mobile` (20px), gutters of 16px. Single-column stacked product showcases and horizontal snap carousels for thread count and linen varieties.
- **Tablet (768px - 1023px)**: 8 columns, 32px margins, 24px gutters. Dual-card product catalogs and split-screen product detail previews.
- **Desktop (≥ 1024px)**: 12 columns, max-width of 1440px (with immersive bleed zones scaling to 1600px for ambient photography). Standard catalog displays follow 3 or 4-up module grids.

### Spacing Philosophy
Negative space is treated as an active ingredient, reflecting pristine hotel bedding and impeccably styled dining settings. Section dividers default to generous empty margins (`space-2xl` and `space-3xl`) rather than heavy rule lines, allowing texture photography to breathe.

## Elevation & Depth

Visual hierarchy is maintained via tactile physical layers and crisp hairlines rather than murky, generic drop shadows.

- **Level 0 (Flat Ground)**: Baseline canvases (`#ffffff`, `#faf8f5`, `#16333b`). All card surfaces are anchored here by default with subtle `1px solid #e6e2dc` boundaries.
- **Level 1 (Fabric Card Lift)**: `0 2px 8px -2px rgba(31, 67, 77, 0.06), 0 1px 2px rgba(31, 67, 77, 0.04)`. Applied to active collection swatches, filter dropdowns, and hover states on product cards.
- **Level 2 (Floating Commerce Drawer)**: `0 12px 32px -4px rgba(18, 27, 30, 0.12), 0 4px 12px -2px rgba(18, 27, 30, 0.06)`. Used for the mini-cart sliding drawer, quick-view modals, and flyout navigation panels.
- **Dark Sheet Ambient Highlight**: On dark petroleum backgrounds, depth is conveyed through translucent white hairlines (`inset 0 1px 0 rgba(255, 255, 255, 0.12)`) and edge highlights rather than dark drop shadows.

## Shapes

The design system adopts a **Pill-shaped (Level 3)** signature for interactive and tag elements, paired with refined, softly radiused rectangular containers (`8px` to `12px`) for imagery and product cards.

- **Buttons & Action Controls**: `9999px` full pill contour. This creates a tactile, pebble-like softness reminiscent of river stones and organic bath essentials, standing in crisp, elegant contrast to structured serif typography.
- **Editorial Badges & Chips**: Strict full pill curves (`9999px`) with condensed vertical padding.
- **Product Tiles & Gallery Containers**: `10px` radius on imagery containers, framing fine threadwork and embroidery without harsh corner sharpness.
- **Input Fields**: Soft `8px` corner radius to maintain geometric harmony alongside pill buttons.

## Components

### Buttons
- **Shiny Action Button**: Every labelled action button on the site (CTAs, card actions, drawer/modal actions, filter actions) is rendered by `src/components/ui/shiny-borders-button.tsx` (`RealismButton`), so they all share one format: a `2px` pearlescent frame (`16px` outer radius) wrapping an inner plate (`14px` radius) that lifts by 10% on hover, with a soft gold halo behind the top-right corner. Only the colour palette changes per role, never the geometry.
  - `primary` — off-white plate (`#ffffff` → `#f1ede6`) with obsidian ink `Playfair Display` text and a warm stone frame. Default for CTAs, so they read on both the cream canvas and the dark editorial photography.
  - `green` — deep petroleum plate (`#1f434d`) with cream text, used where the interface itself carries the selected/active state (filter sheet confirm button).
  - `accent` — honey amber plate (`#f6c069` → `#e39c33`) with obsidian ink text.
  - `surface` — milk white plate with a `#e6e2dc` hairline and ink text, for secondary actions.
  - Text size and padding scale together through the `--shiny-btn-size` custom property (default `1.4rem`; `0.8rem`–`1rem` inside cards, drawers and modals).
- **Icon Controls**: Search, favourites, cart, close and quantity steppers stay circular (`9999px`) — they are controls, not actions.
- **Primary Pill CTA**: Background `#1f434d` with `#ffffff` text, full pill geometry (`9999px`), padding `14px 28px`. Hover shifts to `#16333b` with a subtle `+1px` translateY lift. Reserved for non-CTA utility surfaces.
- **Artisan / Accent Button**: Filled with warm honey amber `#f3a63b` and neutral ink `#121b1e` text. Used exclusively for primary purchase triggers ("Comprar Agora", "Adicionar à Sacola").
- **Secondary / Outline Pill**: Transparent fill, `1.5px solid #1f434d` border, text `#1f434d`. Hover fills with `slate-tint` (`#eef4f5`).
- **Dark Track Pill**: Transparent with `1.5px solid #ffffff` or subtle amber outline, white text.

### Badges & Pill Chips
- **Material Blend Chip**: Subtle linen background (`#f2eee8`), `#1f434d` text, `eyebrow-caps` typography, `6px 14px` padding.
- **Artisan / Special Thread Tag**: Warm honey background (`#fef3df`), deep amber text (`#d98c25`), denoting attributes such as "Algodão Egípcio 400 Fios" or "Puro Linho Francês".

### Product Listing Cards
- Clean vertical stack: `10px` rounded image frame on subtle off-white background (`#f8f7f4`), overlayed with top-left category badge. Below the frame: brand line in `caption` muted text, product name in `headline-sm`, fabric composition tag, followed by current price in `price-lg` petroleum slate (`#1f434d`).
- Hover triggers subtle image zoom (`scale(1.03)`) and reveals floating "Escolha Rápida" pill action.

### Swatches & Attribute Selectors
- **Color / Texture Disks**: `32px` circular swatches with actual high-resolution fabric texture patterns. Active selection displays an external `2px` offset ring in petroleum slate `#1f434d`.
- **Bed Size Selectors (Solteiro, Casal, Queen, King)**: Pill buttons with `1px solid #e6e2dc` borders, changing to filled `#1f434d` with white text when selected.

### Form Inputs & Selects
- Height `48px`, `8px` corner radius, `1px solid #e6e2dc` border, padding `0 16px`. Active focus state features `1.5px solid #1f434d` with no default blue browser glow.
- Floating label transitions gracefully to `11px` uppercase tracking above the value.

### Tabular Bed & Linen Specification Tables
- Minimal hairlines with alternating linen-tinted rows (`#faf8f5`). Headers set in `Playfair Display` at `16px`, spec descriptors in `TikTok Sans 14px` neutral slate.