# kp-code-digital-vault-cta-sections-kit

Premium KP_Code Digital Vault front-end kit with 10 responsive CTA section variants built using semantic HTML, CSS, and Vanilla JavaScript.

## Included files
- `index.html` — full showcase page with intro and 10 CTA sections.
- `css/style.css` — design tokens, layout styles, and isolated BEM blocks for `cta-01` through `cta-10`.
- `js/main.js` — progressive enhancement interactions (form validation, copy link, toggles, dismiss helper note).
- `README.md` — setup and usage notes.

## How to use
1. Open the project folder.
2. Double-click `index.html` (or serve with a basic static server).
3. Review each CTA section and copy the pattern you need.

## How to copy one CTA variant
1. Copy the chosen CTA HTML block from `index.html`.
2. Copy the matching CSS block namespace from `css/style.css` (for example all `.cta-06...` rules).
3. If that CTA uses interaction (`cta-03`, `cta-04`, `cta-05`, `cta-06`, `cta-08`), copy the related logic from `js/main.js`.
4. Update text, links, colors, and spacing tokens as needed.

## Accessibility notes
- Semantic sections and heading hierarchy.
- Skip link for keyboard and assistive tech users.
- Visible `:focus-visible` styles.
- Accessible form label and status region with `aria-live`.
- Keyboard-accessible buttons and toggles.
- Progressive enhancement: all CTAs remain meaningful without JavaScript.
- `prefers-reduced-motion` support.

## Customization notes
- Update global tokens in `:root` for brand colors and spacing.
- Each CTA variant is namespace-isolated (`cta-01` ... `cta-10`) for easy extraction.
- Mobile-first styles with breakpoint improvements at `48rem`.

## Suggested use cases
- SaaS free trial pages
- Service sales pages
- Product launches
- Newsletter growth sections
- Agency portfolio pages
- End-of-page final conversion CTA

## No-build usage
No dependencies, no bundler, no transpiler. Open directly in any modern browser.
