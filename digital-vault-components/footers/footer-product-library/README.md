# Footer Product Library

A premium, standalone product-library footer component for the KP_Code Digital Vault ecosystem. This component is designed for documentation systems, UI libraries, template collections, and developer resource platforms.

## Included files

- `index.html` – standalone demo page with realistic library-focused wrapper content and one footer component
- `style.css` – scoped BEM-style component styling, responsive layout, visual states, and reduced-motion support
- `script.js` – progressive enhancement for dynamic year, license disclosure, copy micro-action, and mobile group disclosure behavior

## Component purpose

`Footer Product Library` provides a practical navigation and support layer for productized frontend libraries. It helps teams quickly access component categories, documentation resources, license and usage links, updates, and support channels.

## Key features

- Product-library brand block (`Component Vault`) with positioning and summary badges
- Dedicated license/resource panel with:
  - package path copy micro-action
  - accessible inline copy feedback via `aria-live="polite"`
  - accessible license summary disclosure (`aria-expanded` + `hidden`)
- Five focused navigation groups:
  - Categories
  - Resources
  - Developers
  - License
  - Support
- Bottom metadata row with:
  - current year
  - version label (`Library v1.0`)
  - release status (`Curated release`)
  - legal links
- Optional mobile disclosure behavior for navigation groups to improve scanability on small screens

## Usage notes

1. Open `index.html` directly in a browser for local review.
2. Integrate the `<footer class="footer-product-library">...</footer>` block into your product shell.
3. Keep class names intact to preserve scoped styles and JS behavior.
4. Replace link destinations with project-specific routes.
5. Replace demo metadata (component count, category count, version) with real values when integrating.

## Accessibility notes

- Uses a semantic `<footer>` landmark and clearly grouped `<nav>` sections.
- Interactive controls use native `<button>` elements.
- Disclosure control updates `aria-expanded` and `hidden` state in sync.
- Copy feedback is announced with `aria-live="polite"`.
- Keyboard access is supported for all interactions.
- Strong `:focus-visible` styles are included.
- Content and links remain usable without JavaScript.

## Customization notes

- Update component-level custom properties at `.footer-product-library` for theming.
- Adjust breakpoints and grid density in `style.css` to match host layout needs.
- Update copy-action value with your canonical package path or license note.
- If needed, remove mobile disclosure logic while keeping static nav lists visible.

## Demo-license disclaimer

License language in this package is demonstration UI copy only and is not legal advice. Validate all legal, licensing, and commercial usage text before production release.

## Future KP_Code Digital Vault integration notes

- Map each navigation group to live vault routes.
- Connect changelog/resources links to versioned docs sources.
- Tie metadata badges to real catalog metrics from your publishing pipeline.
- Align version/status row with release automation outputs.
