# Split Hero Tabs (tabs-08)

## Concept
Split Hero Tabs is a flagship editorial tabs pattern designed as a hero-level module. The left side acts as a narrative control rail, while the right side becomes a cinematic content stage that highlights one active chapter at a time.

## File Structure
- `index.html` — semantic split-hero tabs markup with ARIA relationships.
- `style.css` — mobile-first visual system, split composition, and premium motion styling.
- `script.js` — tabs behavior, roving tabindex, keyboard controls, and panel state sync.
- `README.md` — implementation and reuse guidance.

## Visual Direction
- Asymmetrical split composition for a premium landing-hero feel.
- Editorial tab labels with subtle metadata lines.
- Dominant active panel surface with restrained depth layers and stat chips.
- Distinctive state treatment based on typographic emphasis and surface transitions (not underlines, gliders, or pill toggles).

## Interaction Model
- Clicking a tab activates its panel.
- Arrow keys move between tabs.
- Home/End jump to first/last tab.
- Enter/Space activates the focused tab.
- Active panel transitions use opacity + translate + scale nuance for calm cinematic movement.

## Accessibility Behavior
- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- Each tab has `aria-controls`; each panel has `aria-labelledby`.
- Active state updates `aria-selected` and roving `tabindex`.
- Hidden panels use the `hidden` attribute to avoid layout/announcement issues.
- `prefers-reduced-motion` is respected in both CSS transitions and JavaScript panel activation.

## Responsive Behavior
- Mobile-first stack: navigation appears first, stage follows.
- Large screens switch to a true split hero layout with vertical navigation rail.
- Tab controls remain large tap targets and maintain hierarchy at all breakpoints.

## Reuse Guidance
- Replace tab labels, metadata, copy, and stat chips while preserving ARIA IDs and relationships.
- Add or remove tabs by duplicating a tab + panel pair and keeping ID mappings unique.
- Tune theme tokens in `:root` (`--bg`, `--surface`, `--accent`, etc.) to align with your system.
- Keep motion subtle and preserve reduced-motion support when extending transitions.
