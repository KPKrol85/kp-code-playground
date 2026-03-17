# Accordion 02 — Premium Structured Accordion

## Purpose
This package provides a standalone, reusable accordion component for service scopes, feature breakdowns, process steps, or package details. It is designed to feel product-oriented with polished card styling, restrained interaction, and strong hierarchy.

## Included files
- `accordion.html` — semantic component markup with intro content and accordion items.
- `accordion.css` — mobile-first visual system, states, transitions, and responsive breakpoints.
- `accordion.js` — lightweight progressive-enhancement behavior for multi-expand accordion logic.
- `README.md` — usage and customization guide.

## Structure overview
- A `<section>` wrapper contains:
  - Intro block: eyebrow, title, and support paragraph.
  - Accordion list (`[data-accordion-root]`) containing reusable item cards.
- Each item includes:
  - Heading + full-width `<button>` trigger.
  - Icon area with a custom plus treatment.
  - Title + short meta text.
  - Optional badge/meta chip on the right.
  - Panel region linked through `aria-controls` / `aria-labelledby`.

## How to add or edit items
1. Duplicate any `<article class="kp-accordion__item" data-accordion-item>` block.
2. Update IDs so they stay unique:
   - Trigger `id` (example: `acc-trigger-04`)
   - Panel `id` (example: `acc-panel-04`)
   - `aria-controls` and `aria-labelledby` must point to each other.
3. Replace title, meta text, badge text, and panel content.
4. Set initial open state with `aria-expanded="true"` (open) or `"false"` (closed).

## Badge/meta usage
- Badge element: `<span class="kp-accordion__badge" data-tone="..."></span>`
- Supported demo tones:
  - `included`
  - `optional`
  - `updated`
- To add a new tone, create a new attribute selector in `accordion.css`:
  - `.kp-accordion__badge[data-tone='new-tone'] { ... }`

## Accessibility behavior
- Uses semantic button triggers so the entire header row is clickable.
- Uses `aria-expanded`, `aria-controls`, and matching panel labels for screen-reader context.
- Keyboard support includes Enter/Space activation.
- `role="region"` and `aria-labelledby` provide panel naming.
- Progressive enhancement:
  - Without JavaScript, all panel content remains visible.
  - With JavaScript, open/close states are managed with `hidden` and ARIA updates.
- Visible `:focus-visible` outlines are included for keyboard users.

## Breakpoint behavior
- `>= 480px`: increased trigger/panel spacing and title size.
- `>= 760px`: larger section padding and improved text rhythm.
- `>= 1024px`: expanded card spacing and stronger desktop hierarchy.

## Reuse guidance
- Keep class names scoped (`kp-accordion__...`) to avoid style collisions.
- Place this folder anywhere in your project and link CSS/JS from the HTML template.
- You can host multiple accordion groups on one page by repeating the same item structure and data attributes.
- Multi-expand is enabled by default: opening one item does not close others.
