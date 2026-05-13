# Footer Dark Neon System

A standalone premium dark neon footer component for technical SaaS products, AI tooling, cybersecurity interfaces, and developer platforms.

## Included files

- `index.html` – complete standalone demo page with a realistic product context and one reusable footer component.
- `style.css` – component-scoped styles (BEM naming), responsive layout, dark neon visual system, glow layers, chips, CTA panel, and bottom metadata row.
- `script.js` – progressive enhancement for current year, signal motion toggle, copy action feedback, and mobile nav disclosures.

## Usage notes

1. Open `index.html` directly in a browser.
2. Copy the `<footer class="ns-footer">...</footer>` block into your product layout.
3. Keep stylesheet and script loaded together for full behavior.
4. Footer remains usable without JavaScript; JS only enhances interaction.

## Key features

- Dark atmospheric surface with restrained neon glow.
- Brand + CTA zone for product/security positioning.
- System status chips for trust and operational context.
- Six navigation groups: Platform, Security, AI Systems, Developers, Support, and Legal.
- Metadata strip with year, version, environment badge, and legal/support links.
- Subtle animated signal layer with accessible pause/resume control.

## Accessibility notes

- Uses semantic `<footer>` and grouped `<nav>` landmarks.
- Decorative signal layers are marked `aria-hidden="true"`.
- Interactive controls are native buttons/links.
- Motion toggle updates `aria-pressed`.
- Copy action reports status through `aria-live="polite"`.
- Mobile disclosures use `aria-expanded` and remain keyboard-accessible.
- Strong visible `:focus-visible` styles and dark-mode contrast support.

## Motion + reduced motion

- Signal glow animation is intentionally subtle and footer-scoped.
- If the user prefers reduced motion, animation starts paused by default.
- Users can still manually resume/pause motion with the toggle.

## Customization notes

- Change palette, elevation, and glow intensity via custom properties in `.ns-footer`.
- Update labels/links while preserving semantic structure and control labels.
- Optional micro-action can be swapped from security email to status endpoint copy.

## Demo content disclaimer

This package is a UI component demo and does not perform real cybersecurity scanning, AI orchestration, compliance validation, or system monitoring.

## KP_Code Digital Vault integration notes

- Designed as a drop-in standalone package for component libraries.
- Safe to embed in static builds or server-rendered templates.
- Keep class names scoped (`ns-footer__*`) to avoid style collisions.
