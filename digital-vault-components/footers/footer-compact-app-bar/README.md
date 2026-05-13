# Footer Compact App Bar (PocketPanel)

A premium, mobile-first compact footer component designed to feel like a modern app bottom bar for lightweight SaaS panels, creator tools, and product dashboards.

## Included files

- `index.html` — standalone demo page with realistic app context and one compact footer component.
- `style.css` — scoped BEM-style component styling with responsive behavior and accessibility-friendly states.
- `script.js` — progressive enhancement for year injection, active nav state, More panel interactions, and quick-action feedback.

## Key features

- Compact app-style footer with PocketPanel identity.
- Primary app nav (`Home`, `Library`, `Search`, `Activity`) with active state.
- Quick action button (`Create`) designed for frequent mobile usage.
- Accessible `More` panel for secondary links (`Docs`, `Support`, `Status`, `Privacy`, `Terms`).
- Compact meta area with dynamic year, version `v1.8`, and sync status (`Sync ready`).
- Safe-area inset support for modern mobile devices.
- Mobile-first bottom bar that evolves into a compact horizontal strip on larger screens.

## Accessibility notes

- Uses semantic `<footer>` and labeled navigation regions.
- Active primary nav item is represented via `aria-current="page"`.
- `More` is a native `<button>` with `aria-expanded` + `aria-controls`.
- `More` panel supports:
  - keyboard Escape close
  - outside-click close (mobile)
  - close-on-selection for secondary links
  - natural keyboard flow without focus trapping
- Strong `:focus-visible` styling for links and buttons.
- `aria-live="polite"` feedback message for quick-action interaction.
- Includes `prefers-reduced-motion` handling.

## Usage notes

1. Open `index.html` directly in a browser.
2. Reuse the `.pp-footer` block in your product shell.
3. Keep `script.js` loaded for enhanced interaction and state handling.
4. Without JavaScript, all navigation and link content remains visible and understandable.

## Customization notes

- Edit component tokens in `.pp-footer` custom properties:
  - `--pp-bg`, `--pp-border`, `--pp-text`, `--pp-muted`, `--pp-brand`, `--pp-brand-soft`, `--pp-focus`
- Update labels and links in `index.html` to map to product routes.
- If needed, switch the quick-action label from `Create` to `New item` without changing behavior.
- You can tune breakpoints at `480px`, `760px`, and `1024px` to match host app layout density.

## KP_Code Digital Vault integration notes

- Component is standalone and dependency-free for easy packaging.
- Class naming follows scoped BEM-style conventions (`pp-footer__*`) for minimal collision risk.
- Progressive enhancement approach keeps base UI useful before JavaScript hydration.
- Suitable for digital vault component cataloging and future premium bundle distribution after brand theming pass.
