# Expandable Detail Interactive Cards

A premium standalone featured-cards package for presenting concise feature summaries that unfold into richer detail only when requested. The component is designed for product specs, service breakdowns, technical capabilities, and benefit summaries that need strong scannability in the collapsed state.

## Concept

This package uses refined article cards with clean resting layouts, compact toggle controls, and carefully staged expansion motion. The visual style emphasizes subtle layering, strong typography, and controlled disclosure instead of a generic accordion look.

## Interaction model

- Cards default to a clean collapsed state with a concise summary and visible toggle.
- Expanding a card reveals richer content inside the same surface so the detail feels like it unfolds from within the card.
- The section uses a premium single-open accordion pattern by default, automatically collapsing sibling cards when a new card opens.
- Pressing `Escape` closes the currently expanded card and returns focus to its trigger.

## Accessibility and keyboard support

- Uses semantic `section`, `article`, headings, and native `button` elements.
- Each toggle is wired to its panel with `aria-expanded`, `aria-controls`, and a labeled `region`.
- Native button behavior provides Enter and Space activation automatically.
- Strong `:focus-visible` styling keeps keyboard focus obvious.

## Animation strategy

- Expansion uses a grid-based `grid-template-rows` pattern instead of brittle `height: auto` animation.
- Inner overflow containment keeps the reveal smooth and stable.
- Detail content uses restrained opacity and translate transitions that begin after the panel starts opening.
- Reduced-motion users get immediate state changes without extra motion.

## Responsive behavior

- Mobile-first layout with touch-friendly spacing and full-width toggles on smaller screens.
- The card grid scales into multiple columns when space allows.
- Expanded content maintains readable spacing and avoids cramped detail blocks.

## Dark mode

The component includes a dedicated `prefers-color-scheme: dark` adaptation with tuned surfaces, shadows, borders, and text contrast so the premium identity remains intact in darker environments.

## File structure

- `index.html` — semantic standalone markup with realistic demo content.
- `style.css` — fully scoped visual system, responsive layout, states, and motion.
- `script.js` — modular, multi-instance-safe accordion behavior and Escape-close handling.
- `README.md` — usage and customization notes.

## Customization

- Replace section intro text, card headings, labels, and detail copy directly in `index.html`.
- Swap SVG icons or chip labels to match different product or service categories.
- Adjust the visual treatment in `style.css`, including shadows, spacing, borders, and toggle styling.
- Change `data-fdc-accordion="single"` to `multi` if a multi-open experience is preferred for a given implementation.
