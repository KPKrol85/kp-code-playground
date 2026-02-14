import { createId, getFieldKey } from './utils.js';

export function setupFieldAccessibility(form) {
  form.querySelectorAll('.field-group').forEach((group) => {
    const control = group.querySelector('[name]');
    if (!control) return;

    const key = getFieldKey(control);
    const hint = group.querySelector('.field-hint');
    const error = group.querySelector('.field-error');

    if (hint) hint.id = createId('field', key, 'hint');
    if (error) error.id = createId('field', key, 'error');

    const describedBy = [hint?.id, error?.id].filter(Boolean).join(' ');
    if (describedBy) {
      if (control.type === 'radio') {
        form.querySelectorAll(`[name="${control.name}"]`).forEach((radio) => {
          radio.setAttribute('aria-describedby', describedBy);
        });
      } else {
        control.setAttribute('aria-describedby', describedBy);
      }
    }
  });
}

export function focusFirstError(form, errors) {
  const firstName = Object.keys(errors)[0];
  if (!firstName) return;
  const firstField = form.querySelector(`[name="${firstName}"]`);
  firstField?.focus();
}
