# Vertical Narrative Carousel

A premium standalone storytelling carousel built for immersive brand, campaign, and editorial sequences. The component pairs full-height narrative chapters with a restrained progress rail, controlled step-to-step movement, and graceful fallback behavior for smaller screens.

## Concept

This package is designed for case-study intros, product journeys, campaign timelines, and story-led landing sections where the pacing should feel authored rather than freely scrolled. On larger screens it captures clear wheel, keyboard, and touch intent to advance one chapter at a time. On smaller screens and reduced-motion contexts it relaxes into a natural vertical reading flow.

## Features

- Full-height editorial narrative layout with semantic `article` steps
- Visible progress rail, numbered chapter navigation, and live status announcements
- Controlled vertical progression with one-step-at-a-time wheel handling
- Native touch swipe support and keyboard navigation (`ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, `End`)
- Multi-instance-safe JavaScript architecture with a `goToStep(index)`-style internal API
- Custom events: `carousel:ready` and `carousel:change`
- Reduced-motion support and smaller-screen fallback mode
- No external libraries, build tools, or global dependencies

## Accessibility

- Semantic section wrapper with an accessible region label
- Visually hidden `aria-live="polite"` announcements for active step changes
- Native button controls for direct chapter navigation
- Clear `:focus-visible` styling for keyboard users
- In controlled mode, inactive chapters are marked with `aria-hidden` to reduce offscreen noise
- Keyboard interaction does not trap users at the narrative boundaries

## Interaction model

### Controlled mode

On tablet/desktop-sized layouts, the viewport uses a controlled narrative mode:

- wheel intent is throttled into single-step progression
- touch swipes move up or down by one step
- keyboard commands advance or reverse intentionally
- progress UI, active states, ARIA state, and live-region messaging stay synchronized
- once the first or last step is reached, scroll naturally hands back to the page instead of trapping the user

### Fallback mode

On smaller screens or when reduced motion is preferred:

- the layout becomes a natural vertical flow
- content remains readable without forced viewport trapping
- chapter buttons still move the reader to the selected step
- the storytelling identity remains intact while usability takes priority

## File structure

- `index.html` — semantic component markup and demo content
- `style.css` — scoped editorial layout, progress styling, motion, and responsive behavior
- `script.js` — modular narrative controller with wheel, touch, keyboard, resize, and visibility logic
- `README.md` — usage and customization notes

## Customization

- **Step count:** duplicate or remove `data-kp-vn-step` articles and matching `data-kp-vn-dot` buttons
- **Text content:** replace headings, body copy, labels, and metadata directly in `index.html`
- **Progress UI:** adjust the rail, count, or chapter button styling in `style.css`
- **Motion intensity:** tune `--kp-vn-transition`, step opacity, and transform distances in `style.css`
- **Responsive thresholds:** update the mobile breakpoint or controlled-mode conditions in `style.css` and `script.js`

## Usage

Open `index.html` directly in a browser, or embed the same HTML/CSS/JS structure inside a page. The package is fully isolated and does not depend on repo-wide tokens, frameworks, or shared scripts.
