# Glow Border SaaS Dark Featured Cards

A standalone featured-card package for premium SaaS, AI tooling, analytics, and trust-layer presentations. The component pairs dark layered surfaces with a controlled glow perimeter so cards feel interactive and high-end without sacrificing readability.

## Concept

Each card uses an outer shell, a masked glow-border layer, and an inset content surface. The glow follows pointer movement through CSS custom properties, keeping the light concentrated in the perimeter zone instead of washing across the full card body.

## Highlights

- Semantic section wrapper with intro copy and article-based feature cards.
- Full-card clickable anchors with native keyboard behavior.
- Strong no-JavaScript border fallback with readable dark surfaces.
- Pointer-driven glow positioning enhanced by subtle perspective tilt on fine pointers.
- Restrained click pulse, layered shadows, and a faint grid texture for depth.
- Mobile and coarse-pointer fallback that keeps the cards premium without forced pseudo-hover behavior.

## Accessibility

- Uses semantic headings and native link interaction.
- Decorative border/glow layers are hidden from assistive technology.
- Focus-visible uses a clear outline that does not depend on the glow effect.
- `prefers-reduced-motion` disables tilt and pulse-heavy motion while preserving the component identity.
- The layout remains usable and visually coherent without JavaScript.

## Responsive and dark-mode behavior

- Mobile-first grid with stable spacing and disciplined hierarchy.
- Fine-pointer devices get interactive glow tracking and subtle tilt.
- Touch/coarse-pointer devices keep the static premium border treatment without hover-dependent behavior.
- `prefers-color-scheme: dark` is the natural presentation, with a credible light fallback included for reuse in broader libraries.

## File structure

- `index.html` — standalone demo markup.
- `style.css` — isolated visual system, glow border treatment, layout, and motion rules.
- `script.js` — modular pointer tracking and enhancement logic.
- `README.md` — usage and customization notes.

## Customization

Adjust these variables in `style.css` to tailor the package:

- Glow color: `--gb-accent`, `--gb-accent-2`, `--gb-accent-3`
- Glow size and intensity: `--gb-glow-size`, `--gb-glow-opacity`
- Border treatment: `--gb-border`, `--gb-border-strong`, shell/surface backgrounds
- Card feel: `--gb-radius-xl`, `--gb-card-shadow`, tilt limits in `script.js`
- Content: swap copy, metrics, tags, and inline SVG icons directly in `index.html`
