# Tabs 03 — Premium Segmented / Pill Tabs

A standalone, reusable tabs component that uses a **single animated glider** inside a pill-shaped track. It is designed to feel tactile and premium while remaining clean and production-appropriate.

## Files

- `index.html` — semantic tabs + panels markup
- `style.css` — mobile-first styling, glider motion, and panel transitions
- `script.js` — active state logic, runtime geometry measurement, keyboard interaction

## Structure

- One `role="tablist"` track container with strong pill radius and subtle inset depth.
- Transparent tab buttons layered above one shared absolute-positioned `.tabs__glider`.
- Panels linked through `aria-controls` and `aria-labelledby`.

## Motion and Interaction

- Glider position uses measured geometry from `getBoundingClientRect()`.
- Active movement updates:
  - `width`
  - `transform: translateX(...)`
- Motion is GPU-friendly and slightly elastic without being over-styled.
- Text color transitions are coordinated for active/inactive clarity.
- Panel switching uses a restrained fade + small upward settle.
- Professional refinement: subtle pointer press feedback (`data-pressing`) on the active label.

## Accessibility

- Correct tabs semantics:
  - `role="tablist"`, `role="tab"`, `role="tabpanel"`
  - `aria-selected`, `aria-controls`, `aria-labelledby`
- Roving focus/tabindex behavior.
- Keyboard support:
  - `ArrowLeft/ArrowRight` and `ArrowUp/ArrowDown` to move tabs
  - `Home` / `End` jump
  - `Enter` / `Space` activate
- Visible `:focus-visible` ring for keyboard users.

## Responsive Behavior

- Mobile-first defaults to equal-width tab targets for touch comfort.
- At wider breakpoints, tabs become variable width to fit label length naturally.

## Reuse and Customization

- Duplicate `.tabs` block to add more instances and keep the same script pattern.
- Customize visual tone via CSS variables in `:root` (surface, text, glider, focus ring).
- Add/remove tabs by preserving id relationships:
  - each tab `id` + `aria-controls`
  - each panel matching `id` + `aria-labelledby`
