# Accordion 03 - Premium Media-Supported Story Accordion

## Purpose
`accordion-03` is a standalone, reusable accordion package designed for high-end storytelling sections (travel, hospitality, interiors, gastronomy, and service brands). It combines a semantic accordion column with a paired visual panel where the currently active item controls the media shown.

## Included files
- `accordion.html` - semantic markup for intro, accordion items, and synced media panel.
- `accordion.css` - mobile-first premium styling, transitions, responsive layout, and accessibility-friendly motion handling.
- `accordion.js` - lightweight behavior for active item toggling and media syncing.
- `README.md` - implementation and reuse guidance.

## Structure overview
- Root wrapper: `.kp-accordion03` (`data-accordion03`) for scoped initialization.
- Intro block: eyebrow + heading + supporting paragraph.
- Accordion column: multiple `.kp-accordion03__item` entries.
  - Trigger: full-width `<button>` with title, badge, and icon.
  - Panel: content region tied to trigger IDs via `aria-controls` / `aria-labelledby`.
- Media column: `.kp-accordion03__media` containing stacked `.kp-accordion03__media-card` elements.
  - Each accordion item has `data-media-target`.
  - Each media card has matching `data-media-id`.

## How to edit accordion items
1. Duplicate an existing `.kp-accordion03__item` block in `accordion.html`.
2. Update trigger and panel IDs so they remain unique:
   - Trigger: `id="acc03-trigger-X"`
   - Panel: `id="acc03-panel-X"`
   - `aria-controls` and `aria-labelledby` should reference each other correctly.
3. Set `data-media-target` on the item to a unique key.
4. Add/update title, badge, description, and optional CTA.

## How to replace media / captions
1. Find the matching `.kp-accordion03__media-card` in `accordion.html`.
2. Update:
   - `data-media-id` to match an accordion item's `data-media-target`.
   - `<img src>` and `<img alt>`.
   - `<h3>` and supporting `<p>` caption copy.
3. Keep exactly one item and one media card with `is-active` on first render for a clear default state.

## Accessibility behavior
- Accordion triggers are native `<button>` elements (full header row is clickable).
- `aria-expanded` is updated as state changes.
- Trigger and panel are linked with `aria-controls`, `aria-labelledby`, and unique IDs.
- Panels are `role="region"` for improved assistive technology context.
- `:focus-visible` styling is included for keyboard navigation.
- Keyboard support includes Enter and Space (with progressive enhancement).

## Breakpoint behavior
- Base (mobile-first): stacked flow with accordion above media.
- `@media (min-width: 480px)`: spacing and media panel height increase.
- `@media (min-width: 760px)`: split two-column layout for immersive side-by-side storytelling.
- `@media (min-width: 1024px)`: expanded spacing and refined desktop proportions.

## Reuse guidance
- Keep class naming (`kp-accordion03__*`) unchanged for plug-and-play reuse.
- This package has no framework dependency and no external JS libraries.
- JavaScript initializes only when `[data-accordion03]` exists.
- If JavaScript does not run, all content remains present and readable in document flow.
- Motion is subtle and includes `prefers-reduced-motion: reduce` support.
- The active state applies:
  - contextual dimming for non-active items,
  - border-radius/card morphing + shadow emphasis,
  - staggered reveal for inner panel content only.
