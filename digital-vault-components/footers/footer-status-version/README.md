# Footer Status Version (ReleaseDock)

A premium, standalone technical footer component for SaaS products, developer tooling, dashboards, documentation platforms, and component libraries.

## Purpose

This package provides a compact footer layer that emphasizes:

- product identity and technical trust
- system status presentation
- version/release clarity
- developer resource discoverability
- operational and legal link access

## Included files

- `index.html` — complete standalone demo page with one status/version footer component
- `style.css` — mobile-first, component-scoped styling system with BEM-style classes
- `script.js` — progressive enhancement for year injection, disclosure, and copy actions
- `README.md` — package notes and integration guidance

## Key features

- **Technical brand block** for ReleaseDock
- **System status module** with status dot, uptime-style metadata, region, and locally updated check timestamp
- **Version module** with current version badge, release channel/date, build label, and copy actions
- **Structured technical nav** for Product, Developers, Operations, Support, and Legal
- **Accessible technical details disclosure** with `aria-expanded` and hidden panel state
- **Bottom meta row** with dynamic year, edition/version context, status note, and legal quick links
- **Live feedback region** for copy/status action updates via `aria-live="polite"`

## Usage notes

1. Open `index.html` directly in a browser for review.
2. Keep links mapped to real routes during integration.
3. Replace demo-facing brand/version text with production metadata if needed.
4. Maintain semantic footer + grouped nav structure to preserve accessibility.

## Accessibility notes

- Uses semantic `<footer>`, grouped `<nav>` regions, real links, and real buttons.
- Disclosure toggle state is exposed with `aria-expanded` and `aria-controls`.
- Feedback is announced through an `aria-live="polite"` region.
- Keyboard focus visibility is reinforced using high-contrast `:focus-visible` styling.
- Layout/content remain useful without JavaScript (progressive enhancement approach).

## Customization notes

- Component variables are defined at `.rd-footer` (`--rd-surface`, `--rd-border`, `--rd-accent`, etc.).
- Version label and copy values can be updated via HTML `data-copy-value` attributes.
- Status tone can be adjusted by changing `.rd-status-pill` and `.rd-status-pill__dot` styles.
- Breakpoints are optimized for compact technical density at `480px`, `760px`, and `1024px`.

## Demo-status disclaimer

All status, uptime, release, and incident-related values in this package are demo UI copy.
No external services are called and no real telemetry integration is included.

## Future KP_Code Digital Vault integration notes

- Keep this package standalone for direct drop-in use.
- Promote footer data (version/channel/build/status copy) to a product config source when integrating into larger systems.
- Pair with an actual status/changelog backend only at application integration level, not at component package level.
