# Glassmorphism Hero Slider

A premium standalone hero carousel for SaaS, luxury, hospitality, and creative-brand landing pages. The package combines cinematic background imagery, layered dark overlays, and a floating glass panel with polished controls and calm motion.

## Features

- Full-bleed hero presentation with reserved layout space to avoid avoidable CLS.
- Glassmorphism content panel with blur, translucency, border, and diffused shadow.
- Previous/next controls plus progress-ring pagination buttons.
- Autoplay with pause on hover, pause on focus within, and visibility-aware resume.
- Touch swipe support, ArrowLeft/ArrowRight keyboard navigation, and live region announcements.
- Modular JavaScript that scopes behavior to each `[data-carousel]` instance.
- Reduced-motion support with calmer transitions and no Ken Burns motion.

## Accessibility

- Uses semantic slide articles inside a section-level carousel wrapper.
- Includes `aria-roledescription="carousel"`, per-slide `role="group"`, and accessible slide numbering.
- Native buttons are used for all controls.
- Maintains visible `:focus-visible` states, `aria-hidden` slide state, and polite live announcements.

## Keyboard and swipe support

- `ArrowLeft`: show previous slide.
- `ArrowRight`: show next slide.
- Pagination buttons: jump directly to a slide.
- Swipe left/right on touch or pointer devices to change slides.

## Autoplay and visibility behavior

Autoplay is enabled with `data-autoplay="true"` and timed by `data-autoplay-delay` in milliseconds. It automatically pauses while the user hovers the component, focuses any interactive element inside it, or when the carousel is less than meaningfully visible in the viewport. `IntersectionObserver` and `ResizeObserver` are used when available.

## File structure

- `index.html` – standalone demo markup.
- `style.css` – isolated component styling.
- `script.js` – modular carousel behavior and events.
- `README.md` – usage and customization notes.

## Customization

- Replace the demo image URLs in each slide’s `<picture>` sources and `<img>` tags.
- Update headings, metadata, body copy, and CTA links in `index.html`.
- Adjust autoplay timing with `data-autoplay-delay` on the carousel root.
- Tune panel styling, overlays, spacing, and typography in `style.css`.
- Listen for `carousel:ready` and `carousel:change` custom events for integration hooks.
