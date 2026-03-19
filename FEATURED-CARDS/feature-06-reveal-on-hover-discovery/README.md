# Reveal-on-Hover Discovery Cards

A premium standalone featured-cards package for product capabilities, service summaries, and landing-page discovery sections. Each card keeps a stable outer footprint while the deeper layer reveals inside the same frame through restrained layered motion.

## Concept

The component emphasizes visual stability, internal reveal choreography, and disciplined spacing. The initial card state stays concise with a clear icon, heading, and summary. On interaction, the primary layer shifts upward slightly while the secondary layer fades and slides into place with staggered timing.

## Stable-footprint reveal model

- Cards use a fixed minimum height so the surrounding grid does not reflow during interaction.
- Primary and secondary layers are stacked inside the same card frame.
- Reveal motion relies on transform and opacity rather than brittle `display: none` animation patterns.
- The description appears first, followed by the CTA on a slightly delayed timing.

## Accessibility

- Semantic `section` and `article` structure with a labeled section heading.
- Every card includes a proper heading and native `button` / `a` interactions.
- `:focus-within` mirrors the hover reveal so keyboard users get the same discovery state.
- Visible `:focus-visible` styling is included for both the reveal button and CTA.
- `Escape` closes an active card and returns focus to the card toggle.

## Touch behavior

- JavaScript is progressive enhancement only and supports multiple component instances.
- On coarse-pointer devices, users can tap the reveal button to open a card and tap the CTA on the second interaction.
- Opening one card closes sibling cards to keep the mobile experience clear and intentional.

## Motion and reduced motion

- Motion is GPU-friendly and limited to opacity, transform, shadow, and subtle accent changes.
- Reveal timing is staggered so the description resolves before the CTA.
- `prefers-reduced-motion: reduce` minimizes non-essential animation while preserving state clarity.

## Responsive behavior

- Mobile-first CSS Grid layout with touch-friendly spacing.
- Stable card heights remain practical on small screens and scale cleanly into multi-column layouts.
- The component avoids avoidable layout shift and keeps the hit area dependable across breakpoints.

## Dark mode

A dedicated `prefers-color-scheme: dark` layer reinterprets surfaces, borders, shadows, and text contrast without losing the component’s premium identity.

## File structure

- `index.html` — standalone semantic markup and realistic demo content.
- `style.css` — scoped visual system, reveal choreography, responsive layout, and dark mode.
- `script.js` — multi-instance-safe progressive enhancement for active state behavior.
- `README.md` — implementation notes and customization guidance.

## Customization

- Replace the SVG icons, labels, headings, summaries, and reveal copy in `index.html`.
- Adjust accent glow, borders, shadows, or surface tones in `style.css`.
- Tune reveal intensity by changing the transform distances and transition timings.
- Swap CTA text or link destinations to suit product, service, or editorial discovery use cases.
