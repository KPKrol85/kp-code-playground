# Accordion 03 — Neomorphism

## Design concept
A standalone Soft UI accordion that uses paired highlight and shadow layers to create a calm, tactile raised-to-pressed interaction. Closed items feel gently elevated from the page, while the active item settles inward with an inset treatment and restrained motion.

## Feature summary
- Semantic accordion wrapper with a compact intro area and three premium demo sections.
- Full-width native button triggers with scoped ARIA wiring for each panel pair.
- Single-open behavior with optional ArrowUp and ArrowDown trigger navigation.
- Subtle neomorphic icon treatment that shifts from raised to pressed alongside the item state.
- Responsive spacing, readable typography, and reduced-motion support.
- Optional light haptic feedback on supported mobile devices.

## Accessibility notes
- Uses native `button` elements for triggers.
- Connects triggers and panels with `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`, and `hidden`.
- Keeps focus-visible styling distinct without breaking the soft surface illusion.
- Relies on native Enter and Space button behavior, with additional ArrowUp and ArrowDown navigation.

## Interaction notes
- One panel remains open at a time by default.
- Clicking a closed item opens it and closes the others.
- Open items do not collapse on repeat click, preserving the single-open pattern.
- Motion is restrained and automatically minimized for users who prefer reduced motion.

## File structure
- `index.html` — semantic markup and realistic demo content.
- `style.css` — isolated Soft UI styling, responsive layout, and state transitions.
- `script.js` — scoped accordion state management and keyboard support.
- `README.md` — usage and customization guidance.

## Customization guidance
- Adjust the `:root` custom properties in `style.css` to tune background tone, accent color, radius, or shadow intensity.
- Duplicate a `.neo-item` block in `index.html` to add more sections, ensuring each trigger and panel pair gets unique IDs.
- If a multi-open variation is desired later, adapt the `openItem` function in `script.js` while preserving the same ARIA updates.
