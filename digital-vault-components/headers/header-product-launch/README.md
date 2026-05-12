# Header Product Launch

Premium, mobile-first, conversion-focused header component for product launch pages, beta releases, startup MVPs, AI tools, and early-access landing pages.

## Intended use cases
- SaaS launch landing pages
- Beta onboarding pages
- Early-access campaigns
- MVP release pages
- Product marketing pages with strong CTA focus

## File list
- `index.html` — standalone demo page with header, launch action panel, overlay, hero context, and launch status card.
- `style.css` — complete styling, theming, responsive behavior, sticky/scrolled state, and motion/accessibility refinements.
- `script.js` — panel behavior, focus management, theme persistence, scroll state handling, and responsive cleanup.
- `README.md` — package guidance and integration notes.

## Key features
- Launch-focused brand area with product mark and Product Beta label
- Desktop landing-page navigation with clear active item treatment (`aria-current="page"`)
- Realistic launch/status badge (`Beta open`)
- Strong primary CTA slot (`Get early access`)
- Compact pill light/dark mode switch with persistent preference
- Distinct launch-line mobile menu button with open/close morph
- Right-side mobile launch action panel with:
  - launch status
  - navigation links
  - primary + secondary actions
  - short launch footer note
- Overlay/backdrop click-to-close support
- Refined sticky/scrolled header behavior

## Accessibility notes
- Includes skip link to main content.
- Uses semantic header/nav/main/aside structure.
- Mobile menu button uses `aria-expanded` and `aria-controls`.
- Panel supports Escape-to-close and keyboard focus trap.
- Focus returns to the menu button after Escape close.
- Hidden panel is non-focusable while closed (`hidden` + `inert`).
- Active nav state is not color-only (active marker included).
- Visible `:focus-visible` states are included across controls.
- Reduced-motion media query reduces transition/animation intensity.

## Customization notes
- Theme variables are centralized via CSS custom properties.
- Breakpoint is set to `56.25rem` (~900px) for desktop behavior.
- Launch brand mark can be replaced by updating inline SVG in `index.html`.
- CTA text and route targets are easy to swap in markup.
- Theme localStorage key: `header-product-launch-theme`.

## Digital Vault integration notes
- Standalone package with no external dependencies or build tooling.
- Scoped class naming keeps styles isolated for component-library integration.
- JavaScript is wrapped in an IIFE to avoid global scope pollution.
- Ready to import into a curated Digital Vault header catalog as Header #12 (Product Launch).
