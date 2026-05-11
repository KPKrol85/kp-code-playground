# Hero Aurora Split

Hero Aurora Split is a standalone premium split-layout HERO package for service brands, studios, and portfolio-led businesses that need a high-trust first impression with editorial typography and atmospheric visual depth.

## Design use case

Use this HERO when a client needs:
- A premium service-led first fold.
- Strong headline + supporting proof points.
- A modern split composition combining message and visual authority.
- Subtle interaction polish that does not block usability.

## Files

- `index.html` — component selector panel for this package.
- `hero-aurora-split.html` — dedicated HERO implementation page.
- `style.css` — scoped visual system and responsive layout styles.
- `hero-aurora-split.js` — interactive behavior (reveal, parallax, tilt, CTA microinteraction).

## Reuse in another project

1. Copy the four implementation files into your project (`hero-aurora-split.html`, `style.css`, `hero-aurora-split.js`, and optionally `index.html` for library navigation).
2. Include `style.css` in the page `<head>`.
3. Place the HERO markup from `hero-aurora-split.html` in your target page.
4. Include `hero-aurora-split.js` before `</body>`.
5. Update copy, CTA links, and image asset as needed.

## Accessibility, responsive, and motion features

- Semantic landmarks and heading structure with a skip link for keyboard users.
- Keyboard-visible focus styles on interactive controls.
- Mobile-first layout that stacks naturally and shifts to split columns on tablet/desktop.
- Motion effects are subtle, non-blocking, and automatically reduced for users with `prefers-reduced-motion: reduce`.
- Selector guarding in JavaScript ensures graceful degradation if parts of the markup are missing.
