# Hero 02 - Structured Commercial Premium Hero

A reusable, mobile-first hero component built with semantic HTML, strict BEM CSS, and lightweight vanilla JavaScript.

## Files

- `hero.html` - Complete standalone hero markup with inline SVG scene placeholders.
- `hero.css` - Mobile-first responsive styling with breakpoints at 480px, 760px, and 1024px.
- `hero.js` - Progressive enhancement for subtle floating media-card motion.

## Key features

- Strict BEM naming (`hero-02__*`) for scalability and easy portability.
- Structured two-column layout with clear content hierarchy and practical CTA framing.
- Scene-style SVG placeholder artwork (dashboard/travel planning visual) rather than abstract-only decoration.
- Optional floating detail cards for commercial context (forecast + route insight).
- Reduced-motion support: animation is disabled when `prefers-reduced-motion: reduce` is set.
- Focus-visible and hover states for polished interaction behavior.

## Usage

1. Copy all files from this folder into your destination project.
2. Keep `hero.css` and `hero.js` linked from `hero.html` (or merge into your pipeline).
3. Replace text, links, and metadata values to match your brand and product context.
4. Swap the inline SVG illustration with your final media while keeping the same wrapper classes for layout consistency.

## Responsive behavior

- **Base (mobile):** stacked content and media with comfortable tap targets.
- **>= 480px:** denser meta/media grid behavior.
- **>= 760px:** balanced two-column hero layout.
- **>= 1024px:** enhanced spacing and floating card overlays for premium composition.
