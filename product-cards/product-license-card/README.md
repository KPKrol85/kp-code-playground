# Product License Card

Product License Card is a premium, standalone component for **KP_Code Digital Vault** that helps users quickly understand digital product license options before buying or downloading.

It highlights license clarity with visible permitted usage, restrictions, price/status, and a clear call-to-action per tier.

## Included files

- `index.html` – standalone preview page with 3 license-focused product cards.
- `style.css` – scoped, responsive visual system with light/dark theme and motion-safe states.
- `script.js` – progressive enhancement for per-card license tier switching.
- `README.md` – usage and customization guidance.

## Recommended use cases

- Digital assets with license tiers
- UI kits
- Templates
- Component packs
- Commercial-ready products
- Products offering Personal, Commercial, and Extended license options

## Component features

- Semantic structure using `section`, `article`, `header`, `ul`, and native `button` controls
- License tier switcher (Personal / Commercial / Extended)
- Selected license summary with:
  - active license type
  - permitted usage list
  - limitations/restrictions note
  - price/status
  - tier-aware CTA label
- Accessible selection pattern via `aria-pressed`
- Per-card `aria-live="polite"` status updates on tier change
- Stable card layout designed to avoid content jumps
- Responsive layout for mobile, tablet, and desktop grids

## Customization options

You can customize each product card by editing:

- product category
- product name
- short description
- license tier names and count
- permitted usage list for each tier
- limitation/restriction note for each tier
- tier price/status
- CTA label
- license switching data in `script.js`

## Accessibility and UX notes

- Keyboard-accessible tier controls using native buttons
- Visible `:focus-visible` and `:focus-within` treatments
- Selection state is communicated by text (`Selected license`) and button pressed state, not color alone
- Restriction content remains visible and readable at all sizes
- Usable without JavaScript due to meaningful default license content in HTML

## Theming and motion support

- Premium light theme by default
- Automatic dark mode with `prefers-color-scheme: dark`
- Reduced-motion handling with `prefers-reduced-motion: reduce`

## Progressive enhancement

Without JavaScript, the card still shows understandable default license information.
With JavaScript enabled, users can switch tiers and see card-specific updates for license details, price/status, CTA text, and live status messaging.

## Important note

Demo copy is for interface clarity and does **not** constitute legal advice.
Final legal/license wording should always be reviewed before production sale.
