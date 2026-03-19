# Gradient-Wash Vibrant Feature Cards

A premium standalone featured-cards package built around fluid, mesh-like color motion. The component is designed for campaign highlights, bold SaaS feature storytelling, innovation messaging, and premium launch sections where vivid atmosphere needs to stay disciplined and readable.

## Concept

Each card combines a semantic content layer with a dedicated gradient-wash background made from softly blurred color fields, a restrained sheen pass, and a light grain texture. The result aims to feel like illuminated pigment suspended behind the copy rather than a loud rainbow fill.

## Gradient-wash model

- Multiple blurred gradient blobs create a soft mesh-like wash.
- Motion relies on slow transform-based drift instead of heavy background-position animation.
- A subtle halo sits outside the card to add premium depth without overpowering the layout.
- A semi-translucent content surface keeps headings and descriptions readable over the animated color.

## Accessibility

- Uses semantic `section`, `header`, and `article` structure.
- Each card has a proper heading and a native full-card link.
- Decorative wash, glow, sheen, and grain layers are hidden from assistive technology.
- Includes high-visibility `:focus-visible` styling that remains clear over vibrant backgrounds.
- Motion is non-essential, so content hierarchy remains understandable with animation reduced or unavailable.

## In-view activation

`script.js` uses `IntersectionObserver` to detect when cards are meaningfully visible. Visible cards enter an `in-view` state so the wash animates only when relevant, and hover/focus can temporarily elevate the card into a stronger active state.

## Hover, focus, and reduced motion

- Cards feel softly alive at rest once in view.
- Hover and keyboard focus slightly increase lift, glow presence, and CTA emphasis.
- `prefers-reduced-motion: reduce` disables the drifting wash animation and removes lift-heavy transitions while preserving the visual composition.

## Responsive behavior

- Mobile-first CSS Grid layout with disciplined spacing.
- Cards maintain a stable minimum height to avoid avoidable layout shift.
- On small screens, metadata and footer content stack cleanly so the wash remains elegant instead of crowded.

## Dark mode

The component defaults to a premium dark presentation and also includes a credible light-mode adaptation through `prefers-color-scheme: light`, adjusting shell surfaces, contrast, and card treatment while preserving the same gradient-wash identity.

## File structure

- `index.html` — standalone semantic markup and demo content.
- `style.css` — scoped layout, wash visuals, interaction states, responsive behavior, and color-scheme support.
- `script.js` — progressive enhancement for in-view activation and active state orchestration.
- `README.md` — usage, behavior, and customization notes.

## Customization

- Update the card copy, labels, and link targets in `index.html`.
- Change the palette by editing the per-card blob variables in `style.css`.
- Increase or soften the wash by adjusting blob opacity, blur, halo opacity, and animation timing.
- Tune the premium glow by modifying `.gwv-card__halo` and card shadow values.
- Replace or expand the SVG icons while keeping them inline and dependency-free.
