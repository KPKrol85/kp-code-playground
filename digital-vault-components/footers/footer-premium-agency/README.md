# Footer Premium Agency

A standalone premium footer component for service-led agencies, studios, freelancers, and consultants that need a trust-building conversion section at the end of marketing or portfolio pages.

## Included files

- `index.html` — full standalone demo page with one agency footer component.
- `style.css` — scoped BEM-style component styles with responsive breakpoints.
- `script.js` — progressive enhancement for year injection, email copy action, and availability disclosure.

## Key features

- Premium brand + positioning block for agency context.
- Prominent CTA panel with primary and secondary project actions.
- Credible social-proof metric row.
- Structured navigation groups for Services, Case Studies, Studio, Resources, and Legal.
- Contact details with email copy button and live status feedback.
- Bottom metadata row with current year and social links.

## Usage notes

1. Open `index.html` directly in any browser.
2. Copy the `<footer class="agency-footer">...</footer>` markup into your project.
3. Keep `style.css` and `script.js` linked or merge them into your existing architecture while preserving class names and data attributes used by JavaScript.

## Accessibility notes

- Uses semantic `<footer>`, `<section>`, and grouped `<nav>` landmarks.
- Interactive controls are native links/buttons with keyboard support.
- Includes a visible `:focus-visible` treatment and high-contrast color palette.
- Copy-email feedback uses `aria-live="polite"`.
- Disclosure state is conveyed with synchronized `aria-expanded` and `hidden`.
- Footer remains readable and useful with JavaScript disabled.

## Customization notes

- Adjust visual theme through component custom properties in `.agency-footer`.
- Update CTA copy, proof metrics, navigation labels, and contact details to match your brand.
- Add or remove social links as long as each link preserves clear text and/or accessible labels.

## Demo content disclaimer

All names, links, and project entries in this package are demo content intended to illustrate a reusable footer pattern.

## Future KP_Code Digital Vault integration

This package is intentionally standalone and dependency-free so it can be dropped into the broader KP_Code Digital Vault component system with minimal adaptation.
