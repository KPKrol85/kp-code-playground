# Header Developer Grid

A premium, mobile-first documentation header component tailored for developer products, component libraries, API references, and technical design systems.

## Intended use cases

- Component library documentation portals
- Design system and UI kit websites
- API and implementation reference hubs
- Developer resource and code example platforms

## File list

- `index.html` — standalone demo page with the header, mobile documentation index panel, overlay, and contextual documentation content.
- `style.css` — scoped styling, theme variables, responsive behavior, active navigation states, and accessibility-focused interaction styles.
- `script.js` — mobile panel controller, focus trap, keyboard/overlay close behavior, theme persistence, and header scroll-state enhancements.

## Key features

- Developer/docs-oriented GridKit brand area with grid mark
- Desktop documentation navigation with non-color-only active indicator
- Compact version badge (`v1.4`) and developer-style theme toggle
- Desktop CTA (`Copy kit`) and mobile documentation index actions
- Layered grid-inspired mobile menu trigger
- Right slide-in mobile documentation index panel with grouped content
- Light/dark theme support with `localStorage` persistence
- Sticky header behavior with subtle scrolled state

## Accessibility notes

- Includes a visible skip link for keyboard users
- Uses semantic landmarks (`header`, `nav`, `main`, `aside`)
- Mobile menu control uses `aria-expanded` and `aria-controls`
- Focus is moved into the panel on open and trapped while open
- Escape key, overlay click, nav link click, and desktop resize all close the panel
- Hidden panel content is removed from tab order when closed
- Uses `:focus-visible` and reduced-motion media query support

## Customization notes

- Update visual tokens in `:root` and `html[data-theme="dark"]` to match your product palette
- Adjust breakpoint behavior around `56.25rem` for product-specific nav density
- Rename brand copy and navigation labels directly in `index.html`
- Modify panel group blocks to map to your docs IA structure

## Digital Vault integration notes

- This package is standalone and build-tool-free for quick evaluation and ingestion
- Component classes are locally scoped under `devgrid-*` conventions for low collision risk
- The structure is ready to be wrapped into a larger KP_Code Digital Vault catalog without framework dependency
