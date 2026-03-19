# Carousel 05 · Thumbnail Navigator

A premium standalone thumbnail-driven gallery for portfolio, editorial, showroom, and case-study presentations. The component pairs a large primary viewer with a synchronized thumbnail strip so navigation stays calm, precise, and visually legible across mobile and desktop.

## Core behavior

- Large main viewer with reserved aspect ratio for stable loading and zero avoidable CLS.
- Synchronized thumbnail buttons that immediately update the active hero image.
- Previous/next controls, keyboard Arrow Left/Right navigation, and touch swipe support.
- Automatic thumbnail strip scrolling so the active item stays in view.
- Scoped loading shimmer while the main image changes.
- Optional lightbox experience for focused full-image viewing.
- Custom events: `carousel:ready` and `carousel:change`.

## Accessibility support

- Semantic section wrapper, main viewer, and thumbnail navigation region.
- Native button elements for controls, thumbnail items, and lightbox actions.
- Visually hidden `aria-live="polite"` region for concise image announcements.
- Clear active-state sync through `aria-current` and visual emphasis.
- Visible `:focus-visible` treatment for keyboard users.
- Reduced-motion support for transitions, scrolling, and lightbox state changes.

## Interaction notes

- Click any thumbnail to update the main image immediately.
- Use the previous/next buttons or Arrow Left/Right while focused on the viewer to move through slides.
- Swipe horizontally on touch devices to change images.
- Activate the main image to open the lightbox, then close it with the close button or `Escape`.

## Responsive behavior

- Mobile-first layout with a horizontally scrollable thumbnail strip.
- Desktop layout shifts the thumbnails into a dedicated vertical navigation column.
- ResizeObserver-based compact mode keeps controls stable when container width is constrained.

## File structure

```text
carousel-05-thumbnail-navigator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Customization

- Replace each thumbnail button’s `data-large-src`, `data-thumb-src`, `data-title`, `data-description`, and `data-alt` values in `index.html` with real project media.
- Adjust the premium frame, spacing, and active thumbnail styling in `style.css`.
- Tune transition feel through `--tn-duration` and `--tn-ease` in `:root`.
- Reuse the `[data-carousel]` structure for multiple instances on the same page; the JavaScript is instance-safe and does not rely on global IDs.

## Demo media note

The demo uses component-scoped generated SVG artwork so the package remains standalone while still modeling separate `media/large/...` and `media/thumbs/...` source paths for future production asset swaps.
