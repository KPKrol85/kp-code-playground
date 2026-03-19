# Feature 07 — Neumorphic Soft UI

A standalone featured-cards package built around a premium Soft-UI surface model. The cards share the same tonal family as the section background so they appear sculpted from the surrounding plane instead of sitting on top of it as conventional panels.

## Files

- `index.html` — semantic section wrapper, intro copy, and four interactive `article` cards with full-card link overlays.
- `style.css` — scoped Soft-UI surface system, responsive CSS Grid layout, tactile raised-to-inset interaction states, focus treatment, and dark-mode support.
- `script.js` — minimal progressive enhancement for touch-friendly pressed-state feedback and a one-time reveal pulse when cards first enter view.
- `README.md` — implementation notes and customization guidance.

## Intended use cases

Use this pattern for:

- premium product capability sections
- service and solution cards
- settings or admin surfaces with softer visual weight
- elegant dashboard summary panels
- polished marketing-to-product transition modules

## Soft-UI light and shadow logic

- The section and cards use one controlled cool-neutral tonal family so surfaces feel materially related.
- A consistent upper-left virtual light source drives every highlight and shadow decision.
- Default cards use restrained paired highlights and shadows to feel gently raised.
- Hover, focus, and pressed states shift toward a subtle inset model so interaction feels tactile rather than flashy.
- A light edge line is retained for shape recognition and contrast support without breaking the sculpted look.

## Accessibility and contrast strategy

- Uses semantic `section`, `header`, and `article` structure.
- Every card has a clear heading and concise descriptive copy.
- Full-card links preserve native anchor semantics and keyboard access.
- Decorative icon surfaces are hidden from assistive technology with `aria-hidden` on the icon wrapper.
- `:focus-visible` receives a dedicated high-visibility ring designed to remain clear inside the low-contrast palette.
- Text contrast is intentionally stronger than the surrounding surface to avoid washed-out neumorphism.
- Motion is reduced for people who prefer less animation.

## Raised and inset interaction model

- Cards begin in a soft raised state using balanced highlight and shadow pairs.
- On hover or focus, the outer card treatment compresses slightly and the icon surface shifts inward to suggest a pressed surface.
- On touch and pointer activation, JavaScript briefly reinforces the pressed state without replacing native interactions.

## Responsive behavior

- Mobile-first layout with generous spacing and touch-friendly hit areas.
- CSS Grid scales from one column to two and then four columns across larger breakpoints.
- Typography, spacing, and shadow depth stay controlled at smaller sizes so the component avoids muddy rendering.
- The layout is content-stable and avoids avoidable CLS.

## Dark mode

- `prefers-color-scheme: dark` is included with the same sculpted surface logic rather than a generic dark card swap.
- Dark surfaces invert the neumorphic light model carefully so the component still reads as carved and tactile.

## Customization

- Update each card’s `--nsu-accent` and `--nsu-accent-strong` values to retune the restrained accent tint.
- Adjust section-level surface variables in `.nsu-feature-cards` to shift the base color family warmer or cooler.
- Increase or reduce shadow softness in `.nsu-card` and `.nsu-card__icon-surface` to dial the amount of depth.
- Replace the inline SVG icons and card copy to adapt the package for product, services, or settings content.

## File structure

```text
feature-07-neumorphic-soft-ui/
├── index.html
├── style.css
├── script.js
└── README.md
```
