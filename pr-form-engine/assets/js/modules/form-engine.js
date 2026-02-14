import { collectValues, delay } from './utils.js';
import { validateForm } from './validation.js';
import { renderErrorSummary, renderErrors, setFormState } from './ui.js';
import { focusFirstError, setupFieldAccessibility } from './a11y.js';
import { saveLastState } from './storage.js';

export const FormEngine = {
  init(formElement, options = {}) {
    if (!formElement) return null;

    const config = {
      validationRules: {},
      onSubmit: async () => ({ ok: true }),
      successMessage: 'Form submitted successfully.',
      errorMessage: 'Submission failed. Please try again.',
      submitDelay: 900,
      ...options,
    };

    setupFieldAccessibility(formElement);
    setFormState(formElement, 'idle', 'Ready to submit.');

    const runValidation = () => {
      const values = collectValues(formElement);
      const errors = validateForm(formElement, config.validationRules, values);
      renderErrors(formElement, errors);
      renderErrorSummary(formElement, errors);
      return { values, errors };
    };

    formElement.addEventListener('input', () => {
      runValidation();
    });

    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      const { values, errors } = runValidation();

      if (Object.keys(errors).length) {
        setFormState(formElement, 'error', 'Please fix highlighted issues.');
        focusFirstError(formElement, errors);
        return;
      }

      setFormState(formElement, 'loading', 'Submitting…');
      saveLastState({ id: formElement.id, state: 'loading' });

      try {
        await delay(config.submitDelay);
        const result = await config.onSubmit(values);
        if (result?.ok === false) throw new Error('submit-error');
        setFormState(formElement, 'success', config.successMessage);
        saveLastState({ id: formElement.id, state: 'success' });
      } catch {
        setFormState(formElement, 'error', config.errorMessage);
        saveLastState({ id: formElement.id, state: 'error' });
      }
    });

    const retryButton = formElement.querySelector('[data-retry]');
    retryButton?.addEventListener('click', () => {
      setFormState(formElement, 'idle', 'Retry ready.');
      formElement.querySelector('[type="submit"]')?.focus();
    });

    return {
      validate: runValidation,
      setState: (state, message) => setFormState(formElement, state, message),
    };
  },
};
