# Footer Social Proof Wall (ProofLayer)

A premium, standalone footer component package for KP_Code Digital Vault that turns the footer area into a trust and conversion layer.

## Purpose

This component is designed for marketing pages where the footer must do more than navigation. It combines social proof, credibility indicators, call-to-action clarity, and structured link architecture in one reusable block.

## Included files

- `index.html` – standalone demo page with one social-proof footer component
- `style.css` – component-scoped, mobile-first visual system and responsive layout
- `script.js` – progressive enhancement for current year, testimonial highlight state, and clipboard micro-action

## Key features

- Branded product identity for **ProofLayer**
- Compact testimonial wall with selectable highlight controls
- Metrics row for fast trust scanning
- Trust badge cluster focused on implementation credibility
- Conversion CTA block with primary and secondary actions
- Structured footer navigation groups: Product, Proof, Resources, Support, Legal
- Bottom meta row with edition label, disclaimer, and social links

## Accessibility notes

- Uses semantic `<footer>` and `<nav>` landmarks with clear group labels
- Uses native `<button>` elements for testimonial actions
- Applies `aria-pressed` for highlighted testimonial state
- Announces interaction feedback through `aria-live="polite"`
- Includes strong `:focus-visible` styles for keyboard navigation
- Keeps the component useful and readable with JavaScript disabled
- Includes reduced-motion support via `prefers-reduced-motion`

## Customization notes

- Update component tokens under `.proof-footer` in `style.css` for theming
- Replace demo testimonials/metrics with product-specific approved claims
- Point CTA and navigation links to real destination URLs
- Adjust breakpoint behavior at 480px, 760px, and 1024px based on host layout

## Demo social-proof disclaimer

All testimonials and outcomes in this package are demo content for UI evaluation and are not live third-party review integrations.

## Future KP_Code Digital Vault integration

- Extract `.proof-footer` into a shared package slot with tokenized color modes
- Map metrics and testimonial content to CMS fields after claim validation workflow
- Reuse testimonial action logic for other trust-focused component variants
