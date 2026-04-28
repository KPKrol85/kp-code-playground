# Comparison Product Card

Comparison Product Card is a premium, standalone decision-support component for **KP_Code Digital Vault**. It helps users choose between product variants (such as Basic vs Pro or Single Product vs Bundle) with clear, honest information rather than upsell-heavy pricing tactics.

## Included files

- `index.html` – standalone preview page with three comparison card examples.
- `style.css` – scoped visual system, responsive layout, light/dark theme support, and focus/interaction styling.
- `script.js` – progressive enhancement for accessible per-card variant switching.
- `README.md` – usage and customization guidance.

## Recommended use cases

- Free vs Pro decisions
- Basic vs Premium cards
- Single product vs Bundle choice
- Starter vs Advanced product sections
- Decision-support product listings

## Component structure and behavior

Each comparison card includes:

- Product name
- Plan/version label
- “Best for” recommendation
- Exactly 3 included features
- 1–2 honest limitations
- Price or status label
- Primary CTA
- Secondary **Compare all** link

Variant controls use native buttons with `aria-pressed` and keyboard-friendly focus states. When users switch variants, only the selected card updates and a small `aria-live="polite"` message confirms the selection.

## Customization options

You can tailor the component by updating:

- Product name
- Plan/version labels
- Best for text
- Included features
- Honest limitations
- Price/status text
- CTA label
- Compare all link target
- Variant switching data in `script.js`

## Accessibility and UX notes

- Semantic `section`, `article`, `header`, and list markup for clear structure
- Honest limitations remain visible and readable in all states
- Keyboard-accessible variant switching and action controls
- Strong `:focus-visible` and `:focus-within` treatments
- Progressive enhancement: default variant content is available without JavaScript
- Mobile-first responsive behavior with flexible grid expansion on larger screens
- Dark mode support via `prefers-color-scheme`
- Reduced-motion support via `prefers-reduced-motion`

## Production guidance

Keep limitation copy visible and honest in production implementations. This pattern is designed to build trust by clarifying fit, tradeoffs, and next steps instead of hiding constraints.
