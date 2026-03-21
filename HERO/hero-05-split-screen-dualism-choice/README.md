# Split-Screen Dualism Choice

A premium standalone full-viewport hero for situations where two audience journeys matter equally. The package presents a balanced split-screen decision surface with a shared center seam so users can self-select confidently without either side feeling secondary.

## Component concept

This hero frames two parallel paths inside one unified product surface:

- **Revenue teams** for buyer, seller, and partner-style commercial workflows.
- **Members** for customer, creator, or community-facing lifecycle journeys.

Both halves use distinct visual identities, but they share typography, spacing, surface depth, and a center spine so the experience feels like one branded system rather than two isolated cards.

## Dual-path information architecture

Each panel contains:

- an overline for quick audience recognition
- a prominent headline and supporting description
- a short highlight list for credibility
- a CTA that remains viable in both default and active states

The left panel also includes the largest shared hero title to establish the page-level message while preserving parity through the mirrored structure and equal panel weight.

## Active-state emphasis logic

The component works without JavaScript, but JavaScript adds controlled directional emphasis:

- hovering a panel gives it a subtle scale and visual lift
- focusing interactive elements inside a panel activates the same emphasis for keyboard users
- active state slightly adjusts the desktop split ratio to favor the selected side while keeping the other side substantial
- CTA treatment, panel saturation, and background accents intensify on the active side rather than collapsing the opposite side

This keeps the choice responsive and intelligent without dramatic resizing or unstable layout shifts.

## Center seam / divider strategy

The midpoint is treated as a branded seam, not empty space:

- a vertical divider line anchors the default desktop composition
- a capsule badge introduces a shared “same platform” marker and simple brand glyph
- the seam reacts with a mild glow when one side becomes active
- on smaller screens the divider rotates into a horizontal bridge to preserve the relationship between both paths

## Accessibility decisions

- semantic section and article structure supports clear content grouping
- CTAs are native links and secondary journey previews are native buttons
- `:focus-visible` states are customized for links and buttons
- hover emphasis is mirrored for keyboard focus via `focusin`
- reduced-motion preferences disable expansion and background motion
- the content remains understandable and actionable even if JavaScript is unavailable

## Responsive behavior

- **Desktop:** 50/50 split by default with restrained active-side expansion.
- **Tablet:** stacked panels with a horizontal seam treatment between them.
- **Mobile:** tall, immediately tappable panels that preserve the dual-choice concept rather than shrinking into generic cards.

## Customization guidance

To adapt this package:

1. Replace the demo audience labels, headlines, and CTA URLs in `index.html`.
2. Update the accent variables in `style.css` for a new dual-brand palette.
3. Adjust active-state grid ratios in the desktop media query if you want more or less emphasis.
4. Swap the center badge copy if you want a logo, connector word, or symbolic divider treatment.
5. Keep copy lengths relatively tight so both panels maintain visual parity across breakpoints.
