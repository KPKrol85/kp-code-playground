# Footer Creator Studio

A premium, creator-focused footer component for educational products, course businesses, workshops, newsletters, and resource libraries.

## Included files

- `index.html` – standalone demo page with one primary footer component.
- `style.css` – scoped BEM-style component CSS with responsive behavior.
- `script.js` – progressive enhancement for year injection, signup validation, and copy micro-action.

## Key features

- Creator identity block with positioning statement.
- Featured workshop CTA area with primary and secondary actions.
- Newsletter signup form with accessible inline validation feedback.
- Segmented navigation groups for Learn, Resources, Community, Studio, and Legal.
- Trust microcopy and compact bottom meta row with availability note and social links.
- Warm, editorial, commercially polished visual direction for creator/education brands.

## Accessibility notes

- Uses a semantic `<footer>` landmark and grouped `<nav>` regions with labels.
- Signup form includes a real `<label>`, helper text, and aria-live feedback.
- Validation states include `aria-invalid` and clear inline messaging.
- Strong visible `:focus-visible` treatment for keyboard users.
- Component remains useful without JavaScript (static content + native form controls).

## Usage notes

1. Copy the four files into any static or server-rendered project.
2. Keep class names under the `creator-footer` namespace to avoid style collisions.
3. Replace demo links, social URLs, and CTA destinations with production routes.
4. Hook the signup form submit handler to your own endpoint when integrating.

## Customization ideas

- Update custom properties inside `.creator-footer` to match brand color and tone.
- Swap the trust statement and cohort note for campaign-specific copy.
- Expand or reduce nav groups based on product catalog depth.
- Replace copy-email micro-action with a copy-workshop-link action if preferred.

## KP_Code Digital Vault integration notes

- Packaged as a standalone component-ready folder for the footer library.
- Architecture is intentionally framework-agnostic and production-friendly.
- Suitable for future tokenization into a design system variant set.
