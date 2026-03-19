# Step-by-Step Process Flow

A premium standalone featured-cards package for onboarding flows, service pipelines, implementation sequences, roadmap storytelling, or any process-led section that should feel connected rather than fragmented.

## Concept

This component presents each process card as part of one continuous system. A responsive SVG connector path routes between cards, while scroll-aware state changes mark steps as current, completed, or upcoming.

## Files

- `index.html` — semantic standalone markup for the section, cards, and SVG connector layer.
- `style.css` — fully scoped visual system, responsive layout, dark mode, and reduced-motion handling.
- `script.js` — modular multi-instance logic for SVG path measurement, progress updates, and scroll-aware state classes.
- `README.md` — usage and customization notes.

## Accessibility

- Semantic section, ordered list, and article structure preserve logical reading order.
- Each step includes a real heading and visible status text.
- Decorative SVG connector is hidden from assistive technology.
- Links keep native keyboard behavior and use clear `:focus-visible` styling.
- The process remains understandable without relying on color, hover, or motion.

## SVG Path + State Logic

- The SVG layer sits behind the cards and draws both a resting connector path and a progress path.
- `ResizeObserver` recalculates anchor geometry whenever the component or cards resize.
- `IntersectionObserver` triggers lightweight viewport-state sync so cards can be labeled as current, completed, or upcoming.
- The progress path uses stroke-dash animation for a refined “living pipeline” effect.
- A `processflowchange` custom event is emitted with `currentIndex`, `completedIndex`, and `totalSteps`.

## Responsive Behavior

- Mobile uses a disciplined vertical process rhythm with a rerouted vertical connector path.
- Tablet and desktop switch to a staggered multi-column pipeline layout, and the SVG path reroutes to match that spatial composition.
- The card layout is stable and avoids avoidable layout shifts by defining spacing and structure up front.

## Motion + Color Modes

- `prefers-reduced-motion: reduce` minimizes transitions and path animation.
- `prefers-color-scheme: dark` keeps the same premium process identity with darker glass panels and tuned accent contrast.

## Customization

- Add or remove steps by duplicating an `li > article[data-step-card]` block in `index.html`.
- Adjust accent tone through the scoped CSS custom properties near the top of `style.css`.
- Refine connector appearance by editing the SVG path stroke styles in `style.css`.
- Update completion/current labels in `script.js` if your product language prefers different status terms.
- Rework staggered placement in the desktop media query if you want a different process route for a longer sequence.
