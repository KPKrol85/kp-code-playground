# Carousel 08 — Draggable Card Stack

## Concept
A premium standalone card stack carousel with mobile/app-style drag and swipe interaction. Each card occupies the same footprint, with layered scaling and offsets that keep the next item visible while the current card remains dominant.

## Intended use cases
- Product discovery and premium feature tours
- Editorial card stories and app-inspired onboarding flows
- Swipe-based showcase modules for content exploration
- Touch-first promotional or gallery sequences

## Interaction summary
- Drag or swipe the top card to dismiss it with transform-based motion, subtle rotation, and directional intent feedback.
- Dismissal uses both distance and velocity thresholds so quick flicks and deliberate drags both feel responsive.
- Native Previous and Dismiss buttons provide a keyboard-friendly fallback path.
- Once the last card is dismissed, a completion panel appears in the same reserved space to avoid layout shift.

## Accessibility
- Uses a section-level region with an accessible label.
- Includes a visually hidden `aria-live="polite"` status region for card change announcements.
- Native buttons support non-drag, keyboard, and assistive technology users.
- Visible `:focus-visible` treatments are included for controls and inline CTAs.
- Gesture interaction is enhancement-only; the component remains usable without drag input.
- Reduced-motion users get calmer transitions through `prefers-reduced-motion` handling.

## Keyboard support
- `ArrowRight` advances to the next card.
- `ArrowLeft` returns to the previous card.
- The fallback buttons can be tabbed to and activated with standard keyboard behavior.

## Motion and end-state behavior
- The active card tracks pointer movement with `requestAnimationFrame` updates.
- Rotation and feedback intensity are derived from horizontal drag distance.
- Cards dismiss when drag distance or release velocity exceeds the configured threshold.
- The next card scales forward as the current card exits, preserving continuity.
- The final completion panel includes a restart action for repeat demos.

## Responsive behavior
- Mobile-first sizing prioritizes touch comfort and clear targets.
- The stack keeps a stable reserved height to prevent avoidable CLS.
- Tablet and desktop layouts preserve the same stacked identity with slightly more breathing room.

## File structure
- `index.html` — semantic markup, demo content, controls, and completion panel.
- `style.css` — scoped premium visuals, stack layering, responsive behavior, and reduced-motion support.
- `script.js` — modular drag/swipe logic, fallback controls, announcements, and custom events.
- `README.md` — usage and customization notes.

## Customization
- Replace the demo card copy, tags, and CTA labels in `index.html`.
- Tune stack density with `--dcs-stack-offset`, `--dcs-stack-scale`, `--dcs-card-width`, and `--dcs-card-height`.
- Update thresholds in `script.js` by adjusting `dismissThreshold` logic or `velocityThreshold`.
- Change card intent labels or visual styling by editing `.dcs-card__intent-chip` content and associated surface styles.
- Duplicate or remove `<li data-card>` items as needed; the component calculates state per instance automatically.

## Events
The component emits these bubbling custom events from each `[data-card-stack]` root:
- `carousel:ready`
- `carousel:change`

Use these hooks to integrate analytics, external UI updates, or synchronized storytelling behaviors.
