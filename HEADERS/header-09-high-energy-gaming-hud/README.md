# High-Energy Gaming HUD

A standalone premium gaming / entertainment header package designed as a compact control-deck interface for esports platforms, launcher-style products, streaming communities, and high-energy campaign pages.

## Component concept

This header is intentionally built like a tactical HUD rather than a conventional navbar. It uses segmented panels, beveled silhouettes, status rails, and compact control modules so the composition feels immersive and system-driven while remaining commercially reusable.

## Visual system and geometry logic

- **Layered dark surfaces:** The shell combines deep navy-black gradients with elevated panel surfaces to emulate carbon/alloy interface materials.
- **Angular geometry:** Panels, buttons, status cards, and the logo crest use clipped corner polygons instead of rounded consumer UI shapes.
- **Disciplined neon accents:** Cyan is the primary accent, with violet and green reserved for secondary highlights and optional RGB sync moments.
- **Subtle HUD detailing:** Scanline overlay, edge rails, panel borders, and technical framing are kept lightweight so the information architecture stays clear.

## Live-status module behavior

The header includes mocked but believable platform telemetry:

- **Server status** rotates between stable live states such as `ONLINE`, `SYNCED`, and queue surge messaging.
- **Players online** updates on a timed interval with small believable count changes.
- **Championship pot** increments slightly to mimic a live event tracker.
- **Player card progress** slowly advances to reinforce the feeling of an active account session.

All data is local, lightweight, and intended as demo behavior only.

## Motion and glitch strategy

- Navigation hover states use energized underline rails and quick border activation.
- The primary CTA supports restrained RGB-split glitch accents on hover and periodic short idle pulses.
- Status signal bars animate softly rather than aggressively.
- RGB Sync Mode only affects accent layers like the CTA, crest, status rails, and progress fill.
- Motion is intentionally controlled; nothing runs as a full-screen chaotic effect.

## Accessibility decisions

- Includes a keyboard-accessible skip link.
- Uses semantic `header`, `nav`, `section`, `article`, and `main` structure.
- Interactive utilities use native `button` elements with `aria-pressed` where appropriate.
- Mobile navigation toggle exposes `aria-expanded` and `aria-controls`.
- Icon-like utility controls retain visible text labels for clarity.
- Focus styles are custom, high-contrast, and aligned with the HUD geometry.
- Reduced-motion preferences disable or minimize animation, RGB cycling, and hover sweep effects.
- Sound feedback is muted by default and opt-in only.

## Responsive behavior

- **Desktop / laptop:** Full four-zone control deck with dedicated brand, navigation, live status, and utility/CTA modules.
- **Tablet:** Status and utility modules span full width while preserving the layered HUD identity.
- **Mobile:** Navigation collapses behind a menu toggle; status modules stack vertically; controls and CTA stay prominent.

## Optional RGB and sound features

### RGB Sync Mode

A compact toggle enables temporary accent cycling for selected highlight layers only. The default experience remains the polished cyan-led presentation.

### UI Audio

The sound toggle enables extremely short oscillator-based feedback tones generated in the browser. Audio is:

- muted by default,
- never autoplayed,
- optional,
- non-essential to usability,
- dependent on browser audio support and user activation.

## Customization guidance

- Update brand copy, nav labels, CTA text, and telemetry content directly in `index.html`.
- Tweak colors via CSS custom properties in `:root`.
- Adjust the panel silhouette by editing the shared `--hud-bevel` polygon.
- Modify update timing and demo telemetry ranges in `script.js`.
- Remove the sound toggle entirely if a silent production variant is preferred.

## Files

- `index.html` — semantic standalone structure and realistic demo content
- `style.css` — HUD visuals, responsive layout, interaction states, and motion controls
- `script.js` — live-status mock behavior, mobile nav toggle, RGB mode, and optional sound feedback
