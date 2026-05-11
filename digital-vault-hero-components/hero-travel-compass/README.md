# Hero Travel Compass

Hero Travel Compass is a premium, reusable HERO package for destination-first brands such as travel agencies, hotels, retreats, adventure operators, and city guide landing pages. It blends cinematic visual styling with conversion-oriented structure: clear messaging, destination selection, itinerary preview, and a lightweight booking snapshot.

## File structure

- `index.html` — KP_Code Digital Vault selector panel with entry card to the component.
- `hero-travel-compass.html` — standalone HERO implementation page.
- `style.css` — scoped styling for selector and hero experience.
- `hero-travel-compass.js` — isolated interactions and progressive enhancement logic.

## Included interactions (JavaScript)

`hero-travel-compass.js` provides:

1. **Destination selector** via native buttons.
   - Buttons toggle `aria-pressed` to expose selection state.
   - Selected destination updates itinerary content and booking snapshot.
2. **Dynamic itinerary/highlight updates**.
   - Title, description, highlights, and booking fields update from a local destination data map.
3. **Booking card state updates**.
   - Seasonal travel window, duration, and starting price are refreshed per destination.
4. **Reveal animations**.
   - `IntersectionObserver` reveals key blocks when they enter viewport.
   - Falls back gracefully if observer is unavailable.
5. **Pointer-aware scenic movement (desktop/fine pointer)**.
   - Visual panel tilts subtly on pointer movement.
   - Disabled when `prefers-reduced-motion` is active.

## Accessibility & UX notes

- Native buttons are used for destination options.
- `aria-pressed` is maintained for active selection clarity.
- Itinerary region uses `aria-live="polite"` so updates are understandable.
- Clear `:focus-visible` styles are included for keyboard users.
- Palette is tuned for readable contrast over layered cinematic backgrounds.
- Motion honors `prefers-reduced-motion`.

## Reuse instructions

1. Copy the full `hero-travel-compass` folder into your project.
2. Link `style.css` and `hero-travel-compass.js` in your page.
3. Copy the `<section class="hero-travel-compass">...</section>` markup from `hero-travel-compass.html`.
4. Update destination entries in `hero-travel-compass.js` (`destinationMap`) to match your offers.
5. Adjust text, CTAs, and pricing copy while keeping class names to preserve styling and behavior.

This package is intentionally scoped to a production-ready HERO pattern, not a full booking engine.
