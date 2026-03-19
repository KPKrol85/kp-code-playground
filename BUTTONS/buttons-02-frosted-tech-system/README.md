# Frosted Tech System

A premium standalone button package for KP_Code Digital Vault focused on frosted glass surfaces, crisp borders, restrained depth, and reusable SaaS-ready interaction patterns.

## Included button variants

1. Primary action
2. Secondary frosted button
3. Outline tech button
4. Ghost utility button
5. Elevated CTA button
6. Icon-only utility button
7. Success status action button
8. Warning status action button
9. Destructive / danger action button
10. Loading button with segmented control demo

## Accessibility decisions

- Uses semantic `<button>` elements throughout the component.
- Includes strong `:focus-visible` states for keyboard users.
- Preserves contrast across light and dark themes.
- Supports disabled, pressed, selected, and loading states.
- Includes `aria-live` toast feedback, `aria-busy` loading feedback, and `aria-pressed` for toggle controls.
- Respects `prefers-reduced-motion` to minimize animation.

## State behavior

- Hover and active states use restrained transform, shadow, and border changes.
- Disabled buttons reduce emphasis without shifting layout.
- The loading button demonstrates asynchronous busy state feedback and restores itself automatically.
- The segmented control updates selected state using `aria-pressed` and an active visual style.
- Copy-label chips and theme switching provide lightweight demo interactions without being required for layout.

## Token structure

`style.css` defines reusable CSS custom properties for:

- backgrounds and frosted surfaces
- text hierarchy
- accent, success, warning, and danger colors
- borders, shadows, and glow treatment
- radii and spacing
- typography and sizing
- motion and backdrop blur

## Customization guidance

- Update the root tokens first to adapt the package to a product brand.
- Reuse `.button` as the base class and layer variant modifiers for new button styles.
- Adjust the preview content in `index.html` to match real product actions.
- Keep JavaScript enhancement optional; the visual system remains functional without it.
