# pricing-01 — classic premium cards

A standalone, reusable premium pricing section featuring a clear three-plan hierarchy, monthly/yearly billing toggle, trust signals, and polished responsive behavior for product marketing pages.

## Included files

- `pricing.html` — semantic standalone section markup.
- `pricing.css` — mobile-first styles with strict BEM naming.
- `pricing.js` — lightweight progressive-enhancement billing toggle logic.
- `README.md` — implementation and reuse guidance.

## Structure overview

- Root component block: `.pricing-premium`
- Header and intro: `.pricing-premium__header`, `.pricing-premium__eyebrow`, `.pricing-premium__title`, `.pricing-premium__subtitle`
- Billing controls: `.pricing-premium__billing`, `.pricing-premium__toggle`
- Cards layout: `.pricing-premium__cards`
- Card elements: `.pricing-premium__card`, `.pricing-premium__badge`, `.pricing-premium__price`, `.pricing-premium__features`, `.pricing-premium__cta`
- Trust details: `.pricing-premium__trust`

## Editing pricing values

All billing values are configured via `data-*` attributes in `pricing.html`:

- `data-monthly`
- `data-yearly`

These attributes are used on price, billing period, savings, and plan meta nodes:

- `[data-price]`
- `[data-period]`
- `[data-savings]`
- `[data-meta]`

To adjust plans, update the `data-monthly` / `data-yearly` strings per node. The JavaScript swaps the text content on toggle without reload.

## Breakpoint behavior

Mobile-first breakpoints:

- Base: stacked cards and compact spacing.
- `@media (min-width: 480px)`: larger spacing and card padding.
- `@media (min-width: 760px)`: three-column card grid and improved rhythm.
- `@media (min-width: 1024px)`: full desktop polish with expanded typography and spacing.

## Accessibility and performance notes

- Uses semantic heading structure and list markup.
- Billing toggle uses `role="switch"` and `aria-checked` state updates.
- Interactive controls include `:focus-visible` treatment.
- Decorative check icons are hidden from assistive tech with `aria-hidden="true"`.
- Motion is restrained and reduced under `prefers-reduced-motion`.
- No dependency on frameworks or external assets.

## Reuse guidance

1. Copy all four files into your project.
2. Include `pricing.css` and `pricing.js` with `pricing.html`.
3. Keep the `.pricing-premium` block and descendant classes unchanged to preserve component behavior.
4. Edit plan copy and `data-*` values to match your pricing strategy.
5. Use `.pricing-premium__card--featured` on the primary conversion plan.
