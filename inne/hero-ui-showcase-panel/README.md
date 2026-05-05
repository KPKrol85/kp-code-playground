# Hero UI Showcase Panel

A compact KP_Code Digital Vault product presenting ten premium hero section variants in one vertical reference page. It is built as a standalone static asset using semantic HTML, modern CSS design tokens, and lightweight vanilla JavaScript enhancements.

## File Structure

```text
inne/hero-ui-showcase-panel/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Open Locally

1. Navigate to `inne/hero-ui-showcase-panel/`.
2. Open `index.html` directly in a browser.
3. Optionally serve with a basic local static server for easier anchor testing.

## Variant Organization

The showcase presents 10 hero patterns in a top-to-bottom flow:

1. Minimal SaaS Hero
2. Premium Agency Hero
3. Marketplace Hero
4. Creator / Personal Brand Hero
5. App Dashboard Hero
6. Legal / Trust Hero
7. Landing Page Conversion Hero
8. Dark Developer Tool Hero
9. Editorial Story Hero
10. Compact Mobile-First Hero

Each variant includes a label, name, short use-case description, and a framed hero preview for direct visual comparison.

## Usage Notes

- Copy the relevant hero block from `index.html` and its matching style patterns from `css/style.css`.
- Keep core token variables in `:root` and tune colors/spacing per brand system.
- Reuse the layout skeleton while replacing copy, CTA strategy, and trust elements for project context.
- Preserve semantic heading and CTA structure when adapting for production.

## Accessibility & Responsive Design

- Semantic landmarks (`header`, `main`, `section`, `footer`) and logical heading hierarchy are included.
- Variant navigation uses real anchor links and remains usable without JavaScript.
- JavaScript enhancements are progressive: active nav highlighting and copy-anchor actions do not block core browsing.
- Styles are mobile-first with breakpoints around 760px and 1024px, plus reduced-motion support via `prefers-reduced-motion`.
