# Header UI Showcase Panel

A compact KP_Code Digital Vault frontend product that presents 10 polished header/navigation directions in one vertically organized showcase page.

## File Structure

```text
inne/header-ui-showcase-panel/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Open Locally

1. Open `inne/header-ui-showcase-panel/index.html` directly in any modern browser.
2. No build step or dependencies are required.

## Variant Organization

The showcase includes 10 sections in this order:

1. Minimal SaaS Header
2. Premium Agency Header
3. Marketplace Header
4. Creator / Personal Brand Header
5. App Dashboard Top Bar
6. Legal / Trust Header
7. Landing Page Split Header
8. Dark Developer Tool Header
9. Centered Editorial Header
10. Compact Mobile-First Header

Each section includes a short use-case summary and a framed live HTML preview.

## Usage Notes

- Copy an individual header block from `index.html` into your project.
- Keep class names intact to retain behavior and styling consistency.
- Adapt design tokens in `css/style.css` (`:root` variables) to match your brand system.
- Reuse the compact menu utilities from `js/main.js` for mobile toggles and global close patterns.

## Accessibility Notes

- Mobile menu buttons use `aria-expanded` and `aria-controls`.
- Menus remain usable with JavaScript disabled in base layout.
- Escape key closes open menus.
- Outside click closes open menus to reduce focus confusion.
- Focus-visible states are provided for links, buttons, and input fields.
- Reduced motion users are respected via `prefers-reduced-motion` handling.
