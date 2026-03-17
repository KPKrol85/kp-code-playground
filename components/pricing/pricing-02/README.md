# pricing-02 — comparison table

Reusable premium pricing comparison section for SaaS and technical product websites. The component uses semantic table markup, strict BEM naming, and progressive enhancement for monthly/yearly billing.

## Included files

- `pricing.html` — standalone semantic markup for intro, billing controls, comparison table, and trust note.
- `pricing.css` — mobile-first styling, premium visual treatment, and responsive behavior.
- `pricing.js` — lightweight billing toggle logic powered by `data-*` attributes.

## Structure overview

- Root block: `.pricing-compare`
- Header: `.pricing-compare__header` with eyebrow, heading, and intro text
- Billing controls: `.pricing-compare__controls` and `.pricing-compare__toggle`
- Matrix container: `.pricing-compare__table-wrap` with semantic `<table>`
- Plans: `.pricing-compare__plan` columns with name, description, pricing, savings, and CTA
- Feature rows: `.pricing-compare__group-row`, `.pricing-compare__feature`, `.pricing-compare__value`
- Footer note: `.pricing-compare__trust-note`

## Editing plans and feature rows

1. Update plan names, descriptions, CTAs, and prices in the header row (`<thead>`).
2. Keep each plan price on an element with `data-price`, and provide both `data-monthly` and `data-yearly` values.
3. For availability states, use:
   - included: check symbol with hidden assistive text
   - unavailable: muted dash with hidden assistive text
   - limited values: plain text (for example `5 apps`, `1 TB`)
4. Add or remove feature groups by inserting/removing a `.pricing-compare__group-row` and related body rows.

## Billing data editing

- Toggle buttons use `data-billing-trigger="monthly|yearly"`.
- Price nodes: `data-price data-monthly="$59" data-yearly="$47"`.
- Savings nodes: `data-savings data-monthly="" data-yearly="Billed yearly at $564"`.
- JavaScript updates price text, period labels, savings text, and billing helper copy without page reload.

## Responsive behavior

Mobile-first with breakpoints at:

- `min-width: 480px` — spacing and type scaling.
- `min-width: 760px` — sticky first column for easier cross-plan scanning while horizontally scrolling.
- `min-width: 1024px` — larger typography and spacing for desktop readability.

The table remains usable on narrow screens via horizontal overflow in `.pricing-compare__table-wrap`.

## Accessibility and performance notes

- Uses semantic heading hierarchy and real table semantics (`<th scope="row">`, grouped sections).
- Billing toggle uses button elements and `aria-pressed` state updates.
- Includes focus-visible styling for keyboard users.
- Decorative symbols are hidden from assistive tech with screen-reader-only labels.
- Honors `prefers-reduced-motion` by disabling transitions.
- No external dependencies, no external asset requirements.

## Reuse guidance

- Copy all four files into any project and include CSS + JS alongside the HTML section.
- Keep the `.pricing-compare` block namespace unchanged to preserve style/behavior encapsulation.
- Adjust copy, limits, and CTAs to fit product type while preserving clear plan hierarchy and scannable comparison rows.
