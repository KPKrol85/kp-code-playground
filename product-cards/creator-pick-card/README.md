# Creator Pick Card

Creator Pick Card is a standalone premium product-card component for **KP_Code Digital Vault**. It highlights products that are personally curated by KP_Code, adding a human recommendation layer focused on trust, clarity, and practical product value.

## Role in KP_Code Digital Vault

Use this component when you want product discovery to feel editorial and confident, without aggressive marketing language. Each card combines:

- Creator pick badge
- Product name and description
- Recommendation quote from KP_Code
- KP_Code monogram/avatar (CSS-only)
- Product tags
- Clear CTA

## Included files

- `index.html` — Standalone demo page with intro copy and four reusable Creator Pick Card examples.
- `style.css` — Scoped, token-driven styles with light/dark themes, responsive layout, motion preferences, and interaction states.
- `script.js` — Progressive enhancement for selecting an active creator pick and announcing updates through aria-live.
- `README.md` — Usage and customization documentation.

## Recommended use cases

- Recommended product sections
- Homepage curated picks
- Picked by KP_Code blocks
- Featured catalog areas
- Trust-building product discovery sections

## Customization options

You can safely customize the component by editing:

- Creator badge text
- Product name
- Product description
- Recommendation quote
- KP_Code monogram/avatar initials and style
- Product tags
- CTA label
- Selected/active pick state styling and status message copy

## Accessibility and behavior notes

- Semantic `article` cards with proper heading levels.
- Recommendation content is wrapped in `blockquote`.
- Tags use list semantics.
- Clear CTA labels and strong `:focus-visible`/`:focus-within` styles.
- Selected state is communicated through text and structure, not only color.
- Includes `aria-live="polite"` status updates for active pick selection.
- Fully readable and usable without JavaScript.

## Responsive and visual support

- Mobile-first layout with a single-column stack on small screens.
- Two-column layout on medium screens.
- Auto-fit multi-column layout on large screens.
- Premium light theme by default.
- Dark mode support via `prefers-color-scheme: dark`.
- Reduced motion support via `prefers-reduced-motion: reduce`.

