# Footer Split CTA

A premium split-layout footer component that prioritizes final-page conversion while preserving clean, scannable navigation and legal structure for SaaS and digital product pages.

## Included files

- `index.html` – standalone demo page with a realistic pre-footer wrapper and one reusable split CTA footer component.
- `style.css` – component-scoped, mobile-first BEM-style styling and responsive breakpoints.
- `script.js` – minimal progressive enhancement for year injection and CTA feedback.

## Usage notes

1. Copy the three runtime files (`index.html`, `style.css`, `script.js`) into your project or port the footer markup into an existing layout.
2. Keep the footer `<script>` tag at the end of `<body>` (or use `defer`) so the enhancement code can attach after DOM availability.
3. Replace demo anchors with real route URLs while preserving semantic grouping and accessibility labels.

## Key features

- Split composition with a visually dominant conversion panel and a calm secondary navigation zone.
- Conversion-focused CTA with primary/secondary actions and reassurance trust notes.
- Grouped footer navigation: Product, Resources, Support, and Legal.
- Compact metadata row for year, edition/version note, and policy shortcuts.
- Footer-scoped interaction feedback using `aria-live="polite"`.

## Accessibility notes

- Uses semantic `<footer>`, sectioning, and labeled navigation groups.
- All controls are keyboard accessible with strong `:focus-visible` treatment.
- JavaScript enhancements are optional; core content and links remain available with JS disabled.
- Reduced-motion support is included via `prefers-reduced-motion`.

## Customization notes

- Update component-level custom properties on `.footer-split-cta` to theme colors, border styles, and focus accent.
- Tune CTA emphasis by adjusting `.footer-split-cta__conversion` background and button hierarchy.
- Rebalance navigation density by changing `.footer-split-cta__nav-grid` column behavior at breakpoints.

## KP_Code Digital Vault integration notes

- Keep class names stable for library-level consistency across footer packages.
- Recommended packaging metadata: category `footers`, variant `split-cta`, maturity `production-ready` after brand QA.
- Component is intentionally standalone and framework-agnostic for easy import into static sites, CMS pages, and JS stacks.
