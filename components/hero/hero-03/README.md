# Hero 03 — Premium Medical Care Hero

A reusable hero component tailored for premium healthcare, clinics, hospitals, diagnostics, telehealth, and medical retail experiences.

## Files

- `hero.html` — Semantic, standalone hero markup with strict BEM class naming.
- `hero.css` — Mobile-first responsive styles with breakpoints at 480px, 760px, and 1024px.
- `hero.js` — Progressive enhancement interaction for subtle pointer-responsive glow and floating card motion.

## Highlights

- Strict BEM naming convention (`med-hero03` block).
- Clear content and media columns with trust signals and service cues.
- Inline SVG placeholder illustration suitable for healthcare products/services.
- Dual CTA hierarchy (`Book appointment` and `Explore services`).
- Responsive layout and spacing tuned for mobile-first usage.
- `prefers-reduced-motion` support in both CSS and JavaScript behavior.

## Usage

1. Include `hero.css` in your page `<head>`.
2. Place `hero.html` where the hero should appear.
3. Load `hero.js` near the end of `<body>` or with `defer`.

Example:

```html
<link rel="stylesheet" href="hero.css" />
...
<section>...</section>
...
<script src="hero.js" defer></script>
```

## Accessibility & performance notes

- Uses semantic headings, sectioning, and labeled grouped actions.
- High-contrast text and clear focus-visible styles for CTAs.
- The interaction effect is lightweight, optional, and disabled for reduced-motion users.
