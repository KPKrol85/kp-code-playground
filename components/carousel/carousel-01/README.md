# Carousel 01 — Premium Gallery Carousel

A standalone, reusable premium gallery carousel component for image-first projects such as hospitality sites, travel pages, architecture studios, restaurant showcases, and editorial portfolios.

## Files

- `carousel.html` — semantic gallery markup with controls, counter, progress, and thumbnail navigation
- `carousel.css` — mobile-first component styling with strict BEM classes and responsive breakpoints
- `carousel.js` — vanilla JavaScript for slide state, controls, keyboard navigation, and touch swipe

## Included features

- Strict BEM naming (`premium-carousel__...`)
- Mobile-first responsive layout
- Breakpoints at:
  - base (mobile)
  - `min-width: 480px`
  - `min-width: 760px`
  - `min-width: 1024px`
- Previous / next controls
- Active slide state management
- Thumbnail navigation
- Counter (`01 / 05`) and progress indicator
- Keyboard support (`ArrowLeft`, `ArrowRight`)
- Touch swipe support for mobile interaction
- `prefers-reduced-motion` fallback
- Premium placeholder visuals using SVG data URI images

## Reuse instructions

1. Copy all four files into your project folder.
2. Include the CSS in your page `<head>`.
3. Include `carousel.js` before the closing `</body>` tag (or load it with `defer`).
4. Keep class names unchanged unless you update HTML, CSS, and JS together.

## Replacing placeholder SVG assets

The demo uses inline SVG placeholders (`data:image/svg+xml,...`) for both slides and thumbnails.

To replace with production images:

1. Update each `.premium-carousel__image` `src` to your real image path.
2. Update each `.premium-carousel__thumbnail-image` `src` to matching thumbnail assets.
3. Keep meaningful `alt` text for accessibility.
4. Optionally adjust `aspect-ratio` in `carousel.css` if your image set uses a different ratio.

## JavaScript initialization notes

- The script auto-initializes when `.premium-carousel` exists on the page.
- It safely exits without errors if required nodes are missing.
- Looping behavior is enabled by default when navigating beyond the first/last slide.
