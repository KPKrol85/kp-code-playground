# Liquid Panels Accordion

## Design concept
A premium standalone accordion with a connected-surface visual language. Closed items read like soft tonal modules within one shared shell, while the active item expands as if it is flowing outward from the same liquid body rather than opening as a detached card.

## Feature summary
- Semantic accordion structure with a premium intro block
- Native button triggers with full ARIA wiring
- Single-open behavior with optional arrow-key navigation, plus Home/End support
- Layered gradients, soft separators, and restrained morphing for a liquid-panel identity
- Premium content layout with metadata, editorial copy, feature lists, and stat clusters
- Responsive behavior tuned for desktop, tablet, and mobile breakpoints
- Reduced-motion support with simplified transitions

## Accessibility notes
- Uses native `button` elements for triggers
- Each trigger and panel pair is connected with `aria-expanded`, `aria-controls`, and `aria-labelledby`
- Panels use `role="region"` and the `hidden` attribute for inactive content
- Focus-visible styling is integrated into the component surface for keyboard users
- Maintains readable contrast and comfortable touch targets

## Motion / interaction notes
- Surface emphasis transitions begin before content reveal to create a fluid hierarchy shift
- The indicator compresses into a merged horizontal mark in the active state instead of using a basic rotation
- Content fades and lifts in after panel expansion begins for a more editorial, cohesive feel
- `prefers-reduced-motion` reduces transition timing to near-instant while preserving state clarity

## Responsive behavior notes
- The intro and expanded content switch from two-column layouts to single-column layouts on narrower screens
- The stat cluster collapses from three columns to two and then one column on smaller breakpoints
- Trigger spacing and indicator placement adapt for compact touch-friendly layouts

## File structure
- `index.html` — semantic standalone markup and demo content
- `style.css` — isolated Liquid Panels visual system, responsive styles, and motion rules
- `script.js` — scoped accordion initialization, ARIA synchronization, and keyboard support
- `README.md` — implementation overview and customization guidance

## Customization guidance
- Update the root custom properties in `style.css` to retheme background, surface, and accent values
- Duplicate or remove `.lp-item` blocks in `index.html` to adjust the number of accordion sections
- Replace demo copy, stat labels, and feature lists with product, editorial, or service-specific content
- Adjust radius, spacing, and timing variables to make the interaction feel tighter or softer while keeping the same structural pattern
