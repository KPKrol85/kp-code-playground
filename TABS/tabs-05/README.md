# Tabs 05 — Premium Vertical Sidebar Tabs

A standalone dashboard-grade tabs component that uses a sticky sidebar on larger screens and transforms into a horizontal scrollable tab bar on smaller viewports.

## Files

- `index.html` — semantic tablist + tab + tabpanel markup with icon and badge examples
- `style.css` — mobile-first responsive layout, indicator strip styling, states, and panel transitions
- `script.js` — activation logic, ARIA state updates, disabled behavior, keyboard support, orientation-aware indicator movement

## Component Structure

- One main component shell (`.tabs05`) with a two-area layout:
  - sidebar tab navigation
  - flexible content panel container
- Tabs are linked to panels with:
  - `aria-controls` on each tab
  - `aria-labelledby` on each panel
- Required semantics included:
  - `role="tablist"`
  - `role="tab"`
  - `role="tabpanel"`

## States and Behaviors

- **Active tab**: accent foreground, subtle active background, and synchronized animated indicator strip.
- **Inactive tab**: calm neutral tone.
- **Hover state**: restrained hover background + minimal horizontal shift.
- **Disabled tab**: visible but non-interactive (`disabled` + `aria-disabled="true"`) and blocked in JavaScript.
- **Panels**: soft fade + slight translate motion during switching.
- **No flash on init**: panels animate only after the component is marked ready.

## Indicator and Orientation Refinement

- Indicator uses `transform` for motion and is measured from the active tab geometry.
- On desktop (vertical orientation), the indicator is a left strip with active tab height.
- On mobile (horizontal orientation), the indicator moves along the bottom as an underline.
- Geometry is recalculated on:
  - initialization
  - active tab changes
  - resize
  - breakpoint/orientation changes

## Accessibility

- ARIA sync for `aria-selected`, `aria-controls`, and `aria-labelledby`.
- Roving `tabindex` keeps keyboard focus on the active tab.
- Keyboard support:
  - desktop: `ArrowUp` / `ArrowDown`
  - mobile: `ArrowLeft` / `ArrowRight`
  - both: `Home`, `End`, `Enter`, `Space`
- Clear `:focus-visible` ring styling.

## Sticky + Responsive Behavior

- Desktop (>= 900px):
  - two-column layout
  - fixed-width sidebar
  - sticky sidebar via `position: sticky`
- Mobile (< 900px):
  - stacked layout
  - sidebar converts to horizontal tab row
  - horizontal overflow preserves touch usability

## Customization Notes

- Tune the visual style through CSS variables in `:root` (accent, borders, surfaces, ring).
- Add/remove tabs by preserving id linkage between tab and panel attributes.
- Badges are optional; remove badge nodes freely when not needed.
