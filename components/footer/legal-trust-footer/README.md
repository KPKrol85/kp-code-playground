# Legal Trust Footer

A standalone premium **Legal Trust Footer** component for **KP_Code Digital Vault** pages where legal confidence and support clarity are crucial before or after purchase.

## Purpose

This footer is designed to reinforce trust in commercial digital product contexts by combining:

- Clear ownership and brand responsibility.
- Fast access to legal policy links.
- Compact trust assurances that reduce purchase hesitation.
- Visible support and contact access.

## File structure

```text
legal-trust-footer/
├── index.html   # standalone preview with semantic footer markup
├── style.css    # scoped premium trust-focused visual system
├── script.js    # optional enhancements (current year + copy email)
└── README.md
```

## Recommended usage

Use this component on:

- Paid digital product pages
- Checkout preparation pages
- Sales pages with legal scrutiny
- Commercial product detail pages
- Trust-focused product funnels

## Accessibility behavior

- Uses semantic `<footer>`, grouped `<section>`, and labeled `<nav>` regions.
- Preserves full keyboard access for links and buttons.
- Includes visible `:focus-visible` styling for keyboard users.
- Uses `role="status"` + `aria-live="polite"` for copy-to-clipboard feedback.
- Keeps JavaScript optional; component remains fully functional without `script.js`.

## Responsive behavior

- **Mobile-first (default):** stacked layout with trust blocks near the top for rapid scanning.
- **Tablet (≥ 48rem):** two-column grouping that balances brand/support and legal/trust content.
- **Desktop (≥ 72rem):** four-column grid for brand note, trust cards, legal links, and support links.
- Footer dimensions and spacing avoid horizontal overflow.

## Customization points

You can customize without changing structure:

- **Legal links:** edit legal items inside the `aria-label="Legal links"` nav.
- **Support links:** edit support items inside the `aria-label="Support links"` nav.
- **Trust messages:** update `.ltf-footer__trust-item` text.
- **Owner note:** update `.ltf-footer__owner-note` text.
- **Badge text:** update `.ltf-footer__badge` text (e.g., team/brand attribution).
- **Support email:** change `.ltf-footer__support-email` `href` and text content.
- **Copyright:** update static text in `.ltf-footer__copyright`; year auto-updates.
- **Theme tokens:** adjust CSS custom properties in `:root` for colors, spacing, and radii.
