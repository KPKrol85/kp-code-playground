# Header Finance Flow

A premium, mobile-first header component package designed for fintech and business tool interfaces with strong readability, trust-focused styling, and production-ready interaction behavior.

## Intended Use Cases

- Finance dashboards
- Accounting tools
- Payment platforms
- Portfolio/workflow tracking products
- BI and reporting applications
- Subscription and pricing products

## File List

- `index.html` — standalone demo page with component markup, mobile panel, overlay, and context sections.
- `style.css` — mobile-first styles, finance flow visual language, theme system, responsive layout, and motion preferences.
- `script.js` — panel state management, focus trap, body scroll lock, theme/session toggling, and resize/escape handling.
- `README.md` — package documentation and integration guidance.

## Key Features

- Finance/ledger-style brand mark with subtle flow-line motif
- Desktop navigation with flow-marker active indicator (`aria-current="page"`)
- Session mode toggle (`Session: Day` / `Session: Night`) with persisted theme
- Synced status indicator for stable workspace context
- Distinctive flow-line mobile menu control
- Structured right-side mobile finance control panel with:
  - session status
  - grouped navigation
  - workspace snapshot
  - CTA
  - explicit note: **No live financial data**
- Sticky header with optional scrolled refinement state
- Light/dark theme support via `html[data-theme]`

## Accessibility Notes

- Skip link included for keyboard users.
- Menu button uses `aria-expanded` and `aria-controls`.
- Escape key closes the mobile panel.
- Overlay click closes the mobile panel.
- Focus trap enforced while mobile panel is open.
- Focus returns to trigger after Escape-close.
- Hidden panel content is removed from tab order while closed.
- Active navigation state is not color-only (line + marker + weight).
- Visible `:focus-visible` styles included.
- `prefers-reduced-motion` respected.

## Customization Notes

- Theme tokens are scoped with CSS custom properties at `:root` and `html[data-theme="dark"]`.
- Update breakpoint behavior in both CSS and JS using `56.25rem` / `900` alignment.
- Navigation items and CTA can be replaced with product-specific routes.
- Brand mark can be swapped while keeping the same size and balance for alignment consistency.

## Digital Vault Integration Notes

- Package is standalone (no dependencies, no build tooling).
- Class names are scoped to the component namespace for easier composition.
- JavaScript is encapsulated in an IIFE to avoid global pollution.
- Suitable as a reusable candidate in the KP_Code Digital Vault header series where finance-centric control clarity is required.
