# Update Release Card

Update Release Card is a standalone premium product-card component for **KP_Code Digital Vault**. It is designed for changelog communication, release summaries, and maintenance confidence where customers need to quickly understand what changed, why the update matters, and what to do next.

## Included files

- `index.html` – standalone demo page with four realistic Digital Vault update cards.
- `style.css` – scoped visual system, responsive layout, changelog styling, dark mode, and reduced-motion handling.
- `script.js` – progressive-enhancement interactions for per-card changelog expansion and selected-update status.
- `README.md` – usage and customization guidance.

## Recommended use cases

- Product maintenance section
- Changelog preview
- Customer dashboard
- Update feed
- Download center update notice
- Release notes card

## Component capabilities

- Product-centric update header (product, version, date)
- One-sentence release summary
- 3 visible core changes per card
- 2 expandable changelog additions per card
- Change type labels (`New`, `Improve`, `Fix`, `Security`, `Docs`)
- Primary CTA for each release card
- Selected update state after CTA activation
- Live status message for selected product/version

## Customization options

You can tailor each card by updating:

- Product name
- Version number
- Update date label
- Release summary text
- Change type labels
- Visible change items (core list)
- Expanded change items (full changelog)
- CTA label text
- Expanded state behavior/text
- Selected state styling and messaging

## Accessibility and UX notes

- Semantic structure uses `section`, `article`, `header`, `ul`, `li`, native `button`, and `a` elements.
- Expand/collapse uses `aria-expanded` and `aria-controls` for each card independently.
- Change type information is readable text, not color-only cues.
- Keyboard users get explicit `:focus-visible` styles on toggle and CTA controls.
- Card-level `:focus-within` highlighting improves navigation clarity.
- Optional status feedback uses a scoped `aria-live="polite"` region.

## Responsive and theme behavior

- Mobile-first layout with single-column stacking on small screens.
- Two-column grid on medium+ screens when space allows.
- No fixed card heights; content remains readable including expanded details.
- Supports light theme by default plus dark mode through `prefers-color-scheme: dark`.
- Supports motion-sensitive users with `prefers-reduced-motion: reduce`.

## Progressive enhancement

Core release information and core change items are fully readable without JavaScript. JavaScript enhances behavior by:

- toggling each card’s full changelog independently,
- updating toggle labels (`Show full changelog` / `Hide full changelog`),
- maintaining `aria-expanded` state,
- marking one selected card after CTA activation,
- posting selected release confirmation into the live status region.

## Production integration note

This component demonstrates UI and interaction behavior only. Real product update actions, download delivery, version control checks, and account-specific release access should be connected to backend/product delivery logic in production.
