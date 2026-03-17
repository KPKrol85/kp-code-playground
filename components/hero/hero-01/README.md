# Hero 01 · Premium Editorial Split

A premium, reusable hero component built with semantic HTML, mobile-first CSS, and enhancement-only vanilla JavaScript.

## Files

- `hero.html` — semantic structure with strict BEM naming
- `hero.css` — mobile-first styling, premium palette, responsive layout, and motion-safe transitions
- `hero.js` — subtle floating-card pointer enhancement with reduced-motion respect

## Features

- Strict BEM class naming (`premium-hero__element--modifier`)
- Mobile-first composition with responsive upgrades at:
  - `min-width: 480px`
  - `min-width: 760px`
  - `min-width: 1024px`
- Content + media split with:
  - eyebrow
  - headline
  - supporting paragraph
  - CTA pair
  - trust/meta row
  - media frame + inline SVG placeholder artwork
  - floating detail cards
- Refined, premium visual system:
  - dark editorial base
  - luminous violet/cyan accents
  - polished glass-like cards
  - restrained shadows and gradients
- Progressive enhancement:
  - lightweight pointer parallax for floating cards
  - disabled automatically when `prefers-reduced-motion: reduce` is active

## Usage

1. Place the hero markup from `hero.html` in your page.
2. Link the stylesheet:

```html
<link rel="stylesheet" href="hero.css" />
```

3. Include script before closing `</body>`:

```html
<script src="hero.js"></script>
```

4. Replace text, CTA links, and inline SVG details for your project brand.

## Adaptation Notes

- Change palette quickly via CSS custom properties in `:root`.
- Keep the `premium-hero` block name for consistency across reused instances.
- If multiple hero variants are added later, keep each in dedicated sibling folders under `components/hero/`.
