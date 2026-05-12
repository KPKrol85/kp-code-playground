# Header Travel Compass

A premium mobile-first destination header for travel and hospitality brands, designed for the KP_Code Digital Vault component library.

## Intended use cases
- Hotel and apartment brand sites
- Destination and tourism portals
- Travel agency landing pages
- Curated guide and retreat websites
- Booking-style marketing pages (navigation layer only)

## File list
- `index.html` — standalone demo with header, itinerary drawer, overlay, and contextual content
- `style.css` — scoped component styles, themes, responsive behavior, route/compass visuals
- `script.js` — drawer controls, focus trap, scroll lock, theme persistence, sticky scrolled state
- `README.md` — implementation and integration notes

## Key features
- Compass-inspired brand mark and mobile menu icon
- Desktop destination navigation with route-style active indicator (not color-only)
- Sunrise/Night compact theme switch
- Right-side mobile itinerary drawer with route line and featured destination card
- Overlay close, Escape close, link-click close, and desktop resize cleanup
- Sticky header with subtle scrolled elevation
- Standalone HTML/CSS/JS package with no dependencies

## Accessibility notes
- Includes a visible skip link
- Uses semantic header/nav/main/aside structure
- Mobile menu button includes `aria-expanded` + `aria-controls`
- Drawer uses dialog semantics and is hidden from assistive/focus navigation when closed (`aria-hidden` + `inert`)
- Focus is trapped while drawer is open and restored after close
- Visible `:focus-visible` treatments across controls
- Supports reduced motion via `prefers-reduced-motion`

## Customization notes
- Update local tokens in `:root` and `html[data-theme="dark"]` to match brand colors
- Replace brand copy, nav labels, CTA text, and featured destination content in `index.html`
- Adjust breakpoint (`56.25rem`) and drawer width (`min(88vw, 24rem)`) as needed
- LocalStorage key for theme persistence: `header-travel-compass-theme`

## Digital Vault integration notes
- Component is fully scoped under `travel-*` class names for safe library composition
- Designed for package-level reuse without build tooling
- Can be dropped into Digital Vault preview systems as a standalone candidate
