const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field, rules = {}, values = {}) {
  const value = values[field.name];
  const isEmpty =
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'boolean' && value === false);

  if (rules.required && isEmpty) {
    return 'This field is required.';
  }

  if (rules.type === 'email' && !isEmpty && !EMAIL_REGEX.test(String(value))) {
    return 'Please enter a valid email address.';
  }

  if (rules.minLength && !isEmpty && String(value).length < rules.minLength) {
    return `Please enter at least ${rules.minLength} characters.`;
  }

  if (rules.maxLength && !isEmpty && String(value).length > rules.maxLength) {
    return `Please enter no more than ${rules.maxLength} characters.`;
  }

  if (typeof rules.custom === 'function') {
    const customMessage = rules.custom(value, values);
    if (customMessage) return customMessage;
  }

  return '';
}

export function validateForm(form, validationRules, values) {
  const errors = {};
  form.querySelectorAll('[name]').forEach((field) => {
    if (field.type === 'radio') {
      if (errors[field.name] !== undefined) return;
      const rule = validationRules[field.name] || {};
      const result = validateField(field, rule, values);
      if (result) errors[field.name] = result;
      return;
    }

    const rule = validationRules[field.name] || {};
    const result = validateField(field, rule, values);
    if (result) errors[field.name] = result;
  });

  return errors;
}
