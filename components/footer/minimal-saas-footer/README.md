# Minimal SaaS Footer

A standalone, premium footer component for **KP_Code Digital Vault** product pages. This variant is designed for lightweight SaaS landing pages, calculators, trackers, and small tool pages where the footer should feel trustworthy and polished without becoming visually heavy.

## File structure

```text
minimal-saas-footer/
├── index.html   # component preview and semantic footer markup
├── style.css    # scoped visual system, responsive layout, and interaction states
├── script.js    # optional progressive enhancement (current year)
└── README.md
```

## When to use this footer

Use this footer when you need:

- A clean, neutral component for product-focused pages.
- Compact link groups and legal/navigation clarity.
- Subtle premium styling through spacing, typography, and restrained interaction states.
- A standalone asset that can be dropped into static HTML pages with no dependencies.

## Responsive behavior

- **Mobile (default):** Stacked composition with brand content first and navigation groups below.
- **Tablet (≥ 48rem):** Increased breathing room and bottom utility row shifts to horizontal alignment.
- **Desktop (≥ 64rem):** Brand block on the left, compact navigation groups aligned on the right.

## Accessibility and interaction notes

- Uses semantic `<footer>` and grouped `<nav>` regions with clear `aria-label` values.
- Includes visible `:focus-visible` treatment for keyboard users.
- Hover and focus states are subtle and non-distracting.
- Respects `prefers-reduced-motion`.
- JavaScript is optional; component remains fully usable if `script.js` is removed.

## Customization points

You can safely customize the component by editing:

- **Brand text:** `.msf-footer__brand-name` and `.msf-footer__summary` content in `index.html`.
- **Link groups:** headings and list items in each `.msf-footer__nav` block.
- **CTA label/link:** `.msf-footer__cta` text and `href`.
- **Social/action links:** `.msf-footer__utility` list items.
- **Copyright text:** static label in `.msf-footer__copyright`; year is auto-set by `script.js`.
- **Theme values:** color, spacing, typography, and transitions via `:root` custom properties in `style.css`.
