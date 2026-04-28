# Bundle Offer Card

Bundle Offer Card is a premium product-card component for **KP_Code Digital Vault** designed to present multi-product bundles in a trustworthy, sales-oriented format.

It highlights what is included, the value comparison, the savings opportunity, and a strong conversion-focused CTA while keeping the layout structured and commercial.

## Included files

- `index.html` – standalone demo page with three bundle examples
- `style.css` – scoped styles, local design tokens, responsive layout, dark mode, and motion preferences
- `script.js` – progressive enhancement for expandable bundle details
- `README.md` – usage and customization notes

## Recommended use cases

- Product bundle offers
- Starter pack sections
- Launch promotions
- Curated product collections
- Bundle-focused landing pages

## Customization options

You can customize each card by updating:

- Bundle badge
- Bundle title
- Audience description
- Included products list (3–5 items recommended)
- Total value
- Bundle price
- Savings badge text
- CTA label
- License note
- Expandable preview content

## Behavior and quality notes

- Uses semantic article-based card structure, native lists, buttons, and links.
- Includes accessible expand/collapse behavior with `aria-expanded` and `aria-controls`.
- Works as progressive enhancement: core bundle information stays visible even with JavaScript disabled.
- Provides visible keyboard focus states for interactive elements.
- Uses a mobile-first responsive grid that scales from stacked cards to two and three columns.
- Supports dark mode with `prefers-color-scheme: dark`.
- Supports reduced-motion preferences with `prefers-reduced-motion: reduce`.
