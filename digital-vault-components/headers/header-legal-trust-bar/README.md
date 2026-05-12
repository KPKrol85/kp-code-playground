# Header Legal Trust Bar

A premium, mobile-first legal/compliance header component for the KP_Code Digital Vault library. It emphasizes formal readability, trust messaging, document-first navigation, and accessible interaction patterns across desktop and mobile.

## Intended use cases

- Legal websites and law firm informational pages
- Compliance centers and governance documentation hubs
- Policy pages (privacy, terms, cookies)
- Legal-tech product trust centers
- Enterprise documentation systems that require formal navigation

## Files

- `index.html` — standalone demo page with the full component and realistic legal/compliance context
- `style.css` — scoped styling, tokens, responsive layout, theme support, and interaction states
- `script.js` — mobile legal panel controller, focus management, scroll lock, theme persistence, and sticky scrolled behavior
- `README.md` — package documentation

## Key features

- Formal trust bar with clear non-claim-based guidance copy
- Legal/trust brand area with scalable inline SVG mark
- Desktop legal/compliance navigation with structural active indicator
- Formal contrast toggle (`Contrast`) with dynamic accessible labels
- Mobile right-side legal/documentation panel with key policy links and CTA
- Overlay click close, Escape close, and resize cleanup at desktop breakpoint (~900px)
- Body scroll lock while panel is open
- Light/dark theme support via `html[data-theme]` and localStorage
- Subtle sticky/scrolled visual refinement for reading stability

## Accessibility notes

- Skip link included for keyboard users
- Semantic landmark structure (`header`, `nav`, `main`, `aside`)
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Dialog-like mobile sheet with focus trapping while open
- Focus returns to trigger after Escape-close
- Hidden mobile panel links are removed from tab order when closed
- Strong `:focus-visible` treatment and touch-friendly control sizing
- Active navigation state uses typography + underline marker (not color alone)
- Reduced-motion support using `@media (prefers-reduced-motion: reduce)`

## Customization notes

- Update design tokens in `:root` and `html[data-theme="dark"]` for palette tuning
- Adjust breakpoint in CSS media query and JS `BREAKPOINT` constant together
- Replace brand text/mark while preserving SVG proportions and contrast
- Swap navigation/document items for your legal IA while keeping aria-current usage
- Tune trust note phrasing for your organization without adding legal claims

## Digital Vault integration notes

- Standalone dependency-free package (HTML/CSS/vanilla JS)
- Scoped class naming under `legal-header` and `legal-panel`
- Ready to plug into the header component series as a distinct formal/legal variant
- Safe for progressive enhancement; core content remains readable without JS

## Important note

This demo content is for UI demonstration only and is **not legal advice**.
