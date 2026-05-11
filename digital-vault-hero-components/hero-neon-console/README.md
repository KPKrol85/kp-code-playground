# Hero Neon Console

A premium, reusable HERO package for developer tools, AI products, technical SaaS, and digital infrastructure platforms.

## Use case

Hero Neon Console is designed for products that need to communicate **technical trust + execution speed**. It combines strong product messaging with a terminal visual and status timeline so users immediately understand operational maturity.

## File structure

```
digital-vault-hero-components/hero-neon-console/
├── index.html
├── hero-neon-console.html
├── style.css
├── hero-neon-console.js
└── README.md
```

## Interactive JavaScript features

- **Animated command sequence**: Types a realistic deploy command into the terminal visual.
- **Status line cycling**: Rotates deployment/system states with `aria-live="polite"` for assistive tech.
- **Copy command action**: Copy button writes the command to clipboard and announces feedback.
- **Reveal animation**: IntersectionObserver progressively reveals sections as they enter the viewport.
- **Reduced motion support**: Disables animation/timing effects when `prefers-reduced-motion` is enabled.

## Accessibility and UX notes

- Uses semantic landmarks (`header`, `main`, `section`, `article`, `aside`, `ol`).
- Includes skip link and visible `:focus-visible` treatment.
- Uses native buttons/links only.
- Keeps terminal text readable with high-contrast dark styling.
- Prevents noisy effects and avoids flashing visuals.

## Reuse instructions

1. Copy the full folder into your project.
2. Keep `style.css` and `hero-neon-console.js` linked in both pages (or import into your asset pipeline).
3. Update headline, lead copy, CTA URLs, chip labels, timeline entries, and command text.
4. If integrating in a larger app shell, preserve the class namespace prefix: `hero-neon-console-*`.
5. Validate keyboard navigation and clipboard behavior in your runtime context.
