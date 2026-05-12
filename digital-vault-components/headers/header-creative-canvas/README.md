# Header Creative Canvas

Premium mobile-first header component for creative portfolios, design tools, creator products, and visual SaaS websites.

## Intended use cases
- UI/UX portfolio sites and design studio homepages
- Creative tool navigation shells
- Creator product marketing pages needing expressive but controlled nav UI

## Files
- `index.html` – standalone demo with sticky header, mobile creative panel, hero context, and highlight card
- `style.css` – theme tokens, responsive layout, canvas-stroke visuals, accessibility states, and microinteractions
- `script.js` – menu state, theme persistence, keyboard/outside click close behavior, and sticky scroll refinement

## Key features
- Creative brand mark with canvas frame, brush stroke, and swatch dot
- Desktop navigation with brush-inspired active indicator (`aria-current="page"`)
- Canvas/Ink theme toggle with localStorage persistence (`header-creative-canvas-theme`)
- Animated canvas-stroke hamburger morphing to close state
- Mobile creative panel with numbered links, feature card, and CTA
- Optional overlay and body scroll lock while mobile panel is open

## Accessibility notes
- Includes a skip link and semantic landmarks
- Uses real `<button>` controls with `aria-expanded` + `aria-controls`
- Supports Escape close, outside click close, overlay click close, and focus return after Escape
- Prevents hidden mobile menu content from being focusable when closed
- Clear `:focus-visible` states and non-color-only active indicators
- Reduced motion support through `prefers-reduced-motion`

## Customization notes
- Adjust theme identity via CSS custom properties in `:root` and `html[data-theme="dark"]`
- Tune component scale with spacing values on `.canvas-header__inner` and `.canvas-menu__panel`
- Update nav labels, CTA text, and feature card content directly in `index.html`
- Change breakpoint around `56.25rem` in both CSS and JS for layout behavior

## Digital Vault integration notes
- Standalone package with no external dependencies
- Scoped class naming follows Canvas Header patterns for safe library inclusion
- Ready to slot into the KP_Code Digital Vault header catalog as a distinct creative variant
