# Tabs 04 — Neumorphic Soft UI Variant

A standalone premium tabs component package for KP_Code Digital Vault with a calm, tactile neumorphic material system.

## Files
- `index.html` — semantic tabs structure, ARIA wiring, and demo content.
- `style.css` — mobile-first Soft UI design tokens, depth logic, and transitions.
- `script.js` — accessible tab switching and keyboard support.

## Component structure
- One root wrapper (`.tabs-page`) and one main shell (`.tabs-shell`).
- Tabs control region with `role="tablist"` and button tabs using `role="tab"`.
- Content sections using `role="tabpanel"` with proper `aria-labelledby` pairing.

## Visual logic
- Shared page/component surface color to preserve same-material continuity.
- Slightly inset container (`.tabs-surface`) to make controls feel nested.
- Inactive tabs use dual-shadow extrusion (top-left highlight + bottom-right shadow).
- Active tab shifts to pressed state with inset shadow and restrained motion.
- Minimal accent refinement: small active indicator dot for current-tab clarity.

## Accessibility behavior
- ARIA support: `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden`.
- Keyboard navigation: Arrow keys, Home/End, Enter/Space activation.
- Roving tabindex for clean tab order.
- Soft `:focus-visible` accent ring that respects the design language.

## Responsive behavior
- Mobile-first stacked tabs.
- At wider breakpoints, tabs shift to a horizontal equal-width row.
- Spacing/radius tokens keep depth readable across screen sizes.

## Customization guidance
Adjust CSS variables in `:root`:
- Material palette: `--bg`, `--surface`, `--surface-low`
- Typography contrast: `--text-strong`, `--text-soft`
- Accent system: `--accent`, `--accent-soft`
- Depth model: `--raise-shadow`, `--press-shadow`
- Motion tone: `--ease-premium`

This package is standalone and ready for reuse as a polished Soft UI tabs option in the product library.
