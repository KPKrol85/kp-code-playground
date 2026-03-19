# 3D Perspective Carousel

## Concept
A premium standalone carousel built around a strong perspective stage, a dominant centered hero card, and adjacent slides that recede elegantly into depth. The visual tone is cinematic and futuristic, designed for premium product launches, concept presentations, gaming-inspired reveals, and high-end portfolio storytelling.

## Interaction summary
- Previous and next controls move the active card through the 3D scene
- Visible side cards include click-to-center behavior through native button hit areas
- Compact pagination dots support direct slide selection
- Custom `carousel:ready` and `carousel:change` events expose integration hooks

## Accessibility
- Semantic section-based structure with `aria-roledescription="carousel"`
- Visually hidden `aria-live="polite"` region announces the active slide
- Keyboard support for `ArrowLeft`, `ArrowRight`, `Home`, and `End`
- Native button controls and visible `:focus-visible` styling
- Non-active slide content is marked `aria-hidden` and made inert where supported so the active card remains the primary assistive-technology target
- Reduced-motion users receive a calmer fallback with flattened transforms and near-instant transitions

## Touch and responsive behavior
- Native touch swipe support is included in vanilla JavaScript
- `ResizeObserver` toggles a compact mode to soften perspective on narrower containers
- On very small screens the far slides fade away to preserve readability and touch usability
- Media areas use fixed aspect ratios to reserve layout and avoid content shifting

## File structure
- `index.html` — isolated semantic markup and realistic demo content
- `style.css` — scoped futuristic 3D visual system, motion, and responsive rules
- `script.js` — multi-instance carousel logic, state sync, keyboard support, swipe handling, and custom events
- `README.md` — package overview and customization notes

## Customization
- Replace each `.pc3d-card` block in `index.html` with your own product, editorial, or concept content
- Update the media treatments in `style.css` to swap gradients, lighting behavior, or surface textures
- Tune variables such as `--pc3d-card-offset`, `--pc3d-rotate-side`, `--pc3d-z-side`, and `--pc3d-transition` to increase or reduce motion intensity
- Restyle card colors, shadow values, and mesh layers to align with a specific campaign or brand system while keeping the standalone architecture intact
