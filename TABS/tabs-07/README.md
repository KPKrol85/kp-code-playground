# Split Hero Tabs

A premium, editorial tabs component designed as a split-layout hero module. It pairs a narrative-focused control column with a cinematic active content stage to create a flagship interaction pattern for modern product surfaces.

## File structure

- `index.html` – Semantic split-hero tabs markup with ARIA-linked tabs and panels.
- `style.css` – Mobile-first visual system, responsive split layout, and refined transitions.
- `script.js` – Tab activation logic, roving tabindex, keyboard support, and enhancement behaviors.

## Visual direction

- Dark-neutral luxury palette with restrained depth.
- Editorial hierarchy (eyebrow, strong tab headings, cinematic panel title scale).
- Split composition that feels like a hero storytelling module instead of a standard tab strip.
- Active emphasis driven by panel dominance, typographic contrast, and subtle surface shifts.

## Interaction model

- Click a tab to activate its associated panel.
- Focus movement uses roving tabindex so only the active tab is in the default tab order.
- Keyboard support:
  - `ArrowRight` / `ArrowLeft` move focus between tabs.
  - `Home` / `End` jump focus to first/last tab.
  - `Enter` / `Space` activate the focused tab.
- Panels switch visibility using `hidden` and fade/translate transitions for a calm premium feel.

## Accessibility behavior

- Uses WAI-ARIA tab semantics:
  - `role="tablist"`, `role="tab"`, and `role="tabpanel"`
  - `aria-controls`, `aria-labelledby`, and `aria-selected`
- Inactive panels are removed from layout via `hidden`.
- Strong `:focus-visible` treatment for keyboard users.
- `aria-live="polite"` on the stage for gentle assistive updates.
- Motion respects `prefers-reduced-motion` in both CSS and JavaScript.

## Responsive behavior

- Mobile-first stack: controls above content for clarity on narrow screens.
- Desktop split hero (navigation column + stage panel) from larger breakpoints.
- Spacing and type scale adapt with `clamp()` to preserve visual polish across sizes.

## Customization guidance

- Update tab labels and panel narrative content without changing tab/panel ID links.
- Tune the tone by adjusting CSS custom properties (`--bg`, `--surface-*`, `--accent`, etc.).
- Increase/decrease cinematic intensity by changing panel heading size and `panel-in` timing.
- Keep interaction robust by preserving roving tabindex logic and keyboard event mappings.
