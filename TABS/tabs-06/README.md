# AI Command Tabs (tabs-06)

## Concept
AI Command Tabs is a premium horizontal tabs component designed to feel like an intelligent control surface in a modern AI workspace. It emphasizes precision hierarchy, calm confidence, and reusable product-library quality.

## File structure
- `index.html` — semantic tabs markup with ARIA-linked tabs/panels and structured panel content.
- `style.css` — dark-neutral command-bar styling, active command tile treatment, and refined transitions.
- `script.js` — tab activation logic, roving tabindex, keyboard controls, ARIA sync, panel visibility state, and lightweight pointer-reactive enhancement.

## Visual direction
- Dark-neutral shell with restrained layered surfaces.
- Command-bar row with compact segmentation and crisp spacing.
- Active tab appears as a precision command tile (edge-highlight + subtle inner light), avoiding simple underlines or pill toggles.
- Status markers and compact meta text communicate tab state without visual noise.

## Interaction model
- Click any tab to activate it and reveal its panel.
- Active-state styles update across active, hover, inactive, and focus-visible states.
- Panels animate with subtle opacity/transform transitions for premium stage changes.
- Command bar includes a soft pointer-reactive highlight to reinforce the AI command identity.

## Accessibility behavior
- Uses WAI-ARIA tabs pattern:
  - `role="tablist"`, `role="tab"`, `role="tabpanel"`
  - `aria-controls`, `aria-labelledby`, `aria-selected`
- Roving tabindex keeps only the active tab in the natural tab order.
- Keyboard support:
  - `ArrowLeft` / `ArrowRight` for tab navigation
  - `Home` / `End` for first/last tab
  - `Enter` / `Space` to activate focused tab
- Hidden panels use the `hidden` attribute and are kept out of layout until active.

## Responsive behavior
- Mobile-first layout.
- Command bar allows horizontal scrolling on smaller screens while preserving accessibility and usability.
- Spacing and panel metrics scale up at larger breakpoints for a denser desktop presentation.

## Customization guidance
- Edit labels/meta/status markers in `index.html` to match product states.
- Adjust tokens in `:root` (colors, easing, borders) to align with other component families.
- Reuse panel structure (`.tabs06__panel-head` + `.tabs06__facts`) as a template for real product data modules.
- Keep motion restrained and maintain `prefers-reduced-motion` behavior for accessibility.
