# Footer Command Center

A standalone premium footer component for SaaS and developer tooling interfaces. It is designed as a compact “control center” footer with operational status, quick product links, build metadata, support/legal routes, and a lightweight expandable system panel.

## Included files

- `index.html` — standalone demo page containing the semantic footer component.
- `style.css` — scoped, mobile-first styles with responsive breakpoints, design tokens, and interaction states.
- `script.js` — progressive enhancement for year injection, version copy action, and system-panel toggle state.

## Feature highlights

- Command-center style visual system for dashboard/devtools products.
- Semantic layout with grouped sections for identity, commands, metadata, support, and system details.
- Operational status block with clear state indicator.
- Copy-to-clipboard version interaction with accessible live feedback.
- Expand/collapse system panel with `aria-expanded` and persistent state via `localStorage`.
- Mobile-first responsive layout optimized at:
  - base (single column)
  - `min-width: 480px` (improved grouping)
  - `min-width: 760px` (multi-column dashboard layout)
  - `min-width: 1024px` (wide composition)

## Accessibility notes

- Uses native landmarks and sections (`footer`, `nav`, headings, lists, and `dl`).
- All interactions use real `<button>` controls.
- Keyboard accessible and visible `:focus-visible` states included.
- Screen-reader live region announces copy feedback.
- Includes `prefers-reduced-motion` handling.

## Usage notes

1. Copy this folder into your project.
2. Include `style.css` and `script.js` with the footer markup from `index.html`.
3. Replace demo links and metadata (`version`, `environment`, `region`, and system details) with real product values.
4. If required by your environment, adapt clipboard handling for stricter permission contexts.

## Customization

- Update CSS custom properties in `:root` to match brand colors, spacing, and typography.
- Swap status messaging and indicator color for warning/incident modes.
- Extend quick command and support link groups based on product information architecture.
- Remove `localStorage` persistence if stateless behavior is preferred.
