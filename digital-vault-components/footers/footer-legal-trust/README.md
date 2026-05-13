# Footer Legal Trust

A premium, legal/trust-focused standalone footer component for digital product platforms, SaaS experiences, checkout pages, client portals, and subscription products.

## Included files

- `index.html` – standalone demo page with realistic context and one footer component.
- `style.css` – component-scoped, mobile-first styling using BEM naming and custom properties.
- `script.js` – small progressive-enhancement behaviors (year injection, policy details toggle, support email copy action).

## Key features

- Dedicated trust summary panel with compact trust indicators.
- Clear policy navigation groups: Legal, Security, Payments, Support.
- Bottom metadata row with company/legal demo text, update note, jurisdiction note, and status indicator.
- Accessibility-oriented interactions with visible focus styles and `aria-live` feedback.
- Responsive legal center layout tuned for narrow screens through wide desktop widths.

## Usage notes

1. Place the package files in your component library.
2. Link `style.css` from the page head and `script.js` near the end of body.
3. Replace demo links and metadata with your product's real legal, policy, and support destinations.
4. Keep navigation labels explicit and policy language consistent with your legal review process.

## Accessibility notes

- Uses semantic `<footer>` and grouped `<nav>` landmarks.
- Uses native `<button>` controls for toggle and copy actions.
- Maintains `aria-expanded` and `hidden` states for disclosure details.
- Provides copy-status updates through `aria-live="polite"`.
- Includes strong `:focus-visible` styling and reduced-motion support.
- Footer remains readable and useful when JavaScript is unavailable.

## Customization notes

- Update component-level custom properties under `.footer-legal-trust` to match brand palettes.
- Keep trust badges concise (2–6 words) for scanability.
- If adding more policy groups, keep the same heading/link structure for consistency.
- If copy behavior is not needed, remove the copy button and feedback span without affecting layout integrity.

## Legal-content disclaimer

All legal, policy, compliance, jurisdiction, and support statements in this component are demo copy for interface prototyping. They are not legal advice and should be replaced with reviewed production content.

## Future KP_Code Digital Vault integration notes

- Map all link targets to centralized policy center routes.
- Connect policy update labels to CMS or policy version metadata.
- Align support email and escalation pathways with your production support operations.
- Run full accessibility and legal review before shipping in revenue-critical flows.
