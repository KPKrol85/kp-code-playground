# Accordion 04 — Typographic Brutalist

## Design concept
A standalone editorial accordion that uses oversized typography, structural borders, and a restrained black-and-paper palette with a vivid accent to create a brutalist-inspired interface that still feels premium and controlled.

## Feature summary
- Semantic accordion structure with a section wrapper, header block, and minimal item markup.
- Oversized all-caps trigger titles, compact meta labels, and typographic ASCII indicators.
- Single-open behavior with synced active classes, ARIA state, and hidden panels.
- Optional enhancement for ArrowUp and ArrowDown keyboard navigation between triggers.
- Responsive layout that shifts from stacked mobile hierarchy to a more print-like desktop alignment.
- Reduced-motion support and bold focus-visible styling.

## Accessibility notes
- Native `button` elements are used as the accordion triggers.
- Each trigger and panel pair is connected with `aria-controls`, `aria-expanded`, and `aria-labelledby`.
- Panels use `role="region"` and inactive content is hidden with the `hidden` attribute.
- Keyboard users retain native button behavior plus ArrowUp and ArrowDown focus movement.
- Focus-visible styling is intentionally high contrast and easy to detect.

## Interaction notes
- The accordion opens one item at a time by default.
- The first item is initialized as open on load.
- Open panels switch to an assertive accent state and the indicator changes from `[+]` to `[-]`.
- Hover and focus apply a slight horizontal text shift to reinforce the structural feel without ornamental animation.

## File structure
- `index.html` — semantic standalone markup and editorial demo content.
- `style.css` — scoped typographic brutalist visual system and responsive behavior.
- `script.js` — minimal accordion state management and keyboard enhancement.
- `README.md` — component guidance and usage notes.

## Customization guidance
- Update the accent color by changing `--tb-accent` in `style.css`.
- Adjust density and hierarchy through the intro, label, and content font-size variables near the top of the stylesheet.
- Replace the editorial copy in `index.html` with product, publishing, or knowledge-base content while keeping the same ARIA wiring.
- If multi-open behavior is needed, modify the `openItem` function in `script.js` to toggle the current item instead of closing siblings.
