# Buttons 07 — Soft UI Premium Controls

A standalone premium button package for the KP_Code Digital Vault collection. The component showcases a calm, tactile soft-surface button system designed for polished dashboards, premium SaaS interfaces, refined product controls, and modern UI kits.

## Component concept

This package interprets soft UI as a disciplined premium surface language rather than exaggerated nostalgic neumorphism. The controls use restrained depth, consistent upper-left lighting, refined borders, balanced contrast, and clear interaction cues so they remain commercially credible and reusable.

## Included button variants

1. Primary soft CTA
2. Secondary tonal button
3. Quiet utility button
4. Outline soft button
5. Ghost button
6. Raised premium action button
7. Inset pressed-style utility button
8. Icon-only button
9. Loading button
10. Success toggle / confirm button

Disabled state examples are also included to demonstrate non-interactive treatment.

## Accessibility decisions

- Uses real `button` elements for native semantics and keyboard support.
- Includes strong `:focus-visible` styling with a dedicated ring that remains visible in both themes.
- Preserves contrast with darker text, clearer borders, and disciplined shadow values.
- Supports `prefers-reduced-motion` by minimizing animation and transition timing.
- Uses `aria-live`, `aria-busy`, and `aria-pressed` where state announcements are relevant.
- Keeps icon-only controls labeled with `aria-label`.

## State behavior

- Default, hover, active/pressed, and focus-visible states are included across the system.
- Disabled examples are shown below the main preview grid.
- The loading button demonstrates an accessible in-progress and completion pattern without causing layout shift.
- The success button demonstrates a selected/toggled state using `aria-pressed`.
- Minimal JavaScript adds theme preview control, loading simulation, toggle behavior, and optional button-label copy feedback.

## Token structure

CSS custom properties are defined at the top of `style.css` for:

- surface layers
- panel/background tones
- text hierarchy
- accent and success colors
- border strength
- highlight and key shadows
- radii
- spacing scale
- control sizing
- motion timing and easing

The dark theme redefines these tokens rather than simply inverting colors, which keeps the soft-surface illusion believable.

## Customization guidance

- Update the accent and success tokens to align the system with a product brand.
- Tune `--supc-control-height`, padding, and radii to adapt the controls for denser or roomier interfaces.
- Reuse the individual modifier classes (`--primary`, `--outline`, `--inset`, etc.) as design-system starting points.
- Adjust card copy and helper text in `index.html` to turn the package into product docs, a UI kit preview, or an interactive controls gallery.
- If you do not need the interactive demos, the HTML/CSS remain visually complete without JavaScript.
