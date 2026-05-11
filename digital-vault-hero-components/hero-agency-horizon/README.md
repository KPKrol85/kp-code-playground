# Hero Agency Horizon

A premium, standalone HERO component package for agencies, studios, consultants, and high-end service businesses that need a modern trust-first opening section.

## Use case

This package is designed for service brands selling strategic and creative outcomes. It combines editorial typography, proof-driven messaging, and interactive service focus to support premium positioning.

## File structure

- `index.html` — KP_Code Digital Vault selector entry for this package.
- `hero-agency-horizon.html` — Dedicated hero component page.
- `style.css` — Fully scoped styling using `hero-agency-horizon` class naming.
- `hero-agency-horizon.js` — Isolated interactions and progressive-enhancement behavior.
- `README.md` — Usage and implementation notes.

## JavaScript interactions

- **Service card selection:** Uses native `<button>` cards with `aria-pressed` state updates.
- **Rotating proof message:** Cycles premium proof copy in the proof line.
- **Reveal transitions:** Metrics and cards reveal via Intersection Observer.
- **Pointer-aware glow:** Desktop pointer movement updates the horizon glow focal point.
- **Reduced motion support:** Animations and timed motion are reduced when user preference is enabled.

## Copy/reuse workflow

1. Duplicate the package folder into your project.
2. Replace headline, lead paragraph, metrics, service cards, and client names.
3. Keep class names intact for reusable styling and JS behavior.
4. If adding more cards, keep the `data-service-card` attribute on each interactive card.
5. For additional proof lines, append strings to the `messages` array in `hero-agency-horizon.js`.

No external assets, dependencies, or frameworks are required.
