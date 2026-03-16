# header-02

A standalone premium retail/e-commerce header component designed for lifestyle, fashion, and marketplace experiences. It includes utility messaging, primary navigation, search, account actions, a cart badge, a mobile drawer, and a light/dark theme toggle.

## File structure

- `header.html` — semantic and accessible header markup.
- `header.css` — mobile-first BEM styles with a single responsive breakpoint at `900px`.
- `header.js` — component-scoped interaction logic for menu, search, and theme.

## Included features

- Optional utility strip for shipping/service messaging.
- Brand area with icon-style mark and premium uppercase logotype.
- Primary navigation links for desktop.
- Mobile menu drawer with dedicated close control and backdrop.
- Search interaction:
  - Toggleable panel on mobile.
  - Always available search panel on desktop.
- Practical action controls:
  - Wishlist
  - Account
  - Cart with badge
  - Theme toggle (light/dark)
- Subtle, commercial styling with structured spacing and borders.

## Accessibility notes

- Semantic regions (`header`, `nav`, `aside`, `form`) and explicit labels.
- Interactive controls use `<button>` where behavior is stateful.
- `aria-controls` and `aria-expanded` sync on menu and search toggles.
- Keyboard accessible controls with clear `:focus-visible` styling.
- `Escape` key closes menu/search when active.
- Backdrop click closes active overlays.
- Reduced motion support via `prefers-reduced-motion`.

## Responsive behavior

- Mobile-first baseline.
- Single breakpoint at `900px`:
  - Desktop navigation is shown.
  - Mobile drawer controls are hidden.
  - Search panel remains visible by default.
- JavaScript resets menu/search states when crossing breakpoint boundaries.

## Integration guidance

1. Copy the full `HEADERS/header-02/` folder into your project.
2. Include CSS in the `<head>`:

   ```html
   <link rel="stylesheet" href="header.css" />
   ```

3. Place `header.html` markup where needed.
4. Load JavaScript before `</body>`:

   ```html
   <script src="header.js" defer></script>
   ```

5. Replace placeholder links (`href="#"`) with real routes.

## Customization notes

- **Links and labels:** edit nav links, utility text, and mobile action labels directly in `header.html`.
- **Icons:** replace unicode placeholder icons with your preferred inline SVG set while keeping class names unchanged.
- **Cart count:** update `.header-02__cart-badge` text from your app/cart state.
- **Theme logic:**
  - Current behavior toggles `.header-02--dark` on the component root.
  - You can persist user preference (localStorage/cookies) by extending `header.js`.
- **Branding:** swap `Maison Élan` and `ME` with your brand identity.

## Reusability contract

To preserve portability and compatibility:

- Keep class naming in strict `header-02` BEM format.
- Keep JavaScript scoped through `data-header-02` selectors.
- Avoid global side-effects (except temporary body scroll lock while mobile menu is open).
