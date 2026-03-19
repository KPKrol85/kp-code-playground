# Orbiting Showcase Carousel

A premium standalone carousel package built around a dominant central stage and a surrounding orbit of interactive previews. The composition is intended for futuristic editorial storytelling, premium SaaS launches, luxury product reveals, advanced portfolios, and cinematic feature campaigns.

## Concept

- The active slide lives in the center as a large elevated panel.
- Secondary items are rendered as preview buttons around the stage in a controlled orbit or reduced responsive arc.
- Selecting a preview promotes that story into the main stage and repositions every remaining preview around the orbit.

## Accessibility

- Semantic section-level carousel region with an accessible label.
- Polite live region announces the active slide.
- Native buttons for previous/next controls and orbit preview selection.
- Keyboard support for ArrowLeft, ArrowRight, Home, and End.
- Clear focus-visible styling and reduced-motion support.
- Inactive stage panels are marked with `aria-hidden` so the active panel remains the primary accessible story.

## Interaction Support

- Previous and next navigation controls.
- Direct preview selection from the orbit.
- Touch-friendly swipe gestures in vanilla JavaScript.
- Custom events: `carousel:ready` and `carousel:change`.
- Multi-instance-safe initialization using scoped selectors instead of ID-coupled JavaScript.

## Responsive Behavior

- Desktop uses a broader elliptical orbit around the hero stage.
- Tablet compresses the geometry while preserving the center-stage hierarchy.
- Mobile reinterprets the orbit into a tighter lower arc so previews remain large enough to tap without losing the orbiting identity.
- Reduced-motion users receive the same hierarchy with calmer transitions and no blur-heavy depth treatment.

## File Structure

- `index.html` — semantic standalone markup and demo content.
- `style.css` — fully scoped visual system, orbit composition, states, and responsive behavior.
- `script.js` — modular carousel logic, orbit positioning, keyboard support, swipe handling, observers, and custom events.

## Customization Notes

- Update the stage panel content in `index.html` to swap categories, headlines, copy, CTAs, and visual treatments.
- Add or remove stage panels; orbit preview items are generated automatically from the panel content.
- Adjust orbit geometry in `script.js` by tuning `xRadius`, `yRadius`, and `baseAngle` inside `applyOrbitLayout()`.
- Adjust motion intensity in `style.css` and the depth/opacity formulas in `script.js`.
- Restyle surfaces, accents, and environmental lighting through the scoped CSS custom properties at the top of `style.css`.

## Files

```text
CAROUSELS/carousel-11-orbiting-showcase/
├── index.html
├── style.css
├── script.js
└── README.md
```
