# Carousel 07 - Parallax Motion Slider

## Concept
A premium standalone slider built for editorial, hospitality, portfolio, and luxury campaign surfaces. The composition emphasizes oversized cinematic media, clipped framing, tempered overlays, and measured spatial motion instead of fast promotional carousel behavior.

## Interaction model
- Full-width slide viewport with one active slide visible on load.
- Coordinated transform-based motion between the main track, oversized media, and layered copy blocks.
- Slow premium easing with a subtle active-slide scale lift for added depth.
- Enhancement-only pointer-follow motion on fine pointers to keep the active slide feeling alive without becoming distracting.

## Accessibility
- Semantic section wrapper with an accessible carousel label.
- Native previous/next buttons plus clickable pagination buttons.
- Keyboard support for `ArrowLeft` and `ArrowRight` on the viewport.
- `aria-live="polite"` status announcements and synchronized `aria-hidden` state per slide.
- Preserved focus-visible states and reduced-motion support.

## Input support
- Previous/next button navigation.
- Pagination button navigation.
- Native pointer swipe / drag navigation in vanilla JavaScript.
- Custom events: `carousel:ready` and `carousel:change`.

## Responsive and motion strategy
- Mobile-first layout with reserved slide height to avoid avoidable layout shift.
- Reduced parallax intensity on smaller viewports for smoother touch performance.
- Calm fallback for `prefers-reduced-motion`, removing heavy layered travel while preserving the premium composition.

## File structure
- `index.html` — isolated markup and demo content.
- `style.css` — scoped premium visual system, layout, and motion styling.
- `script.js` — multi-instance carousel logic, swipe handling, and parallax coordination.
- `README.md` — usage and customization overview.

## Customization
- Replace the editorial copy and CTA targets directly in `index.html`.
- Change each slide mood by editing the theme-specific media gradients in `style.css`.
- Tune pacing with `--pm-duration` and `--pm-ease-premium`, or reduce/increase travel by adjusting the transform multipliers tied to `--pm-slide-offset`.
- Restyle controls, dots, and glass panels within the `.pm-slider__*` and `.pm-slide__*` scopes without affecting the rest of a page.
