# Carousel 02 - Split-Screen Slider

## Concept
A premium split-screen carousel for fashion campaigns, luxury product storytelling, lifestyle collections, and polished agency presentations. The left column behaves like an editorial narrative panel while the right column acts as the immersive media stage.

## Interaction model
- Text and media columns move in opposite vertical directions to create deliberate counter-motion.
- Headings, body copy, and actions reveal after the primary panel movement settles.
- Previous/next buttons, compact direct navigation, keyboard arrows, wheel input, and swipe gestures all drive the same internal slide API.
- Emits `carousel:ready` and `carousel:change` custom events for integration hooks.

## Accessibility
- Uses a labeled carousel region with a visually hidden `aria-live="polite"` status element.
- Keeps native button semantics for navigation.
- Marks inactive text and media slides with `aria-hidden`; inactive text slides are also made inert when supported.
- Preserves visible focus styles and keyboard navigation without trapping focus.
- Respects `prefers-reduced-motion` with near-instant transitions.

## Responsive behavior
- Desktop and tablet use a dramatic split-screen composition.
- Smaller screens convert into a stacked layout with media first and the editorial panel below.
- Navigation remains reachable on mobile, and the media panel keeps a stable reserved height to avoid layout shift.

## File structure
- `index.html` — standalone markup and editorial demo content.
- `style.css` — scoped visual system, motion, responsive layout, and accessibility treatments.
- `script.js` — modular multi-instance carousel logic with keyboard, wheel, swipe, ResizeObserver, and custom events.
- `README.md` — component overview and customization notes.

## Customization
- Replace story copy, labels, CTAs, and captions directly in `index.html`.
- Adjust text-side surface themes through the `data-tone` values and matching gradient rules in `style.css`.
- Swap the abstract media artwork by editing each `.vault-media__artwork--*` rule or replacing the artwork blocks with images while keeping the frame structure.
- Add or remove slides by keeping matching `data-slide` indices in both tracks and updating the counter reel / pagination labels.
- Tune the transition feel with `--vault-duration`, `--vault-easing`, and `--vault-reveal-delay` in `style.css`.
