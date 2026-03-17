# Tabs 06 — Magnetic Spotlight / Editorial Command Tabs

A premium standalone tabs component designed as an editorial command surface for product libraries. It pairs strong typography, restrained motion, and a magnetic active-state spotlight to create a polished, product-grade interaction model.

## File Structure

- `index.html` — semantic tabs markup with ARIA relationships.
- `style.css` — visual system, spotlight surface styling, transitions, and responsive behavior.
- `script.js` — active-state logic, keyboard support, roving tabindex, panel visibility, and spotlight geometry sync.
- `README.md` — implementation contract and reuse guidance.

## Visual Direction

- **Editorial control rail:** The tab row is a refined, matte command surface with clear containment.
- **Magnetic spotlight active state:** The active tab sits on a soft elevated surface (not an underline and not a classic pill clone).
- **Premium restraint:** Inactive tabs maintain readable contrast and subtle hover response.
- **Stage depth:** Content panels appear on a separate stage with nuanced borders and layered background treatment.

## Interaction Model

- One tab is active at a time and maps to one visible panel.
- Activation updates:
  - `aria-selected`
  - roving `tabindex`
  - panel `hidden` state
  - spotlight position and width
- Pointer enhancement:
  - The shell background includes a restrained pointer-reactive ambient highlight tied to cursor position in the nav area.
  - This effect is decorative only and does not impact usability.
- Panel transitions use opacity/translate/scale for calm, premium motion.

## Accessibility Behavior

- Uses WAI-ARIA tabs pattern roles:
  - `role="tablist"`
  - `role="tab"`
  - `role="tabpanel"`
- Uses proper relationships:
  - `aria-controls` on each tab
  - `aria-labelledby` on each panel
  - `aria-selected` for active state
- Keyboard support:
  - `ArrowLeft` / `ArrowRight`: move focus between tabs
  - `Home` / `End`: jump to first/last tab
  - `Enter` / `Space`: activate focused tab
- Strong `:focus-visible` outline ensures keyboard discoverability.

## Responsive Behavior

- Mobile-first layout.
- Tab rail supports horizontal overflow on narrow screens while preserving visual hierarchy.
- Stage spacing and metadata grid scale up at wider breakpoints.

## Customization Guidance

- **Labels/panels:** Add or remove tab/panel pairs as long as IDs and ARIA attributes stay aligned.
- **Branding:** Adjust color tokens in `:root` for accent and surface tone shifts.
- **Motion:** Tune spotlight transition and panel animation durations in `style.css`.
- **Density:** Adjust tab padding and stage min-height to fit compact or spacious UI systems.

## Integration Notes

- Component is framework-agnostic and suitable for direct drop-in use.
- Keep `script.js` loaded after the markup (or defer it) so initialization finds all tab elements.
- If tabs are injected dynamically, re-run initialization logic for the new root instance.
