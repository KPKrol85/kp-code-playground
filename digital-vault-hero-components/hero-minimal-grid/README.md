# Hero Minimal Grid

A standalone premium HERO package for the **KP_Code Digital Vault** focused on minimalist editorial design, clean product storytelling, and reusable interaction patterns.

## Best use cases

- Modern SaaS landing pages needing a sharp, trustworthy first fold
- Design studio sites balancing visual control with practical content modules
- Personal brand/product pages that need premium clarity without decorative noise

## File structure

- `index.html` — selector panel entry page for the HERO package
- `hero-minimal-grid.html` — full HERO implementation page
- `style.css` — scoped styles using `hero-minimal-grid-*` class naming
- `hero-minimal-grid.js` — isolated interactive behaviors
- `README.md` — package usage and integration notes

## JavaScript interactions

`hero-minimal-grid.js` provides progressive enhancement only:

1. **Interactive feature grid selection**
   - Feature blocks are native `<button>` elements.
   - Selected state updates `aria-pressed` and visual active styling.
   - Statement/proof content updates from `data-*` attributes.

2. **Dynamic proof statement updates**
   - The right-side proof block updates title, body, and metric when a grid cell is activated.
   - Uses guarded selectors to avoid runtime errors when optional nodes are absent.

3. **Reveal-on-scroll animation**
   - Uses `IntersectionObserver` when available.
   - Falls back to immediate visibility when unsupported or when reduced motion is requested.

4. **Optional pointer-aware highlight**
   - On fine-pointer/hover devices, a subtle radial highlight follows pointer movement in the feature grid container.
   - Disabled for reduced-motion users.

## Reuse instructions

1. Copy the full folder `hero-minimal-grid` into your project.
2. Keep `style.css` and `hero-minimal-grid.js` linked in your chosen HTML page.
3. Reuse the HERO section from `hero-minimal-grid.html` and update copy only.
4. For new feature cells, duplicate one button and adjust:
   - visible label/detail text
   - `data-cell`, `data-statement`, and `data-metric` values
5. Preserve the scoped class names (`hero-minimal-grid-*`) to avoid style collisions.

The package is dependency-free and designed for direct copy/paste integration.
