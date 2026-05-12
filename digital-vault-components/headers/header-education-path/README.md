# Header Education Path

Premium mobile-first header component for learning products, built as a standalone Digital Vault candidate.

## Intended use cases
- Course platforms and academies
- Learning-path dashboards and tutorial hubs
- Bootcamp portals and professional upskilling products
- Flashcard and lesson-based education tools

## Files
- `index.html` — Standalone demo page with full header, syllabus panel, and supporting context.
- `style.css` — Complete mobile-first styling, theme system, responsive behavior, and path-oriented visuals.
- `script.js` — Drawer controls, focus trap, escape/overlay close, scroll lock, theme persistence, and scrolled state.
- `README.md` — Component documentation.

## Key features
- Learning-path brand identity with connected-node mark
- Desktop path navigation with progress-oriented active indicator (`aria-current="page"`)
- Module status badge (`Module 04`) on desktop and inside mobile syllabus panel
- Study mode toggle with Day/Night states and theme persistence
- Path-step mobile menu button with reduced-motion-friendly transitions
- Structured right-side mobile syllabus panel with current path, module list, nav links, CTA, and footer note
- Sticky header with subtle scrolled-state refinement

## Accessibility notes
- Skip link included for keyboard users
- Semantic landmarks (`header`, `nav`, `main`, `aside`)
- Mobile panel control uses `aria-expanded` + `aria-controls`
- Escape-key close, overlay-click close, and close-on-link behavior included
- Focus trap active only while panel is open
- Focus returns to trigger button after Escape close
- Hidden panel is removed from tab order via `hidden` + `inert`
- Strong visible `:focus-visible` styles and non-color-only active states
- Reduced motion support via `prefers-reduced-motion`

## Customization notes
- Theme tokens are scoped to CSS custom properties in `:root` and `html[data-theme="dark"]`
- Drawer width controlled with `width: min(92vw, 24rem)`
- Desktop breakpoint set at `56.25rem` (900px)
- Local storage key for study mode: `header-education-path-theme`
- Brand, nav items, module labels, and CTA text can be edited directly in `index.html`

## Digital Vault integration notes
- Standalone package with no dependencies or build tooling
- Scoped class naming to avoid collisions in component libraries
- Progressive enhancement ready: component renders cleanly without JavaScript, with enhanced panel/theme behavior when JS is available
- Designed to be distinct within a multi-header series by emphasizing education path structure and syllabus navigation identity
