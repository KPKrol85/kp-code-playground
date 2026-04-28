# Product Preview Card

Product Preview Card is a premium, visual-first component for **KP_Code Digital Vault**. It is designed to sell digital assets through strong first impression, polished mockup treatment, and concise support text.

## Included files

- `index.html` – standalone demo page with reusable Product Preview Card examples
- `style.css` – scoped design tokens, layout, visual polish, and responsive + accessibility states
- `script.js` – progressive enhancement for live preview status updates and active card state
- `README.md` – component usage and customization notes

## Best use cases

- UI kit previews
- landing starter previews
- dashboard template previews
- visual component packs
- product screenshot gallery cards

## Component structure highlights

Each card includes:

- large preview/mockup area (hero element)
- overlay badge and support label
- product title
- short description
- wrapped tags
- primary CTA (`View product`)
- secondary live preview link (`Live preview`)

## Customization options

You can safely adapt the component by editing:

- preview/mockup area composition (`.preview-card__mockup`, mockup layout variants)
- overlay badge text (`.preview-card__badge`)
- product title (`.preview-card__title`)
- short description (`.preview-card__description`)
- tags list (`.preview-card__tags`)
- CTA label and URL (`.preview-card__cta`)
- Live preview label and URL (`.preview-card__live`)
- active preview style (`.preview-card.is-active`)

## Accessibility and UX

- semantic `section` + `article` structure
- heading hierarchy per card title
- keyboard-visible focus styles via `:focus-visible`
- overlay visibility on both hover and `:focus-within`
- non-essential mockup shapes are decorative (`aria-hidden="true"`)
- `aria-live="polite"` status message for live preview actions

## Responsive behavior

- mobile-first single-column stack
- two-column grid on medium screens
- balanced three-column gallery on large screens with featured first card span
- `aspect-ratio` keeps preview area stable and avoids layout shift

## Theme and motion support

- premium light theme by default
- dark mode using `prefers-color-scheme: dark`
- reduced-motion support via `prefers-reduced-motion: reduce`
- hover/focus polish without disruptive motion

## Progressive enhancement

Without JavaScript, all content and actions remain available.
With JavaScript enabled, clicking **Live preview** updates a polite status message and marks the selected card as active.
