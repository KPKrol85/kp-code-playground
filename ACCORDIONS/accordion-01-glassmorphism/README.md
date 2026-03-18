# Accordion 01 · Glassmorphism

A premium standalone accordion package with a restrained glassmorphism aesthetic, designed for dashboard, SaaS, studio, and digital vault interfaces.

## Design concept

This component uses frosted translucent panels, layered borders, soft shadows, and a calm dark palette to create a high-end glass surface without sacrificing readability. The interaction model is intentionally disciplined: one panel remains open at a time to preserve orientation and visual rhythm.

## Features

- Standalone HTML, CSS, and vanilla JavaScript package
- Semantic structure with a section wrapper and realistic demo content
- Native button triggers connected to panels with unique ARIA relationships
- Single-open accordion behavior with synchronized `aria-expanded`, `hidden`, and active styling
- Arrow key, Home, and End navigation for additional keyboard support
- Smooth grid-based reveal transitions with reduced-motion handling
- Frosted glass styling with subtle edge highlights and refined plus/minus indicator animation
- Responsive, mobile-first layout with locally scoped class names

## Accessibility notes

- Uses native `button` elements for trigger interactions
- Each panel exposes `role="region"` and `aria-labelledby`
- Inactive panels are hidden with the `hidden` attribute
- Keyboard users receive visible focus treatment
- Motion is reduced when `prefers-reduced-motion: reduce` is enabled

## File structure

```text
accordion-01-glassmorphism/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Usage and customization

1. Open `index.html` directly in a browser for a standalone demo.
2. Reuse the `.glass-accordion` block inside another page and keep the trigger/panel ID pairs unique if you duplicate items.
3. Adjust colors, blur intensity, border opacity, and spacing in `style.css` to match a specific brand or product surface.
4. Replace the demo copy in `index.html` with product FAQs, roadmap updates, service tiers, or project notes while preserving the button and panel accessibility attributes.
