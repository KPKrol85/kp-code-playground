# Header 02 - Commerce Pro

A reusable, mobile-first e-commerce header component built with semantic HTML, CSS, and vanilla JavaScript.

## Files

- `header.html` - full demo markup with utility bar, main header, desktop navigation, mobile drawer, and search panel.
- `header.css` - mobile-first component styling using strict BEM classes and the requested breakpoints.
- `header.js` - accessible interaction logic for mobile navigation and search behavior.

## Features

- Strict BEM naming: `commerce-header__*` and `commerce-header-demo-content__*`
- Mobile-first responsive behavior
- Breakpoints at:
  - base mobile
  - `min-width: 480px`
  - `min-width: 760px`
  - `min-width: 1024px`
- Utility top bar with store links
- Brand/logo area
- Desktop navigation row
- Mobile hamburger menu + animated state
- Search:
  - desktop inline search form
  - mobile search panel toggle
- Action icons:
  - wishlist
  - account
  - cart with badge
- Accessibility:
  - semantic landmarks
  - `aria-expanded`, `aria-controls`, and `aria-label`
  - keyboard Escape support
  - click-outside close behavior
  - visible focus states
- Motion preference support via `prefers-reduced-motion`

## Usage

1. Copy all four files into your project.
2. Keep class names unchanged to preserve styling/behavior.
3. Update navigation labels, links, and badge counts to match your store.
4. If integrating into an existing page, keep `header.js` loaded after header markup.

## Notes

- All icons are inline SVG (no external icon libraries).
- Component is intentionally structured for easy extraction and reuse across storefront projects.
