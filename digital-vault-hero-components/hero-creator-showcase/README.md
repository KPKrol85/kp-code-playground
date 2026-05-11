# Hero Creator Showcase

Hero Creator Showcase is a premium, reusable HERO package for creator businesses and personal brands. It is designed for freelancers, educators, designers, developers, and independent product creators who need a polished first screen with proof, positioning, and portfolio interactivity.

## Use case

Use this HERO when you want to:
- position a personal brand as premium and strategic,
- show curated work snapshots directly inside the hero area,
- provide proof/credibility without sending users away,
- include clear booking/CTA pathways with modern interaction quality.

## File structure

- `index.html` — KP_Code Digital Vault selector panel with product card and link.
- `hero-creator-showcase.html` — Dedicated HERO component page.
- `style.css` — Scoped visual system and responsive layout styles.
- `hero-creator-showcase.js` — Interactivity, accessibility state updates, and motion enhancements.
- `README.md` — Usage and implementation notes.

## JavaScript interactions

The `hero-creator-showcase.js` file implements:
- **Portfolio card selection** using native buttons,
- **ARIA selected-state updates** via `aria-pressed`,
- **Dynamic proof content swap** for testimonial + client context,
- **Reveal-on-scroll animations** with IntersectionObserver,
- **Pointer-aware desktop lift** for premium tactile feel,
- **Reduced motion support** via `prefers-reduced-motion`.

All selectors are guarded defensively, and features degrade gracefully when APIs are unavailable.

## Reuse guide

1. Copy the full folder into your project.
2. Keep `style.css` and `hero-creator-showcase.js` linked in your hero page.
3. Update copy in `hero-creator-showcase.html` for your creator niche.
4. Replace button `data-proof` and `data-client` values with real case outcomes.
5. Adjust accents and spacing in the scoped `.hero-creator-showcase*` classes only.

Because styles are prefixed and page styling is isolated under `body.hero-creator-showcase-page`, the component can be embedded into larger systems with minimal conflict.
