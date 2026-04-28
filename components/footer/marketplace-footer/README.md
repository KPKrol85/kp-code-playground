# Marketplace Footer

A standalone premium footer component for **KP_Code Digital Vault** designed for digital product catalogs, marketplace landing pages, and commercial product collection pages.

## Purpose

This component helps users discover product categories quickly, feel confident about product trust and licensing, and access support/legal links without friction.

## File Structure

```
components/footer/marketplace-footer/
├── index.html   # Standalone preview with semantic marketplace-footer markup
├── style.css    # Scoped premium visual system and responsive layout
├── script.js    # Optional progressive enhancement (year + category chip active state)
└── README.md    # Component usage and customization notes
```

## Where to Use It

Use this footer in:

- Marketplace home/landing pages
- Product catalog and collection pages
- Commercial product pages for templates, kits, and downloadable assets

## Responsive Behavior

- **Mobile-first:** CTA and trust content appear before dense navigation for clearer scanning.
- **Tablet:** trust indicators and navigation groups organize into multi-column blocks.
- **Desktop:** marketplace-style composition with CTA/trust paneling, category and support/legal columns, and a compact bottom utility bar.

## Accessibility Notes

- Semantic `<footer>` root and labeled `<nav>` regions.
- Keyboard-accessible links and controls with visible `:focus-visible` styling.
- Reduced-motion handling through `prefers-reduced-motion`.
- JavaScript enhancement is optional and non-blocking.

## Customization Points

You can safely customize these values in `index.html` and `style.css`:

- Product category lists and popular category chips
- Support and legal navigation links
- Trust indicator labels
- CTA headline and action link copy
- Social/action links in the bottom bar
- Brand description and legal copy
- Theme tokens for color, spacing, border radius, and shadow
