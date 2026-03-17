# Floating Card Accordion (accordion-04)

## Purpose
This package provides a standalone, reusable premium accordion component with a floating-card interaction model. It is designed for service details, process breakdowns, product explanations, and knowledge sections where one active item should stay visually elevated.

## Included files
- `accordion.html` — semantic markup with intro content and accordion structure
- `accordion.css` — mobile-first visual system, spacing, floating-card styles, and motion
- `accordion.js` — scoped behavior for single-open logic, keyboard navigation, and auto-scroll
- `README.md` — usage and customization guidance

## Structure overview
- Root wrapper: `.fc-accordion` with `data-accordion`
- Intro block: eyebrow, heading, and supporting paragraph
- Stack wrapper: `.fc-accordion__stack`
- Item block: `.fc-item[data-accordion-item]`
  - Trigger button: `.fc-item__trigger`
  - Title/meta row: `.fc-item__head-content`
  - Plus/close icon: `.fc-item__icon`
  - Panel region: `.fc-item__panel[role="region"]`
  - Panel content: `.fc-item__panel-inner`, `.fc-item__body`, `.fc-item__actions`

## How to add or edit accordion items
1. Duplicate an existing `.fc-item` block in `accordion.html`.
2. Update the trigger and panel ID pairing:
   - Trigger `id="fc-trigger-XX"`
   - Trigger `aria-controls="fc-panel-XX"`
   - Panel `id="fc-panel-XX"`
   - Panel `aria-labelledby="fc-trigger-XX"`
3. Keep the trigger as a `<button type="button">` so the full header row remains clickable and accessible.
4. Keep `hidden` on closed panels by default if JavaScript should start them collapsed.

## Contextual actions usage
Each panel includes a small action area (`.fc-item__actions`) for utility controls like:
- Copy link
- Share section

You can replace the action link/button labels while keeping the same class names to preserve visual behavior.

## Keyboard interaction behavior
- **Enter / Space**: toggles the focused item
- **Arrow Down**: moves focus to the next trigger
- **Arrow Up**: moves focus to the previous trigger
- **Escape**: closes the currently open item (if open)

## Accessibility behavior
- Trigger buttons expose `aria-expanded`
- Trigger and panel are linked using `aria-controls`, `id`, and `aria-labelledby`
- Panels use `role="region"`
- Focus-visible outlines are provided for triggers and action controls
- Progressive enhancement is used so content remains readable if JavaScript does not execute

## Breakpoint behavior
Mobile-first breakpoints are included at:
- `480px` — slightly increased padding
- `760px` — larger spacing and panel rhythm
- `1024px` — enhanced desktop density and heading scale

## Reuse guidance
- Copy all four files into any project and keep paths relative (`accordion.html` includes local CSS/JS files).
- Prefixes use `fc-` to reduce naming collisions.
- JavaScript initializes only if `[data-accordion]` exists.
- The component enforces single-active-item behavior by design for a stable floating-card visual hierarchy.
