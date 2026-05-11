# Hero Commerce Spotlight

A standalone premium e-commerce hero package for the KP_Code Digital Vault. It is designed for product landing pages where conversion, trust, and package selection are key.

## Use case

Use this HERO when you need a high-converting top section for:
- Physical products with tiered bundles
- Digital offers with pricing tiers
- Premium services with package comparisons

## Files

- `index.html` — Component selector panel entry for this HERO package.
- `hero-commerce-spotlight.html` — Dedicated HERO page with the full conversion layout.
- `style.css` — Scoped styles for selector and hero pages.
- `hero-commerce-spotlight.js` — Variant selection, dynamic pricing/meta updates, reveal behavior, and pointer preview motion.
- `README.md` — Package documentation and reuse guidance.

## Variant selector behavior

- Uses native `<button>` elements for accessibility.
- Maintains selected state using `.is-selected` + `aria-pressed`.
- Updates package label, price, and supporting offer metadata in real time.
- Supports ArrowLeft/ArrowRight keyboard navigation between variant options.

## Reuse guide

1. Copy the full folder into your project.
2. Link `style.css` and `hero-commerce-spotlight.js` from the page where you render `hero-commerce-spotlight.html` markup.
3. Update product copy, tier labels, pricing, and metadata via `data-label`, `data-price`, and `data-meta` on variant buttons.
4. Keep class names prefixed with `hero-commerce-spotlight` for style isolation.
5. If you disable motion-heavy effects, the component still works through progressive enhancement and reduced-motion handling.
