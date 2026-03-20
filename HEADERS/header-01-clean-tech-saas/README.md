# Clean Tech SaaS Header

A premium standalone header package for KP_Code Digital Vault focused on clarity, restraint, responsive usability, and quiet product-grade polish. The component is designed as a reusable SaaS navigation asset rather than a one-off landing-page demo.

## Component Concept

The Clean Tech header pairs a compact brand system, centered desktop navigation, and a future-friendly action cluster with a signed-out default state. The visual identity is intentionally minimal and app-like, using disciplined spacing, subtle translucency, and restrained interaction details to support software products in clean-tech, climate, operations, or modern B2B SaaS contexts.

## File Structure

- `index.html` — semantic standalone markup, skip link, responsive header, mobile sheet navigation, and demo sections for active-link behavior.
- `style.css` — scoped design tokens, light/dark theme styling, responsive layout rules, button states, off-canvas panel styling, and reduced-motion handling.
- `script.js` — progressive enhancement for theme persistence, scroll-state polish, mobile menu control, active-section syncing, and scroll progress updates.
- `README.md` — package guidance and customization notes.

## Interaction Behavior

- Header blur and translucent background activate only after scrolling begins.
- Header hides on deliberate downward scrolling and reappears on upward scrolling or near the top of the page.
- A discreet progress line at the bottom edge reflects page scroll depth.
- Desktop and mobile nav items update to the active section using `IntersectionObserver`.
- The mobile experience uses a panel-style sheet with ESC support, close controls, outside-click dismissal, and CTA preservation.

## Accessibility Decisions

- Includes a visible keyboard-accessible skip link.
- Uses semantic `header`, `nav`, `main`, `section`, `button`, and `a` elements.
- Preserves understandable desktop navigation without JavaScript.
- Uses native buttons for theme and mobile menu controls.
- Applies `aria-expanded`, `aria-controls`, `aria-hidden`, and pressed-state labeling where relevant.
- Provides custom `:focus-visible` treatments instead of removing outlines.
- Supports keyboard navigation across desktop and mobile interactions.
- Respects `prefers-reduced-motion` for scrolling, panel transitions, and header movement.

## Theme Logic

- The package supports light and dark themes with local CSS custom properties.
- JavaScript reads a saved theme from `localStorage` when available.
- If no theme has been stored, the component follows `prefers-color-scheme`.
- The theme toggle updates the active state and persists the user’s preference for future visits.

## Responsive Behavior

- Desktop layout uses left brand alignment, centered navigation, and right-side action controls.
- On tablet and mobile widths, the centered desktop navigation and desktop CTAs collapse in favor of a dedicated menu trigger.
- The mobile navigation appears as a polished off-canvas sheet instead of a full-screen takeover.
- Touch targets, spacing, and CTA layout are optimized for thumb-friendly interaction on smaller screens.

## Customization Points

- Update the root custom properties in `style.css` to align with a product brand.
- Replace demo nav labels, section IDs, and CTA URLs in `index.html` with product-specific routes.
- Adjust the scroll-hide threshold and observer behavior in `script.js` to match product preferences.
- Swap the brand mark SVG while preserving the brand/content structure for consistent spacing.
- Extend the action cluster later for authenticated states such as an avatar menu without refactoring the header grid.
