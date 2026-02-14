# PR Form Engine

## Product overview
PR Form Engine is a reusable **Universal Form Engine** for KP_Code products. It ships as a framework-agnostic, progressive-enhancement form system with:
- modular field primitives
- centralized validation and state handling
- accessibility-first behavior
- lightweight visual foundation (Linear-like dark UI)

Use this as a shared baseline for projects like Digital Vault, Aurora, dashboards, and SaaS portals.

## Structure

```txt
/pr-form-engine
  index.html
  pages/
    contact.html
    subscription.html
    settings.html
  assets/
    css/
      tokens.css
      base.css
      components.css
      forms.css
    js/
      app.js
      modules/
        form-engine.js
        validation.js
        ui.js
        a11y.js
        storage.js
        utils.js
```

## API usage

```js
import { FormEngine } from './assets/js/modules/form-engine.js';

FormEngine.init(formElement, {
  validationRules: {
    email: { required: true, type: 'email' },
    message: { minLength: 12, maxLength: 300 },
    updates: {
      custom: (value, allValues) => (value ? '' : 'Please enable updates')
    }
  },
  onSubmit: async (values) => ({ ok: true }),
  successMessage: 'Saved successfully.',
  errorMessage: 'Submission failed. Retry.'
});
```

### Option contract
- `validationRules`: map of `{ [fieldName]: Rule }`
- `onSubmit(values)`: async hook returning `{ ok: boolean }`
- `successMessage`: string shown in `aria-live` status region
- `errorMessage`: string shown when submit fails

### Supported rules
- `required`
- `type: 'email'`
- `minLength`
- `maxLength`
- `custom(value, values)`

## Accessibility notes
- Proper label + control associations for all fields.
- Hint/error text linked using `aria-describedby`.
- Inline field-level errors and top-level error summary.
- Focus moves to first invalid field on failed submit.
- Status updates announce in `aria-live="polite"` region.
- Keyboard-only interaction supported for form controls and retry flow.

## Reusing in other KP_Code projects
1. Copy `assets/css` and `assets/js/modules` into your project.
2. Include CSS files in this order: `tokens`, `base`, `components`, `forms`.
3. Add semantic form markup with `.field-group`, `.field-hint`, and `.field-error` slots.
4. Register forms with `data-form-engine` and call `FormEngine.init`.
5. Override tokens in `tokens.css` (or an app-level token file) to match product branding.

## Run locally
Open `index.html` directly, or run a static server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173/pr-form-engine/`.

## Smoke test checklist
- [ ] Open each demo page and tab through all controls.
- [ ] Submit empty required fields and verify inline + summary errors.
- [ ] Enter invalid email and verify validation message.
- [ ] Trigger loading/success states on normal submit.
- [ ] On settings page, submit `displayName=error` and verify error + retry.
- [ ] Click retry and verify state returns to idle.
- [ ] Reload index and verify last state note appears.
