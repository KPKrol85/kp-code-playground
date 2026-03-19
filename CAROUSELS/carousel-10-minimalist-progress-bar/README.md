# Minimalist Progress Bar Carousel

A premium standalone carousel package for clean-tech storytelling, SaaS product launches, concept decks, and dashboard-style hero sections. The interaction identity is built around a segmented progress rail instead of conventional arrow or dot-heavy controls.

## Concept

This carousel uses a quiet, editorial presentation with dark premium styling, strong spacing, technical numbering, and a segmented progress system that doubles as the primary navigation surface. The progress rail communicates timing, slide position, and direct selection in one refined control layer.

## Interaction model

- Timed progression is synchronized with the active progress segment using `requestAnimationFrame` for precise fill updates.
- Clicking a progress segment jumps directly to that slide.
- Internal previous/next logic powers CTA buttons, keyboard navigation, autoplay progression, and swipe gestures.
- Hover, focus within, pointer hold, off-screen visibility, document visibility changes, manual pause, and reduced-motion preference all stop autoplay appropriately.
- Autoplay resumes only when the carousel is visible and no active interaction should keep it paused.

## Accessibility

- Semantic `section`, `article`, button, and link structure.
- `aria-label` on the carousel region and progress controls.
- Visually hidden `aria-live="polite"` region for concise slide announcements.
- Keyboard support for `ArrowLeft`, `ArrowRight`, `Home`, and `End`.
- Visible `:focus-visible` treatment and motion-safe fallback with reduced-motion support.
- Timed progression can be paused manually and does not continue while focus is inside the component.

## Responsive behavior

- Mobile-first structure with responsive slide stacking.
- Progress navigation remains readable and tappable across small screens.
- Viewport height is stabilized with CSS plus `ResizeObserver`-assisted sizing to reduce layout shifts.
- Touch devices get native swipe support through pointer events in vanilla JavaScript.

## File structure

- `index.html` — semantic standalone markup and demo content.
- `style.css` — scoped visual system, layout, motion, and responsive styling.
- `script.js` — modular multi-instance carousel behavior, timing sync, observers, and event hooks.
- `README.md` — package overview and customization notes.

## Customization

- **Slide count:** duplicate or remove `.mpb-slide` blocks and matching `.mpb-progress-segment` buttons in `index.html`.
- **Timing:** change `data-interval` on the `[data-carousel]` root.
- **Accent color:** update `--mpb-accent` and `--mpb-accent-strong` in `style.css`.
- **Numbering style:** adjust the current/total markup or `formatIndex()` in `script.js`.
- **Progress presentation:** tune segment labels, heights, spacing, or fill styling in `.mpb-progress-segment*` rules.

## Events

The carousel dispatches:

- `carousel:ready` when initialization completes.
- `carousel:change` whenever the active slide changes.

These events bubble and include the carousel root, active index, and active slide in `event.detail`.
