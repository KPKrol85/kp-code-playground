# Limited Deal Card

Limited Deal Card is a premium promotional product-card component for **KP_Code Digital Vault**. It helps present time-sensitive offers such as launch pricing, seasonal campaigns, and early-access bundles with a calm, credible tone.

## Included files

- `index.html` – standalone preview page with demo cards
- `style.css` – scoped component styling, tokens, responsive grid, light/dark modes, motion safety
- `script.js` – progressive enhancements (optional countdown + selected-card live status)
- `README.md` – usage and customization guidance

## Recommended use cases

- Launch sale card
- Seasonal promotion
- Early access pricing
- Limited-time bundle
- Discounted premium product

## Customization options

Each card can be customized via content and attributes:

- Deal badge text
- Product name
- Product description
- Regular price
- Promotional price
- Timing/status text
- CTA label
- Disclaimer text
- Optional `data-deal-end` countdown behavior
- Selected state (`.is-selected`)

## Accessibility and UX notes

- Semantic structure: section + article + headings for clear hierarchy
- Price rows include explicit labels (`Regular price`, `Deal price`), not just color/strikethrough
- Status information is always readable as text
- CTA controls include visible `:focus-visible` styles
- Cards include `:focus-within` treatment for keyboard users
- Selection feedback is announced via a polite live region
- Component remains usable without JavaScript

## Responsive and platform behavior

- Mobile-first single-column layout on small screens
- Two-column layout on medium screens
- Four-card grid on larger screens when width permits
- Built-in dark mode using `prefers-color-scheme: dark`
- Reduced-motion support using `prefers-reduced-motion: reduce`
- Progressive enhancement keeps baseline content stable even if JS is unavailable

## Production note

Countdown values and promotional deadlines must always reflect real business rules in production. Avoid artificial urgency or misleading promotional timers.
