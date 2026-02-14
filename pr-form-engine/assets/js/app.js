import { FormEngine } from './modules/form-engine.js';
import { readLastState } from './modules/storage.js';

const pageConfigs = {
  contactForm: {
    validationRules: {
      name: { required: true, minLength: 2 },
      email: { required: true, type: 'email' },
      topic: { required: true },
      message: { required: true, minLength: 12, maxLength: 300 },
      consent: { required: true },
    },
    successMessage: 'Thanks! Our team will respond shortly.',
  },
  subscriptionForm: {
    validationRules: {
      email: { required: true, type: 'email' },
      plan: { required: true },
      updates: {
        custom: (value) => (value ? '' : 'Please enable updates to continue the demo flow.'),
      },
    },
    successMessage: 'Subscription preferences updated.',
  },
  settingsForm: {
    validationRules: {
      displayName: { required: true, minLength: 3, maxLength: 40 },
      bio: { maxLength: 160 },
      theme: { required: true },
      visibility: { required: true },
    },
    onSubmit: async (values) => {
      if (values.displayName?.toLowerCase() === 'error') {
        return { ok: false };
      }
      return { ok: true };
    },
    successMessage: 'Settings saved locally.',
    errorMessage: 'Save failed in demo mode. Rename “error” and retry.',
  },
};

document.querySelectorAll('form[data-form-engine]').forEach((form) => {
  const config = pageConfigs[form.id] || {};
  FormEngine.init(form, config);
});

const previous = readLastState();
if (previous) {
  const stateNote = document.querySelector('[data-last-state]');
  if (stateNote) {
    stateNote.textContent = `Last demo state: ${previous.id} → ${previous.state}`;
  }
}
