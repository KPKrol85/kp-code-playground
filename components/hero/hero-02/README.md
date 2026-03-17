# Hero 02 · Cinematic Layered Premium

Reusable premium hero component built with semantic HTML, mobile-first CSS, and progressive-enhancement vanilla JavaScript.

## Files

- `hero.html` – component markup and inline SVG scene placeholder
- `hero.css` – mobile-first styles and responsive breakpoints
- `hero.js` – subtle pointer-responsive spotlight and layered card drift effect

## Features

- Strict BEM naming with `hero-02` block namespace
- Content-first structure with strong headline, CTA group, and trust row
- Scene-oriented media area with layered SVG placeholder illustration
- Floating metadata cards for cinematic depth
- Breakpoints at:
  - base (mobile)
  - `min-width: 480px`
  - `min-width: 760px`
  - `min-width: 1024px`
- Progressive enhancement only:
  - motion effect activates when JavaScript is available
  - effect is disabled when `prefers-reduced-motion: reduce` is enabled

## Usage

1. Open `hero.html` directly, or copy the `<section class="hero-02">...</section>` block into your project page.
2. Include `hero.css` in your stylesheet bundle.
3. Include `hero.js` at the end of the page body.
4. Replace copy, CTA links, and trust items as needed.

## Notes

- All visual media is SVG-based placeholder art; no raster assets are required.
- Designed to be adaptable for premium travel, hospitality, editorial, SaaS, and luxury portfolio contexts.
