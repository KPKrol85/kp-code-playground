# Accordion 02 (Editorial Card FAQ)

A reusable premium FAQ/accordion built with semantic HTML, mobile-first CSS, and scoped vanilla JavaScript.

## Files

- `accordion.html` – standalone markup demo with realistic FAQ content.
- `accordion.css` – component styles using strict BEM naming and responsive breakpoints.
- `accordion.js` – lightweight interaction logic for open/close behavior.

## Features

- Strict BEM naming (`accordion-02__*`).
- Accessible trigger/panel relationships via `aria-expanded`, `aria-controls`, `id`, and `role="region"`.
- Keyboard-friendly interaction using native `<button>` elements.
- Single-open item behavior (opening one item closes the others).
- Polished editorial card style with refined borders, subtle shadows, and layered surfaces.
- SVG indicator icons for plus/minus states.
- Reduced-motion support via `prefers-reduced-motion`.

## Responsive breakpoints

- Base (mobile)
- `@media (min-width: 480px)`
- `@media (min-width: 760px)`
- `@media (min-width: 1024px)`

## Usage

1. Copy the folder into your project.
2. Include `accordion.css` in your page.
3. Include `accordion.js` before `</body>`.
4. Reuse or duplicate `.accordion-02__item` blocks and keep unique `id` / `aria-controls` pairings.

## Notes

- The first FAQ item is expanded by default for immediate content visibility.
- The design direction intentionally differs from product-heavy styles by using softer card treatment and editorial rhythm.
