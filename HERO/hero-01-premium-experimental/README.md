# Premium Experimental Hero (Edition 01)

A standalone premium hero component using an **immersive glassmorphism + organic blob** art direction.

The composition is intentionally asymmetric: editorial copy anchors the left reading flow while a floating glass showcase card creates layered depth and a strong secondary focal point.

## File structure

```text
HERO/hero-01-premium-experimental/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Features

- Mobile-first semantic hero section with clear heading hierarchy.
- Fluid typography (`clamp`) tuned for premium display copy.
- Asymmetric layout designed for F/Z scanning behavior.
- Glassmorphism surfaces with organic ambient blobs and grain texture.
- Lightweight pointer-reactive parallax on selected decorative layers.
- Staggered reveal transitions powered by `IntersectionObserver`.
- LCP-conscious media markup pattern using `picture`, with high-priority hero visual loading hints.

## Accessibility notes

- Semantic structure: `<main>` + `<section aria-labelledby>`.
- CTAs are native links with visible keyboard focus states.
- Contrast is maintained for body text and controls against layered backgrounds.
- Motion is progressively enhanced:
  - reveal effects and parallax disable when `prefers-reduced-motion: reduce` is active.
  - content remains fully visible without JavaScript.

## Implementation notes

- No frameworks or third-party animation libraries.
- JavaScript is minimal and modular, focused only on reveal and parallax behavior.
- Decorative assets are generated in CSS/SVG data URI to keep the component standalone and portable.
- Styling is scoped with a `hero-premium` namespace for easy reuse in a component library.
