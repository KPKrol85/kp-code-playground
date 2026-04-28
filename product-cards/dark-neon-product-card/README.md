# Dark Neon Product Card

Dark Neon Product Card is a premium, dark-mode-first product card package for **KP_Code Digital Vault** technical listings. It is designed for developer-facing assets where hierarchy, clarity, and polished visual depth matter.

## Role in KP_Code Digital Vault

This component targets high-value technical products such as JavaScript tools, dashboard building blocks, frontend utilities, and advanced templates. It balances subtle neon emphasis with clean structure so cards feel premium and commercially credible.

## Included files

- `index.html` – standalone preview page with four demo product cards
- `style.css` – scoped styling, design tokens, responsiveness, dark-mode-first visuals, and reduced-motion handling
- `script.js` – progressive enhancement for pointer-tracked glow and selected-asset live status updates
- `README.md` – usage and customization notes

## Recommended use cases

- Developer assets in Digital Vault catalog sections
- Vanilla JavaScript tools and helper libraries
- Dashboard components and metric UI bundles
- Technical templates and frontend starter kits
- Advanced frontend utilities with compatibility tags
- Dark-mode-focused product galleries and marketplace rows

## Customization options

You can adapt each card by changing:

- Technical badge label (`Dev asset`, `JS tool`, `Dashboard kit`, `Technical template`)
- Product name
- Technical description
- Stack/compatibility tags
- Price or status label
- CTA label text
- Mini code-like preview rows (terminal or API-style snippets)
- Neon accent colors through local CSS tokens (`--accent`, `--accent-soft`)
- Pointer-tracking glow behavior (via `--pointer-x` and `--pointer-y` updates)

## Accessibility and behavior notes

- Uses semantic `section`, `article`, `header`, `footer`, and list markup for tags
- Includes visible `:focus-visible` treatment on CTA controls
- Uses `:focus-within` to improve keyboard card context
- Provides a polite `aria-live` status message for selected assets
- Keeps content understandable without glow, hover, or JavaScript
- Marks decorative mini preview panels with `aria-hidden="true"`

## Responsive and motion behavior

- Mobile-first one-column layout by default
- Two-column layout on medium screens
- Three-column gallery on large screens with a balanced featured row
- Tags wrap cleanly and CTA remains tappable on small screens
- Supports `prefers-reduced-motion: reduce` by disabling pointer-tracking movement and removing lift motion
- Uses progressive enhancement so the static layout remains fully usable when JavaScript is unavailable
