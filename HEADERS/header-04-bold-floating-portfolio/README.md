# Bold Floating Portfolio

Bold Floating Portfolio is a standalone premium header package for KP_Code Digital Vault. It is designed for creative portfolios, boutique studios, artistic personal brands, and polished showcase sites that need navigation to feel like a floating interface object rather than a flat utility bar.

## Component concept

The component centers on a levitating capsule header with strong rounded geometry, restrained translucency, and editorial-leaning typography. The visual personality is expressive enough for portfolio storytelling, but the interaction model stays disciplined so the header remains commercially reusable.

## Floating capsule architecture

- A constrained-width floating capsule sits above the page with breathing room instead of stretching edge to edge.
- The capsule holds a brand block, concise desktop navigation, theme toggle, standout CTA, and a dedicated compact mobile trigger.
- A separate mobile panel preserves the same object-like visual language instead of collapsing into a generic list.
- Supporting demo content is included only to show the header in context while keeping the package focused on header behavior.

## Visual and motion system

- Layered shadows, internal highlight borders, and controlled backdrop blur create the levitating material effect.
- The desktop navigation uses a pill-style floating highlight that follows the active or hovered item with refined elastic easing.
- Scroll interaction subtly compacts the capsule by tightening padding, reducing width, and strengthening surface separation.
- Theme switching is handled as a component-level surface transition using CSS variables instead of a heavy page-wide animation.
- A lightweight grain overlay adds subtle texture without depending on images or expensive effects.

## Theme logic

- The component respects system color-scheme preference on first load.
- Manual theme changes are persisted with `localStorage`.
- If no saved preference exists, the component continues to respond to system theme changes.
- The toggle updates ARIA pressed state and label text so the control stays understandable for assistive technology.

## Accessibility decisions

- Includes a visible keyboard skip link.
- Uses semantic header, nav, main, section, article, button, and anchor elements.
- Mobile navigation uses `aria-expanded`, `aria-controls`, and meaningful labeling.
- Focus-visible styling is intentionally prominent and harmonized with the capsule aesthetic.
- The baseline layout remains usable without JavaScript.
- Reduced-motion preferences are respected across scrolling, hover transitions, highlight movement, and menu interactions.

## Responsive strategy

- On desktop, navigation stays centered inside the capsule with the CTA and theme controls aligned at the edge.
- At medium widths, the layout rebalances before transitioning to the mobile pattern.
- On small screens, desktop nav and CTA are replaced by a compact floating menu trigger and an intentional panel reveal.
- Spacing, border radius, and typography scale down while preserving the premium object-like presentation.

## Customization guidance

- Update the root CSS custom properties in `style.css` to retheme surfaces, shadows, accents, and spacing.
- Swap the demo brand name, link labels, and CTA copy in `index.html` for a different studio or portfolio context.
- Add or remove navigation items by editing both the desktop and mobile navigation lists together.
- Reuse the scroll compaction and theme logic from `script.js` as-is, or extend the active-link logic to integrate with a larger page section observer.
