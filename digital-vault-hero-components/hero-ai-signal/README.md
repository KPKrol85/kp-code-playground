# Hero AI Signal

A premium, standalone HERO component for AI products, assistant platforms, and intelligent SaaS landing pages. The design emphasizes trust, calm signal-rich visuals, and clear conversion paths.

## Use case

Use **Hero AI Signal** when you need an above-the-fold section that communicates:

- AI orchestration or workflow automation value
- Operational reliability and compliance trust markers
- Product interactivity through a realistic assistant preview

## File structure

- `index.html` — KP_Code Digital Vault selector panel with a product card linking to the HERO page.
- `hero-ai-signal.html` — Dedicated HERO component implementation.
- `style.css` — Scoped styles for selector + HERO page, including responsive layout, glass surfaces, and glow effects.
- `hero-ai-signal.js` — Defensive progressive-enhancement interactions.
- `README.md` — Documentation and reuse notes.

## JavaScript interactions

`hero-ai-signal.js` implements:

1. **Animated assistant response preview** via workflow chip selection.
2. **Selectable workflow chips** using native `button` elements.
3. **Dynamic preview copy updates** tied to each workflow scenario.
4. **Reveal-on-scroll animations** with `IntersectionObserver` (with reduced-motion fallback).
5. **Pointer-aware glow** on the assistant panel for subtle premium feedback.

Accessibility details:

- Chips use `aria-pressed` to expose selection state.
- Keyboard support is provided for Enter/Space interaction.
- Preview text container uses `aria-live="polite"`.
- Focus visibility is explicitly styled.

## Reuse instructions

1. Copy the entire `hero-ai-signal` folder into your project.
2. Link `style.css` in the target page `<head>`.
3. Copy the `<section class="hero-ai-signal">...</section>` block from `hero-ai-signal.html`.
4. Include `hero-ai-signal.js` before the closing `</body>`.
5. Update CTA URLs and trust metrics to match your product.

No external dependencies or assets are required.
