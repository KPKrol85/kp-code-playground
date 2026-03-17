# pricing-05

A standalone premium pricing section that combines plan comparison, trust/reassurance points, and an integrated FAQ to help users decide with confidence.

## Included files

- `pricing.html` – semantic section markup for intro, billing toggle, three pricing cards, trust row, and FAQ.
- `pricing.css` – mobile-first BEM styles with premium visual hierarchy and breakpoint behavior.
- `pricing.js` – progressive enhancement for billing mode switching and FAQ accordion disclosure behavior.

## Structure overview

- Root block: `.pricing-trust`
- Key elements:
  - `.pricing-trust__header`
  - `.pricing-trust__toggle`
  - `.pricing-trust__grid`
  - `.pricing-trust__card`
  - `.pricing-trust__faq`
  - `.pricing-trust__trust-list`

The section is self-contained and can be dropped into landing pages for SaaS, services, or digital products.

## Pricing data editing

Pricing values are driven by `data-*` attributes on each plan card:

- `data-monthly`
- `data-yearly`

Update these attributes on:

- `[data-price]` for numeric price
- `[data-period]` for period label
- `[data-savings]` for yearly savings copy
- `[data-meta]` for plan meta details (e.g., seats/storage variations)

The billing toggle button (`[data-billing-toggle]`) updates all cards without page reload.

## FAQ content editing

Each FAQ item uses:

- `.pricing-trust__faq-trigger` (button)
- `.pricing-trust__faq-panel` (answer panel)

When adding/removing items, keep unique `id` values and matching `aria-controls` / `aria-labelledby` relationships intact.

## Breakpoint behavior

Mobile-first with required breakpoints:

- `min-width: 480px` – stronger spacing and two-column trust list
- `min-width: 760px` – three-column pricing cards and improved section rhythm
- `min-width: 1024px` – side-by-side pricing and FAQ composition for premium desktop layout

## Accessibility and performance notes

- Semantic heading and section structure.
- Billing toggle uses `aria-pressed` state.
- FAQ uses accessible button + disclosure panel semantics.
- Focus-visible styles applied to all interactive controls.
- Decorative symbols are hidden from assistive tech where appropriate.
- Motion remains subtle and respects `prefers-reduced-motion`.
- No frameworks or external assets required.

## Reuse guidance

- Keep class names in strict BEM format (`pricing-trust__...`) when extending.
- Duplicate cards or FAQ items as needed while preserving data attributes and ARIA mappings.
- Adjust design tokens in `.pricing-trust` custom properties for quick theme alignment.
