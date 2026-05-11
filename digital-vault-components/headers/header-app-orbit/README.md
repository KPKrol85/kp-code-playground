# Header App Orbit

Header App Orbit is a premium, mobile-first app/startup navigation component for the KP_Code Digital Vault. It combines active orb navigation states, a compact orbit-style theme microcontrol, and a radial-inspired mobile menu panel while keeping interaction quality and accessibility production-ready.

## Intended use cases

- SaaS and AI product launch pages
- Startup app marketing sites
- Productivity tool landing experiences
- Beta product and release pages
- App-style product hubs with strong mobile navigation requirements

## File list

- `index.html` — Standalone demo page with full header, mobile orbit panel, and realistic product context
- `style.css` — Complete component styling, theming, responsive behavior, and reduced-motion support
- `script.js` — Menu state, focus handling, Escape/outside click close behavior, theme persistence, and scroll state logic
- `README.md` — Component implementation notes and integration guidance

## Key features

- Mobile-first sticky app header wrapper with clean max-width inner layout
- App-style OrbitApp brand area with launch-system labeling
- Desktop navigation with active orb indicator and additional focus/hover ring detail
- Orbit-inspired sun/moon theme toggle with localStorage persistence (`header-app-orbit-theme`)
- Desktop CTA (`Join beta`) and an orbital-detail mobile menu button
- Radial-inspired mobile panel with orbit map visual, accessible nav links, CTA, and status copy
- Light/dark theme support via `html[data-theme="light"]` and `html[data-theme="dark"]`
- Optional subtle scrolled header state for enhanced depth feedback

## Accessibility notes

- Includes a visible-on-focus skip link for quick keyboard access to main content
- Uses semantic header, nav, main, and button elements
- Active navigation uses `aria-current="page"` and a visible orb indicator (not color-only)
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Escape key closes the menu and returns focus to the menu button
- Overlay click and mobile-link click both close the panel
- Hidden mobile menu links are removed from tab order while menu is closed
- Reduced-motion support is provided via `prefers-reduced-motion`

## Customization notes

- Tune component-level design tokens at the top of `style.css` for quick brand adaptation
- Update nav labels and active state in both desktop and mobile nav blocks in `index.html`
- Change breakpoint behavior in CSS/JS by adjusting the shared `56.25rem` threshold
- Refine orbit accents by adjusting ring/dot variables and pseudo-element styling
- Adapt CTA/action behaviors while preserving minimum touch target sizing

## Digital Vault integration notes

- Component is standalone and dependency-free (HTML/CSS/vanilla JS)
- Ready to drop into Digital Vault header collections as a package candidate
- Class naming follows scoped `orbit-header` / `orbit-menu` conventions for low collision risk
- Theme and menu logic are encapsulated in an IIFE to avoid global namespace pollution
