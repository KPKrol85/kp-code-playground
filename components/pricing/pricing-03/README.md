# pricing-03 — Minimal / Editorial Pricing

A standalone premium pricing section designed for calm, typography-led landing pages in boutique, hospitality, lifestyle, and premium service contexts.

## Included files

- `pricing.html` — semantic section markup with header, billing toggle, three plan cards, and trust row.
- `pricing.css` — mobile-first styling using strict BEM classes and restrained editorial aesthetics.
- `pricing.js` — progressive enhancement for monthly/yearly pricing updates.

## Structure overview

- Root block: `.pricing-editorial`
- Major elements:
  - `.pricing-editorial__header`
  - `.pricing-editorial__toggle`
  - `.pricing-editorial__grid`
  - `.pricing-editorial__card`
  - `.pricing-editorial__trust`
- Featured plan modifier: `.pricing-editorial__card--featured`

## Editing pricing data

Pricing values are controlled in `pricing.html` through `data-*` attributes on each plan card:

- `data-monthly` and `data-yearly` on `.pricing-editorial__price`
- `data-monthly` and `data-yearly` on `.pricing-editorial__period`
- `data-monthly` and `data-yearly` on `.pricing-editorial__savings`
- `data-monthly` and `data-yearly` on `.pricing-editorial__meta`

To update pricing, edit those values only; `pricing.js` reads and swaps them automatically.

## Breakpoint behavior

Mobile-first with fixed breakpoints:

- Base: stacked cards and compact spacing.
- `min-width: 480px`: improved spacing and 2-column trust row.
- `min-width: 760px`: 3-column card grid and balanced trust layout.
- `min-width: 1024px`: editorial desktop composition with intro content offset from pricing area.

## Accessibility and performance notes

- Semantic headings and section structure.
- Billing controls are native buttons with `aria-pressed` state.
- Visible `:focus-visible` states on interactive controls.
- Decorative bullets are hidden from assistive tech with `aria-hidden="true"`.
- Motion remains subtle and respects `prefers-reduced-motion`.
- No external libraries or heavy visual effects.

## Reuse guidance

- Copy all four files into a project and include CSS + JS alongside the HTML section.
- Keep class names unchanged to preserve styling and behavior.
- Adjust copy, plan metadata, and trust notes to fit each brand voice.
- Use one featured plan at most for restrained premium emphasis.
