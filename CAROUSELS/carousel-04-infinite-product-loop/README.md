# Carousel 04 · Infinite Product Loop

A premium standalone e-commerce carousel package for curated product rails, featured collection strips, premium storefront modules, and digital catalog highlights.

## Concept

This component prioritizes product clarity first: bright product cards, restrained controls, aligned CTA placement, and a seamless infinite loop that keeps browsing fluid without feeling like a generic hero slider.

## Features

- Standalone HTML, CSS, and vanilla JavaScript package
- Semantic section wrapper, clipped viewport, and product list built with `ul` / `li`
- Realistic demo product cards with media, badges, pricing, metadata, and shopping CTAs
- Infinite looping via leading/trailing clones with seamless reset logic
- Multi-instance-safe JavaScript architecture using scoped data attributes instead of ID-coupled behavior
- Native previous/next controls, ArrowLeft / ArrowRight keyboard support, touch swipe, and pointer drag interaction
- `aria-live="polite"` status updates for visible product range announcements
- Clone focus suppression plus visible-slide CTA tab management to reduce offscreen keyboard confusion
- ResizeObserver recalculation, IntersectionObserver-aware autoplay pausing, and transform-based movement for smooth performance
- Reserved media aspect ratios, explicit image dimensions, lazy loading for non-initial media, and subtle skeleton loading polish
- Reduced-motion friendly transitions and interaction states

## Accessibility

- Uses native `button` elements for navigation and product CTAs
- Exposes the carousel as a labeled section region
- Announces visible product groups through a visually hidden live region
- Preserves semantic list structure for products
- Keeps cloned slides out of the accessibility and keyboard flow
- Maintains visible focus styles and keyboard navigation without trapping focus

## Interaction model

- Previous / next buttons move the rail by one product at a time
- ArrowLeft and ArrowRight work when the viewport is focused
- Touch and pointer drag gestures support swipe-first browsing on smaller screens and direct manipulation on desktop
- Subtle autoplay advances the rail automatically, then pauses on hover, focus within, and when the carousel is offscreen

## Responsive behavior

The layout is mobile-first, showing a single dominant card on small screens, widening to a multi-card merchandising rail at tablet and desktop breakpoints. Card media keeps a fixed aspect ratio to avoid layout shift, and the JavaScript recalculates loop geometry when the container size changes.

## File structure

```text
carousel-04-infinite-product-loop/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Customization

- **Products:** Replace the demo `li.product-card` entries in `index.html`.
- **Badges:** Add, remove, or rename `.product-card__badge` elements per product.
- **CTA text:** Update each `.product-card__cta` label to suit add-to-cart, reserve, or detail-view flows.
- **Autoplay timing:** Change `this.autoplayDelay` in `script.js`.
- **Visible card count:** Adjust the responsive `grid-auto-columns` values and card width tokens in `style.css`.
- **Pricing and metadata:** Swap product title, category, description, and price content while preserving the existing semantic structure.
