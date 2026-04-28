# Product Roadmap Card

A standalone premium roadmap component for **KP_Code Digital Vault** that presents upcoming or in-progress products with honest visibility into status, stage progress, planned features, and local interest signals.

## Role in KP_Code Digital Vault

Use this component to communicate product direction before release while still showing practical value. It is designed for roadmap transparency, product validation, and early community intent capture.

## Included files

- `index.html` – standalone demo page with four roadmap card examples
- `style.css` – scoped visual system, responsive layout, status styling, progress presentation, dark mode, and motion preferences
- `script.js` – progressive enhancement for interest toggles, live announcements, and progress initialization
- `README.md` – usage and customization notes

## Recommended use cases

- Vault roadmap sections
- Upcoming product previews
- Coming-soon product areas
- Community interest blocks
- Product validation sections
- Waitlist/voting UI demos

## Customization options

Each roadmap card can be tailored with:

- Status badge (Planned, In progress, Coming soon, Research)
- Product name
- Planned value description
- Progress/stage value via `data-progress`
- Expected product type label
- Planned features list
- Interest count via `data-interest-count`
- CTA label with `data-cta-default`
- Interested/joined state label with `data-cta-active`

## Accessibility and UX notes

- Uses semantic `article`, `header`, `section`, `ul`, `li`, and native `button` elements
- Toggle-style interest buttons expose state through `aria-pressed`
- Stage/progress includes readable text and not only visual bars
- Status and interest values are text-first and not color-only
- `:focus-visible` and `:focus-within` states are included for keyboard users
- `aria-live="polite"` updates are limited to optional interaction feedback

## Responsive and theming behavior

- Mobile-first layout with one-column cards on small screens
- Two-column grid from medium breakpoints upward
- Premium light theme by default
- Automatic dark mode support through `prefers-color-scheme: dark`
- Reduced-motion support through `prefers-reduced-motion: reduce`

## Progressive enhancement behavior

Without JavaScript, all roadmap content stays readable: status, value description, stage text, progress bar, features, and CTA labels remain visible.

With JavaScript enabled:

- Each card initializes progress from `data-progress` (clamped from 0–100)
- CTA clicks toggle local interest state per card independently
- Interest count updates +1 / -1 on toggle
- Button text and `aria-pressed` update per state
- A polite live-region message announces updates

## Production note

This package demonstrates local UI behavior only. Real waitlist submission, voting persistence, analytics, and product availability logic must be connected to production backend and business workflows.
