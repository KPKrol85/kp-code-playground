# Buttons 13 — Kinetic Motion System

## Design concept
Kinetic Motion System is a premium standalone button pack centered on tactile microinteractions, directional fills, layered surface travel, and believable press feedback. The visual language is product-grade rather than decorative: motion reinforces hierarchy, state clarity, and interaction confidence.

## Included variants
- Primary CTA with signature directional kinetic fill
- Secondary action with layered lift
- Outline action with edge-led emphasis
- Ghost action with low-chrome text shift
- Icon button for compact toolbars
- Toggle / selected-state action with persistent status chip
- Elevated action with stronger depth response
- Directional sweep action for premium reveal moments
- Loading / progress action with async feedback
- Success / confirm action with stable completion state
- Destructive action with restrained alert emphasis
- Dual-layer reveal action with secondary information line
- Disabled secondary example for inactive-state readability

## Accessibility decisions
- Uses semantic `button` elements for every control.
- Provides clear `:focus-visible` rings with stable contrast in both light and dark themes.
- Keeps all labels readable at rest and in motion; no meaning depends on animation alone.
- Includes `aria-pressed` on toggleable controls and `aria-busy` during loading simulation.
- Preserves usable disabled, loading, selected, and confirm states without requiring JavaScript for base layout.
- Supports keyboard, pointer, and touch interaction with large hit targets and visible state shifts.

## Interaction behavior
- Hover introduces short, crisp surface movement and directional overlays rather than long ornamental animation.
- Active states compress slightly to simulate press depth while preserving text clarity.
- Toggle and confirm buttons maintain persistent states with updated labels and status indicators.
- The loading button demonstrates realistic async feedback using a spinner, label swap, and progress track.
- Theme and motion toggles are included as compact preview controls for the showcase environment.

## Motion system logic
- The pack relies primarily on transform, opacity, shadow, and color transitions for responsive performance.
- A reusable travel layer powers the signature kinetic feel across multiple variants without making every button identical.
- The standout identity comes from directional fill treatments and press-depth behavior that feel engineered and consistent.
- Motion timings stay short and restrained to keep the system immediate and professional.

## Reduced-motion handling
- Honors `prefers-reduced-motion` in CSS.
- Includes a manual reduced-motion preview toggle for testing the alternate interaction mode.
- In reduced-motion mode, non-essential movement is minimized while focus, contrast, status labels, and state colors remain clear.

## Responsive behavior
- The showcase uses fluid grid layouts so the package reads cleanly on narrow mobile screens and large desktop canvases.
- Buttons retain comfortable tap targets and spacing at smaller widths.
- Compact toolbar controls wrap cleanly without breaking hierarchy.

## Customization guidance
- Update the custom properties in `style.css` to retune palette, border strength, depth, and motion timing.
- Reuse any `.km-button--*` modifier independently; each variant is fully scoped to this package.
- Adjust showcase copy or duplicate cards in `index.html` to extend the pack with additional product-specific actions.
- Keep JavaScript enhancements optional when porting individual buttons into production interfaces.
