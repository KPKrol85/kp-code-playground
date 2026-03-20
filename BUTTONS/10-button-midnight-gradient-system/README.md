# 10 Button Midnight Gradient System

A standalone premium button package for KP_Code Digital Vault designed around a dark-first midnight gradient aesthetic. The system targets conversion-focused product surfaces such as SaaS hero sections, pricing modules, upgrade rails, launch prompts, and polished marketing controls. The visual language emphasizes deep layered surfaces, crisp contrast, restrained glow, and a clear action hierarchy that feels premium without becoming flashy.

## Files

- `index.html` — semantic showcase page with a premium intro, hero preview, realistic CTA pairings, and a structured variant grid.
- `style.css` — fully scoped styling, layout system, button variants, responsive behavior, states, and reduced-motion handling.
- `script.js` — small progressive enhancements for density preview controls, hero-emphasis toggle, loading-state simulation, and accessible pressed-state demos.

## Included variants

1. Hero gradient CTA
2. Secondary elevated CTA
3. Tonal gradient action
4. Outline contrast action
5. Ghost utility action
6. Elevated premium button
7. Success confirm button
8. Destructive control
9. Icon save control
10. Loading state action
11. Selected-state filter button
12. Quiet subscription action with split-emphasis CTA pair

## Design concept

- Deep midnight surfaces with layered gradients instead of flat dark fills.
- Premium SaaS marketing energy with clear CTA hierarchy and disciplined contrast.
- Atmospheric depth through restrained highlights, borders, and shadows.
- Commercially credible styling intended for real landing pages and conversion surfaces.

## Accessibility decisions

- Uses semantic `<button>` elements throughout the package.
- Includes visible `:focus-visible` outlines that remain readable on dark gradient backgrounds.
- Keeps text contrast strong across filled, outline, ghost, success, and destructive states.
- Uses `aria-live="polite"` announcements for toolbar, loading, toggle, and selected-state demos.
- Uses `aria-pressed` for icon and selected-state buttons.
- Uses `aria-busy` and disabled locking during the loading simulation.
- Respects `prefers-reduced-motion: reduce` so the presentation remains usable without animation.

## Interaction behavior

- All major button styles include differentiated default, hover, active, focus-visible, and disabled or reduced-emphasis treatments where appropriate.
- Hover behavior is subtle and premium: small lift, brightness refinement, or surface fill rather than playful motion.
- Active states compress slightly to feel tactile and product-grade.
- JavaScript is optional to the presentation and only enhances demo interactions like density switching, emphasis toggling, loading, and pressed states.

## Responsive behavior

- The hero layout collapses from two columns to one on smaller screens.
- The showcase grid scales from multi-column desktop cards to stacked mobile cards.
- Button groups wrap naturally and expand to full width on narrow screens where that improves scanability and tap comfort.
- CTA hierarchy stays clear across desktop and mobile by preserving spacing, contrast, and card grouping.

## Customization guidance

- Update the root CSS custom properties to re-theme gradients, borders, glow levels, and spacing without changing component structure.
- Reuse the base `.mdg-btn` class and swap modifier classes to map the system into production actions.
- Adjust density tokens or toolbar defaults if you need a tighter dashboard feel or a roomier marketing feel.
- Replace the demo copy in `index.html` with product-specific messaging while preserving the semantic structure.
- Add or remove variants by copying a showcase card and pairing it with the appropriate button modifier class.
