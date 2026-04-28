# Editorial Product Card

Component 09 for the **KP_Code Digital Vault** product-cards category.

This package provides a premium, editorial-style card system for positioning knowledge products as practical, high-value resources rather than plain downloads. It emphasizes structure, readability, and trust with clear material type labels, stronger descriptions, resource metadata, and calm call-to-action patterns.

## Included files

- `index.html` – standalone demo page with reusable editorial product card markup
- `style.css` – scoped editorial design system, layout, responsive behavior, dark mode, and motion preferences
- `script.js` – progressive enhancement that marks one selected/previewed resource and updates live status
- `README.md` – usage and customization guide

## Recommended use cases

Use this component for Digital Vault products such as:

- Guides
- Checklists
- Client briefs
- Audit templates
- Knowledge products
- Educational resources

## What each card includes

- Material type (Guide, Checklist, Brief, Audit)
- Editorial title
- Rich 2–3 line description
- Structure metadata (sections/pages/points)
- Target audience metadata
- File format metadata
- Primary CTA (`Read preview` or `Get template`)

## Customization options

You can customize each card by editing:

- Material type label
- Title
- Description copy
- Sections/points/page count
- Target audience text
- File format text
- CTA label
- Selected/previewed state (via `.is-selected` class and JS behavior)

## Accessibility and behavior

- Semantic layout with `section`, `article`, `header`, and metadata using `dl` / `dt` / `dd`
- Keyboard-friendly interactions with visible `:focus-visible` and card `:focus-within` states
- Selected state includes both text and style changes (not color-only)
- `aria-live="polite"` status update announces selected resource after CTA activation
- Fully readable and usable without JavaScript

## Responsive and theming support

- Mobile-first design with a single-column stack on small screens
- Two-column editorial grid on medium screens and refined spacing on larger displays
- Premium light theme by default
- Dark mode support through `prefers-color-scheme: dark`
- Reduced-motion support through `prefers-reduced-motion: reduce`

## Integration notes

- Open `index.html` directly in a browser for local preview
- No frameworks, dependencies, or build tools are required
- Keep class names scoped to the `editorial-card` pattern for portability
