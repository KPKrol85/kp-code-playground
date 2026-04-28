# Minimal SaaS Product Card

Minimal SaaS Product Card is component 08 in the **KP_Code Digital Vault** Product Cards line. It provides a clean, typographic, and high-trust card pattern for showcasing digital products in premium catalog environments.

## Included files

- `index.html` – standalone demo page with four reusable card instances
- `style.css` – scoped token-driven styles, responsive layout, light/dark themes, and reduced-motion handling
- `script.js` – lightweight progressive enhancement for selected-card state and aria-live status updates
- `README.md` – usage and customization documentation

## Recommended use cases

- Premium catalog grid
- B2B product listing
- Calm sales section
- SaaS-style resource directory
- Trust-focused product discovery area

## Card content model

Each card contains:

- Category badge
- Product name
- Value statement
- Metadata items (2–3)
- Price or status
- CTA label/action

## Customization options

You can customize per card by editing:

- Badge text (`.saas-card__badge`)
- Product name (`.saas-card__title`)
- Value statement (`.saas-card__value`)
- Metadata items (`.saas-card__meta-item` list)
- Price/status (`.saas-card__price` and `data-product-state`)
- CTA label (`.saas-card__cta`)
- Selected state styling (`.saas-card.is-selected`)

## Accessibility and behavior notes

- Uses semantic `section`, `article`, heading hierarchy, lists, and real links
- Includes strong `:focus-visible` treatment for keyboard users
- Uses `:focus-within` to subtly highlight a card when inner actions are focused
- Supports light and dark themes through `prefers-color-scheme`
- Supports reduced motion through `prefers-reduced-motion`
- Works without JavaScript; JS only adds optional selected-card feedback via `aria-live="polite"`

## Responsive behavior

- Mobile-first single-column layout
- Two-column grid on medium screens
- Four-column grid on larger screens
- No fixed card heights; content remains readable across varying text lengths
