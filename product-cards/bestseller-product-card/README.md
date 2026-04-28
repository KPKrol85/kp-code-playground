# Bestseller Product Card

A standalone premium product-card component for **KP_Code Digital Vault** that highlights popular products with clear, believable social proof.

This package is designed for situations where visitors need quick confidence signals before clicking through:
- bestseller placements
- popular resources sections
- top products areas
- catalog highlights
- homepage product proof blocks

## Included Files

- `index.html` — standalone preview page with 4 reusable demo bestseller cards
- `style.css` — scoped styling, design tokens, responsive layouts, and light/dark themes
- `script.js` — progressive enhancement for selected-card status updates
- `README.md` — implementation and customization guide

## Component Structure

Each card includes:
- Bestseller badge
- Product name and short description
- Social proof metrics (rating/satisfaction, downloads/sales/usage, price/status)
- Primary CTA
- Short trust note

## Customization Options

You can update each card instance with your own content:
- Bestseller badge text
- Product name
- Product description
- Rating or satisfaction score
- Downloads, sales, or usage count
- Price or status label
- CTA label
- Trust note
- Selected state messaging (`data-product-name`, `data-key-metric`)

## Accessibility and UX Notes

- Semantic card structure using `<article>` and clear heading hierarchy
- Readable metric values presented as plain text
- Visible keyboard support via `:focus-visible` and `:focus-within`
- Responsive behavior for mobile, tablet, and large desktop grids
- Dark mode support through `prefers-color-scheme`
- Reduced-motion support through `prefers-reduced-motion`
- Progressive enhancement: selection feedback works with JavaScript, while all core content remains available without it

## Production Note

The social-proof values in the demo are intentionally realistic placeholders. Replace them with **real KP_Code Digital Vault product metrics** in production to maintain trust and commercial credibility.
