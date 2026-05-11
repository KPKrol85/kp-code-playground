# Header Commerce Shelf

A premium mobile-first commerce header component for digital product stores, component marketplaces, and paid resource libraries.

## Intended use cases

- Online template and component stores
- SaaS product catalog and pricing navigation
- Digital Vault browsing flows for saved resources
- Marketplace-style product discovery pages

## File list

- `index.html` — standalone demo page with header, shelf drawer, overlay, hero context, and preview cards
- `style.css` — theme tokens, responsive component styles, drawer motion, focus states, and reduced-motion handling
- `script.js` — shelf drawer logic, focus trap, body scroll lock, theme persistence, and scroll-state behavior

## Key features

- Category-first desktop navigation with active state support
- Visible `Vault` action with count badge for saved items
- Compact, commerce-style light/dark theme toggle
- Mobile shelf drawer with curated categories, featured product card, quick links, vault summary, and CTA
- Overlay, Escape handling, overlay click close, and mobile link-close behavior
- Sticky header with subtle scrolled elevation

## Accessibility notes

- Includes a visible skip link for keyboard users
- Uses semantic landmarks (`header`, `nav`, `main`, `aside`)
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Drawer closes on `Escape`, supports keyboard focus trapping, and restores focus on close
- Hidden drawer content is not focusable while closed via `hidden` + `inert`
- Uses high-contrast styles and `:focus-visible` states in both themes
- Respects `prefers-reduced-motion`

## Customization notes

- Update design tokens in `:root` and `html[data-theme="dark"]` for branding
- Change breakpoint in both CSS and JS (`56.25rem`) if your layout needs a different desktop threshold
- Replace demo product cards and shelf content with real data from your storefront
- Rewire CTA and nav links to production routes when integrated

## Digital Vault integration notes

- Keep the `Vault` action as a reusable slot for saved-item workflows
- Pair this header with catalog, pricing, and product detail templates for consistent navigation
- Preserve class naming conventions (`commerce-header*` / `commerce-shelf*`) to simplify cross-component theming
- Local theme preference key is `header-commerce-shelf-theme` for isolated component-level persistence
