# Header Pattern Library

This folder contains a reusable mini-library of five responsive, accessible header patterns built with semantic HTML5 and shared CSS.

## Contents

- `index.html` — preview page showing all header variants stacked for quick comparison.
- `headers.css` — shared design tokens, base styles, primitives, and variant styles (`.hdr--01` through `.hdr--05`).
- `header-01.html` — Minimal / Centered.
- `header-02.html` — Classic Business.
- `header-03.html` — Split Navigation (Premium).
- `header-04.html` — Hero Header (Marketing).
- `header-05.html` — App / SaaS.

## How to preview

1. Open `headers/index.html` in a browser.
2. Scroll through each variant section to compare layout and visual style.

## How to copy a header into another project

1. Copy `headers.css` into your project styles.
2. Open the header file you want (`header-01.html` ... `header-05.html`).
3. Copy the `<header>` markup into your page.
4. Keep BEM class names intact (`hdr`, `hdr__*`, `hdr--*`) so shared styles apply correctly.
5. Update links, logo text, and CTA labels for your brand.

## Responsive and naming notes

- Mobile-first breakpoints used in `headers.css`:
  - base (mobile)
  - `@media (min-width: 480px)`
  - `@media (min-width: 760px)`
  - `@media (min-width: 1024px)`
- Small screens use wrapping/stacked rows for logo, navigation, and actions.
- From `760px+`, each header moves toward a single-row layout when possible.
- BEM conventions:
  - Block: `.hdr`
  - Elements: `.hdr__inner`, `.hdr__brand`, `.hdr__nav`, `.hdr__actions`, etc.
  - Modifiers: `.hdr--01` ... `.hdr--05`
