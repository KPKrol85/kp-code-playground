# Vault Product Card

Vault Product Card is a standalone, reusable baseline card component for the **KP_Code Digital Vault** catalog grid. It is designed to present digital products clearly and quickly with a premium SaaS-like visual style.

## Purpose

Use this component as the default product card pattern in the Product Cards category. Each card communicates:

- product type (badge)
- product name
- short value description
- key tags
- price or status
- primary CTA
- secondary "View details" link

## Included files

- `index.html` — standalone preview page with a responsive grid and three example cards
- `style.css` — scoped design tokens, card styles, responsive behavior, dark mode, and motion preferences
- `script.js` — minimal progressive enhancement for live status updates when "View details" is clicked
- `README.md` — usage and customization notes

## Recommended use cases

- KP_Code Digital Vault catalog pages
- Product listing grids on marketing pages
- Resource library cards (UI kits, templates, checklists, starter packs)

## Accessibility notes

- Semantic structure uses `main`, `section`, and `article`
- Native `button` and `a` elements are used for interactions
- `:focus-visible` styles are applied to interactive controls and card focus context
- Optional `aria-live="polite"` region announces selected product details for keyboard and screen reader users
- Component remains functional if JavaScript is disabled

## Responsive behavior

- Mobile-first single-column grid by default
- Two-column layout on medium viewports
- Three-column layout on wide viewports
- Flexible card height based on content while preserving visual rhythm

## Customization quick guide

1. **Product data:** update card badge, title, description, and `data-product-*` attributes in `index.html`.
2. **Tags:** edit the list items inside `.vault-card__tags`.
3. **Price/status:** change `.vault-card__price` content (e.g., `Free`, `$19`, `Coming soon`).
4. **CTA text:** adjust `.vault-card__cta` button labels per product intent.
5. **Theme tuning:** tweak CSS custom properties in `:root` for colors, spacing, radius, and shadows.

