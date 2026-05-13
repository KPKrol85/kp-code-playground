# Footer Vault Navigator

A premium standalone footer component for **KP_Code Digital Vault**. It is designed as a platform navigation layer for curated digital products and component-library access, with clear Free/Pro pathways and roadmap visibility.

## Included files

- `index.html` – standalone demo page with a realistic preview wrapper and one primary footer component.
- `style.css` – scoped, mobile-first, BEM-style component styling with responsive layout and interaction states.
- `script.js` – progressive enhancements for current-year injection, copy-path behavior, and access-details disclosure.

## Usage notes

1. Open `index.html` directly in a browser.
2. Integrate the `<footer class="vault-footer">...</footer>` block into a product page shell.
3. Keep class names unchanged to preserve component styles and script hooks.

## Key features

- KP_Code Digital Vault brand section and platform positioning.
- Platform summary panel with compact metadata.
- Curated-access CTA with primary/secondary actions.
- Copyable package path (`digital-vault/components/footer-vault-navigator`) with accessible inline feedback.
- Structured navigation groups for Products, Components, Access, Roadmap, Resources, Support, and Legal.
- Bottom metadata row with dynamic year, edition label, status note, and legal links.

## Accessibility notes

- Uses semantic `<footer>` and grouped `<nav>` landmarks with headings.
- Interactive controls are native links/buttons and keyboard accessible.
- Copy action feedback is announced via `aria-live="polite"` without intrusive alerts.
- Disclosure control uses proper `aria-expanded` + `hidden` state management.
- Includes high-contrast focus-visible states and `prefers-reduced-motion` handling.

## Customization notes

- Update footer-level CSS variables in `.vault-footer` to match a host brand theme.
- Replace placeholder `href="#"` links with production routes.
- Adjust summary metrics, badges, and status chips to match live platform data.

## Demo Free/Pro/access disclaimer

This package demonstrates information architecture and UI states only. Free and Pro labels are non-transactional examples and do not implement authentication, billing, or gated content.

## Future KP_Code Digital Vault integration notes

- Map navigation groups to real platform route namespaces.
- Bind CTA actions to real product and roadmap index pages.
- Replace static status labels with live roadmap/update signals from platform data.
