# Feature 06 — Editorial Premium

A standalone premium feature-cards section designed for component libraries and high-end marketing surfaces. The component emphasizes restrained 3D depth, readable content hierarchy, subtle pointer-reactive lighting, and robust motion-safe fallbacks.

## Purpose

Use this package when you need feature cards that feel tactile and polished without turning into a novelty animation. It is tuned for:

- component showcase pages
- SaaS/product marketing sections
- editorial-style agency presentations
- reusable UI library demos

## File Structure

```text
FEATURED-CARDS/feature-06-editorial-premium/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Content Anatomy

Each card includes:

1. **Base surface layer** (`.epfc-card__surface`) for material and border treatment.
2. **Content layer** (`.epfc-card__content`) for kicker, title, copy, and CTA.
3. **Elevated accent layer** (`.epfc-card__accent`) for spatial reinforcement.
4. **Glare layer** (`.epfc-card__shine`) for subtle directional polish.

All user-critical content remains visible at all times; no essential information depends on hover motion.

## 3D Perspective Strategy

- Perspective is applied on each card wrapper (`.epfc__grid li`) to establish a stable stage.
- Cards use `transform-style: preserve-3d` so internal layers can exist at controlled Z distances.
- Layer depth is intentionally moderate (`translateZ` values around `32px` to `50px`) to preserve readability and visual cohesion.

## Tilt and Parallax Model

- JavaScript enables interaction only for **fine-pointer + hover-capable** environments.
- Pointer position maps to restrained tilt (max ±7°) for both axes.
- Updates run through `requestAnimationFrame` and change CSS custom properties only, minimizing layout overhead.
- On pointer leave, transforms reset cleanly to neutral.

## Glare and Shadow Behavior

- The glare overlay uses a radial gradient whose center follows pointer position.
- Opacity remains low to avoid overpowering typography.
- Shadow depth increases slightly on hover/focus and shifts subtly with tilt direction using CSS custom properties.

## Reduced Motion and Touch Fallbacks

- If `prefers-reduced-motion: reduce` is active, the component renders statically (no dynamic transforms).
- In `hover: none` or `pointer: coarse` environments, cards remain premium but static:
  - no active tilt/parallax
  - softer fixed glare
  - stable shadow treatment
- Baseline layout is fully usable with JavaScript disabled.

## Accessibility Considerations

- Semantic section/header/article hierarchy in HTML.
- Strong text contrast and persistent readable typography in all states.
- Visible `:focus-visible` styling for keyboard users.
- No hidden critical UI behind animation or hover.
- Motion-safe behavior honors user and device capability signals.

## Responsive Behavior

- Mobile-first spacing and typography use `clamp()` for fluid scaling.
- Grid uses `repeat(auto-fit, minmax(...))` so cards adapt without breakpoint-heavy rules.
- Card heights and spacing remain balanced across compact and wide viewports.

## Reuse Recommendations

- Swap card copy and CTA text directly in `index.html`.
- Re-theme by editing gradient, border, and shadow tokens in `style.css`.
- Keep the max tilt restrained (5°–8°) for premium feel and legibility.
- If adding more layers, keep Z-depth increments small to preserve the physical object illusion.
