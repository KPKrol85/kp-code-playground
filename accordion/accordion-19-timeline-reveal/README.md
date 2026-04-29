# Accordion 19 — Timeline Reveal

A premium vertical timeline accordion for process-heavy pages where each phase can expand into practical delivery details.

## Purpose

This component blends a structured timeline rail with multi-open accordion behavior. It is designed for teams that need concise phase summaries and expandable operational detail in the same view.

## Best-fit use cases

- Service process sections
- Client onboarding plans
- Product launch timelines
- Case study delivery breakdowns
- Roadmap and implementation narratives

## File structure

- `index.html` — semantic timeline layout, triggers, and panel content
- `style.css` — scoped visual system, timeline/card layout, states, and responsive behavior
- `script.js` — multi-open accordion logic, measured height transitions, and close-all control

## Accessibility behavior

- Uses native `<button>` elements for all phase triggers
- Maintains `aria-expanded` and `aria-controls` on triggers
- Uses labeled `role="region"` panels with `aria-labelledby`
- Supports keyboard navigation through natural button focus flow
- Includes visible `:focus-visible` treatment
- Respects reduced-motion preferences with minimized transition duration

## Customization notes

- Update phase labels, durations, and summaries directly in `index.html`
- Adjust theme values through CSS custom properties in `:root`
- Tune expansion speed with `.phase__panel { transition: height ... }`
- Use the same structure for any sequential process (e.g., legal workflows, hiring pipelines, implementation playbooks)
