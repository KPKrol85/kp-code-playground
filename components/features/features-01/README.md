# Features 01 — Premium Feature Grid (HTML/CSS/JS)

A reusable, mobile-first feature cards section with polished editorial styling, strict BEM naming, and lightweight progressive enhancement.

## Files

- `features.html` — semantic section markup with realistic placeholder content and inline SVG icon artwork.
- `features.css` — mobile-first styles, premium surface treatment, and responsive layout rules.
- `features.js` — subtle pointer-responsive card tilt enhancement with reduced-motion respect.

## BEM Blocks

- `feature-grid` (section wrapper and layout)
- `feature-card` (individual card)

All nested elements use strict `__element` naming and optional `--modifier` naming.

## Usage

1. Copy `features.html` markup into your page where the section should render.
2. Include `features.css` in your stylesheet pipeline.
3. Include `features.js` before the closing `</body>` tag (or defer in `<head>`).

```html
<link rel="stylesheet" href="features.css" />
...
<script src="features.js" defer></script>
```

## Responsive Behavior

Breakpoints used:

- Base mobile
- `@media (min-width: 480px)`
- `@media (min-width: 760px)`
- `@media (min-width: 1024px)`

The layout scales from a single-column stacked card experience to a structured two-column premium grid.

## Accessibility Notes

- Semantic heading hierarchy and section landmark.
- Keyboard focus visibility for cards and actions.
- `prefers-reduced-motion` support for interaction transitions.
