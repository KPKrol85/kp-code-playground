# Premium Resource Card

Premium Resource Card is a standalone product-card component for paid digital products in the KP_Code Digital Vault. It emphasizes value clarity, premium positioning, and commercial credibility through strong hierarchy, polished card styling, visible licensing, and trust-oriented details.

## Included files

- `index.html` – standalone demo page with three premium resource examples.
- `style.css` – scoped styling, local design tokens, light/dark theme support, responsive layout, and reduced-motion handling.
- `script.js` – progressive enhancement for active-card selection and live status updates.
- `README.md` – usage and customization guidance.

## Recommended use cases

- Paid template card
- Premium UI kit card
- Advanced tool card
- Pro pack card
- Commercial asset card
- Premium knowledge product card

## Customization options

You can customize each card instance by editing:

- Premium badge label (`.premium-resource__badge`)
- Product name (`.premium-resource__title`)
- Value promise (`.premium-resource__promise`)
- Price (`.premium-resource__price`)
- Included items (`.premium-resource__includes` and `.premium-resource__include`)
- License note (`.premium-resource__license`)
- CTA label (`.premium-resource__cta`)
- Trust note (`.premium-resource__trust`)
- Active/highlight states (`.premium-resource--active`, `.premium-resource--recommended`)

## Accessibility and behavior notes

- Uses semantic structure (`section`, `article`, `header`, `ul`, `li`) for clarity.
- Includes strong `:focus-visible` treatment for CTA buttons.
- Preserves readability and full card content without JavaScript.
- Uses `aria-live="polite"` status text for selected-card updates as progressive enhancement.
- Does not rely on color alone to indicate active/recommended state.

## Responsive and theme support

- Mobile-first layout with one-column cards by default.
- Two-column card grid at medium widths.
- Three-column grid on larger screens.
- Supports dark mode via `prefers-color-scheme: dark`.
- Supports reduced-motion via `prefers-reduced-motion: reduce` with reduced lift/animation effects.

## Progressive enhancement

The base component remains fully usable as static HTML. When JavaScript is available, clicking a card CTA marks that card as active and updates the live selection status with product name and price.
