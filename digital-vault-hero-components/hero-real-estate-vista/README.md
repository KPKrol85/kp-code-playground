# Hero Real Estate Vista

A premium, reusable HERO package for real estate, architecture studios, interior design agencies, luxury rentals, and high-end property marketing landing pages.

## File structure

- `index.html` — KP_Code Digital Vault selector panel entry for this HERO product.
- `hero-real-estate-vista.html` — dedicated, standalone HERO implementation page.
- `style.css` — fully scoped visual system and responsive layout styles.
- `hero-real-estate-vista.js` — interaction logic for chips, dynamic details, reveal, and pointer depth.

## Included interactions

- **Interactive detail chips** (native buttons) update:
  - feature title
  - descriptive body copy
  - commercial/meta label
  - visual focus title/caption and visual state tone
- **Keyboard support** on chips using arrow navigation.
- **Reveal animation** with `IntersectionObserver`.
- **Subtle pointer depth** effect on desktop/fine-pointer devices.
- **Motion accessibility** with `prefers-reduced-motion` support.

## Accessibility notes

- Chip controls use native `<button>` elements and maintain `aria-pressed` selected state.
- Updated detail panel uses `aria-live="polite"` to communicate state changes.
- Strong `:focus-visible` outlines are included for links and controls.
- Color contrast is tuned for readable premium styling.

## Reuse instructions

1. Copy the full folder `digital-vault-hero-components/hero-real-estate-vista` into your project.
2. Reference `style.css` and `hero-real-estate-vista.js` from your page.
3. Copy the HERO section from `hero-real-estate-vista.html`.
4. Replace copy values in HTML and the `details` object in JS to match your property/product.
5. Keep class names scoped to `hero-real-estate-vista` to avoid style collisions.

This package is intentionally scoped as a single, polished HERO pattern rather than a complete listing page.
