# Compact App Footer

A lightweight, premium footer component for small KP_Code Digital Vault tools. It is designed for calculators, trackers, generators, and focused utilities where footer information should remain useful, compact, and visually calm.

## File structure

```text
components/footer/compact-app-footer/
├── index.html   # Standalone component preview page
├── style.css    # Scoped visual system and responsive layout
├── script.js    # Optional enhancements (year + status toggle)
└── README.md    # Usage and customization notes
```

## Purpose and usage

Use this component when a tool needs:

- clear product/app identity
- quick access to essential utility links
- subtle version and status metadata
- a low-height footer that does not dominate the UI

Best fit examples:

- calculators
- trackers
- generators
- compact utilities and mini-app pages

## Default and optional sticky behavior

- **Default (recommended):** `.caf-footer` remains part of normal page flow and stays non-intrusive.
- **Optional sticky variant:** add `.caf-footer--sticky` to the footer element to keep it pinned near the bottom edge while scrolling.

Example:

```html
<footer class="caf-footer caf-footer--sticky" aria-label="Vault Calculator footer">
  ...
</footer>
```

## Accessibility behavior

- semantic `<footer>` root and labeled `<nav>` for utility links
- native link and button controls with full keyboard access
- clear `:focus-visible` styles for links and status button
- tap-friendly utility link hit areas on mobile
- support for `prefers-reduced-motion`
- status element uses `aria-live="polite"` for lightweight status updates

## Responsive behavior

- mobile-first layout using wrapped flex rows
- compact stacked/wrapped structure on narrow screens
- balanced single-line horizontal composition on larger viewports
- no horizontal overflow by design with flexible wrapping and spacing

## Customization points

You can safely customize:

- **Product name:** `.caf-footer__product` text (e.g., `Vault Calculator`)
- **Brand/suite line:** `.caf-footer__suite` text (e.g., `KP_Code Digital Vault`)
- **Utility links:** `Help`, `Privacy`, `Terms`, `Feedback` labels and targets
- **Version:** `.caf-footer__version` text (e.g., `v1.0`)
- **Status text options:** `statuses` array in `script.js`
- **Sticky behavior:** add/remove `.caf-footer--sticky`
- **Copyright:** keep year auto-updated via `[data-current-year]`

## Notes

- The component is standalone and works by opening `index.html` directly in a browser.
- JavaScript is optional and easy to remove; the footer remains fully usable without it.
