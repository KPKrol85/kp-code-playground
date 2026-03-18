# Floating Illustration Accordion

## Design concept
A premium editorial accordion that pairs each trigger with a compact floating illustration. The media is decorative and motion-led, designed to deepen hierarchy and spatial polish while the text content remains clear, stable, and practical for product, FAQ, or service-detail contexts.

## Feature summary
- Standalone HTML, CSS, and vanilla JavaScript package with no shared dependency assumptions.
- Side-by-side trigger composition with decorative illustration, editorial copy block, and state indicator.
- Single-open accordion interaction with synchronized active classes, `aria-expanded`, and `hidden` state updates.
- Optional, subtle pointer parallax for the active illustration on fine pointers.
- Responsive layout that stacks gracefully on smaller screens.

## Accessibility notes
- Uses native `button` elements for accordion triggers.
- Connects each trigger and panel with unique `id`, `aria-controls`, and `aria-labelledby` values.
- Applies `role="region"` to panels and uses the `hidden` attribute for inactive content.
- Marks all illustrations as decorative with `aria-hidden="true"`.
- Includes visible `:focus-visible` styling and keyboard navigation for Arrow, Home, and End keys.

## Motion notes
- Closed items use reduced scale, lower emphasis, and calm floating motion.
- Open items increase contrast, scale, and positional focus for a refined elevated effect.
- Motion is softened for users who prefer reduced motion.
- Decorative parallax is enhancement-only and automatically disabled for reduced-motion and coarse-pointer environments.

## File structure
- `index.html` — semantic component markup and demo content.
- `style.css` — standalone visual system, layout, responsive behavior, and motion treatment.
- `script.js` — component-scoped accordion logic, keyboard support, and optional parallax enhancement.
- `README.md` — implementation summary and customization guidance.

## Customization guidance
- Replace the demo copy inside each trigger and panel to adapt the component for product details, FAQs, or onboarding flows.
- Adjust the orb gradients, frame shapes, and glyph compositions to create alternate illustration themes while keeping a consistent family style.
- Tune animation duration via the shared CSS custom properties if a faster or slower motion profile is needed.
- Duplicate or remove accordion items as needed, preserving the trigger/panel ID pairings for accessibility.
