# Ultra-Clean SaaS Hero

A standalone premium hero component for SaaS landing pages that need immediate clarity, trust, and product credibility. The composition is intentionally product-led: the left side sells the value proposition and the right side proves the experience with a layered application mockup.

## Component concept

This package is designed for modern B2B software, productivity platforms, analytics tools, and operational SaaS products that need a polished first impression without relying on decorative gimmicks. The overall feel is spacious, controlled, and conversion-oriented.

## Layout and hierarchy logic

- Two-column hero with a slightly favored text column for stronger message breathing room.
- Content stack prioritizes overline, headline, support copy, CTA pair, then proof/trust reinforcement.
- The mockup column acts as visual proof rather than pure decoration, using app-style framing and concise product signals.
- On smaller screens, the hero stacks with message and CTA content first so conversion intent remains visible early.

## Mockup layering strategy

- Main application window includes chrome, navigation, metrics, charts, and workflow status blocks to feel like a realistic SaaS product surface.
- Floating cards add depth and supporting proof without crowding the composition.
- One lightweight parallax response is limited to a single floating card so motion remains subtle and performant.
- Depth is created through restrained shadows, neutral surfaces, soft borders, and a focused accent color rather than heavy glass effects.

## CTA interaction behavior

- The primary CTA is visually dominant through a disciplined gradient fill and dual-shadow lift treatment.
- Hovering or focusing the primary CTA triggers a small product-peek response in the main mockup.
- The secondary CTA supports lower-friction exploration and uses a quieter outline/surface treatment.
- All interactions are built with native links/buttons and include keyboard-visible focus states.

## Accessibility decisions

- Semantic heading, section, list, and description-list structure.
- The secondary CTA includes an explicit `aria-label` because it uses an icon-bearing pattern.
- The mockup uses descriptive labelling on the media container so the product preview has helpful non-visual context without hiding its internal content structure.
- Strong `:focus-visible` styling is included for interactive controls.
- `prefers-reduced-motion` disables entrance motion, CTA-linked motion, and pointer-driven parallax effects.
- The hero remains understandable and credible without JavaScript enabled.

## Responsive strategy

- Fluid type uses `clamp()` for the headline and body copy.
- The layout collapses to one column on tablet/mobile while preserving hierarchy.
- Floating cards become inline stacked cards on smaller screens so the media remains readable.
- Sidebar navigation in the mockup becomes horizontally scrollable on narrower widths to preserve the app-like layout without shrinking text into noise.

## Customization guidance

Adjust the following to adapt the component for other product narratives:

- Update copy directly in `index.html` for different SaaS verticals or campaign goals.
- Tweak palette variables in `style.css`, especially `--ucs-accent`, background layers, and surface values.
- Swap trust labels, proof metrics, and mockup labels to match your product category.
- Modify the float-card count or placement carefully; the current composition is intentionally restrained.
- If needed, expand the script with more states, but keep motion light and maintain reduced-motion support.

## File structure

- `index.html` — semantic standalone hero markup.
- `style.css` — isolated layout, typography, visual system, and responsive behavior.
- `script.js` — progressive enhancement for reveal motion, CTA-linked mockup response, and subtle parallax.
- `README.md` — implementation and customization notes.
