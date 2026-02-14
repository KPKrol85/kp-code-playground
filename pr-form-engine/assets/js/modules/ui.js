export function renderErrors(form, errors) {
  form.querySelectorAll('.field-error').forEach((node) => {
    node.textContent = '';
  });

  form.querySelectorAll('[name]').forEach((field) => {
    const message = errors[field.name] || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    const holder = form.querySelector(`.field-error[data-error-for="${field.name}"]`);
    if (holder) holder.textContent = message;
  });
}

export function renderErrorSummary(form, errors) {
  const summary = form.querySelector('[data-error-summary]');
  if (!summary) return;

  const names = Object.keys(errors);
  if (!names.length) {
    summary.hidden = true;
    summary.innerHTML = '';
    return;
  }

  const items = names
    .map((name) => `<li><a href="#${name}">${errors[name]}</a></li>`)
    .join('');

  summary.hidden = false;
  summary.innerHTML = `<h3>Please fix the following fields:</h3><ul>${items}</ul>`;
}

export function setFormState(form, state, message = '') {
  form.dataset.state = state;
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const retry = form.querySelector('[data-retry]');

  if (submit) submit.disabled = state === 'loading';
  if (retry) retry.hidden = state !== 'error';

  if (status) {
    status.classList.remove('success', 'error');
    if (state === 'success') status.classList.add('success');
    if (state === 'error') status.classList.add('error');
    status.textContent = message || `Form state: ${state}`;
  }
}
