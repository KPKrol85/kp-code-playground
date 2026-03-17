# Feature 03 — Editorial Premium Split Cards

## Component purpose
This package provides a premium, image-led feature card section designed for high-end marketing surfaces (portfolio, agency storytelling, product campaigns, and destination showcases). The composition emphasizes visual narrative first, then concise conversion-focused copy.

## File structure
- `index.html` — semantic section markup with three split cards
- `style.css` — fully scoped, mobile-first visual system and responsive layout
- `script.js` — lightweight progressive enhancement (reveal + pointer glow refinement)
- `README.md` — implementation notes and reuse guidance

## Content anatomy
Each card is built with two explicit zones:
1. **Media zone** (`.fc3ep-card__media` + `.fc3ep-visual`) for imagery/visual texture.
2. **Content zone** (`.fc3ep-card__content`) containing:
   - optional category badge/tag
   - headline
   - supporting copy
   - CTA action link

## Visual strategy
- Deep-dark canvas with restrained atmospheric gradients.
- Premium spacing rhythm using `clamp()` for fluid scale.
- High legibility hierarchy:
  - uppercase eyebrow + card tags
  - strong editorial headlines
  - muted but readable body copy
- Abstract visual panels are self-contained CSS gradients (easy to replace with real images later).

## Border and glow treatment
- Border is handled as a **designed accent**, not a default stroke:
  - thin gradient edge (~1px) via masked pseudo-element
  - subtle tonal variation for premium separation
- Glow is intentionally restrained:
  - soft radial bloom, low opacity
  - shown on hover/focus and pointer tracking
  - used for depth, never for spectacle

## Interaction model
- Card hover/focus states:
  - slight lift
  - gentle media scale refinement
  - soft border glow response
- CTA hover/focus:
  - mild translate emphasis
  - high-contrast `:focus-visible` ring for keyboard users
- JS enhancements are optional polish only; component remains usable without JS.

## Accessibility considerations
- Semantic section/article structure.
- `aria-labelledby` ties section heading to container.
- Media areas include `role="img"` with descriptive `aria-label`.
- Keyboard-visible focus states are explicit on CTAs.
- Contrast is tuned for dark surfaces with readable copy and controls.
- Reduced motion support via `prefers-reduced-motion`.

## Responsive behavior
- **Mobile (default):** cards stack into single-column with media above content.
- **Tablet/Desktop (`min-width: 760px`):** split layout restores side-by-side composition.
- Alternate card can reverse media/content order for editorial rhythm.

## Reuse recommendations
- Replace `.fc3ep-visual--*` gradient blocks with real images via `background-image` or inline `<img>`.
- Duplicate `<article>` blocks to scale list length.
- Keep copy concise (headline + short paragraph + one CTA) for campaign clarity.
- Preserve thin edge and subtle glow values to maintain premium restraint.
