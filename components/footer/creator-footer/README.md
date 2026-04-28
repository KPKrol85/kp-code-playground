# Creator Footer (KP_Code Digital Vault)

A standalone premium footer component for creator-led experiences where credibility, personality, and product clarity matter.

This footer highlights **Kamil Król / KP_Code** as the creator behind **KP_Code Digital Vault** and is designed for reusable component-library integration.

## Purpose

Use this component when you want a footer that feels:

- Personal but professional
- Warm yet commercially credible
- Product-focused rather than corporate or dashboard-like

It is especially suitable for:

- Blog posts and editorial pages
- Product story pages
- Case studies
- Personal product pages
- Creator-led landing pages

## File structure

```text
components/footer/creator-footer/
├── index.html   # Standalone preview page with semantic footer markup
├── style.css    # Scoped premium creator-led visual system
├── script.js    # Optional progressive enhancements (year + copy email)
└── README.md    # Component documentation
```

## Accessibility behavior

- Uses semantic `<footer>`, `<section>`, `<aside>`, and `<nav>` landmarks.
- Includes clear keyboard-visible focus states for links and the contact button.
- Provides an `aria-live="polite"` feedback region for copy-to-clipboard status.
- Keeps link/button controls native for predictable keyboard and assistive tech behavior.
- Works if JavaScript is unavailable (content remains fully usable).

## Responsive behavior

- **Mobile-first:** stacked sections with creator identity and mission first.
- **Tablet:** two-column layout separating narrative content from utility links and roadmap block.
- **Desktop:** editorial/product grid with mission on the left, roadmap accent in the middle, links/legal on the right.
- Designed to avoid horizontal overflow across common viewport sizes.

## JavaScript enhancements (optional)

`script.js` adds lightweight progressive enhancements:

1. Auto-updates the copyright year.
2. Enables copy-to-clipboard for the contact email with accessible success/failure messaging.

The component remains usable without JavaScript.

## Customization points

Update these sections to adapt for another creator brand while keeping structure:

- **Creator note:** adjust the paragraph under the creator identity.
- **Mission copy:** tailor the value proposition and target audience.
- **Creator/action links:** replace GitHub, LinkedIn, Portfolio, Contact destinations.
- **Currently building / Next in Vault items:** update roadmap bullets (2–3 concise entries recommended).
- **Legal links:** point Privacy, Terms, and License to real routes.
- **Copyright line:** adjust creator/brand name and signature detail.

## Usage

Open `index.html` directly in a browser to preview.

For production integration, copy the footer markup into your page/component template and include `style.css` (and optionally `script.js`).
