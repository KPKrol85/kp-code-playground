# Manual QA Checklist

Use this checklist before release and after any change that could affect UI behavior, calculations, documentation visibility, accessibility, theme, history, or print/copy output.

Reviewer:  
Date:  
Browser / OS:  
Version / commit:  

## Local setup and app load

- [ ] Start a local static server from the project directory, for example `python3 -m http.server 8000`.
- [ ] Open `http://localhost:8000/` in a supported browser.
- [ ] Confirm the app loads without a build step, backend, login, analytics prompt, or network dependency.
- [ ] Confirm the hero disclaimer is visible and does not describe the app as legal, tax, accounting, or financial advice.
- [ ] Confirm the assumptions panel is visible and includes tax-rule metadata/status.

## Browser console

- [ ] Open DevTools console before interacting with the app.
- [ ] Confirm there are no console errors on initial load.
- [ ] Confirm there are no console errors during normal calculation, option changes, history restore, theme changes, print, or copy.

## Contract/cooperation type coverage

- [ ] Employment contract / umowa o pracę renders a valid result.
- [ ] Mandate contract / umowa zlecenie renders a valid result.
- [ ] Specific work contract / umowa o dzieło renders a valid result.
- [ ] B2B scale renders a valid result.
- [ ] B2B linear renders a valid result.
- [ ] B2B lump sum renders a valid result.
- [ ] For each type, confirm assumptions/warnings remain visible and do not overclaim correctness.

## Calculation directions

- [ ] Gross-to-net direction accepts a positive amount and renders net, gross/revenue, burden, and context.
- [ ] Net-to-gross direction accepts a positive target net amount and renders an approximate required gross/revenue value.
- [ ] Net-to-gross output is described as estimated/approximate where relevant.
- [ ] Switching direction updates result context and comparison ranking note.

## Period handling

- [ ] Monthly input calculates and displays monthly and yearly values.
- [ ] Yearly input calculates by converting to a monthly equivalent and displays monthly and yearly values.
- [ ] Switching between monthly and yearly keeps labels and summary context understandable.
- [ ] Documentation/assumption text continues to state that yearly handling is simplified.

## Invalid inputs

- [ ] Empty amount shows validation state and clears/disables misleading results/actions.
- [ ] Zero amount shows validation state and does not save a valid history entry.
- [ ] Negative value shows validation state and does not render misleading results.
- [ ] Non-numeric value shows validation state or is rejected by the numeric input without console errors.
- [ ] Print and copy buttons remain disabled or safe when the amount is invalid.

## Employment-specific options

- [ ] PIT-2 can be toggled for employment and visibly affects or is represented in the result according to the simplified model.
- [ ] Under-26 relief can be toggled where applicable in the simplified employment model and shows appropriate caveat text.
- [ ] PPK can be toggled for employment and is described as employee PPK.
- [ ] Employer cost display appears for employment contract results.
- [ ] Employer cost is not presented as a directly equivalent cost for non-employment rows.

## Mandate contract options

- [ ] PIT-2 state is handled according to the mandate simplified model.
- [ ] Under-26 relief state is handled according to the mandate simplified model.
- [ ] PPK and B2B-only controls are disabled, ignored, or explained as not applicable.
- [ ] KUP behavior is documented as fixed 20% in the model even if global selector values are present.

## Specific work contract options

- [ ] 20% KUP / standard mode is available and renders a result.
- [ ] 50% KUP mode is available and renders a result.
- [ ] 50% KUP includes or is near caveat text that real-world eligibility and limits are not verified by the app.
- [ ] Social/health contribution expectations remain consistent with the current simplified model.

## B2B options

- [ ] B2B scale works with full ZUS preset.
- [ ] B2B scale works with preferential ZUS preset.
- [ ] B2B scale works with starter ZUS preset.
- [ ] B2B linear works with full, preferential, and starter ZUS presets.
- [ ] B2B lump sum works with full, preferential, and starter ZUS presets.
- [ ] Selecting custom ZUS reveals/enables custom social and health fields.
- [ ] Custom ZUS values affect B2B results and do not affect non-B2B results.
- [ ] VAT payer option is available only as B2B informational behavior if present.
- [ ] VAT payer option does not change net result in the current model.
- [ ] Scale, linear, and lump-sum assumptions are visible and do not imply full official correctness.

## Quick scenarios

- [ ] Junior employment scenario applies the expected visible form settings.
- [ ] Senior B2B linear scenario applies the expected visible form settings.
- [ ] Creator specific-work scenario applies the expected visible form settings.
- [ ] Scenario changes do not create console errors.
- [ ] Scenario output remains clearly labeled as approximate.

## Results summary and context

- [ ] Result summary shows selected amount, direction, period, contract type, and relevant options.
- [ ] Result cards have understandable labels and monthly/yearly values.
- [ ] Warnings/limitations remain visible near results.
- [ ] Print summary is enabled after a valid calculation and includes assumptions, limitations, comparison, metadata, and disclaimer.
- [ ] Copy summary is enabled after a valid calculation and copies transparent text with assumptions, limitations, comparison, metadata, and disclaimer.

## Comparison table

- [ ] Table renders all six contract/cooperation types after a valid calculation.
- [ ] Selected contract row is visually highlighted.
- [ ] Selected row highlight remains understandable in light and dark themes.
- [ ] Table includes assumptions note explaining shared input/options and simplified comparability.
- [ ] Employer cost interpretation is not overextended to non-employment rows.
- [ ] Gross-to-net ranking and net-to-gross ranking notes are understandable.

## Calculation history

- [ ] Valid calculation saves a history entry.
- [ ] Clicking a history entry restores at least the saved amount and contract type according to current implementation.
- [ ] History persists after page reload because it is local-only `localStorage` data.
- [ ] History is limited to the current implementation limit of 8 entries.
- [ ] There is no visible clear-history control in the current app; document this as not implemented rather than treating it as a failed clear action.
- [ ] Empty history state is clear when no entries exist.

## Theme switching

- [ ] Light theme can be selected and persists after reload.
- [ ] Dark theme can be selected and persists after reload.
- [ ] System theme can be selected and follows system preference.
- [ ] Theme buttons expose selected/pressed state.
- [ ] Theme changes do not hide focus indicators, warnings, result text, or comparison highlight.

## Mobile layout

- [ ] Narrow viewport around 320–390px remains usable without horizontal page overflow.
- [ ] Medium viewport around 768px keeps cards, form fields, results, and history readable.
- [ ] Comparison table uses horizontal overflow inside its wrapper instead of breaking the page layout.
- [ ] Print/copy buttons wrap or stack without clipping.
- [ ] Touch targets remain practical on mobile.

## Keyboard-only flow

- [ ] Skip link appears on focus and moves to main content.
- [ ] All form fields, radio buttons, checkboxes, selects, buttons, theme controls, history entries, print, and copy are reachable by keyboard.
- [ ] Focus order follows the visual/logical page order.
- [ ] Focus indicators are visible in light and dark themes.
- [ ] Disabled or hidden fields are not reachable when they should not be interactive.
- [ ] The form can be submitted with keyboard only.

## Screen-reader semantics checklist

- [ ] Inputs have visible labels connected to controls.
- [ ] Radio/checkbox groups use fieldsets and legends.
- [ ] Validation message is announced through an appropriate live/status region.
- [ ] Results and warnings use live regions without excessive repeated announcements.
- [ ] Comparison table has a caption.
- [ ] Comparison table header cells have correct scopes.
- [ ] Hidden custom ZUS fields are hidden from assistive tech when inactive.
- [ ] Disabled fields expose disabled state when not applicable.
- [ ] Applicability/help text is associated with relevant controls.

## Reduced-motion behavior

- [ ] With `prefers-reduced-motion: reduce`, transitions/animations are reduced or disabled.
- [ ] Reduced-motion mode does not remove essential state changes or focus visibility.
- [ ] Theme switching and result rendering remain understandable without motion.

## Final manual QA sign-off

- [ ] All normal flows completed without console errors.
- [ ] Any known limitations are documented in README or release notes.
- [ ] Any failed checks are recorded before release decision.
