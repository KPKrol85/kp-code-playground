# Feature 01 — Editorial Premium

## Concept
A standalone premium feature-cards section designed with a calm editorial tone. It uses a restrained Bento-inspired layout: one dominant hero card and supporting secondary cards, suited for hospitality, boutique travel, interior brands, and premium service storytelling.

## File structure
- `index.html` — semantic section markup, intro copy, and feature cards.
- `style.css` — scoped visual system, editorial typography, asymmetric responsive grid, and motion/focus states.
- `script.js` — optional progressive enhancement for subtle pointer-based card tilt.
- `README.md` — implementation and reuse guidance.

## Content anatomy
1. **Section intro**
   - micro-label/section number
   - accent divider rule
   - primary heading
   - short supporting description
   - understated intro CTA
2. **Card group**
   - one hero editorial card (primary story)
   - two supporting cards (secondary highlights)
   - each card includes meta label, headline, brief body, and subtle CTA

## Visual direction
- Soft premium neutrals (warm off-white, refined stone, muted charcoal text).
- Large border radii and generous internal padding to preserve breathing room.
- Light border-led surfaces with gentle shadow depth.
- Editorial serif-forward heading treatment with controlled hierarchy.
- Delicate divider and understated link treatments instead of loud visual effects.

## Interaction model
- Default CSS hover/focus polish adds a mild lift and refined border emphasis.
- Link arrow nudge is minimal and intentionally restrained.
- JavaScript adds optional micro-tilt for depth on pointer movement.
- If JavaScript is unavailable, cards remain fully functional with CSS-only interactions.

## Accessibility considerations
- Semantic landmarks (`main`, `section`, `article`) and heading hierarchy.
- Interactive elements use native anchors with clear labels.
- Explicit `:focus-visible` styling for keyboard users.
- Good foreground/background contrast with muted but readable text.
- `prefers-reduced-motion: reduce` is respected in CSS and JS (JS exits early).

## Responsive behavior
- **Mobile-first:** cards stack in a single column for clear reading flow.
- **Tablet/Desktop:** grid restores an asymmetric composition where the hero card spans two rows.
- Fluid type sizing via `clamp()` maintains balanced hierarchy across breakpoints.

## Reuse recommendations
- Replace copy and CTA text per campaign while preserving hierarchy.
- Keep one dominant card and at least two supporting cards to retain editorial rhythm.
- Tune tokens in `:root` (`--fc-*`) to adapt brand palette and tone.
- Maintain generous card padding relative to grid gap for premium spacing discipline.
