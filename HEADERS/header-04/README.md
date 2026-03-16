# header-04

A standalone, reusable **Bold Corporate / Product Navigation** header component designed for business websites (SaaS, fintech, agencies, logistics, edtech, and B2B platforms). It emphasizes trust, hierarchy, and clear action pathways across mobile and desktop.

## File Structure

- `header.html` — semantic component markup
- `header.css` — mobile-first BEM styling with light/dark theme support
- `header.js` — component-scoped interaction logic (menu + theme)

## Included Features

- Semantic HTML5 header and navigation structure
- Strict BEM naming using `header-04`, `header-04__element`, and `header-04--modifier`
- Mobile-first layout with a single desktop transition at **900px**
- Accessible hamburger menu for mobile
- Grouped mobile navigation panel for scan-friendly actions
- Utility links + refined primary CTA placement
- Integrated light/dark theme toggle with localStorage persistence
- Sticky header behavior for product-style navigation continuity
- Reduced motion support via `prefers-reduced-motion`

## Accessibility Notes

- `nav` includes `aria-label="Primary"` for clear landmark context
- Mobile trigger button uses `aria-controls` and synced `aria-expanded`
- Toggle controls are implemented with `<button>` elements
- Theme toggle updates accessible labels based on state
- Keyboard accessibility includes:
  - `:focus-visible` styles for all interactives
  - `Escape` key to close mobile panel
- Mobile menu closes on link activation and outside click to reduce focus traps

## Responsive Behavior

- **Under 900px**:
  - compact brand presentation
  - hamburger menu displayed
  - mobile drawer-like panel shown when menu is opened
  - desktop nav/actions hidden
- **At and above 900px**:
  - horizontal navigation appears
  - utility actions and CTA align to the right
  - mobile controls are hidden
  - JS resets any open mobile state when crossing breakpoint

## Integration Guidance

1. Copy `header.html`, `header.css`, and `header.js` into your project.
2. Include CSS in the document head and JS before the closing `</body>`.
3. Keep data hooks used by JS:
   - `data-header-04`
   - `data-header-04-menu-toggle`
   - `data-header-04-mobile-panel`
   - `data-header-04-theme-toggle`
4. Ensure the root element (`<html>`) can receive `data-theme="light|dark"`.

## Customization Notes

- **Navigation structure**: Replace menu labels (`Products`, `Solutions`, etc.) with your information architecture.
- **CTA label**: Update `Request Demo` in desktop and mobile locations.
- **Utility links**: Adjust `Contact Sales` and `Sign in` to fit your product funnel.
- **Theme logic**:
  - Remove localStorage calls if session-only theme behavior is preferred.
  - Modify `applyTheme()` icon/text logic to match your design system token set.
- **Brand block**:
  - Replace `Northgrid` and `Enterprise Cloud Platform` with your organization naming.
  - Swap the text mark for an SVG logo if required.

## Reusability Considerations

- Component logic is scoped and safely exits when no `[data-header-04]` container exists.
- Styling tokens are centralized via CSS custom properties for easy theming.
- The package is framework-agnostic and suitable for static sites or application shells.
