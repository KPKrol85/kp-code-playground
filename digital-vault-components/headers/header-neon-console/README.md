# Header Neon Console

A premium, mobile-first, terminal-inspired header component for developer platforms, API products, cybersecurity tools, and technical SaaS interfaces.

## Intended use cases

- Developer tool navigation bars
- CLI/automation product marketing pages
- Documentation and status portal headers
- Technical admin and control surfaces

## Files

- `index.html` — standalone demo with component markup, hero context, and pseudo-terminal preview card
- `style.css` — complete styling for theme system, responsive layout, states, and motion handling
- `script.js` — menu control, theme persistence, keyboard behavior, and scroll state handling
- `README.md` — component notes and integration guidance

## Key features

- Terminal prompt brand styling (`$ NeonConsole`)
- Command-path desktop navigation (`/dashboard`, `/components`, `/docs`, `/status`)
- Compact power toggle with persisted `SYS:DARK` / `SYS:LIGHT` state
- Cursor-inspired mobile menu button (`>_` ⇄ `×_`)
- Console-style mobile dropdown panel with status lines
- Sticky technical system-bar shell with subtle scroll-elevation state
- Clean dark/light mode implementation using `html[data-theme]`

## Accessibility notes

- Includes a visible skip link for keyboard users
- Uses native `button` and `a` controls with clear semantic structure
- Mobile menu button implements `aria-expanded` + `aria-controls`
- Supports Escape key close and focus return to menu button
- Closes menu on outside click and after mobile link activation
- Hidden mobile menu uses `[hidden]` so inactive controls are not focusable
- Strong `:focus-visible` styles with both outline and glow (not color-only)
- Reduced motion support via `prefers-reduced-motion`

## Customization notes

- Update design tokens in `:root` / `html[data-theme="light"]` for branding
- Tune breakpoint at `56.25rem` to fit product layout behavior
- Adjust command-nav labels and system text directly in markup
- Replace CTA destination in both desktop and mobile CTA links

## Digital Vault integration notes

- Package is dependency-free and build-tool-free (HTML/CSS/JS only)
- Scoped class naming follows the `neon-header` / `neon-console` component pattern
- JavaScript is isolated in an IIFE to avoid global namespace pollution
- Ready for extraction into the KP_Code Digital Vault header catalog as a standalone product candidate
