# Header Vault Navigator

A premium, mobile-first KP_Code Vault header component designed for Digital Vault product libraries, reusable UI catalogs, templates, prompt systems, and frontend resource hubs.

## Intended use cases

- Digital product-library top navigation
- Component and template category systems
- Vault-oriented Free/Pro product entry points
- Static demo or production-ready header shell before wiring backend/search logic

## File list

- `index.html` — standalone demo page with the full header, mobile mini vault panel, and contextual section content
- `style.css` — component styles, responsive behavior, theme system, focus states, and motion handling
- `script.js` — mobile panel interactions, theme persistence, focus trap, scroll lock, and sticky scrolled state
- `README.md` — documentation and integration notes

## Key features

- KP_Code Vault-inspired product-grid brand mark
- Desktop category navigation with accessible active state (`aria-current="page"`)
- Search/action slot UI (`Search library` + `⌘K`) ready for future search integration
- Vault mode light/dark theme toggle with `localStorage` persistence
- Mobile vault tile menu control and mini vault panel experience
- Panel overlay, Escape/overlay close, resize cleanup, and close-on-link-click behavior
- Focus management and focus trap while panel is open
- Sticky header with subtle scrolled state treatment

## Accessibility notes

- Includes a visible-on-focus skip link
- Uses semantic landmarks (`header`, `nav`, `main`, `aside`, `section`, `article`)
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Drawer uses `aria-hidden` state management plus keyboard focus containment
- Focus-visible styling is included for keyboard navigation
- Active navigation/category states are not color-only (dot/tile indicator + pill treatment)
- Reduced-motion support via `prefers-reduced-motion`

## Customization notes

- Update theme tokens under `:root` and `html[data-theme="dark"]` in `style.css`
- Replace demo nav links and featured items with real product routes
- Hook the search button into your actual search command palette or modal
- Adjust breakpoint by changing `56.25rem` media-query and JS media-match value together

## Digital Vault integration notes

- This package is standalone and build-tool-free for quick component library review
- JavaScript is scoped in an IIFE to avoid global namespace pollution
- Theme storage key: `header-vault-navigator-theme`
- The demo search/action/Pro links are static UI slots only (no real search, auth, billing, or product database logic included)
