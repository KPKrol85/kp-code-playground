# Category Gateway Card

A standalone premium navigation component for **KP_Code Digital Vault** that represents a full product category (not a single product). It helps users quickly understand what is inside each catalog section and move deeper into the platform.

## Included files

- `index.html` – standalone demo page with five category gateway card examples.
- `style.css` – scoped design system, layout, states, dark mode, and reduced-motion support.
- `script.js` – progressive enhancement for demo selection state and live status updates.
- `README.md` – usage and customization notes.

## Recommended use cases

- Vault homepage category grid
- Main catalog navigation
- Category landing page highlights
- Product discovery sections
- Curated digital product directories

## What the card communicates

Each card is built to clearly present:

- category name
- short category description
- product/resource count
- exactly 3 example tags
- primary CTA (`Explore category`)
- decorative category visual/icon (CSS-only)
- optional mini preview list of example products

## Customization options

You can customize each card by updating:

- category name
- category description
- product count text
- tag labels (3 per card)
- CTA label and link target
- category visual/icon motif and accent color
- mini preview list items
- selected state styling

## Accessibility and UX notes

- Uses semantic HTML (`section`, `article`, headings, and list markup).
- Uses descriptive CTA labels (for example, “Explore UI Components category”).
- Avoids invalid nested interactive elements by using an article container with a single CTA link.
- Includes clear `:focus-visible` and card `:focus-within` states for keyboard users.
- Decorative visuals are marked with `aria-hidden="true"`.
- Includes `aria-live="polite"` status messaging for selected-category demo feedback.

## Responsive and theme behavior

- Mobile-first one-column stack on small screens.
- Two-column grid on medium viewports.
- Polished multi-column layout on larger screens.
- Supports light theme by default and dark mode via `prefers-color-scheme: dark`.
- Supports motion-sensitive users via `prefers-reduced-motion: reduce`.

## Progressive enhancement behavior

Without JavaScript, the component remains fully readable and usable as a static category navigation UI.

With JavaScript enabled:

- Clicking an `Explore category` CTA marks the card as selected.
- A live status message announces the selected category name and count.
- CTA focus can emphasize the related card preview region for keyboard-friendly orientation.

## Production integration note

In production, connect CTA destinations and category selection behavior to the platform's real routing/navigation logic (instead of demo-only `#` links).
