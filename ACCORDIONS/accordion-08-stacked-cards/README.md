# Accordion 08 — Stacked Cards

## Design concept
A premium stacked-cards accordion that treats each section like a layered editorial insert. The active card lifts forward from the stack, creating a tactile sense of hierarchy and controlled depth rather than a flat expand/collapse pattern.

## Feature summary
- Standalone HTML, CSS, and vanilla JavaScript package with no external dependencies.
- Layered card stack using offsets, scale, shadows, and tonal surfaces.
- Single-open accordion behavior with synchronized ARIA and panel visibility states.
- Premium motion that leads with card movement before panel content fully settles.
- Optional keyboard roving support with ArrowUp, ArrowDown, Home, and End navigation.

## Accessibility notes
- Uses semantic headings and native `button` triggers.
- Each trigger/panel pair is connected with `aria-expanded`, `aria-controls`, `aria-labelledby`, and `role="region"`.
- Inactive panels are hidden with the `hidden` attribute.
- Includes a visible `:focus-visible` treatment that remains clear within the stacked layout.
- Motion is simplified for users who prefer reduced motion.

## Motion and stack behavior
- The active card gains priority in the stack and lifts slightly forward.
- Cards below the active item shift downward to create visual room for revealed content.
- Underlying cards are slightly de-emphasized through restrained tonal reduction.
- Panel content reveal is delayed slightly so the stack movement reads first.

## Responsive behavior
- On larger viewports the cards overlap with a stronger stacked depth effect.
- On smaller screens the overlap is relaxed so touch interaction and readability stay comfortable.
- The component preserves the tonal hierarchy and active-card reveal without forcing dense geometry on mobile.

## File structure
- `index.html` — semantic component markup and demo content.
- `style.css` — isolated visual system, stack behavior, responsive rules, and reduced-motion support.
- `script.js` — scoped accordion state management and optional keyboard navigation.
- `README.md` — component usage notes and customization guidance.

## Customization guidance
- Adjust `--sc-stack-gap`, `--sc-card-lift`, and shadow variables in `:root` to tune the stack depth.
- Replace the demo copy and metadata blocks inside each `.sc-card__panel-inner` to match your content model.
- Change the surface colors, accent tone, and radii to align the component with a broader brand system while keeping the structure intact.
