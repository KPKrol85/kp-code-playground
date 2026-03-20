# 09 Button Brutalist Interface Actions

A standalone premium button package for KP_Code Digital Vault that translates brutalist interface cues into a controlled, production-minded action system for serious digital products.

## Design concept

This pack uses squared geometry, hard borders, bold uppercase typography, and sharp offset shadows to create a brutalist-inspired UI language that feels premium rather than chaotic. The presentation is structured like a modern product workbench so the buttons read as real interface controls instead of decorative experiments.

## Included variants

- Primary action
- Secondary action
- Outline action
- Ghost action
- Inverted / high-contrast action
- Danger / destructive action
- Success / confirm action
- Icon utility button
- Loading button
- Toggle / active-state button
- Block CTA
- Utility action button

## Accessibility decisions

- Uses semantic `button` elements for native keyboard and assistive technology support.
- Includes high-visibility `:focus-visible` outlines that do not depend on hover.
- Keeps labels readable with strong contrast in both dark and light preview themes.
- Uses `aria-pressed` for theme, density, and toggle demonstrations.
- Uses `aria-live` for non-disruptive preview status messaging.
- Uses `aria-busy` and disabled locking during the loading demo.
- Respects `prefers-reduced-motion` by reducing transition and animation duration.

## Interaction behavior

- Hover states use short, tactile positional shifts and offset shadow changes.
- Active states compress the button visually to feel immediate and deliberate.
- JavaScript is only used for optional enhancements: theme switching, density preview, loading simulation, and toggle state updates.
- Core presentation, layout, and button styling remain fully usable without JavaScript.

## Responsive behavior

- The showcase uses a two-column grid on larger screens and collapses to a single-column layout on narrower widths.
- Toolbar controls and command-strip actions wrap or stack cleanly on mobile.
- Compact density mode demonstrates how the system can tighten spacing for denser interfaces.

## Customization guidance

- Update the `:root` design tokens in `style.css` to adapt colors, spacing, shadows, and sizing.
- Swap labels in `index.html` to fit dashboard, commerce, CMS, or operations tooling contexts.
- Reuse the `brutalist-button--*` modifiers to compose additional actions while preserving the scoped naming system.
- Adjust `--bia-button-height`, border thickness, and surface tokens to make the system feel heavier or lighter while keeping the same structure.
