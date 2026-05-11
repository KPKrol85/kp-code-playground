# Header Command Dock

A premium, mobile-first header component for the KP_Code Digital Vault library. It is designed as a reusable command-style top bar for modern SaaS dashboards, developer platforms, admin panels, and productized component systems.

## Intended Use Cases

- SaaS and B2B dashboard shells
- App control panels and command surfaces
- Design system starter templates
- Documentation portals with app-style navigation
- Future VaultOS / Digital Vault product interfaces

## File List

- `index.html` — standalone demo page with the full header and a context hero section
- `style.css` — theme tokens, responsive layout, command dock styling, drawer, and motion/accessibility styles
- `script.js` — drawer state handling, focus management, keyboard support, responsive cleanup, and theme persistence
- `README.md` — implementation notes and integration guidance

## Key Features

- Mobile-first, sticky command header
- Branded left area (`VaultOS` + `Command Dock`)
- Desktop command dock nav capsule with selected state and `aria-current`
- Lightweight system-style theme toggle with persisted preference
- Desktop CTA slot (`Open Vault`)
- Mobile hamburger with morph-to-close state
- Right-side mobile command drawer with overlay backdrop
- Drawer status block with realistic system context (`System ready`, `20 components online`)

## Accessibility Notes

- Visible skip link is included
- Semantic landmarks (`header`, `nav`, `main`, `aside`)
- Mobile menu button uses `aria-expanded` + `aria-controls`
- Drawer closes on Escape and overlay click
- Drawer closes when navigating via drawer links
- Focus is moved into drawer on open and restored on close
- Keyboard focus trap is active while drawer is open
- `:focus-visible` styles are implemented for interactive controls
- Reduced-motion media query minimizes transitions for motion-sensitive users

## Customization Notes

- Update local design tokens in `:root` and `html[data-theme="dark"]` to match brand palettes
- Replace the shield mark SVG for product-specific iconography
- Extend nav items or hook items to app routing as needed
- Swap CTA text/action for package-specific workflows
- Use the existing BEM-style classes to keep overrides predictable

## Digital Vault Integration Notes

- Package is standalone and does not depend on external libraries or build tooling
- Theme state uses `header-command-dock-theme` in `localStorage`
- Theme is applied via `document.documentElement.dataset.theme`
- Component is ready to drop into a larger Digital Vault catalog and can be wrapped by framework adapters later without rewriting core behavior
