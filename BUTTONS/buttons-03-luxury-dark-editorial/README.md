# Buttons 03 — Luxury Dark Editorial

A standalone premium buttons package for KP_Code Digital Vault, built as a dark-first editorial control system for luxury-facing interfaces. The pack emphasizes restrained contrast, tactile depth, elegant spacing, and polished accessibility across reusable button variants.

## Included button variants

1. Primary luxury CTA
2. Secondary dark button
3. Editorial outline button
4. Ghost text-button style
5. Subtle tonal button
6. Elevated premium action button
7. Icon button
8. Success confirmation button
9. Destructive / danger button
10. Loading button with selected-state companion toggle demo

## Accessibility decisions

- Uses semantic `button` elements throughout.
- Includes strong `:focus-visible` treatment with a high-contrast accent ring.
- Keeps contrast clear across dark surfaces and muted supporting text.
- Preserves keyboard access for all interactions, including toggle and loading demos.
- Provides a visually hidden live region for confirmation, copy, and loading announcements.
- Respects `prefers-reduced-motion` by minimizing transitions and spinner animation.

## State behavior

- Core CSS states include default, hover, active, focus-visible, and disabled handling.
- Success and loading examples show progressive enhancement without making the showcase depend on JavaScript.
- The selected-state button uses `aria-pressed` for an accessible toggle pattern.
- Loading feedback applies `aria-busy` and live announcements for screen reader users.
- Buttons use subtle press feedback for tactile response without noisy motion.

## Token structure

The stylesheet exposes reusable custom properties for:

- background and panel surfaces
- text hierarchy and muted copy
- accent, success, and danger colors
- borders, radii, shadows, and spacing
- typography families
- control sizing and transitions
- focus ring styling

All major visual decisions are centralized near the top of `style.css` for straightforward system-level tuning.

## Customization guidance

- Update accent-related tokens such as `--lde-accent`, `--lde-accent-bright`, and `--lde-border-strong` to shift the luxury tone.
- Adjust `--lde-control-height`, padding values, and spacing tokens to align with a broader design system.
- Reuse `.lde-button` as the base class and swap modifier classes for alternate product contexts.
- Replace demo copy in `index.html` with production labels while preserving concise editorial phrasing.
- Extend the JavaScript only for product-value enhancements such as analytics hooks, async actions, or state sync with real application logic.
