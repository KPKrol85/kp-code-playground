# Hero Event Pulse

Hero Event Pulse is a premium, standalone HERO package designed for event-led marketing pages such as conferences, webinars, workshops, product launches, and online summits. It combines editorial messaging with action-oriented event utilities.

## File structure

- `index.html` — KP_Code Digital Vault selector panel with product card entry.
- `hero-event-pulse.html` — dedicated HERO component page.
- `style.css` — scoped styling for selector and hero pages.
- `hero-event-pulse.js` — countdown, session switcher, reveal, and CTA interaction logic.
- `README.md` — usage and reuse documentation.

## Countdown configuration

Countdown behavior is driven by the `data-event-date` attribute on `.hero-event-pulse-countdown` in `hero-event-pulse.html`.

Example:

```html
<section class="hero-event-pulse-countdown" data-event-date="2026-09-18T16:30:00Z">
```

### Notes

- Use an ISO-8601 UTC timestamp for consistency.
- When the target date has passed, the component gracefully switches to a live-state message and zeros all counters.
- Countdown updates are intentionally not announced every second to avoid noisy screen-reader output.

## Session switcher behavior

The featured session area uses native `button` controls and updates the panel content from a JavaScript data array.

- Keyboard support includes `ArrowRight` and `ArrowLeft` for tab-like switching.
- `aria-selected`, `tabIndex`, and `aria-labelledby` are updated per active session.
- Session metadata (time, title, summary, speaker) is centralized in `sessionData` inside `hero-event-pulse.js`.

## Copy and reuse instructions

1. Copy the entire `hero-event-pulse` folder into your destination project.
2. Update event copy in `hero-event-pulse.html` (headline, metadata, lead, agenda rows).
3. Update `data-event-date` with your target event timestamp.
4. Edit `sessionData` in `hero-event-pulse.js` to match your speakers and sessions.
5. Keep the `body` class as `hero-page hero-event-pulse-page` for scoped page styles.

No external dependencies or assets are required.
