# header-03

A standalone **Glass / Frosted Tech** header component for premium SaaS, startup, AI, and app landing pages. It ships with semantic markup, strict BEM class naming, integrated theme switching, and an accessible mobile menu.

## File structure

- `header.html` – semantic component markup and demo scaffold.
- `header.css` – mobile-first styles, translucent glass treatment, and responsive rules.
- `header.js` – component-scoped interactions (menu, theme, keyboard support, responsive reset).
- `README.md` – usage and customization guidance.

## Included features

- Floating rounded header shell with restrained glassmorphism styling.
- Frosted surfaces using translucent backgrounds, soft borders, and backdrop blur.
- Realistic product-site navigation labels for SaaS/startup use.
- Accessible hamburger-triggered mobile nav panel rendered as a frosted sheet.
- Light/dark theme toggle with persistent preference in `localStorage`.
- Scroll-refined header state for subtle elevation polish.
- Single responsive transition at **900px**.

## Accessibility notes

- Uses semantic `<header>` and `<nav>` landmarks.
- Mobile menu trigger is a `<button>` with synced `aria-expanded` + `aria-controls`.
- Keyboard support includes Escape-to-close and visible `:focus-visible` states.
- Theme toggle is a `<button>` with dynamic accessible labels.
- Interactive elements preserve touch targets suitable for mobile usage.
- Reduced motion support is provided via `prefers-reduced-motion`.

## Responsive behavior

- **Mobile-first default (<900px):**
  - Brand + menu button remain visible in the floating shell.
  - Navigation appears inside a collapsible frosted mobile panel.
- **Desktop (>=900px):**
  - Inline primary navigation and action area are displayed.
  - Mobile toggle and mobile drawer are hidden.
  - JS resets mobile menu state when crossing into desktop width.

## Integration guidance

1. Copy the four files into your project.
2. Include `header.css` in your page head.
3. Place the `header.html` structure where your page header should appear.
4. Load `header.js` after the header markup (or with `defer`).
5. Replace placeholder links and brand text with real project content.

## Customization notes

- **Blur intensity:** edit `backdrop-filter` values in `.header-03__shell` and `.header-03__mobile-nav`.
- **Border softness:** tweak border alpha values (`rgb(... / xx%)`) for lighter or stronger glass edge definition.
- **Nav labels:** update list item text/URLs in desktop and mobile nav blocks in `header.html`.
- **Icon treatment:** swap inline SVG paths in `.header-03__brand-icon` and theme icons while preserving size wrappers.
- **Theme logic:** adjust `setTheme()` in `header.js` to map theme state to a larger application-level theming system.

## Reusability contract

To keep this package portable in future projects:

- Keep class names in strict `header-03`, `header-03__element`, `header-03--modifier` format.
- Keep behavior scoped through `data-header-03-*` selectors.
- Avoid introducing framework/runtime dependencies.
