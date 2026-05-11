# Header Aurora Glass

Header Aurora Glass is a premium floating glassmorphism header component for landing pages and product-focused web experiences. It is part of the KP_Code Digital Vault header series and intentionally emphasizes a soft ambient visual language distinct from command-style interfaces.

## Intended Use Cases

- SaaS landing pages
- AI tool marketing pages
- Product launch pages
- Creative technology portfolios
- Premium digital brand websites

## Files

- `index.html` — standalone demo page with the full header and supporting landing context
- `style.css` — mobile-first styling, theme tokens, glass effects, responsive layout, and motion/accessibility behavior
- `script.js` — mobile menu logic, theme management, scroll-state enhancements, and responsive cleanup
- `README.md` — implementation notes for Digital Vault integration

## Key Features

- Floating sticky glass capsule header with ambient gradients and restrained blur
- Brand area with logo mark, name, and product label
- Desktop navigation with active-state support
- Ambient sun/moon light and dark theme toggle
- Desktop CTA (`Start Preview`)
- Mobile-first top bar with modern hamburger control
- Floating glass mobile menu panel with nav links, CTA, and supporting meta text
- Outside-click and Escape-to-close behavior for mobile menu
- Menu state reset when resizing to desktop breakpoint (`56.25rem`)
- Reduced-motion support and visible `:focus-visible` states

## Accessibility Notes

- Includes a keyboard-visible skip link to main content
- Uses semantic `header`, `nav`, and `main` landmarks
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Theme toggle updates accessible labels based on active mode
- Supports keyboard interaction without focus traps
- Menu closes on Escape and returns focus to the menu button

## Customization Notes

- Update design tokens in `:root` and `html[data-theme="dark"]` for brand color adaptation
- Adjust desktop breakpoint in CSS and JS (`56.25rem`) if product requirements differ
- Replace navigation link targets and CTA URL with production routes
- Tune blur/shadow intensity for brand-specific glassmorphism depth

## Digital Vault Integration Notes

- Ships as a standalone no-dependency package (HTML/CSS/vanilla JS)
- Uses scoped `aurora-*` class naming to reduce style collisions
- Theme persistence key: `header-aurora-glass-theme`
- Ready for direct inclusion in the KP_Code Digital Vault header component catalog
