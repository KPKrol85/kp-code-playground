# Compact Product Row Card

Compact Product Row Card is a premium, horizontal list-row component for **KP_Code Digital Vault**. It is designed for dense product surfaces where users need to scan many entries quickly while still seeing key product details and actions.

## Included Files

- `index.html` – Standalone preview page with six realistic product rows.
- `style.css` – Scoped styles, design tokens, responsive layout, and interaction states.
- `script.js` – Progressive enhancement for single-row selection and live status updates.
- `README.md` – Usage guidance and customization notes.

## Recommended Use Cases

- Search results
- Catalog list view
- Purchased product library
- Download center
- Admin/product overview

## Row Content Model

Each row is built to communicate critical product information in a compact layout:

- Thumbnail/icon
- Product type
- Product name
- One-line description
- Tags/compatibility labels
- Status or price
- Action button label
- Selected state indicator

## Customization Options

You can safely customize the component by updating:

- Thumbnail/icon text and style (`.product-row__thumb`)
- Product type (`.product-row__type`)
- Product name (`.product-row__title`)
- Description (`.product-row__description`)
- Tags (`.product-row__tags`, `.product-row__tag`)
- Status/price (`.product-row__status`)
- Action label (`.product-row__action`)
- Default selected row (`.is-selected`, `data-selected="true"`)

## Accessibility and UX Notes

- Semantic structure uses `section` + `ul` + `li` + `article` for list clarity.
- Product names use headings to improve skimmability and document structure.
- Buttons include descriptive accessible labels.
- Focus states are visible with `:focus-visible`.
- Selection updates are announced through an `aria-live="polite"` status message.
- The component remains readable and usable without JavaScript.

## Theming and Motion

- Light theme is default with local CSS custom property tokens.
- Dark theme is supported via `@media (prefers-color-scheme: dark)`.
- Motion is subtle and optimized for UI polish.
- Reduced motion is supported via `@media (prefers-reduced-motion: reduce)`.

## Responsive Behavior

- Mobile-first structure avoids horizontal overflow.
- Small screens keep rows compact while allowing text/tag wrapping.
- Medium/large screens switch to a four-column horizontal row grid for fast scanning.
- Long titles and descriptions are handled to prevent layout breaks.
