# Split CTA Footer

A standalone, premium footer component for **KP_Code Digital Vault** that closes a page with a strong conversion section followed by a structured classic footer.

## Purpose

This component is designed for product and commercial pages that need a confident final conversion moment:

- Product landing pages
- Sales pages
- Launch pages
- Waitlist pages
- Commercial digital product pages

It intentionally uses a **split composition**:

1. A dominant top CTA panel to drive the next action.
2. A quieter lower footer for navigation, trust, and utility links.

## File structure

```text
split-cta-footer/
├── index.html   # Standalone component preview
├── style.css    # Scoped visual system and responsive layout
├── script.js    # Optional progressive enhancement
└── README.md    # Usage and customization guidance
```

## Markup overview

- `<footer>` is the root container for the component.
- Top section (`.kp-split-footer__cta-panel`) contains:
  - CTA eyebrow
  - Headline
  - Description
  - Trust note
  - Primary and secondary actions
- Lower section (`.kp-split-footer__main`) contains:
  - Brand block
  - Main navigation links
  - Social/action links
  - Legal links
- Bottom utility bar (`.kp-split-footer__utility`) contains:
  - Copyright line
  - Utility links

## CTA behavior

- Primary CTA: **Explore products**
- Secondary CTA: **Join the waitlist**
- JavaScript enhancement:
  - Sets current year automatically.
  - Adds brief visual click feedback on CTA buttons.
- Component remains fully functional without JavaScript.

## Accessibility behavior

- Semantic footer + navigation sections.
- Keyboard-accessible native links.
- Strong `:focus-visible` outline for all actionable elements.
- Sufficient contrast between text and surfaces.
- Motion is subtle and reduced when `prefers-reduced-motion: reduce` is enabled.

## Responsive behavior

- **Mobile-first:** stacked CTA and footer groups for clean scanning.
- **Tablet:** CTA shifts to balanced two-column copy/actions layout.
- **Desktop:** split CTA presentation, structured multi-column footer grid, utility bar across full width.
- Layout is sized to avoid horizontal overflow in standalone preview context.

## Customization points

Adjust these to fit each page while preserving component structure:

- CTA headline and supporting description
- Primary/secondary CTA labels and URLs
- Trust note copy
- Brand title and brand summary
- Footer navigation link labels and destinations
- Social/action links
- Legal links
- Utility links
- Surface colors, gradients, borders, shadows, spacing tokens, and type scale in `:root`

## Usage

Open `index.html` directly in a browser for local preview, or embed the footer markup/CSS/JS into a component library package.
