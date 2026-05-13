# Footer Newsletter Engine

A premium, newsletter-first footer component for SaaS products, creator platforms, digital product shops, education products, and developer resource brands.

## Purpose

This component combines:

- a conversion-focused newsletter module,
- persuasive trust and privacy cues,
- segmented footer navigation,
- and a clean legal/social bottom row.

It is designed as a reusable Digital Vault asset with progressive enhancement and accessibility-first foundations.

## Included files

- `index.html` — standalone demo page containing one primary footer component.
- `style.css` — component-scoped styling with responsive breakpoints and interaction states.
- `script.js` — current-year injection, local-only newsletter validation flow, inline feedback, and RSS copy micro-action.
- `README.md` — usage and integration notes.

## Usage notes

1. Open `index.html` directly in a browser.
2. The footer works without JavaScript as a semantic, readable section.
3. With JavaScript enabled, form validation and feedback are enhanced locally (no API calls).

## Key features

- Newsletter-focused visual hierarchy with elevated signup panel.
- Accessible form structure with `<label>`, helper text, and polite live status updates.
- Inline validation for empty and invalid email states.
- Local demo state persistence in `localStorage` (`footerNewsletterEngineJoined`).
- Trust badges and privacy reassurance copy near the CTA.
- Multi-group footer navigation: Product, Resources, Community, Company, Legal.
- Bottom metadata row with dynamic current year and accessible social link labels.

## Accessibility notes

- Semantic `<footer>` and grouped `<nav>` landmarks.
- Real form controls and submit button, no custom fake inputs.
- `aria-describedby` links email input to helper + live status.
- `aria-live="polite"` status region for validation and confirmation messages.
- Strong visible `:focus-visible` styling for keyboard users.
- Color contrast and state styling for default, hover, active, disabled, and invalid states.
- Motion-sensitive handling via `prefers-reduced-motion`.

## Customization notes

- Footer theme variables are defined at `.footer-newsletter` in `style.css`.
- Swap brand name, trust indicators, and nav links in `index.html`.
- Adjust validation copy in `script.js` for product tone.
- Replace `data-copy-text` with your RSS, newsletter archive, or referral URL.

## Future KP_Code Digital Vault integration

- Convert link `href="#"` placeholders to actual route structure per product.
- Connect form submit to a real subscription endpoint while preserving current accessible states.
- Add analytics event hooks (submit attempt/success/copy action) in a privacy-safe layer.
- Package as a slot-based footer variant in the broader footer component system.
