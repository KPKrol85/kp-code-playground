# Floating Icon Minimal Feature Cards

A standalone premium featured-card package with airy light surfaces, levitating icon panels, and restrained motion for product highlights, service overviews, and feature summaries.

## Concept

Each card uses a floating icon wrapper anchored near the top-left edge so the icon feels intentionally suspended above the card rather than pasted onto it. The card body adds extra top padding to protect copy flow, while grid gaps leave enough breathing room for the floating elements across breakpoints.

## Accessibility

- Uses a labeled section, semantic `article` cards, and native anchor elements for full-card interactivity.
- Keeps decorative icon shells hidden from assistive technology with `aria-hidden="true"`.
- Includes visible `:focus-visible` treatment and preserves keyboard navigation.
- Respects `prefers-reduced-motion` by removing reveal and hover motion intensity.

## Motion

- Hover and focus subtly lift the card.
- The icon panel moves slightly more than the card to create layered depth.
- A restrained accent line and CTA arrow animate in without becoming noisy.
- Intersection-based reveal is progressive enhancement only; content remains visible when motion is reduced or observers are unavailable.

## Responsive and dark mode behavior

- Mobile-first grid preserves vertical space above cards so floating icons never collide with surrounding content.
- The layout expands into evenly spaced columns with stable card proportions on larger screens.
- A dark-mode palette keeps the same floating identity using deeper surfaces, softened borders, and controlled accent tints.

## File structure

- `index.html` — semantic section intro and feature-card markup.
- `style.css` — scoped visual system, floating icon composition, responsive spacing, dark mode, and interaction states.
- `script.js` — minimal reveal enhancement with reduced-motion fallback.
- `README.md` — usage and customization notes.

## Customization

- Replace card copy in `index.html` with product, service, or feature content.
- Swap inline SVG paths to change icon style while keeping the floating panel structure intact.
- Adjust `--fc-accent` and `--fc-accent-ink` on each card modifier to retint the icon surface and accent line.
- Tune hover intensity by changing the `transform`, shadow, or transition values in `style.css`.
