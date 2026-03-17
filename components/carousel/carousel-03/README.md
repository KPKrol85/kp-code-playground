# Carousel 03 — Premium Showcase Hero

A reusable, standalone premium hero carousel package built with semantic HTML, strict BEM CSS, and vanilla JavaScript.

## Includes

- Cinematic hero-style slide composition with a dedicated content area and media area
- Four premium SVG scene placeholders embedded inline (no raster assets)
- Previous/next controls, slide dots, and elegant `01 / 04` counter
- Keyboard support (`ArrowLeft`, `ArrowRight`) and touch/pointer swipe support
- Subtle premium enhancement: active slide media receives a gentle scale treatment
- `prefers-reduced-motion` support for motion-sensitive users

## File structure

```text
components/
└── carousel/
    └── carousel-03/
        ├── carousel.html
        ├── carousel.css
        ├── carousel.js
        └── README.md
```

## Reuse instructions

1. Copy the `carousel-03` folder into your project.
2. Include `carousel.css` in your page `<head>`.
3. Place the section markup from `carousel.html` where needed.
4. Load `carousel.js` at the end of the page (or with `defer`).

## Replacing placeholder SVG media

Each slide contains one inline `<svg class="showcase-carousel__artwork">`.

- To keep full design control, replace each inline SVG with your own custom SVG artwork.
- For production images/video, replace the `<svg>` with `<img>`/`<picture>`/`<video>` while preserving these classes:
  - `.showcase-carousel__media`
  - `.showcase-carousel__artwork` (or equivalent media element class)

This keeps sizing, framing, transitions, and responsive behavior unchanged.

## JavaScript initialization notes

- Initialization is automatic using the `[data-carousel]` hook.
- The script is scoped and only runs when the carousel root exists.
- Dots are generated dynamically based on the number of slides.
- The component recalculates slide width on `resize` to keep alignment accurate.

## Autoplay

Autoplay is intentionally **not** enabled.

This package prioritizes controlled, premium storytelling and user-driven pacing for editorial and high-impact hero use cases.
