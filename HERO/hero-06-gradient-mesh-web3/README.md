# Gradient Mesh Web3

A premium standalone hero package built for AI products, Web3 platforms, modern developer tools, and frontier-tech launch surfaces. The component uses a restrained animated mesh atmosphere behind a highly readable conversion-ready message so it feels like a polished product launch asset instead of abstract digital art.

## Component concept

The hero is designed as an atmosphere + message system:

- **Atmosphere layer:** a layered gradient mesh creates the ambient digital mood.
- **Message layer:** the headline, supporting copy, and CTAs stay visually dominant through contrast, spacing, and a lightly frosted content panel.
- **Signal layer:** understated product signals and trust cues add commercial credibility without fragmenting the composition.

The overall effect is futuristic, luminous, and controlled rather than loud or chaotic.

## Mesh background strategy

The mesh effect is created with lightweight CSS only:

- Multiple radial gradients form the core mesh field.
- Large blurred orbs drift slowly at different speeds to avoid static flatness.
- A faint perspective grid hints at infrastructure and technical precision.
- A subtle noise layer adds material quality so the gradients feel less synthetic.
- A masked glow layer helps the mesh feel alive while keeping the brightest area centered behind the main content.

This keeps the package maintainable, dependency-free, and performant without requiring canvas or WebGL.

## Motion and pointer-response logic

JavaScript is used as progressive enhancement rather than a requirement:

- The default state relies on slow CSS drift for ambient motion.
- Pointer movement updates CSS custom properties that gently offset the mesh layers.
- Faster pointer movement briefly increases a "pointer strength" value, which adds a restrained pulse to the glow and one mesh orb.
- When the pointer leaves, the field eases back to its calm baseline instead of snapping.

The interaction is intentionally subtle so the hero still feels premium and product-focused.

## Readability and contrast approach

Foreground readability is protected by several decisions:

- The main copy sits inside a translucent dark panel with blur and strong shadow separation.
- Bright mesh tones are softened with controlled opacity and broad blur values.
- The palette stays within a disciplined set of cool hues with a single lavender accent.
- CTA styling emphasizes a clear primary action and a quieter secondary action.
- The brightest glow remains behind the central message rather than around the edges where it could reduce contrast.

## Accessibility decisions

- Semantic landmarks and heading structure are used throughout.
- CTA controls are native links for keyboard accessibility.
- Strong `:focus-visible` states are included for interactive elements.
- Decorative mesh layers are hidden from assistive technology with `aria-hidden="true"`.
- Reduced-motion preferences disable animated drift accents and pointer-influenced behavior.
- The component remains fully usable and visually coherent even if JavaScript is unavailable.

## Responsive strategy

- Typography uses `clamp()` so the headline scales fluidly.
- The desktop split layout collapses to a single-column stack on smaller screens.
- Signal cards reflow vertically on tablet and mobile for cleaner scanning.
- Background grid density and spacing are reduced on smaller screens to avoid visual noise.
- Touch devices still retain the ambient mesh identity even without pointer-driven interaction.

## Customization guidance

- Update the content in `index.html` to adapt the hero to another AI, fintech, SaaS, or Web3 product story.
- Adjust root color tokens in `style.css` to shift the brand mood while preserving the mesh system.
- Tune orb sizes, opacities, and animation durations in `style.css` for a calmer or more energetic atmosphere.
- Modify the pointer-response range in `script.js` if a brand needs more restraint or slightly more responsiveness.
- Remove the trust row or spotlight cards if a simpler hero variant is needed; the core content panel remains standalone.
