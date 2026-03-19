# Editorial Monochrome System Buttons

A premium standalone buttons package for KP_Code Digital Vault focused on editorial hierarchy, monochrome discipline, and product-quality interaction states.

## Component concept

This package presents a polished button system for refined interfaces such as editorial websites, design studios, architecture portfolios, luxury minimal brands, and gallery-like commerce pages. The collection avoids loud color cues and instead builds hierarchy with surface tone, border weight, inversion, typography emphasis, and restrained shadow depth.

## Included button variants

1. Primary monochrome CTA
2. Secondary tonal button
3. Outline editorial button
4. Ghost text-forward button
5. Quiet low-emphasis button
6. Inverted dark button
7. Icon utility button
8. Restrained confirm button
9. Restrained danger button
10. Loading and selected/toggle state demo

## Accessibility decisions

- Uses semantic `button` elements for every interactive control.
- Maintains visible `:focus-visible` rings in both light and dark themes.
- Keeps contrast high through tonal separation and clear text treatment.
- Uses `aria-live` status updates for theme, loading, toggle, and copy interactions.
- Applies `aria-pressed` to toggle controls and `aria-busy` during the loading demo.
- Respects `prefers-reduced-motion` by minimizing animation and transition timing.

## State behavior

- Core variants support default, hover, active, focus-visible, and disabled presentation where relevant.
- The loading button demonstrates a non-blocking in-progress state with spinner feedback and status messaging.
- The toggle button demonstrates a selected state using inversion instead of accent color.
- The copy-label interaction showcases a lightweight product-preview utility without being required for the layout to function.
- A subtle pressed class adds tactile feedback on pointer interaction without creating layout shift.

## Token structure

The stylesheet begins with a reusable custom-property system covering:

- background and surface tones
- text hierarchy and inverse text
- border strengths and focus ring treatment
- shadows and inset highlights
- radius scale for panels, cards, and controls
- spacing rhythm
- typography families, sizes, and weights
- control sizing and transition timing

A matching dark-theme token layer is applied with `:root[data-theme="dark"]` so the package stays monochrome-first in both modes.

## Customization guidance

- Replace labels and helper copy directly in `index.html` to fit your product language.
- Adjust the token values at the top of `style.css` to align with a broader design system.
- Duplicate or remove button cards while keeping the same card structure for consistent previews.
- Change `--kp-control-height`, padding tokens, or font tokens to tune density.
- Extend the JavaScript only for product-level interactions; the package is already visually complete without scripting.

## Files

- `index.html` — standalone showcase markup
- `style.css` — tokenized visual system, themes, layout, and state styling
- `script.js` — minimal enhancements for theme, loading, toggle, pressed, and copy demos
- `README.md` — component documentation and reuse notes
