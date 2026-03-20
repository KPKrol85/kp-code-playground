# Header 07 — Glassmorphic Landing Island

Glassmorphic Landing Island is a standalone premium header package designed for SaaS landing pages, startup launches, and dark-mode product sites that need a floating navigation surface with clear readability over rich atmospheric backgrounds.

## Component concept

The component is built as a floating constrained-width island rather than a full-bleed navigation bar. It sits away from the viewport edges, reads like a crafted translucent object, and balances three goals at once:

- premium glass material realism
- strong text contrast over complex backgrounds
- commercially credible restraint instead of novelty-heavy effects

## Included files

- `index.html` — semantic page scaffold with skip link, floating header, desktop navigation, theme toggle, mobile menu, and realistic demo content.
- `style.css` — fully scoped visual system for the frosted island, edge-light treatment, responsive layout, focus states, and non-blur fallback styling.
- `script.js` — progressive enhancement for theme persistence, mobile menu behavior, and subtle scroll-state separation.
- `README.md` — implementation notes and customization guidance.

## Glass surface architecture

The header uses a layered lens model:

1. **Base tint layer** provides a controlled translucent surface color.
2. **Backdrop blur enhancement** increases material realism when supported.
3. **Inner highlight layer** simulates glass thickness and catches light along the top edge.
4. **Restrained glint layer** gives the surface a subtle reflective pass on interaction.
5. **Shadow stack** lifts the island from the page without muddying the silhouette.
6. **Noise overlay in the page background** helps the glass read against both dark and mixed surfaces without relying on a specific image.

## Fallback strategy

The package does not depend on `backdrop-filter` for usability. When blur support is unavailable, the header falls back to a more solid tinted surface with preserved border light, inner highlight, and shadow depth so the island still feels premium and readable.

## Scroll-state behavior

At the top of the page the island is more transparent and integrated with the hero atmosphere. Once the user scrolls slightly, JavaScript adds a scrolled state that:

- increases surface tint
- sharpens border definition
- deepens the shadow stack
- slightly tightens the header height

This creates more separation from the page content while keeping the layout stable and avoiding jumpy motion.

## Accessibility decisions

- Includes a keyboard-accessible skip link.
- Uses semantic `header`, `nav`, `main`, `section`, and `button` elements.
- Keeps native links and buttons for all interactive controls.
- Adds `aria-expanded`, `aria-controls`, and descriptive labels for the mobile menu and theme toggle.
- Provides strong `:focus-visible` styling that remains visible on translucent surfaces.
- Supports reduced-motion preferences by effectively disabling decorative animation and shortening transitions.
- Remains usable without JavaScript: desktop navigation and header layout still render correctly, while JavaScript only enhances theme persistence, scroll state, and mobile menu interactivity.

## Theme logic

The component defaults to a dark premium presentation, checks for any saved user preference in `localStorage`, and otherwise follows the system color-scheme preference. The theme toggle switches between dark and light modes and persists the chosen theme for future visits.

## Responsive strategy

- **Desktop:** full floating island with centered navigation, secondary action, primary CTA, and theme toggle.
- **Tablet / small laptop:** navigation collapses into a compact mobile trigger while the island remains floating and constrained.
- **Mobile:** the header keeps generous tap targets and opens a matching glass panel below the shell for navigation and actions.

## Customization guidance

You can adapt the package quickly by editing the scoped custom properties near the top of `style.css`:

- change `--gli-cta-start` and `--gli-cta-end` to retune the accent energy
- adjust `--gli-radius-shell` for a softer or more architectural island silhouette
- change the nav labels and CTA copy in `index.html` to match your product story
- tune scroll-state contrast through `--gli-shadow` / `--gli-shadow-scrolled`
- replace the demo brand and metrics with product-specific content while keeping the same semantic structure
