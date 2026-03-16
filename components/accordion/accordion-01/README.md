# Accordion 01 · Premium FAQ

A reusable, mobile-first premium FAQ accordion component built with semantic HTML, strict BEM naming, polished CSS, and lightweight vanilla JavaScript.

## Files

- `accordion.html` — full semantic FAQ section markup
- `accordion.css` — premium visual system, responsive layout, and motion tuning
- `accordion.js` — accessible single-open accordion interactions

## Highlights

- Strict BEM naming for easy reuse and extension
- Semantic structure with `button` triggers and region panels
- Accessible state wiring via `aria-expanded`, `aria-controls`, and `aria-labelledby`
- Mobile-first with breakpoints at `480px`, `760px`, and `1024px`
- Refined visual style: elegant spacing, layered surfaces, subtle depth, and restrained motion
- SVG icon indicator with smooth open/close state transitions
- Reduced motion support via `prefers-reduced-motion`

## Usage

1. Copy the folder into your project.
2. Include the stylesheet in your page head:

```html
<link rel="stylesheet" href="accordion.css" />
```

3. Place the accordion markup where needed.
4. Load the script near the end of the body:

```html
<script src="accordion.js"></script>
```

## Customization Tips

- Update colors and depth through `:root` custom properties in `accordion.css`.
- Replace FAQ copy while preserving the trigger/panel id relationships.
- Duplicate `.accordion__item` blocks for more entries.
- For multi-open behavior, remove the loop that closes sibling items in `accordion.js`.
