# Footer Marketplace Grid

A premium standalone footer component for digital product marketplaces, template stores, creator platforms, and resource hubs.

## Included files

- `index.html` — Complete demo page with semantic marketplace footer structure.
- `style.css` — Scoped, mobile-first styling with responsive marketplace grid behavior.
- `script.js` — Progressive enhancement for current year, mobile accordion interactions, and support email copy action.

## Key features

- Marketplace-first layout with clear content segmentation:
  - Brand and marketplace trust positioning
  - Product category navigation
  - Curated collection links
  - Buyer support links
  - Creator/vendor links
  - Account shortcuts
  - Legal/trust/payment metadata row
  - Compact bottom legal bar
- Card-like footer groups that keep dense link inventories visually organized.
- Responsive layout strategy:
  - Mobile accordion groups (small screens)
  - Two-column grouping from `480px`
  - Expanded marketplace grid from `760px`
  - Polished multi-column layout from `1024px`

## Accessibility notes

- Uses semantic `footer`, `section`, and `nav` landmarks.
- Accordion uses native `button` elements with `aria-expanded` and `aria-controls`.
- Keyboard interaction is naturally supported through native controls.
- Links remain in HTML and are accessible even when JavaScript is unavailable.
- Visible `:focus-visible` states are included for links and buttons.
- Motion is reduced automatically for users who prefer reduced motion.

## Usage notes

1. Copy this folder into your project.
2. Keep class names as-is for scoped styling or map them into your design system.
3. Replace demo links and labels with real marketplace routes.
4. Update support email via the `data-email` attribute on the copy button.

## Customization ideas

- Swap color tokens in `:root` to match your brand.
- Adjust grid breakpoints if your product catalog has more/fewer footer groups.
- Add compliance/trust badges in the metadata row as needed.
- Integrate the footer into CMS-driven link management later while preserving semantic structure.
