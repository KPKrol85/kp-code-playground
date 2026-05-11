# Hero App Orbit

Hero App Orbit is a premium, standalone HERO package for app-first products. It is designed for mobile apps, SaaS platforms, fintech products, productivity tools, and dashboard-style digital services that need a modern conversion-focused entry experience.

## Included files

- `index.html` — KP_Code Digital Vault selector panel with package card and launch link.
- `hero-app-orbit.html` — Dedicated Hero App Orbit component page.
- `style.css` — Scoped visual system, responsive layout, depth, motion-ready states, and focus treatments.
- `hero-app-orbit.js` — Progressive enhancement logic for feature selection, dynamic mockup updates, reveal transitions, and motion preferences.

## Interaction behavior

- Feature cards are implemented as native `<button>` elements.
- Active feature state is surfaced via `aria-pressed`.
- Selecting a feature updates the mockup title, supporting copy, and metrics.
- Left/Right arrow keys move across feature buttons and trigger selection updates.
- Reveal animation uses IntersectionObserver when available and gracefully falls back.
- Orbit motion is softened and disabled when `prefers-reduced-motion: reduce` is active.

## Reuse workflow

1. Copy the `hero-app-orbit` folder into your project or component library.
2. Keep file names intact so relative links remain valid.
3. Update content in `hero-app-orbit.html` and the matching feature map in `hero-app-orbit.js`.
4. Adjust palette and spacing in `style.css` under scoped `.hero-app-orbit*` selectors.
5. Add additional feature cards by duplicating a button with a unique `data-feature` key and mapping it in JavaScript.

This package is dependency-free and production-oriented for easy integration into existing product landing pages.
