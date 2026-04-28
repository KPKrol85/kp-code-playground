# Dashboard Library Card

Dashboard Library Card is a premium, compact account/dashboard component for **KP_Code Digital Vault**. It is designed for post-purchase product access surfaces where customers manage downloads, check ownership status, review version details, and open lightweight item actions.

## Included files

- `index.html` – Standalone demo page with five library-card examples and realistic KP_Code product data.
- `style.css` – Scoped visual system, dashboard layout, status styling, responsive behavior, dark mode, and reduced-motion support.
- `script.js` – Progressive enhancement for action-menu behavior and download loading/status feedback.
- `README.md` – Component usage and customization guidance.

## Recommended use cases

- Customer account area
- Purchased products library
- Download center
- Product update dashboard
- Customer resource access UI

## Component highlights

- Compact dashboard card/row hybrid layout with mini thumbnail, product details, metadata, and actions.
- Explicit access states for **Owned**, **Update available**, and **Expired access**.
- Fast-scan metadata for version and purchase/update dates.
- Primary **Download** button with normal, loading, and disabled states.
- Secondary **View changelog** action.
- Compact per-item actions menu (copy key, product page, archive/renew).

## Customization options

You can customize each card instance by editing:

- Thumbnail / product mark style (`.thumb-mark--*` variants)
- Product name
- Status text and status pill variant
- Version label
- Purchase/update/access-ended date label
- Download button state (normal/loading/disabled)
- Changelog link target and label
- Actions menu items
- Expired-access messaging and renewal action text

## Accessibility and UX

- Semantic list structure using `section` + `ul` + `li` + `article`.
- Native buttons and links for all interactions.
- Menu toggles include `aria-expanded` and `aria-controls`.
- Live download feedback uses a single `aria-live="polite"` region.
- Strong `:focus-visible` and `:focus-within` states for keyboard users.
- Status, loading, update, and disabled conditions are communicated by text and styling (not color alone).

## Responsive and theme support

- Mobile-first styling with clean stacked actions on narrow screens.
- Denser row alignment on medium/large screens for dashboard scanning.
- Dark mode support via `prefers-color-scheme: dark`.
- Motion safety support via `prefers-reduced-motion: reduce`.

## Behavior notes

- JavaScript progressively enhances menu controls:
  - toggles one menu at a time
  - closes on outside click
  - closes on `Escape`
- Download behavior is demo-only:
  - enabled buttons temporarily switch to **Preparing...** then return
  - live status text updates with the selected product name

## Production integration note

This package is intentionally frontend-only. Real downloads, license verification, entitlement checks, and access control must be implemented with backend/business logic in production.
