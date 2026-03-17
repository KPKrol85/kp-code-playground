# tabs-01 — Minimal Underline Tabs

A standalone premium tabs component package with a shared animated underline indicator, accessible tab semantics, keyboard navigation, and smooth panel transitions.

## File structure

- `index.html` — semantic tabs markup (`tablist`, `tab`, `tabpanel`) and demo content.
- `style.css` — mobile-first visual system, horizontal scrolling tab row, shared indicator styles, and subtle panel animation.
- `script.js` — tab activation logic, ARIA state updates, keyboard support, and runtime indicator positioning.

## Behavior highlights

- Uses one **shared indicator element** that animates beneath the active tab.
- Indicator width and position are measured at runtime with `getBoundingClientRect()` so labels can have variable lengths.
- Initializes the active indicator on `DOMContentLoaded` to avoid first-interaction jumps.
- Repositions indicator on tab changes, horizontal tab-list scrolling, and window resize.
- Switches panels with subtle fade/translate motion while hidden panels stay out of layout.

## Accessibility

- Proper roles and relationships: `role="tablist"`, `role="tab"`, `role="tabpanel"`.
- Each tab links to a panel with `aria-controls`; panels link back with `aria-labelledby`.
- Maintains `aria-selected` and roving `tabindex`.
- Supports keyboard navigation: `ArrowLeft`, `ArrowRight`, `Home`, and `End`.
- Includes clear `:focus-visible` styling.

## Reuse and customization

- Copy the folder as-is into your product library.
- Update tab labels and panel content in `index.html`.
- Change `--accent` in `:root` to re-theme active text + indicator color.
- Keep the shared indicator (`[data-tabs-indicator]`) inside the tab list for correct positioning.
