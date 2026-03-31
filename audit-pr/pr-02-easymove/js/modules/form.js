const validators = {
  name: (value) => value.trim().length >= 3,
  phone: (value) => /^[+\d\s()-]{7,}$/.test(value.trim()),
  email: (value) => /\S+@\S+\.\S+/.test(value.trim()),
  required: (value) => value.trim() !== '',
  consent: (value) => value === true,
};

const setError = (field, message) => {
  const error = field.parentElement?.querySelector('.form__error');

  if (error) {
    error.textContent = message;
  }

  field.classList.add('form__field--error');
  field.setAttribute('aria-invalid', 'true');
};

const clearError = (field) => {
  const error = field.parentElement?.querySelector('.form__error');

  if (error) {
    error.textContent = '';
  }

  field.classList.remove('form__field--error');
  field.setAttribute('aria-invalid', 'false');
};

export const initContactForm = () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = document.querySelector('[data-form-status]');
  const summary = document.querySelector('[data-form-summary]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('[name="fullName"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    const type = form.querySelector('[name="moveType"]');
    const cityStart = form.querySelector('[name="cityStart"]');
    const cityEnd = form.querySelector('[name="cityEnd"]');
    const date = form.querySelector('[name="moveDate"]');
    const consent = form.querySelector('[name="consent"]');

    const fields = [name, phone, email, type, cityStart, cityEnd, date, consent];
    const hasMissingField = fields.some((field) => !field);
    if (hasMissingField) {
      if (status) {
        status.textContent = 'Wystąpił błąd konfiguracji formularza. Odśwież stronę i spróbuj ponownie.';
      }
      return;
    }

    const checks = [
      { field: name, valid: validators.name(name.value), message: 'Podaj pełne imię i nazwisko.' },
      { field: phone, valid: validators.phone(phone.value), message: 'Podaj poprawny numer telefonu.' },
      { field: email, valid: validators.email(email.value), message: 'Podaj poprawny adres e-mail.' },
      { field: type, valid: validators.required(type.value), message: 'Wybierz typ przeprowadzki.' },
      { field: cityStart, valid: validators.required(cityStart.value), message: 'Podaj miasto startowe.' },
      { field: cityEnd, valid: validators.required(cityEnd.value), message: 'Podaj miasto docelowe.' },
      { field: date, valid: validators.required(date.value), message: 'Wybierz termin przeprowadzki.' },
      { field: consent, valid: validators.consent(consent.checked), message: 'Potrzebujemy zgody na kontakt.' },
    ];

    const errors = [];

    checks.forEach(({ field, valid, message }) => {
      if (!valid) {
        errors.push(message);
        setError(field, message);
        return;
      }

      clearError(field);
    });

    if (summary) {
      summary.innerHTML = '';
    }

    if (status) {
      status.textContent = '';
    }

    if (errors.length) {
      if (summary) {
        const list = document.createElement('ul');

        errors.forEach((errorMessage) => {
          const item = document.createElement('li');
          item.textContent = errorMessage;
          list.appendChild(item);
        });

        summary.appendChild(list);
        summary.focus();
      }

      return;
    }

    form.reset();
    checks.forEach(({ field }) => clearError(field));

    if (status) {
      status.textContent = 'Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się w ciągu 24 godzin.';
    }
  });
};
