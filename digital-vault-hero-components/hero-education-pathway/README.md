# Hero Education Pathway

A standalone premium HERO package for digital education products such as academies, online courses, bootcamps, cohort programs, and mentorship-based learning offers.

## Use case

This HERO pattern is designed for education and training products that need to communicate:

- Structured learning progression
- Credible and motivating outcomes
- Interactive curriculum visibility
- Student proof and confidence cues

## File structure

- `index.html` — KP_Code Digital Vault selector panel with access to this HERO.
- `hero-education-pathway.html` — dedicated HERO page with full educational experience.
- `style.css` — scoped package styling for layout, palette, typography, and responsiveness.
- `hero-education-pathway.js` — interactive learning path, lesson preview swapping, progress updates, and reveal behavior.
- `README.md` — package documentation and reuse guide.

## JavaScript interactions

`hero-education-pathway.js` includes progressive enhancement behavior:

1. **Learning path step selector** using native `<button>` elements.
2. **Dynamic lesson preview updates** (title, description, and outcomes list).
3. **Progress indicator sync** with `aria-valuenow` and `aria-valuetext` updates.
4. **Keyboard support** for left/right arrow navigation across steps.
5. **Reveal animations** with `IntersectionObserver` and fallback behavior.
6. **Reduced motion support** via `prefers-reduced-motion` handling.

All selectors are guarded to keep runtime behavior defensive in partial integration contexts.

## Reuse instructions

1. Copy the entire `hero-education-pathway` folder into your project.
2. Keep file names and relative paths unchanged, or update links/script references if renamed.
3. Load `style.css` and `hero-education-pathway.js` with the `hero-education-pathway.html` markup.
4. Customize copy, step labels, and lesson data in `hero-education-pathway.js` to match your curriculum.
5. Preserve scoped class names (`hero-education-pathway-*`) to avoid style collisions.

This package has no external dependencies and is suitable for static hosting or inclusion in larger design systems.
