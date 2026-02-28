# Footer Pattern Library

## What this folder contains
This folder is a mini-library of five reusable, responsive footer variants built with semantic HTML5 and a shared CSS file.

- `index.html` — preview page showing all variants stacked for side-by-side comparison.
- `footers.css` — shared design tokens, layout helpers, footer primitives, variant styling, and focus states.
- `footer-01.html` to `footer-05.html` — standalone footer examples that each link to `./footers.css`.

## How to open the preview
1. Open `footers/index.html` in any browser.
2. Scroll through all five footer demos.

## How to copy a chosen footer into a project
1. Pick one of `footer-01.html` through `footer-05.html`.
2. Copy the `<footer>` block into your page template.
3. Copy `footers.css` into your project stylesheet folder.
4. Keep the BEM class names intact (`.ftr`, `.ftr__*`, `.ftr--0*`) to preserve shared styles and variant overrides.
5. Update brand text, links, and contact details.

## Responsive and naming notes
- Mobile-first breakpoints used in `footers.css`:
  - base
  - `@media (min-width: 480px)`
  - `@media (min-width: 760px)`
  - `@media (min-width: 1024px)`
- Layout behavior:
  - Mobile stacks columns vertically.
  - At `760px+`, relevant variants switch to multi-column layouts.
  - At `1024px+`, spacing expands and selected sections gain wider layouts.
- Class naming follows BEM convention:
  - Block: `.ftr`
  - Elements: `.ftr__brand`, `.ftr__cols`, etc.
  - Modifiers: `.ftr--01` through `.ftr--05`

## Newsletter form accessibility
`footer-03.html` includes a newsletter form with:
- a semantic `<form>` element,
- a proper `<label>` connected to `<input type="email">`,
- keyboard-visible focus states,
- a real submit `<button>` (no JavaScript required).
