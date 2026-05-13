# Footer Documentation Portal

A premium standalone documentation-focused footer component for technical docs ecosystems, including API portals, SDK docs, versioned manuals, and design-system documentation.

## Included files

- `index.html` – standalone documentation-page demo with one production-style footer component.
- `style.css` – scoped, mobile-first styling with responsive documentation layouts and accessibility states.
- `script.js` – progressive enhancement for year injection, docs version metadata updates, optional local persistence, docs tree disclosure, and scoped URL copy feedback.

## Key features

- Documentation product identity area with positioning line.
- Structured docs tree navigation with clear indentation.
- Accessible docs version selector (`label` + native `select`) and live metadata sync.
- Resource group navigation for references, learning, releases, community, support, and legal.
- Compact bottom metadata row with badges and legal/meta links.
- Optional copy-docs-URL micro action with `aria-live` feedback.

## Usage notes

1. Open `index.html` in a browser.
2. Integrate the `<footer class="footer-docs">...</footer>` block into a docs page layout.
3. Keep class names intact to preserve styles and behavior.
4. Update link targets, product naming, and metadata labels for your environment.

## Accessibility notes

- Uses semantic `footer` and multiple labeled `nav` regions.
- Interactive controls use native elements (`button`, `select`) with keyboard accessibility.
- Docs tree disclosure uses `aria-expanded` and `[hidden]` state.
- Status updates use polite live regions.
- Includes strong `:focus-visible` styling and reduced-motion support.
- Footer content remains useful if JavaScript is disabled.

## Customization notes

- Component-level custom properties are declared in `.footer-docs` for easy theming.
- Grid breakpoints are tuned for docs-tree density at `480px`, `760px`, and `1024px`.
- Metadata badges and panel styles can be adjusted without changing semantic structure.

## Demo versioning disclaimer

The version selector demonstrates local UI state only. It does not implement routing, fetch real docs content, or switch actual documentation versions.

## Future KP_Code Digital Vault integration

- Map link groups to live docs routes.
- Connect selected docs version to portal-level state/router if required.
- Reuse the footer package as a shared documentation navigation layer across product docs surfaces.
