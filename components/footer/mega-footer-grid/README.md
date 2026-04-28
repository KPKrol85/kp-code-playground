# Mega Footer Grid

A standalone, premium footer component for **KP_Code Digital Vault**. It is built for platform-scale pages that require dense navigation, clear structure, and polished interaction quality without visual overload.

## Purpose

Use this component when a page represents a broad ecosystem and needs:

- a trusted platform-level brand area,
- multi-column navigation across product and documentation surfaces,
- a clear newsletter/CTA area,
- and a utility bar for legal, social, and region/status context.

## File structure

```text
components/footer/mega-footer-grid/
├── index.html   # Component preview page and semantic footer markup
├── style.css    # Scoped visual system, layout, states, responsiveness
├── script.js    # Minimal progressive enhancement (year + email validation)
└── README.md    # Usage and customization documentation
```

## Where to use this footer

Recommended for:

- ecosystem landing pages,
- platform home pages,
- product hub entry points,
- large catalog surfaces,
- and mature digital product properties that need high-density, scannable footer navigation.

## Accessibility behavior

- Uses semantic `<footer>`, `<section>`, `<nav>`, lists, and native form controls.
- Newsletter field has a visible label and clear helper text.
- Submission feedback is announced via `role="status"` + `aria-live="polite"`.
- Focus states are explicit using `:focus-visible` for links, input, and button.
- Navigation remains available without JavaScript.

## Responsive behavior

- **Mobile (default):** stacked order: brand → newsletter → nav groups → utility bar.
- **Tablet (`min-width: 40rem`):** nav groups shift to two columns; utility bar becomes more compact.
- **Desktop (`min-width: 64rem`):** brand and newsletter become side-by-side leadership blocks, nav expands to 3 columns.
- **Wide desktop (`min-width: 80rem`):** nav reaches full mega-grid with 6 aligned columns.
- Layout avoids horizontal overflow and keeps scanability for dense link content.

## Newsletter behavior

`script.js` provides optional progressive enhancement:

- auto-updates the copyright year,
- intercepts form submit to avoid page reload,
- validates empty and malformed emails,
- shows accessible success or error feedback,
- keeps logic minimal so it can be replaced by a real backend integration later.

## Customization points

Update these areas to adapt the component:

- **Brand copy:** title, platform description, trust positioning.
- **Navigation columns:** headings, link counts, URLs, grouping logic.
- **Newsletter/CTA:** headline, value proposition, field/button text, feedback copy.
- **Social/action links:** GitHub, LinkedIn, email, or partner channels.
- **Utility context:** language/region, operational status, additional metadata.
- **Legal links:** privacy, terms, license, cookie, policy structure.
- **Visual tokens in `:root`:** colors, spacing, radii, border intensity, transition timing.

## Notes

- No frameworks or external assets are required.
- Component works by opening `index.html` directly in a browser.
- JavaScript is intentionally small and isolated.
