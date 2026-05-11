# Header Minimal Studio

A premium, typography-first header component designed for portfolio sites, agencies, creative studios, and service-led digital brands.

## Intended use cases

- Creative studio websites with a refined editorial feel
- Personal portfolios with premium navigation structure
- Agency and freelancer landing pages that need quiet, high-legibility UI
- Service brands requiring a minimalist header with dark/light theme support

## File list

- `index.html` — standalone demo page with full component markup and contextual hero copy
- `style.css` — mobile-first styles, theme tokens, responsive behavior, interactions, and accessibility states
- `script.js` — menu state management, theme persistence, keyboard handling, and scroll-state enhancement
- `README.md` — package documentation

## Key features

- Mobile-first sticky header with minimalist brand area (`Northline / Digital Studio`)
- Calm desktop navigation with restrained line-reveal interactions
- Minimal light/dark mode toggle with localStorage persistence (`header-minimal-studio-theme`)
- Responsive action link placement (desktop header + mobile menu footer)
- Two-line hamburger morph animation into close mark
- Large studio-style mobile panel with numbered links and availability message
- Subtle scrolled header state using passive scroll listener + `requestAnimationFrame`

## Accessibility notes

- Visible skip link for keyboard users
- `aria-expanded` + `aria-controls` wiring on the mobile menu button
- Escape-to-close support for the mobile menu
- Click-outside and overlay-close support for mobile menu dismissal
- Menu links removed from tab order while the panel is hidden
- Focus is returned to the menu button after Escape close
- Clear `:focus-visible` outlines for links and controls
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`

## Customization notes

- Update theme variables in `:root` and `html[data-theme="dark"]` for brand-specific palettes
- Adjust `--ms-container` and `--ms-header-height` for different layout systems
- Replace navigation labels and CTA text in `index.html` while keeping class and ARIA structure
- Tune the desktop breakpoint in both CSS and JS (`56.25rem`) if your project uses a different responsive grid

## Digital Vault integration notes

- Component is standalone and dependency-free (no frameworks, no build step)
- Uses scoped `minimal-` prefixed class names to avoid collision in larger vault bundles
- Suitable for inclusion as the fourth distinct header style in the KP_Code Digital Vault header series
- Distinct visual language: typography rhythm, whitespace, subtle line motion, and studio-grade restraint
