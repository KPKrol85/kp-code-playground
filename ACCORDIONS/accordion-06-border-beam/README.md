# Border Beam Accordion

A standalone premium accordion component built for the KP_Code Digital Vault library. This variation uses a dark futuristic card system with a thin animated perimeter beam to emphasize the active module while keeping the content calm, readable, and dashboard-ready.

## Design concept

The component is styled as a controlled cyber-tech interface rather than a noisy neon effect. Active items feel energized through a moving border beam, subtle internal glow, and elevated surface treatment. Inactive items remain quiet with refined edge definition so the whole stack still reads as a premium interface.

## Feature summary

- Semantic section wrapper with a compact intro/header block.
- Multiple accordion items with realistic premium product content.
- Single-open accordion behavior scoped to this component only.
- Thin conic-gradient beam border with masking-based perimeter rendering.
- Refined active-state glow, polished dark surfaces, and responsive layout.
- Keyboard support for Enter/Space via native buttons plus ArrowUp, ArrowDown, Home, and End navigation.

## Accessibility notes

- Native `button` triggers are wired with `aria-expanded` and `aria-controls`.
- Each content panel uses `role="region"`, `aria-labelledby`, and the `hidden` attribute when inactive.
- Focus-visible states are high contrast and visually integrated with the component.
- Color contrast is designed for dark mode readability.

## Motion and beam notes

- The active perimeter beam is generated with a pseudo-element and `conic-gradient`.
- Masking is used when supported so only a thin animated edge is shown.
- If advanced mask support is limited, the component still presents a tasteful glowing perimeter treatment.
- `prefers-reduced-motion` simplifies animation to a nearly static state.

## File structure

- `index.html` — standalone semantic markup and demo content.
- `style.css` — isolated dark theme, beam visuals, layout, and motion system.
- `script.js` — single-open accordion logic and keyboard navigation.
- `README.md` — usage and customization overview.

## Customization guidance

- Adjust beam hues through `--bb-beam-a`, `--bb-beam-b`, and `--bb-beam-c` in `:root`.
- Tune energy intensity with `--bb-beam-speed`, `--bb-beam-opacity`, and `--bb-beam-thickness`.
- Update spacing and corner feel via `--bb-radius` and the section/item padding values.
- Replace demo copy freely; the ARIA wiring and panel structure are already component-safe and reusable.
