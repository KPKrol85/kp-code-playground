# Hero Wellness Calm

A standalone premium HERO package for wellness brands, coaching services, meditation products, therapy practices, and health-adjacent wellbeing experiences.

## Use Case

This HERO is built for teams that need a calm, trustworthy landing moment with:
- warm, reassuring copy
- clear primary/secondary calls to action
- emotional check-in controls (mood selector)
- a dynamic session preview panel
- supportive proof messaging

The pattern is intentionally free from medical claims and can be adapted for commercial client work.

## File Structure

- `index.html` — KP_Code Digital Vault selector panel and entry card for this HERO package.
- `hero-wellness-calm.html` — Dedicated HERO component page.
- `style.css` — Scoped styling for selector + component page (`hero-wellness-calm-*` classes).
- `hero-wellness-calm.js` — Interactive behavior for mood selection, session preview, reveal, and breathing animation.

## JavaScript Interactions

`hero-wellness-calm.js` includes:
1. **Mood Selector** using native buttons with `aria-pressed` states.
2. **Session Preview Updates** based on selected mood (`grounded`, `overwhelmed`, `low-energy`).
3. **Breathing Circle Animation** enabled only when `prefers-reduced-motion` is not set to reduce.
4. **Reveal Animations** powered by `IntersectionObserver`, with a no-observer/reduced-motion fallback that reveals content immediately.

All selectors are guarded so the file fails gracefully when used in partial environments.

## Reuse Instructions

1. Copy the entire folder `digital-vault-hero-components/hero-wellness-calm` into your project.
2. Include `style.css` and `hero-wellness-calm.js` with `hero-wellness-calm.html`.
3. Keep class names scoped with `hero-wellness-calm-*` to avoid style collisions.
4. Update copy, mood presets, CTA links, and testimonial text for your brand voice.
5. If embedding into an existing page, retain the body class `hero-wellness-calm-page` for page-level visual isolation or port those body styles into a local wrapper.

## Accessibility Notes

- Native button controls are used for mood options.
- Selected state is exposed via `aria-pressed`.
- Focus visibility is styled for keyboard navigation.
- Motion is reduced/disabled when users prefer reduced motion.
- Copy and contrast are designed for readability with no aggressive transitions.
