# Minimal Capsule Pro Buttons

A premium standalone button package for KP_Code Digital Vault focused on refined capsule geometry, disciplined spacing, subtle layering, and realistic product-grade interaction states.

## Design concept

This pack is built for polished dashboards, SaaS products, account areas, onboarding steps, settings panels, and modern marketing UI where buttons should feel confident and premium without relying on loud decoration. The visual identity comes from clean capsule proportions, exact spacing rhythm, soft but crisp surfaces, and a restrained segmented rail detail that makes the system memorable without becoming gimmicky.

## Included variants

1. Primary action
2. Secondary action
3. Tonal action
4. Quiet action
5. Outline action
6. Ghost action
7. Elevated capsule action
8. Success / confirm action
9. Destructive action
10. Icon-only utility buttons
11. Loading-state and toggle-state previews

## Accessibility decisions

- Uses semantic `button` elements throughout the showcase.
- Preserves visible `:focus-visible` rings for keyboard navigation.
- Keeps labels readable in every state with strong contrast in both preview themes.
- Uses `aria-live` messaging for theme, loading, segmented preview, and toggle feedback.
- Uses `aria-pressed` for segmented and toggle controls, plus `aria-busy` during the loading demo.
- Respects `prefers-reduced-motion` to minimize animation and transition timing.
- Maintains touch-friendly target sizing with capsule controls sized for both pointer and mobile use.

## Interaction behavior

- Every core button supports polished default, hover, active, focus-visible, and subdued/disabled behavior where relevant.
- Hover behavior is subtle and crisp, with slight lift rather than dramatic movement.
- Active states compress slightly to feel tactile without introducing visual noise.
- The loading button simulates an asynchronous save state using a small inline spinner.
- The toggle example demonstrates a persistent selected state with a restrained indicator.
- The preview toolbar includes a compact theme switch and segmented context selector as progressive enhancement only.

## Responsive behavior

- The showcase collapses from a two-column system into a single-column stack on smaller screens.
- Toolbar controls wrap cleanly and stay comfortable to tap on narrow widths.
- Buttons can expand to full width on mobile while preserving spacing rhythm and hierarchy.
- The package remains visually balanced without relying on fixed widths or fragile positioning.

## Customization guidance

- Update copy directly in `index.html` to match your product vocabulary.
- Tune custom properties at the top of `style.css` to adapt radius, spacing, height, contrast, or accent tone.
- Duplicate card blocks to extend the pack while keeping the same scoped naming structure.
- Remove the optional dark preview switch if you want a strictly light-mode-only presentation.
- Keep JavaScript limited to real product behaviors such as async state previews or compact demo controls; the visual system is fully usable without scripting.

## Files

- `index.html` — standalone showcase markup
- `style.css` — scoped token system, layout, themes, and button styling
- `script.js` — minimal progressive enhancement for preview controls and state demos
- `README.md` — package overview and implementation notes
