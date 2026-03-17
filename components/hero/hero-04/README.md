# Hero 04 — Boutique Editorial Premium Hero

A reusable premium hero component for lifestyle, boutique retail, and curated commerce experiences.

## Files

- `hero.html` — Semantic hero markup and inline SVG scene placeholder
- `hero.css` — Mobile-first BEM styles, responsive layout, and premium visual system
- `hero.js` — Progressive enhancement spotlight effect tied to pointer position

## Features

- Strict BEM naming (`hero-04__*`)
- Mobile-first responsive design
- Breakpoints at `480px`, `760px`, and `1024px`
- Premium editorial layout with:
  - Collection eyebrow
  - Strong headline and supporting copy
  - Primary + secondary CTA pair
  - Collection metadata row
  - Rich SVG lifestyle media scene
  - Floating editorial and product detail cards
- Subtle spotlight interaction in media area
- `prefers-reduced-motion` support

## Usage

1. Copy the `hero-04` folder into your project.
2. Include `hero.css` in your page `<head>`.
3. Place `hero.html` markup where the hero should render.
4. Load `hero.js` before `</body>`.

## Notes for reuse

- Replace textual content (eyebrow, headline, metadata, CTAs) to fit your brand.
- Replace or edit the SVG scene in `.hero-04__scene` for campaign-specific direction.
- Keep class names unchanged to preserve styling and behavior.
