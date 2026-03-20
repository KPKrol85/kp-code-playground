# Luxury Contrast Mono Buttons

A standalone premium button package for KP_Code Digital Vault focused on black-white-gold discipline, luxury restraint, and boutique-brand interface polish.

## Design concept

Luxury Contrast Mono is built as a premium control system rather than a themed color demo. The pack uses deep monochrome surfaces, ivory contrast, precise spacing, serif-led hierarchy, and a restrained gold seam treatment to create high-end brand authority suitable for luxury commerce, concierge services, private memberships, and premium storytelling interfaces.

## Included variants

1. Primary luxury CTA
2. Secondary action
3. Outline action
4. Ghost action
5. Inverse monochrome action
6. Gold-accent action
7. Quiet action
8. Success action
9. Destructive action
10. Icon buttons
11. Loading and toggle/selected state buttons

## Accessibility decisions

- Uses semantic `button` elements throughout.
- Includes visible `:focus-visible` rings designed to read clearly in both light and dark presentation modes.
- Keeps labels readable with strong tonal contrast and avoids hover-only meaning.
- Uses `aria-pressed` for the selected-state demo and `aria-busy` for the loading-state demo.
- Provides `aria-live="polite"` status text for the loading and toggle examples.
- Preserves touch-friendly sizing with generous button height and spacing.
- Respects `prefers-reduced-motion` by minimizing animation and transition timing.

## Interaction behavior

- Hover states use crisp border, surface, and gold-emphasis changes instead of dramatic motion.
- Active states compress slightly to feel tactile without losing refinement.
- The loading demo simulates a believable premium checkout-preparation action.
- The toggle demo previews a reusable selected treatment using an inset tonal shift and gold seam highlight.
- A presentation toggle switches between light and noir modes as progressive enhancement; the core showcase remains fully usable without JavaScript.

## Responsive behavior

- The showcase uses a grid that collapses progressively from multi-column desktop presentation to single-column mobile layouts.
- Buttons expand to full width on smaller screens where appropriate to improve scanability and tap comfort.
- Spacing and card proportions are preserved so the composition remains calm and premium on narrow viewports.

## Customization guidance

- Adjust the custom properties at the top of `style.css` to align colors, spacing, border weight, or typography with a broader brand system.
- Replace copy in `index.html` to suit commerce, membership, hospitality, or product-card contexts.
- Reuse the gold seam treatment selectively by applying the same button structure and tuning `--lcm-button-seam-opacity`.
- Extend `script.js` only for lightweight product-preview behaviors; the button presentation is intentionally complete without scripting.
