# Hero Trust Layer

A premium, trust-first HERO package for B2B service organizations, consultants, legal firms, and advisory-led brands that need to project authority and clarity above the fold.

## Use Case

Use **Hero Trust Layer** when your product or firm sells high-trust engagements and decision-makers need immediate confidence in your:

- Delivery credibility
- Process transparency
- Executive communication quality
- Proof of outcomes

## File Structure

- `index.html` — Selector panel for the KP_Code Digital Vault package with quick access to Hero Trust Layer.
- `hero-trust-layer.html` — Dedicated standalone HERO component page.
- `style.css` — Scoped styling for selector + HERO with responsive layouts and premium visual treatment.
- `hero-trust-layer.js` — Isolated interactions (metrics animation, process selection, proof updates, reveal behavior).

## JavaScript Interactions

The component uses progressive enhancement:

1. **Trust metric animation**
   - Metrics animate from 0 to target values once visible.
   - If `prefers-reduced-motion: reduce` is active, values render immediately.

2. **Process confidence cards**
   - Native `button` controls support mouse and keyboard usage.
   - Selected state is exposed with `aria-pressed="true"`.
   - Selection updates the proof quote and client role context.

3. **Proof/testimonial updates**
   - The proof region uses polite live announcements for understandable updates.

4. **Reveal animations**
   - IntersectionObserver reveals content blocks as they enter viewport.
   - Motion gracefully reduces for accessibility preferences.

## Reuse Instructions

1. Copy the full `hero-trust-layer` folder into your project.
2. Link `style.css` in your page `<head>`.
3. Add the hero markup from `hero-trust-layer.html` where needed.
4. Include `hero-trust-layer.js` with `defer` before closing `</head>` or at end of `<body>`.
5. Update copy, metrics, and process proof map to match your organization while preserving class names for behavior.

This package is standalone and dependency-free (HTML, CSS, vanilla JavaScript).
