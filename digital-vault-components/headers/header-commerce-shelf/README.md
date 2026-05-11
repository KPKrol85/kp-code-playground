# Header Commerce Shelf

Header Commerce Shelf is a premium, category-first header component for digital goods storefronts, SaaS product catalogs, template libraries, and curated marketplace browsing experiences.

## Intended use cases

- Template and component stores
- SaaS pricing/product navigation
- Digital asset marketplaces
- Premium resource libraries
- KP_Code Digital Vault browsing flows

## File list

- `index.html` — standalone demo page with header, mobile shelf drawer, backdrop, and product-context content
- `style.css` — mobile-first styling, theming tokens, interaction states, and responsive layout
- `script.js` — drawer behavior, focus trap, scroll lock, keyboard controls, theme state, and scroll-state enhancement
- `README.md` — package notes and integration guidance

## Key features

- Category-first desktop navigation with active state (`Components`)
- Vault action button with visible count badge (`2`) and accessible label
- Commerce-style light/dark mode toggle with persisted preference (`header-commerce-shelf-theme`)
- Mobile shelf-inspired hamburger motion and right-side slide-in drawer
- Curated drawer sections: categories, featured product card, quick links, CTA, and vault summary
- Sticky header with subtle scrolled-state elevation

## Accessibility notes

- Includes a visible skip link for keyboard users
- Uses semantic landmarks (`header`, `nav`, `main`, `aside`)
- Mobile shelf trigger uses `aria-expanded` and `aria-controls`
- Drawer supports Escape key close, overlay close, and close-on-link behavior
- Focus is moved into the drawer on open, trapped while open, then restored on close
- Hidden drawer content is removed from tab order while closed
- Focus-visible styles are provided for interactive controls
- Reduced-motion mode is respected via `prefers-reduced-motion`

## Customization notes

- Update color tokens in `:root` and `html[data-theme="dark"]`
- Adjust the desktop breakpoint at `56.25rem` to match host layout
- Replace nav labels, drawer quick links, featured card copy, and CTA text per product line
- Swap the `VM` brand mark with SVG if needed while preserving accessible brand text

## Digital Vault integration notes

- Designed as a standalone, dependency-free package for direct drop-in use
- Keeps class names scoped to avoid collisions with unrelated components
- Works as a reusable premium header variant distinct from Command Dock, Aurora Glass, Neon Console, and Minimal Studio headers
- Vault action is intentionally non-transactional to fit multiple product-library contexts
