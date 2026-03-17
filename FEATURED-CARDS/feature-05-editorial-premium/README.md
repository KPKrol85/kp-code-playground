# Feature 05 · Editorial Premium Layered Cards

A standalone premium feature-cards section designed for high-end product and portfolio interfaces. The component focuses on layered composition, concise editorial content, and restrained motion polish while maintaining strong accessibility and a robust non-JS baseline.

## File structure

- `index.html` — semantic section and reusable card content anatomy.
- `style.css` — mobile-first visual system, layered card composition, responsive layout, and reduced-motion handling.
- `script.js` — lightweight pointer-capable tilt and spotlight enhancement.
- `README.md` — implementation and reuse notes.

## Component purpose

This package provides a showcase-grade, reusable card group for:

- premium SaaS landing sections
- component library demos
- startup marketing narratives
- portfolio feature highlights

The design direction emphasizes clarity first, with depth and motion used as enhancement rather than dependency.

## Content anatomy (per card)

Each card follows a reusable slot pattern:

1. Optional eyebrow label
2. Title (`h2`)
3. Supporting description copy
4. CTA link

No critical information is hidden behind hover-only states.

## Layering strategy

Each card includes four compositional layers:

1. **Depth layer** (`.fc5-card__depth`) for offset dimensional separation.
2. **Accent layer** (`.fc5-card__accent`) for controlled gradient framing and spotlight reception.
3. **Surface layer** (`.fc5-card__surface`) for internal structure and contrast.
4. **Content layer** (`.fc5-card__content`) for readable foreground information.

This hierarchy creates a premium stacked-surface feel without heavy effects or distracting visuals.

## Interaction model

- Baseline interaction is fully functional without JavaScript.
- On fine pointers with hover capability, JavaScript adds:
  - restrained tilt (`rotateX/rotateY` within a small range)
  - pointer-follow spotlight coordinates (`--spot-x`, `--spot-y`)
  - subtle vertical lift
- Effects are intentionally conservative for production use and readability.

## Reduced-motion handling

- CSS uses `@media (prefers-reduced-motion: reduce)` to neutralize transitions and disable transform-based motion.
- JavaScript checks `prefers-reduced-motion` and avoids attaching pointer-follow effects when motion should be reduced.
- Runtime media-query changes are observed and applied dynamically.

## Accessibility considerations

- Semantic structure with a heading-led section and article cards.
- Cards are keyboard-focusable (`tabindex="0"`) for clear focus context.
- CTA links remain native focus targets with explicit `:focus-visible` styling.
- Contrast and text hierarchy prioritize readability over decoration.
- Motion is optional and non-essential for understanding content.

## Responsive behavior

- **Mobile-first:** single-column stacked cards with strong visual hierarchy.
- **Tablet/Desktop:** 12-column asymmetrical editorial layout that restores richer composition and spatial rhythm.
- Fluid typography and spacing are implemented with `clamp()` for graceful scaling.

## Reuse recommendations

- Replace card copy directly inside each `.fc5-card__content` block.
- Keep heading lengths concise for best balance.
- Re-theme by overriding root variables (`--fc5-*`) without changing structure.
- Add/remove cards by duplicating `article.fc5-card`; the component remains portable with only the four included files.
