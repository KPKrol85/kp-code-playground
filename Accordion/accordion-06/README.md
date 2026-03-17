# Accordion 06 — Glass / Neumorphic Hybrid

## Purpose
This package provides a standalone, reusable accordion with a premium translucent visual language. It combines accessible semantic structure, subtle depth, and restrained motion for SaaS/product education content.

## Included files
- `accordion.html` — semantic markup for intro + accordion items.
- `accordion.css` — mobile-first glass-hybrid styling, responsive layout, and motion rules.
- `accordion.js` — scoped behavior for single-active accordion interaction, status labels, and accent preview.
- `README.md` — usage and customization notes.

## Structure overview
- Root section: `.kp-accordion[data-accordion]`
- Intro block: eyebrow, heading, supporting text.
- Item list: `.kp-accordion__items`
- Item: `.kp-item[data-item][data-accent]`
  - Trigger button: `.kp-item__trigger`
  - Visual accent chip: `.kp-item__visual`
  - Heading group: title + teaser
  - Meta: status label + icon
  - Panel: `.kp-item__panel[role="region"]` with `.kp-item__panel-inner`

## How to add or edit accordion items
1. Copy an existing `<article class="kp-item">` block.
2. Update IDs so each trigger/panel pair remains unique:
   - `id="accordion-trigger-X"`
   - `aria-controls="accordion-panel-X"`
   - panel `id="accordion-panel-X"`
   - panel `aria-labelledby="accordion-trigger-X"`
3. Update `data-item` with a unique key.
4. Update content (title, teaser, paragraph, list).
5. Keep one item with `is-active` class for the default open state.

## How teaser text works
- Teaser text lives in `.kp-item__teaser`.
- In closed state, teaser remains visible to provide quick context.
- In active state, teaser fades/collapses so the expanded panel becomes the visual focus.

## How visual accents / side thumbnails are configured
- Each item uses `data-accent` with a CSS gradient value.
- JavaScript uses the active/hovered item accent to subtly shift the component glow tone.
- The side chip (`.kp-item__visual`) gets sharper and slightly brighter in active state.

## Numbering and status label behavior
- This version prioritizes title + teaser hierarchy over numbered prefixes.
- Status labels are dynamic via `.kp-item__status` using:
  - `data-open="Open"`
  - `data-closed="Closed"`
- JavaScript updates label text based on expanded state.

## Accessibility behavior
- Buttons control expansion (`aria-expanded`, `aria-controls`).
- Panels are linked with `id` + `aria-labelledby` and use `role="region"`.
- Entire header row is clickable because the trigger button spans full width.
- Enter/Space keyboard handling is included in JavaScript.
- Focus-visible outline is provided in CSS.
- With JavaScript unavailable, all panels remain visible (progressive enhancement fallback).

## Breakpoint behavior
- **Base (mobile first):** stacked layout with generous vertical rhythm.
- **≥ 480px:** increased horizontal padding and breathing room.
- **≥ 760px:** more spacious card rhythm and larger visual accents.
- **≥ 1024px:** split composition with sticky intro column and accordion list column.

## Reuse guidance
- Keep class names scoped to this package (`kp-accordion`, `kp-item`).
- Re-theme quickly by adjusting root variables in `accordion.css`:
  - `--bg`, `--text`, `--muted`, `--surface`, `--glow`.
- For multi-instance pages, duplicate the section markup; script auto-inits the first `[data-accordion]` instance. If needed, extend JS to loop through all instances.
