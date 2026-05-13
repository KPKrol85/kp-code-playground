# Footer Dev Console

A premium, terminal-inspired footer component for developer tooling products, documentation portals, technical SaaS interfaces, and component libraries.

## Included files

- `index.html` — standalone demo page with one footer component instance.
- `style.css` — scoped, mobile-first styles for the Dev Console footer.
- `script.js` — progressive enhancements for year injection, copy feedback, and command-group highlighting.

## Purpose

Footer Dev Console provides a practical link layer for technical products while preserving a polished command-line aesthetic. It is designed as a reusable KP_Code Digital Vault component package rather than a one-off demo.

## Key features

- Terminal-style identity area with prompt label (`kp@vault:~$`) and product naming.
- Copyable command snippet (`npm create vault-footer@latest`) with accessible feedback.
- Command-group navigation for docs, source, system, support, and legal link clusters.
- Keyboard-shortcut inspired chips for visual hierarchy (`⌘1` through `⌘5`).
- System info panel with environment, version, branch, build, and status values.
- Compact bottom metadata row with dynamic current year and technical status text.
- Optional click-to-highlight command groups for quicker scanning.

## Usage notes

1. Open `index.html` directly in a browser.
2. Copy the footer markup into your product layout.
3. Keep class names as-is to retain scoped styling.
4. Update href values to your real documentation, repository, and support destinations.

## Accessibility notes

- Uses a semantic `<footer>` landmark and grouped headings.
- Uses real interactive controls (`<button>`, `<a>`).
- Includes `aria-live="polite"` feedback for copy action updates.
- Supports keyboard access and visible `:focus-visible` states.
- Works as a readable link/footer structure even if JavaScript is unavailable.

## Customization notes

- Tune theme tokens in `.dev-console-footer` custom properties.
- Replace command text and status metadata to match your product.
- Remove or adjust group highlighting behavior in `script.js` if not needed.

## Demo-command disclaimer

`npm create vault-footer@latest` is UI-only demo content for this standalone preview and is not presented as an executable product claim.

## Future KP_Code Digital Vault integration

- Can be wrapped as a package-level footer module.
- Can be converted to template partials for static-site generators.
- Can be mapped to design-system tokens for brand variants while keeping the same semantic structure.
