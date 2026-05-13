# Footer Minimal SaaS

A premium, lightweight, standalone footer component package for modern SaaS and product websites. This footer emphasizes clarity, typography, and conversion without adding visual heaviness.

## Included files

- `index.html` — standalone demo page and semantic footer markup
- `style.css` — scoped, mobile-first styles with design tokens and responsive layout
- `script.js` — progressive enhancement for current year, CTA micro-feedback, and mobile-friendly nav group behavior
- `README.md` — package usage and customization guidance

## Key features

- Editorial, minimal SaaS visual style
- Strong brand block with product positioning copy
- Compact CTA area with two conversion actions: **Start free** and **Book demo**
- Grouped footer navigation:
  - Product: Features, Pricing, Integrations, Security
  - Resources: Docs, Blog, Guides, Changelog
  - Company: About, Contact, Careers
- Legal/meta row with Privacy, Terms, Cookies
- Subtle release badge for product metadata

## Accessibility notes

- Uses semantic `footer`, `section`, `nav`, list, and heading structure
- Mobile collapsible groups use native `<details>/<summary>` controls for keyboard and assistive technology compatibility
- Visible `:focus-visible` treatment for keyboard users
- `aria-live="polite"` feedback region announces CTA interaction updates
- Strong contrast palette and restrained interactive states
- `prefers-reduced-motion: reduce` support included

## Responsive behavior

- **Mobile-first (default):** stacked layout, collapsible nav groups
- **≥ 480px:** improved spacing and CTA rhythm
- **≥ 760px:** side-by-side brand/CTA with multi-column nav
- **≥ 1024px:** balanced wide footer container and bottom-row alignment

## Usage notes

1. Open `index.html` directly in a browser for local preview.
2. Reuse the `.nv-footer` block in your project page layout.
3. Keep class names scoped to preserve component isolation.
4. Update brand copy, links, and CTA destinations to match production context.

## Customization

- Adjust visual identity via CSS custom properties in `:root` (colors, spacing, typography, motion)
- Replace demo links with real routes
- Modify or remove the release note badge depending on product lifecycle use case
- Keep JavaScript minimal; remove CTA prevention logic if using real destination URLs/forms
