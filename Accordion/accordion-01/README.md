# Accordion 01 (Premium Editorial)

## Purpose
`accordion-01` is a standalone, reusable accordion package for editorial FAQs and service-information sections. It emphasizes readability, restrained premium styling, accessible interactions, and mobile-first behavior.

## Included files
- `accordion.html` – semantic accordion markup with intro content and multiple items.
- `accordion.css` – mobile-first visual styling, interaction states, and responsive breakpoints.
- `accordion.js` – lightweight component logic for toggle behavior and ARIA state sync.
- `README.md` – usage and customization guidance.

## Structure overview
- Wrapper: `.kp-accordion` with `data-kp-accordion` for scoped JavaScript initialization.
- Intro block: eyebrow, heading, and supporting text.
- Item block:
  - `.kp-accordion__item`
  - `.kp-accordion__trigger` (full-width button click target)
  - `.kp-accordion__badge` (optional status/count badge)
  - `.kp-accordion__panel` + `.kp-accordion__content` (expandable body)

Each trigger is linked to a panel with unique IDs:
- `id="kp-accordion-trigger-XX"`
- `aria-controls="kp-accordion-panel-XX"`
- `aria-labelledby="kp-accordion-trigger-XX"` on the panel

## How to add or edit accordion items
1. Duplicate one `.kp-accordion__item` block in `accordion.html`.
2. Update the trigger and panel IDs so they stay unique and paired.
3. Change the label/content text.
4. Keep `aria-expanded="false"` in markup (the script initializes collapsed state).

## Badge usage
Badges are optional. Add one inside `.kp-accordion__label-wrap`:

```html
<span class="kp-accordion__badge">New</span>
```

For count/tier style badges, use:

```html
<span class="kp-accordion__badge kp-accordion__badge--count">3 tiers</span>
```

Remove the badge element entirely for items that do not need a label.

## Accessibility behavior
- Uses semantic `<button>` triggers so the full header row is clickable.
- Applies `aria-expanded` on each trigger and updates it on toggle.
- Uses `aria-controls`/`aria-labelledby` ID pairing between trigger and panel.
- Panels use `role="region"` for assistive technology context.
- Supports Enter and Space key activation.
- Multi-expand behavior is enabled by default (opening one item does not close others).
- Progressive enhancement: content is readable without JavaScript; JavaScript adds collapse/toggle behavior.
- Reduced-motion support via `prefers-reduced-motion: reduce`.

## Breakpoint behavior
- **Base (mobile-first):** compact spacing, high readability.
- **≥ 480px:** slightly larger gutters and body spacing.
- **≥ 760px:** stronger typography scale and roomier item spacing.
- **≥ 1024px:** wider layout padding and subtle card shadow for premium surface depth.

## Reuse guidance
- Copy the whole `accordion-01` folder into any project.
- Keep relative links from `accordion.html` to `accordion.css` and `accordion.js`.
- If multiple accordions are needed on one page, either:
  - duplicate markup and update IDs per instance, and
  - adjust JS to loop through all `[data-kp-accordion]` containers.
- Keep class names prefixed with `kp-accordion__` to avoid style collisions.
