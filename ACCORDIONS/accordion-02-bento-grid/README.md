# Accordion 02 Bento Grid

A standalone premium accordion component that presents each item as a floating Bento-style content card instead of a conventional stacked FAQ row.

## Design direction

This component is designed to feel editorial, modular, and product-library ready. The layout uses rounded card geometry, soft layered shadows, restrained accent color, and spacious proportions so the active item reads like a selected module inside a curated dashboard.

## Feature summary

- Standalone HTML, CSS, and vanilla JavaScript package with no external dependencies.
- Responsive Bento-inspired grid that shifts from a single column on mobile to a multi-column segmented layout on larger screens.
- Single-open accordion behavior with active-card emphasis, tonal surface shift, top accent bar, and rotating circular icon treatment.
- Smooth content reveal using a controlled grid-row expansion pattern that keeps content clipped inside rounded corners.
- Optional roving keyboard enhancement with arrow-key navigation between triggers.
- Tasteful entrance motion and reduced-motion support.

## Accessibility notes

- Uses native `button` elements for triggers.
- Wires each trigger and panel pair with `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`, and `hidden`.
- Preserves visible focus styling at the card level for keyboard users.
- Keeps touch targets generous and text contrast high for production-ready readability.

## Interaction notes

- One card remains open at a time by default.
- Opening a new card closes the others and updates ARIA state in real time.
- The active card gets elevated styling and subtle motion to communicate selection.
- When a newly opened card may drift out of view, the script uses restrained `scrollIntoView` behavior to keep its header comfortably visible.

## File structure

- `index.html` — semantic component markup and demo content.
- `style.css` — fully scoped visual system, responsive layout, states, and motion.
- `script.js` — isolated accordion state management and keyboard enhancement.
- `README.md` — usage and customization reference.

## Customization guidance

- Update the card copy, labels, and body content in `index.html` to match your product or editorial use case.
- Adjust the color system and shadow values in `style.css` to align with your brand while preserving strong contrast.
- Change the default open card by moving the `is-open` class to a different `.vault-bento-card` item in `index.html`.
- If you need multi-open behavior later, modify the close-all logic in `script.js` while keeping the ARIA state changes intact.
