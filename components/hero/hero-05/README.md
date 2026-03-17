# Hero 05 - Premium AI / SaaS Hero Component

`hero-05` is a reusable premium hero package created with semantic HTML, mobile-first CSS, and vanilla JavaScript. The design direction focuses on modern AI/SaaS product positioning with a strong content block, polished CTAs, trust indicators, and a dashboard-style media presentation built fully with SVG placeholders.

## Files

- `hero.html` - Standalone markup for the hero component.
- `hero.css` - Mobile-first styles with strict BEM naming and responsive breakpoints.
- `hero.js` - Progressive enhancement for pointer-reactive glow on media panel.

## Highlights

- Strict BEM naming (`hero-05__*`) for scalable reuse.
- Mobile-first responsive implementation.
- Required breakpoints included:
  - base
  - `@media (min-width: 480px)`
  - `@media (min-width: 760px)`
  - `@media (min-width: 1024px)`
- Premium dark UI direction with modular surfaces and refined gradients.
- Semantic structure including eyebrow, headline, supporting copy, CTA group, trust row, and media region.
- Dashboard-like SVG placeholders (chart, cards, KPI blocks) instead of raster images.
- Floating stat cards to reinforce product intelligence and maturity.
- Progressive enhancement effect:
  - Pointer-responsive glow tracking in media region.
  - Disabled automatically when `prefers-reduced-motion: reduce` is enabled.

## Usage

Open `hero.html` directly in a browser for standalone usage, or copy the section into your page and keep the accompanying `hero.css` and `hero.js` files.

## Accessibility and Performance Notes

- Uses semantic landmarks and labels for key regions.
- Buttons include visible `:focus-visible` states.
- Motion effect is subtle and pointer-driven to avoid continuous heavy animation.
- Reduced-motion preference is respected in both CSS and JavaScript.
