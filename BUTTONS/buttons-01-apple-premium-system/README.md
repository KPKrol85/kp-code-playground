# Buttons 01 — Apple Premium System

A standalone premium buttons package for the KP_Code Digital Vault collection. The component is designed as a polished product-library starter with an Apple-inspired visual language: minimal surfaces, soft depth, precise spacing, tactile feedback, and restrained luxury in both light and dark mode.

## Files

- `index.html` — semantic showcase wrapper, system intro, and a structured 10-variant preview grid.
- `style.css` — design tokens, responsive layout, button architecture, state styling, dark mode, and reduced-motion support.
- `script.js` — minimal progressive enhancement for copy-name interactions, loading-state demo behavior, icon toggle state, and pressed feedback polish.

## Included button variants

1. Primary button
2. Secondary button
3. Ghost button
4. Subtle button
5. Outline button
6. Destructive button
7. Success button
8. Icon toggle button
9. Loading button
10. Premium gradient elevated CTA button

## Accessibility decisions

- Uses real `<button>` elements for every interactive control.
- Includes visible `:focus-visible` treatment with a high-contrast ring.
- Preserves keyboard access for every demo interaction.
- Uses an `aria-live="polite"` region for copy, loading, and toggle announcements.
- The icon variant uses `aria-pressed` for its toggle state.
- The loading button uses `aria-busy` while the async demo runs.
- Motion is reduced automatically with `prefers-reduced-motion: reduce`.

## State behavior

- Core visual states include default, hover, active/pressed, focus-visible, and disabled.
- The loading button keeps a stable footprint while revealing an inline spinner and temporarily disabling interaction.
- The icon button demonstrates a selected/toggled state with updated `aria-pressed` and label text.
- Copy-name utility buttons provide a small productized interaction for documenting or reusing variants.

## Token structure

The stylesheet exposes a reusable token system at the top of the file for:

- colors
- typography
- spacing
- radius
- shadows
- borders
- sizing
- transitions

This makes it easy to re-theme or port the button family into larger design-system packages without rewriting the component architecture.

## Customization guidance

- Update the color tokens to match a different product palette while keeping the same button hierarchy.
- Tune spacing and radius tokens to move the family toward denser enterprise UI or softer consumer UI.
- Reassign button classes such as `.btn--primary`, `.btn--outline`, or `.btn--premium` to production actions as needed.
- Extend the pattern with size modifiers or full-width variants while preserving the shared `.btn` base.
- Replace the demo copy, labels, and microcopy in `index.html` to fit your product or marketing surface.
