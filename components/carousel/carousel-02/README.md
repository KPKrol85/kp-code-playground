# Carousel 02 - Premium Cards Carousel

A standalone, production-minded cards carousel built with semantic HTML, mobile-first CSS, and vanilla JavaScript.

## Included files

- `carousel.html` - component markup with intro block, card slides, controls, progress, and pagination.
- `carousel.css` - premium visual system, strict BEM styles, responsive layout, and reduced-motion support.
- `carousel.js` - progressive enhancement for navigation, swipe, keyboard support, pagination, and responsive visible-card logic.

## Structure and reuse

Use the `.cards-carousel` block as the reusable wrapper and keep all element classes in strict BEM form:

- Block: `.cards-carousel`
- Elements: `.cards-carousel__*`
- States: `.is-active` (applied by JavaScript)

To reuse:

1. Copy all four files to your project component directory.
2. Include `carousel.css` in the page and load `carousel.js` after the carousel markup.
3. Duplicate or remove `<li class="cards-carousel__slide" data-carousel-slide>` items as needed.
4. Keep the `data-carousel-*` attributes so behavior initialization continues to work.

## Placeholder SVG assets

The media area for each card uses inline SVG placeholders in `carousel.html`. This keeps the package self-contained and avoids raster dependencies.

To replace placeholders with real content later:

- Swap each `.cards-carousel__media` SVG with an `<img>` or `<picture>`.
- Preserve the `.cards-carousel__media` wrapper and `aspect-ratio` behavior in CSS.
- Use descriptive `alt` text for real imagery.

## Responsive visible-card logic

Visible card count is recalculated in JavaScript based on viewport width:

- Base mobile: **1** visible card
- `min-width: 760px`: **2** visible cards
- `min-width: 1024px`: **3** visible cards

At `min-width: 480px`, spacing and proportions are refined while retaining the current visible-card count.

## Accessibility and interaction notes

- Previous/next controls include explicit `aria-label`s and `aria-controls`.
- Keyboard arrow keys (`←` and `→`) move between card sets.
- Pagination dots are generated with tab semantics and selected-state updates.
- `prefers-reduced-motion: reduce` minimizes transitions and transform effects.

## Initialization

No external dependencies or manual init call are required.

`carousel.js` auto-initializes on the first `[data-carousel]` instance found on page load.
