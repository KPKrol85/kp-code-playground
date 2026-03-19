# Feature 05 — Glassmorphic Icon Stack

A standalone featured-cards package built around a premium optical icon scene. Each card combines a softly blurred luminous blob, a translucent glass plate, and a crisp SVG icon so the top of the card feels like a miniature luxury-tech object instead of a generic frosted badge.

## Files

- `index.html` — semantic section wrapper, intro copy, and four interactive `article` cards with full-card link overlays.
- `style.css` — scoped card system, layered icon-stack treatment, responsive grid, hover/focus motion, dark mode, and glass fallbacks.
- `script.js` — minimal progressive enhancement for reveal state and subtle idle animation only while the section is visible.
- `README.md` — usage notes and customization guidance.

## Intended use cases

Use this pattern for:

- premium SaaS feature sections
- AI product highlights
- modern brand-system landing pages
- product storytelling blocks that need richer visual hierarchy without heavy illustration

## Icon-stack layering model

Each icon scene is composed of three explicit layers:

1. **Blob layer** — the deepest luminous accent with soft diffusion.
2. **Glass layer** — a translucent lens or rounded plate with borders, inner highlights, and optional backdrop blur.
3. **Icon layer** — a crisp SVG symbol above the optical layers for clarity and contrast.

This layering is controlled with isolated stacking and restrained transforms so each layer can move at a different amplitude on hover/focus.

## Accessibility

- Uses semantic `section`, `header`, and `article` structure.
- Every card has a proper heading and concise supporting copy.
- Interactive cards keep native anchor semantics via full-card link overlays.
- Decorative optical layers are marked `aria-hidden` through their parent icon-stack container.
- Includes visible `:focus-visible` treatment for keyboard users.
- Respects `prefers-reduced-motion` by removing non-essential layered animation.

## Motion behavior

- On hover or focus, the card lifts slightly.
- The blob expands the most, the glass layer drifts more subtly, and the icon shell moves the least but remains the sharpest focal point.
- A very slow idle float can run while the section is visible.
- Reduced-motion users receive a stable presentation with motion effectively removed.

## Light and dark mode

- `prefers-color-scheme: dark` shifts the component to deeper surfaces, brighter text, softer reflections, and adjusted shadows.
- Contrast is preserved so the luminous treatment still feels polished without washing out text or icon edges.

## Glass fallback strategy

If `backdrop-filter` is unavailable, the glass layer falls back to a more opaque translucent gradient with preserved borders and highlights so the component still looks premium without relying on expensive blur.

## Customization

- Change `--gis-accent-rgb` and `--gis-accent-soft-rgb` on each `.gis-card` to retune the blob glow.
- Adjust `.gis-card__glass` radius, border, and background values to move between disc, lens, or panel-like optics.
- Replace the inline SVG paths inside `.gis-card__icon-shell` to match product-specific feature categories.
- Tune spacing, shadows, and card proportions through the section-scoped custom properties in `.gis-featured-cards`.
