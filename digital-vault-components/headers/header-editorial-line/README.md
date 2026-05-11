# Header Editorial Line

A premium masthead-inspired header component for publication-focused digital products in the KP_Code Digital Vault component library.

## Intended Use Cases

- Editorial homepages and publication landing pages
- Premium blogs and long-form content hubs
- Digital journal and newsletter websites
- Magazine-style archives and section indices

## File List

- `index.html` — standalone demo page with editorial header, mobile table-of-contents menu, and content context
- `style.css` — mobile-first styles, theme variables, masthead typography, thin-line nav, focus states, and responsive behavior
- `script.js` — reading mode theme controller, mobile menu state controller, accessibility state sync, and sticky scroll-state handling
- `README.md` — package guidance and integration notes

## Key Features

- Masthead-led branding treatment centered on editorial typography
- Issue metadata line (`Issue 06 / May 2026`) and product label (`Digital Journal`)
- Desktop thin-line section navigation with an understated active marker
- Reading mode toggle with explicit text labels (`Read: Light` / `Read: Dark`)
- Mobile publication menu designed as a table of contents with numbered links
- Featured article preview inside mobile menu (`Designing quiet interfaces`, `8 min read`)
- Light/dark theme support with persistence via `localStorage`

## Accessibility Notes

- Includes a visible skip link to jump to main content
- Uses semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Mobile menu button includes `aria-expanded` and `aria-controls`
- Escape key support closes the mobile menu and returns focus to the toggle button
- Hidden mobile menu links are removed from tab order when closed
- Strong `:focus-visible` styling across interactive elements
- Supports `prefers-reduced-motion`

## Customization Notes

- Update theme palette via root-level CSS custom properties
- Adjust breakpoint at `56.25rem` for desktop nav reveal behavior
- Change publication title, issue metadata, nav labels, and featured article content directly in `index.html`
- Rename storage key `header-editorial-line-theme` in `script.js` if namespace isolation is needed per host app

## Digital Vault Integration Notes

- Component is standalone and has no external dependencies or build steps
- Class naming is scoped to `editorial-header` and `editorial-menu` blocks for easier package-level portability
- Safe to embed in static pages, CMS templates, or component showcases within the KP_Code Digital Vault library
