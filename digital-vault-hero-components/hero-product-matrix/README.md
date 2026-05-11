# Hero Product Matrix

A premium, standalone HERO package for **product libraries, component marketplaces, digital vaults, template shops, and SaaS resource hubs**.

The component is designed to help customers scan product categories quickly, preview featured assets, and understand catalog value metrics above the fold.

## File structure

- `index.html` — KP_Code Digital Vault selector panel with product card entry for this HERO.
- `hero-product-matrix.html` — Dedicated HERO component page with matrix preview and featured product panel.
- `style.css` — Fully scoped, reusable styling with responsive layout and premium visual treatments.
- `hero-product-matrix.js` — Progressive enhancement logic for filtering, featured previews, active states, reveal effects, and pointer glow.

## Filtering behavior

- Category filters are built with native `<button>` controls.
- Selected category is exposed through `aria-pressed` and active visual states.
- Filtering shows only matching matrix items and updates an aria-live status line.
- The featured product panel updates dynamically from the active matrix cell dataset.
- Matrix cells support mouse, Enter, and Space activation.

## Responsive behavior

- Mobile-first layout prioritizes clear content flow and tappable controls.
- Matrix content stacks into individual product cards on small screens.
- Desktop view upgrades to a stronger modular grid with richer spatial hierarchy.
- CTA controls and category chips wrap naturally without overflow.

## Accessibility and motion

- Strong `:focus-visible` states are included for buttons, links, and matrix cells.
- Contrast is tuned for readable dark-dashboard UI contexts.
- Reveal and pointer effects are disabled or reduced when `prefers-reduced-motion` is enabled.

## Reuse instructions

1. Copy the entire `hero-product-matrix` folder into your project.
2. Link `style.css` and `hero-product-matrix.js` from your target page.
3. Copy the `<section class="hero-product-matrix">...</section>` block from `hero-product-matrix.html`.
4. Replace matrix cell `data-*` values (title, desc, tag, metric, price) with your product catalog entries.
5. Add or remove category chips as needed; keep `data-category` values aligned between chips and cells.

This package is framework-free and dependency-free, making it suitable for direct production use or adaptation within larger design systems.
