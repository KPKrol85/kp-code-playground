# Accordion 06 — Premium Glass/Neumorphic Hybrid

## Purpose
This package provides a standalone, reusable accordion component designed for premium SaaS/product education content. It combines frosted-glass translucency, soft neumorphic depth, subtle glow, and restrained motion while preserving accessibility and production safety.

## Included files
- `accordion.html` — semantic structure and sample premium content
- `accordion.css` — mobile-first visual system, layout, responsive behavior, and motion styling
- `accordion.js` — scoped accordion interaction logic (single-active-item behavior)
- `README.md` — implementation and reuse guidance

## Structure overview
- Root wrapper: `.kp-accordion[data-kp-accordion]`
- Intro block:
  - `.kp-accordion__eyebrow`
  - `.kp-accordion__heading`
  - `.kp-accordion__supporting`
- Accordion list: `.kp-accordion__items`
- Each item:
  - Container: `.kp-item[data-accordion-item]`
  - Full-row trigger button: `.kp-item__trigger`
  - Visual accent tile: `.kp-item__visual` (with optional modifier classes)
  - Text group: title + teaser
  - Icon slot: `.kp-item__icon`
  - Panel: `.kp-item__panel[role="region"]`
  - Inner content: `.kp-item__panel-inner`

## How to add or edit accordion items
1. Duplicate an existing `<article class="kp-item" data-accordion-item>...</article>` block in `accordion.html`.
2. Update IDs to stay unique:
   - Trigger `id` (e.g. `acc-trigger-04`)
   - Panel `id` (e.g. `acc-panel-04`)
   - Keep `aria-controls` and `aria-labelledby` linked to those IDs.
3. Edit title, teaser, panel copy, and optional list points.
4. Keep the trigger as a `<button type="button">` so the entire header row remains clickable and keyboard accessible.

## Teaser text behavior
- Teaser lines live in `.kp-item__teaser` inside each trigger.
- In closed state, teaser is visible as a short preview.
- In open state (`.is-open`), teaser fades/collapses to keep focus on expanded content.
- You can remove the teaser span for items that should only show a title.

## Visual accents / side thumbnails
- Each item includes `.kp-item__visual`, a lightweight gradient tile (no external assets).
- Change accent palette by:
  - using the base class for default blue/cyan tone
  - adding modifier classes like `.kp-item__visual--violet` or `.kp-item__visual--mint`
  - or defining new modifiers in `accordion.css` via `--orb-start` and `--orb-end` custom properties.
- Active items sharpen and increase accent clarity automatically.

## Accessibility behavior
- Uses semantic button-based triggers with:
  - `aria-expanded`
  - `aria-controls`
  - linked panel IDs
- Panels expose `role="region"` and `aria-labelledby`.
- Keyboard:
  - Enter and Space activate toggle behavior.
- Focus:
  - visible `:focus-visible` outline on triggers.
- Progressive enhancement:
  - Content is present in HTML and remains readable without JavaScript.
  - JS enhances behavior and enforces controlled single-active interaction.

## Breakpoint behavior
Mobile-first with explicit breakpoints:
- `min-width: 480px`:
  - slightly larger spacing and typography
- `min-width: 760px`:
  - refined panel/trigger spacing and denser desktop rhythm
- `min-width: 1024px`:
  - wider container and final typography polish

## Reuse guidance
- Copy all four files into your target component location.
- Keep relative links (`accordion.css`, `accordion.js`) if files stay colocated.
- Rename class prefixes only if integrating into another naming system; update both CSS and JS selectors consistently.
- For multiple accordions on one page, this script currently initializes the first `[data-kp-accordion]` instance. Duplicate the initializer logic if you want multi-instance support.
- Keep motion subtle and preserve readability if extending animations.
