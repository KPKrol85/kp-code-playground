# Accordion 07 - Vertical Slider

## Design concept
A premium, side-by-side accordion that behaves like a controlled editorial panel reveal. Collapsed items remain as slim vertical rails with stable typography, while the active item expands into a rich narrative surface with layered gradients, softened overlays, and delayed content reveal.

## Feature summary
- Horizontal flex-based accordion with a single expanded panel at a time.
- Slim collapsed rails with vertical title treatment for desktop presentation.
- Cinematic content reveal using flex growth, overlay easing, and staggered text entrance.
- Self-contained gradient backdrops for each panel with no external image dependencies.
- Fully standalone package with isolated HTML, CSS, and JavaScript.

## Accessibility notes
- Uses native `button` elements for every panel trigger.
- Connects each trigger and panel with `aria-expanded`, `aria-controls`, and `aria-labelledby`.
- Expanded content regions use `role="region"`; inactive content is removed from view with the `hidden` attribute.
- Includes visible focus styling and ArrowLeft / ArrowRight keyboard navigation between panel triggers.
- Preserves click/tap activation as the primary interaction model.

## Motion and interaction notes
- The active state is driven by flex-basis changes rather than explicit width animation.
- Inner content animates after panel expansion begins, creating a calmer editorial reveal.
- Background layers shift subtly to reinforce depth without turning the accordion into a slideshow.
- `prefers-reduced-motion` is supported to minimize transitions and parallax-like movement.

## Responsive behavior
- Desktop keeps the side-by-side vertical slider composition.
- Tablet narrows the rail width while preserving the horizontal layout.
- Small screens switch to a stacked panel treatment so each trigger remains practical and readable.

## File structure
- `index.html` — standalone semantic markup and demo content.
- `style.css` — scoped layout, visual styling, animation, and responsive behavior.
- `script.js` — single-open accordion logic and keyboard support.
- `README.md` — component overview and customization guidance.

## Customization guidance
- Update panel themes by adjusting each panel's `data-theme` gradient rules in `style.css`.
- Replace headings, metrics, and CTA text directly in `index.html`.
- Tune motion by changing `--vault-duration` and `--vault-easing` in `:root`.
- Adjust desktop rail width with `--vault-rail-width` to make collapsed items more compact or more descriptive.
