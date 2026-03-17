# Pricing 01 (Premium Plans Component)

A reusable premium pricing section built with semantic HTML, mobile-first CSS, and progressive-enhancement vanilla JavaScript.

## Includes

- Premium section header with eyebrow, title, and intro text
- Accessible monthly/yearly billing toggle
- Three realistic plan cards (Starter, Growth, Enterprise)
- Featured-plan treatment for conversion emphasis
- SVG feature icons and trust/disclaimer rows
- Smooth, reduced-motion-aware interactions

## File structure

```text
components/
└── pricing/
    └── pricing-01/
        ├── pricing.html
        ├── pricing.css
        ├── pricing.js
        └── README.md
```

## Reuse instructions

1. Copy the entire `pricing-01` folder into your project.
2. Include `pricing.css` in your page and load `pricing.js` after the pricing markup.
3. Paste the section from `pricing.html` where the component should render.

## Editing plans and prices

- Plan names, descriptions, features, and CTA labels are plain text in `pricing.html`.
- Update prices using the `data-monthly` and `data-yearly` attributes on each `.pricing__price-value`.
- Update monthly/yearly supporting billing notes in `metaContent` inside `pricing.js`.

## Toggle behavior

- The toggle button uses `role="switch"` and `aria-checked` for accessible state.
- JavaScript reads each plan's `data-monthly` and `data-yearly` values.
- On switch, it updates:
  - visible plan prices
  - period labels
  - billing meta text
  - savings badge text
  - active billing-label styling

## Initialization notes

No configuration is required. The script auto-initializes when a `[data-pricing-toggle]` block is present.
