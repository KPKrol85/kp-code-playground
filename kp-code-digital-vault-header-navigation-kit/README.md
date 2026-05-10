# kp-code-digital-vault-header-navigation-kit

Premium KP_Code Digital Vault front-end product containing 10 standalone, mobile-first, responsive header/navigation variants with accessible hamburger menus and global light/dark theme support.

## Included files
- `index.html` — Product intro panel + 10 live header sections.
- `css/style.css` — Design tokens, layout scaffolding, and distinct `header-01` to `header-10` variant blocks.
- `js/main.js` — Variant rendering, mobile menu accessibility logic, one-open-menu behavior, and global theme persistence.
- `README.md` — Usage and customization guidance.

## No-build usage
1. Download or clone this folder.
2. Open `index.html` directly in any modern browser.

## How to copy one header variant
1. Copy one `<header class="header-0X">...</header>` block from the rendered markup (or from browser inspector).
2. Copy the matching CSS block for that namespace (`.header-0X ...`) plus shared base header styles.
3. Keep the same class namespace and `aria-controls`/mobile-panel IDs.
4. Keep the JS toggle logic or adapt the same ARIA behavior in your project.

## Accessibility notes
- Skip link and semantic landmarks.
- Keyboard-accessible buttons/links.
- `aria-expanded`, `aria-controls`, and dynamic `aria-label` updates on mobile toggles.
- Escape to close menus.
- Outside-click close behavior.
- Mobile link click closes active panel.
- Reduced motion media-query handling.

## Customization notes
- Update color tokens in `:root` and `html[data-theme="dark"]`.
- Adjust nav labels in the `navItems` array.
- Edit variant descriptors and use-case notes in the `variants` array.
- Fine tune each hamburger microinteraction in its `.is-open .header-0X__menu-icon` rules.

## Suggested use cases
- Company websites
- Landing pages
- Creative portfolios
- SaaS pages
- Product launch pages
- Dashboard utilities
- Business marketing sites
