# Header Luxury Atelier

A premium, mobile-first, standalone header component designed for quiet luxury brand experiences with refined typography, subtle interaction detail, and accessible boutique navigation behavior.

## Intended use cases

- Luxury fashion houses and collection pages
- Jewelry ateliers and private viewing experiences
- Boutique beauty and premium service brand pages
- Editorial lookbooks and high-end campaign landings

## Files

- `index.html` – standalone demo page with header, mobile boutique panel, and contextual hero/card
- `style.css` – theme tokens, responsive layout, atelier styling, interaction/focus states, and reduced-motion rules
- `script.js` – menu panel controller, focus trap, theme persistence, scroll state, and accessibility state handling
- `README.md` – component documentation

## Key features

- Typographic brand treatment for **Maison Aurelia / Luxury Atelier**
- Desktop boutique navigation with thin-line active indicator
- Accessible active state (`aria-current="page"`) not relying on color alone
- Subtle **Tone** theme toggle with light/dark support
- Refined mobile menu mark and boutique mobile panel layout
- Overlay and body scroll lock during mobile panel open state
- Escape, overlay click, nav-link click, and desktop-resize close behavior
- Focus trap and focus return behavior for keyboard users
- Calm sticky/scrolled header state with restrained visual shift

## Accessibility notes

- Includes a visible skip link to main content
- Uses semantic landmarks and native controls where possible
- Supports keyboard navigation and visible `:focus-visible` states
- Mobile menu button uses `aria-expanded` and `aria-controls`
- Mobile panel uses controlled visibility (`aria-hidden`, `inert`) and focus management
- Reduced motion support via `prefers-reduced-motion`
- Contrast is tuned for readability in both light and dark themes

## Customization notes

- Adjust tokens in `:root` and `html[data-theme="dark"]` to retheme brand tones
- Update breakpoint (`56.25rem` / `900px`) to align with project layout requirements
- Replace demo nav labels, CTA text, and editorial copy while keeping semantic/ARIA wiring
- Modify panel width with `min(90vw, 24rem)` for tighter or broader mobile presentation

## Digital Vault integration notes

- This package is fully standalone and framework-free (HTML/CSS/vanilla JS)
- Naming is component-scoped for safe inclusion in larger libraries
- JavaScript is encapsulated to avoid global namespace pollution
- Ready for insertion into KP_Code Digital Vault header catalog as a product candidate

## Demo behavior disclaimer

Demo appointment/action links are static UI only and do not implement booking, scheduling, account, or commerce logic.
