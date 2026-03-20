# Hero 03 · Interactive Product Showpiece

A premium standalone hero package for single-product brands that need one central object to carry the visual story without relying on heavy runtime 3D.

## Component concept

This hero presents a flagship product as the dominant focal point inside a controlled studio stage. The copy stays disciplined, the CTA treatment remains restrained, and the interaction model is built to support curiosity rather than distract from the product.

## Product-stage architecture

- A semantic hero section wraps the entire showroom experience.
- The left content column carries the headline, supporting paragraph, CTA links, and compact product specifications.
- The right column is structured as a product stage, a focused detail panel, and a finish selector block.
- The product itself is a pseudo-3D layered object built from HTML and CSS surfaces, mesh treatments, internal drivers, glow, grounding shadow, and reflection layers.
- Hotspot controls sit above the stage as native buttons so the visual layout remains premium even before JavaScript enhances the detail panel.

## Pointer interaction logic

- JavaScript reads pointer position within the stage and converts it into low-amplitude `rotateX` and `rotateY` transforms.
- The product and stage move with slightly different depth ratios to create believable parallax without feeling like a demo toy.
- When focus enters the stage, a subtle centered tilt is applied for keyboard users; leaving the stage resets the transforms.
- If `prefers-reduced-motion: reduce` is active, tilt and reveal motion are disabled.

## Hotspot and variant behavior

- Three hotspot buttons update the supporting detail title, body copy, and technical bullet list.
- Hotspots use `aria-pressed` to reflect the current active state.
- Finish selector controls use native radio inputs wrapped in labels for fully keyboard-accessible material switching.
- Selecting a finish changes the product shell variables, mesh tone, glow, and supporting variant label.

## Fallback strategy

- The hero remains visually complete without JavaScript because the pseudo-3D product object, copy, specifications, and controls are all rendered in the base HTML and CSS.
- Hotspot buttons and finish selectors degrade gracefully as visible controls even if the dynamic text updates are unavailable.
- No external libraries, web fonts, image pipelines, or runtime 3D dependencies are required.

## Accessibility decisions

- Semantic headings, figure/figcaption usage, and native anchor/button/input elements are used throughout.
- The stage itself is keyboard focusable so users can discover the interaction region and use arrow keys to cycle feature focus states.
- Strong `:focus-visible` styling is included for CTA links, the stage, hotspot buttons, and finish swatches.
- Reduced-motion users receive an immediate static presentation with animations and tilt behavior effectively removed.
- The detail panel uses `aria-live="polite"` so hotspot changes are announced without being overly disruptive.

## Responsive strategy

- The layout shifts from a two-column showroom to a single-column stack on narrower screens.
- On mobile, hotspots move from absolute stage anchors into a compact inline row so touch interaction stays reliable.
- Fluid typography is implemented with `clamp()` so the large headline scales cleanly across breakpoints.
- The product remains centered and visually dominant even when the copy stack moves above it.

## Customization guidance

- Replace the demo product story in `index.html` with your own flagship item while keeping the semantic structure and ARIA relationships intact.
- Tune finish palettes by editing the `--product-*` custom properties and the modifier classes in `style.css`.
- Add or remove hotspots by updating the HTML buttons and matching entries inside the `hotspotContent` object in `script.js`.
- Adjust stage motion amplitude in `script.js` if you need an even calmer or slightly more expressive response.

## File structure

```text
hero-03-interactive-product-showpiece/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Usage

Open `index.html` directly in a browser to review the standalone component. No build step or dependency installation is required.
