# Buttons 05 — Signature Motion Lab

## Component concept
Signature Motion Lab is a premium standalone button system showcase for KP_Code Digital Vault. The package demonstrates how one cohesive design language can support multiple button roles while keeping motion restrained, tactile, and commercially credible for modern product interfaces.

## Included button variants
- Primary CTA with subtle lift and directional shine sweep
- Secondary button with layered hover reveal
- Outline button with edge-emphasis hover treatment
- Ghost button with text and icon shift
- Tonal button with pointer-aware highlight behavior
- Compact icon button with tactile press feedback
- Loading button with accessible busy state transition
- Success / confirm button with stable confirmation state
- Danger button with restrained alert emphasis
- Elevated toggle button with selected-state memory

## Accessibility decisions
- Uses real `button` elements for every interactive control.
- Provides visible `:focus-visible` treatment with strong contrast in light and dark themes.
- Keeps hover effects optional and preserves a complete baseline experience without JavaScript.
- Supports keyboard operation, `aria-pressed` for toggleable states, and `aria-busy` for the loading demo.
- Honors `prefers-reduced-motion` by minimizing transitions and removing non-essential motion layers.

## Motion and state behavior
- Motion is built around small transforms, opacity, border, color, and shadow changes to avoid layout shift.
- Magnetic and pointer-aware behaviors are intentionally constrained to subtle ranges for premium believability.
- Loading, confirmation, and selected states are reversible so the pack can be used as a reusable interaction starter.
- Press interactions use a short settle-in response rather than exaggerated bounce.

## Token structure
`style.css` defines reusable custom properties for:
- page and surface colors
- text hierarchy
- accent, success, and danger roles
- borders and shadows
- radii and spacing scale
- typography scale and weights
- motion durations and easing curves
- control sizing

## Customization guidance
- Adjust the `:root` custom properties in `style.css` to align the component with your brand palette or design system.
- Duplicate a `.button-card` block in `index.html` to add more variants while keeping the same design language.
- Reuse the JavaScript patterns in `script.js` selectively if your product only needs loading, toggle, or pointer-aware enhancements.
- For a stricter enterprise tone, reduce accent saturation and lower the hover elevation tokens.
