# Header Creator Hub

A premium, warm, community-first header component for creator ecosystems, newsletters, digital products, and resource libraries.

## Intended Use Cases
- Creator personal brands and portfolio ecosystems
- Newsletter and content hub websites
- Digital product storefront entry headers
- Community-first landing pages and member resource libraries

## Files
- `index.html` — standalone demo markup with header, mobile panel, overlay, and contextual hero content
- `style.css` — mobile-first themed styles, responsive layout, motion, and states
- `script.js` — creator panel interactions, focus management, theme mode logic, and sticky scroll behavior
- `README.md` — package documentation

## Key Features
- CreatorNest branded mark and Digital Hub product label
- Desktop navigation with `aria-current="page"` active state on Products
- Weekly drops community chip
- Studio theme mode toggle with localStorage persistence
- Desktop Subscribe CTA
- Soft-bounce mobile hamburger and right-side creator hub panel
- Mobile panel content: navigation, community note, featured resource card, primary/secondary actions, footer note
- Overlay click and Escape key close interactions
- Sticky header scrolled refinement

## Accessibility Notes
- Skip link to main content
- Semantic landmarks (`header`, `nav`, `main`, `aside`)
- Menu button uses `aria-expanded` and `aria-controls`
- Focus trap while mobile panel is open, with focus return on Escape close
- Hidden panel uses `inert` and `aria-hidden` when closed
- Visible `:focus-visible` styling and touch-friendly controls
- Reduced motion support under `prefers-reduced-motion`

## Customization Notes
- Adjust theme tokens in `:root` and `html[data-theme="dark"]`
- Tune mobile panel width via `width: min(92vw, 24rem)`
- Update nav labels, CTA labels, and community status copy directly in HTML
- Refine bounce/transition timing in `@keyframes soft-bounce` and transition declarations

## Digital Vault Integration Notes
- Package is dependency-free and build-tool-free for drop-in integration
- Class naming is scoped to `creator-` namespaces for safe composition
- JavaScript is encapsulated in an IIFE to avoid global namespace pollution
- Theme persistence key: `header-creator-hub-theme`

> Demo subscribe/community/product actions are static UI only and do not include live backend logic.
