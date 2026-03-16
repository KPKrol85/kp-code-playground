# Buttons 01 - Premium Reusable Button Pack

A production-minded, mobile-first button component package built with semantic HTML, vanilla CSS, and lightweight vanilla JavaScript.

## Included Variants

1. **Aurora (Primary)**
   - Gradient premium CTA for high-priority actions.
2. **Crest (Secondary)**
   - Refined outline/surface button for neutral actions.
3. **Orbit (Accent)**
   - Expressive dark accent button with icon support.

## Files

- `buttons.html` - Complete demo preview with grouped variant examples.
- `buttons.css` - Strict BEM component styling with responsive breakpoints.
- `buttons.js` - Small progressive enhancement for pressed-state interaction polish.

## BEM Structure

- Block: `buttons-pack`
- Elements: `buttons-pack__section`, `buttons-pack__header`, `buttons-pack__group`, etc.
- Button Block: `btn`
- Button Modifiers: `btn--aurora`, `btn--crest`, `btn--orbit`
- Button Elements: `btn__label`, `btn__icon`, `btn__icon--end`

## Responsive Breakpoints

- Base: mobile-first defaults
- `@media (min-width: 480px)`
- `@media (min-width: 760px)`
- `@media (min-width: 1024px)`

## Usage

Open `buttons.html` in a browser to preview the full component set.

To reuse in another project:

1. Copy `buttons.css` and `buttons.js`.
2. Reuse button markup from `buttons.html`.
3. Keep BEM class names unchanged for consistent styling behavior.
