# Footer Editorial Magazine

A premium, standalone editorial-style footer component for blogs, technical magazines, newsletter-first publications, learning hubs, and content products.

## Included files

- `index.html` — complete standalone demo page with one footer component
- `style.css` — scoped, mobile-first component styling
- `script.js` — progressive enhancement (year injection, newsletter validation, copy-link micro-action)

## Usage notes

1. Open `index.html` directly in a browser.
2. Reuse the `<footer class="footer-magazine">...</footer>` block in your page layout.
3. Keep `style.css` and `script.js` linked, or merge with your bundle while preserving class names.

## Key features

- Editorial brand block and publication voice
- Latest article previews with metadata and reading time
- Topic chip navigation for content discovery
- Archive, editorial, resources, and legal navigation groups
- Newsletter subscribe panel with accessible feedback and validation
- Bottom metadata row with year, edition label, and social links
- Optional archive link copy micro-action

## Accessibility notes

- Uses semantic `<footer>`, `<section>`, `<nav>`, `<form>`, and article preview markup
- Newsletter input includes a persistent visible `<label>`
- Validation feedback announced through `aria-live="polite"`
- Input helper/feedback association via `aria-describedby`
- Keyboard-accessible buttons and links with visible `:focus-visible`
- Content and links remain useful when JavaScript is disabled

## Customization notes

- Adjust custom properties at `.footer-magazine` root for brand colors and tone
- Replace publication name, article links, nav labels, and social destinations
- Remove copy-link micro-action if not needed
- Tune breakpoints if your product uses a different content density

## Demo disclaimer

Newsletter submission and archive copy behavior are local UI demonstrations only. No backend integration, data persistence, or external content fetching is included.

## Future KP_Code Digital Vault integration

- Wrap as a package variant within the footer component library
- Map links/content to CMS-managed navigation when integrating
- Connect newsletter form to production API endpoint in host product
- Keep progressive enhancement behavior as a non-blocking UX layer
