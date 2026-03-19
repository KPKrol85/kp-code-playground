# Feature 01 — Apple-Style Bento Grid

A standalone featured-cards package for premium product storytelling. The component uses a calm, Apple-adjacent bento composition with editorial spacing, subtle SVG-driven visuals, and restrained motion suitable for launch pages, product overviews, and executive feature sections.

## Files

- `index.html` — semantic section wrapper, intro copy, and six feature cards built with `article` elements.
- `style.css` — fully scoped layout, visual system, interaction polish, responsive behavior, container queries, and dark mode.
- `script.js` — minimal progressive enhancement for spotlight hover polish and a lightweight custom hover event.

## Layout system

- Mobile-first single-column stack for clean reading order.
- Tablet grid shifts to six columns with controlled spans.
- Desktop grid expands to a 12-column bento composition with `large`, `wide`, `tall`, and `small` card variants.
- The layout is intentionally art-directed with fixed span logic rather than masonry behavior, preserving alignment and equal gap rhythm.

## Accessibility

- Semantic `section`, `header`, and `article` structure.
- Interactive cards use full-card anchor overlays so the whole surface is clickable while keeping native link behavior.
- Clear heading hierarchy and concise descriptions.
- Visible `:focus-visible` treatment for keyboard users.
- Decorative SVG and preview accents are hidden from assistive technologies where appropriate.
- Motion is reduced automatically for users who prefer reduced motion.

## Responsive and container-query behavior

- The outer layout responds at mobile, tablet, and desktop breakpoints.
- Internal card layouts use container queries to upgrade wider cards into split content/media compositions only when enough inline space is available.
- Smaller screens simplify the composition without breaking content order or creating awkward card spans.

## Dark mode

- Uses `prefers-color-scheme: dark` to shift surfaces, borders, shadows, and accent treatments while preserving the same premium identity and contrast hierarchy.

## Customization

- Update card span classes such as `fc-card--hero`, `fc-card--wide`, `fc-card--tall`, and `fc-card--small` to rebalance the composition.
- Swap inline SVG fragments or mini UI previews to reflect your product story.
- Adjust section-scoped custom properties in `.fc-bento` to change radius, gap, shadows, borders, or accent tone.
- Replace demo headings, eyebrow text, metrics, and CTA labels with production content while keeping descriptions concise for best visual rhythm.
