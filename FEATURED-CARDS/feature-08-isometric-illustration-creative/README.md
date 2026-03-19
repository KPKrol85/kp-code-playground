# Feature 08 — Isometric Illustration Creative

A standalone featured-cards package built around staged 2.5D scenes. Each card acts as a grounded platform while a dedicated SVG illustration breaks above the surface, giving the component a more art-directed and spatial identity than a conventional icon card.

## Intended use cases

Use this pattern for:

- premium SaaS feature merchandising
- infrastructure or platform capability storytelling
- creative service highlights
- innovation or workflow explainer sections
- product marketing modules that need memorable dimensional visuals

## Composition model

- Each `article` card includes a reserved stage area for illustration overflow.
- The card base holds the readable content and CTA rhythm.
- A dedicated illustration layer sits independently above the base so the object feels anchored to the platform rather than pasted on top.
- A contact shadow beneath the illustration reinforces lift and depth during hover and focus.

## Accessibility

- Uses semantic `section`, `header`, and `article` structure.
- Every card includes a visible heading and concise descriptive text so illustration meaning is never SVG-only.
- Full-card links keep native anchor semantics for keyboard and screen-reader users.
- Decorative illustration stages are hidden from assistive technology with `aria-hidden="true"`.
- `:focus-visible` uses a clear dual-ring treatment for strong keyboard visibility.
- Reduced-motion users receive the same layout and hierarchy with animation effectively removed.

## Motion behavior

- Illustrations use a restrained ambient float to keep the stage feeling alive without becoming noisy.
- Hover and focus move the illustration upward while the card base settles slightly downward to create a controlled parallax effect.
- The contact shadow expands and softens as the illustration lifts.
- Small signal rings inside each SVG pulse only after the card enters view.

## Responsive behavior

- Mobile-first layout keeps generous reserved stage space so illustrations never block text.
- At medium sizes the third card spans two columns, allowing the scene to breathe without collisions.
- At large sizes the layout returns to three equal columns for a clean featured-card rhythm.
- Illustration scale and anchoring adjust per breakpoint while keeping the breakout identity intact and avoiding avoidable CLS.

## Dark mode

- `prefers-color-scheme: dark` reinterprets the same staged-platform concept with deeper surfaces, cooler highlight logic, and brighter accent geometry.
- The component keeps the same dimensional hierarchy rather than swapping to a generic flat dark card.

## Customization

- Update each card’s inline `--icc-accent` and `--icc-accent-secondary` values to retint the illustration scene.
- Adjust `.icc-card__base` gradients to make the platform more matte, glossy, or brand-specific.
- Modify `.icc-card__shadow` to increase or reduce contact depth during interaction.
- Replace the inline SVG groups inside `.icc-card__illustration` to create new isometric scenes while preserving the shared staging system.
- Swap headings, descriptions, and CTA labels to adapt the package for products, services, or premium explainers.

## File structure

```text
feature-08-isometric-illustration-creative/
├── index.html
├── style.css
├── script.js
└── README.md
```
