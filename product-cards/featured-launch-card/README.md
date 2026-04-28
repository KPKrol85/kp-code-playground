# Featured Launch Card

Featured Launch Card is a premium, launch-focused product card component for KP_Code Digital Vault. It is designed to spotlight one important digital product release with confident messaging, strong CTAs, and a polished preview composition.

## Included files

- `index.html` – standalone demo page with two realistic featured-launch examples
- `style.css` – scoped styling, design tokens, responsive layout, themes, and interaction states
- `script.js` – progressive enhancement for gentle pointer-based preview shine/parallax
- `README.md` – usage and customization guidance

## Recommended use cases

- Homepage featured product module
- Product-of-the-month highlight
- Catalog top section spotlight
- Product release promo block

## Customization options

You can easily adapt each launch card by updating:

- Badge text (`New Release`, `Featured Launch`, etc.)
- Product title
- Product description
- Three benefit points
- Price or status messaging
- Primary and secondary CTA labels/targets
- Preview mockup composition (panels, labels, metrics, abstract blocks)

## Accessibility and UX notes

- Semantic card structure with `article`, `header`, and real `ul/li` benefit lists
- Clear CTA labels using real links
- Decorative preview visuals are marked as non-essential where appropriate via `aria-hidden`
- Strong visible `:focus-visible` styles for keyboard navigation
- Layout and content remain usable if JavaScript is unavailable

## Responsive behavior

- Mobile-first architecture
- On small screens, content and preview stack vertically with tap-friendly actions
- On wider screens, cards switch to an asymmetric two-column layout with value copy on the left and visual mockup on the right

## Theme and motion support

- Premium light theme by default
- Automatic dark mode via `prefers-color-scheme: dark`
- Reduced-motion support via `prefers-reduced-motion: reduce`
- Pointer-based preview effect is disabled for reduced-motion users
