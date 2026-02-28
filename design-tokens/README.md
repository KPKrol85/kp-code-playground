# CSS Design Token Systems

This folder provides five production-ready CSS token foundations that can be reused across different projects.
Each token file includes a complete set of core theme primitives for color, typography, spacing, layout, and motion.

## Included token systems

- `tokens-01.css` — Minimal Neutral (editorial, calm, restrained)
- `tokens-02.css` — Modern SaaS (clean, bright, product-oriented)
- `tokens-03.css` — Premium / Luxury (dark, elegant, high-end)
- `tokens-04.css` — Soft / Friendly (rounded, warm, approachable)
- `tokens-05.css` — High Contrast (readability and accessibility focused)

## Purpose

Use these files as a **theme foundation** for websites, apps, or design systems.
Instead of hardcoding visual values in component styles, consume token variables so teams can scale and swap themes quickly.

## How to import a token file

Choose one token system per entry point, then import it before your component styles.

```html
<link rel="stylesheet" href="./design-tokens/tokens-02.css" />
<link rel="stylesheet" href="./styles/components.css" />
```

Or with CSS imports:

```css
@import url('./design-tokens/tokens-02.css');
@import url('./styles/components.css');
```

## Recommended usage pattern

1. Pick the token file that best matches product tone.
2. Keep all component styles mapped to token variables (no direct hex values in components).
3. Build semantic component variables when needed, for example:

```css
:root {
  --button-bg: var(--color-primary);
  --button-text: #fff;
  --card-bg: var(--color-surface);
  --card-border: var(--color-border);
}
```

4. For theme swaps, replace the imported token file without rewriting component CSS.

## Token categories included in every system

Each `tokens-xx.css` file includes:

1. **Color tokens**
   - Background, surface, text, border, brand, and state colors
2. **Typography tokens**
   - Font families, responsive sizes via `clamp()`, line heights, letter spacing
3. **Spacing system**
   - 8-step spacing scale from `--space-1` to `--space-8`
4. **Border radius**
   - Sizes from subtle corners to fully rounded pills
5. **Shadows**
   - Four depth levels for layered UI
6. **Layout tokens**
   - Container widths from small to extra-large layouts
7. **Transitions**
   - Fast, normal, and slow timing tokens for consistent motion

## Demo page

Open `design-tokens/index.html` to preview all five systems side-by-side.
Each preview renders headings, paragraph text, button styles, card styling, and spacing blocks with that token set.
