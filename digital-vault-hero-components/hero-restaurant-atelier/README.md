# Hero Restaurant Atelier

A premium, reusable **hospitality HERO component package** for the KP_Code Digital Vault. This package is designed for restaurants, chef brands, boutique cafes, bakeries, and fine dining landing pages that need a warm, elegant first-screen section focused on conversion.

## File Structure

- `index.html` — selector panel entry for this HERO product card.
- `hero-restaurant-atelier.html` — dedicated standalone HERO component page.
- `style.css` — fully scoped visual system and responsive layout styles.
- `hero-restaurant-atelier.js` — isolated interactions for dish spotlight, reveal, and card enhancement.
- `README.md` — usage and integration guide.

## Interactions Included

1. **Dish spotlight selector**
   - Native buttons switch featured dish content (name, description, price, tag).
   - Selected state is exposed via `aria-pressed`.

2. **Progressive reveal animation**
   - Uses `IntersectionObserver` when available.
   - Falls back gracefully and respects `prefers-reduced-motion`.

3. **Card hover/focus enhancement**
   - Menu cards and spotlight card get subtle elevated interaction hooks.
   - Keyboard focus is treated similarly to pointer hover.

## Reuse Instructions

1. Copy the full folder into your project.
2. Link `style.css` and `hero-restaurant-atelier.js` in your page.
3. Copy the `<section class="hero-restaurant-atelier">...</section>` block from `hero-restaurant-atelier.html`.
4. Keep body class `hero-restaurant-atelier-page` for page-level isolation.
5. Update copy, hours, location, and dish data in the HTML and JS object.

## Notes

- Built with semantic HTML, vanilla CSS, and vanilla JavaScript.
- No external dependencies or frameworks.
- Mobile-first layout that expands into an editorial split layout on desktop.
