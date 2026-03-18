# Architectural Fold Accordion

## Design concept
A standalone premium accordion inspired by folded architectural panels, gallery signage, and luxury editorial layouts. The visual language favors crisp planes, angled seams, restrained shadows, and layered neutral surfaces so each state feels structural instead of decorative.

## Feature summary
- Semantic section wrapper with an editorial intro block and four realistic premium content items.
- Full-width native button triggers with eyebrow text, index labels, directional fold indicators, and supporting copy.
- Single-open accordion behavior with scoped JavaScript and optional keyboard navigation via Arrow Up, Arrow Down, Home, and End.
- Sculptural folded-plane styling using pseudo-elements, clipped surface layers, and refined inner panel composition.
- Responsive layout that adapts the fold geometry for narrow viewports without forcing desktop proportions.

## Accessibility notes
- Uses native `button` controls for each trigger.
- Connects triggers and panels with `aria-expanded`, `aria-controls`, and `aria-labelledby`.
- Applies `role="region"` to each content panel and hides inactive panels with the `hidden` attribute.
- Includes a high-contrast `:focus-visible` treatment integrated into the surface geometry.
- Preserves a simplified state change under `prefers-reduced-motion: reduce`.

## Motion and interaction notes
- Opening an item closes the others for a disciplined single-open reading experience.
- The trigger surface shifts first, then the content panel fades and translates in slightly after, creating a quiet unfolding sequence.
- The fold indicator animates through directional line movement and angular chevron rotation.

## Responsive behavior notes
- On smaller screens the trigger reflows to prioritize legibility, and the panel interior stacks into a single-column composition.
- Angular surface clipping is softened but retained so the component keeps its architectural identity on mobile.

## File structure
- `index.html` — standalone semantic markup and demo content.
- `style.css` — complete isolated visual system, responsive behavior, and motion rules.
- `script.js` — scoped accordion state management and keyboard interactions.
- `README.md` — usage and implementation overview.

## Customization guidance
- Adjust the neutral palette in `:root` to shift from warm residential tones to cooler commercial finishes.
- Replace the demo copy, index labels, and stat blocks to fit product, portfolio, hospitality, or editorial narratives.
- Duplicate `.af-item` blocks in `index.html` to add more entries while keeping the same ARIA wiring pattern.
- Tune the fold feel through `--af-duration`, `--af-ease`, and the surface pseudo-elements in `style.css`.
