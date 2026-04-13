const validators = {
  name: (value) => value.trim().length >= 3,
  phone: (value) => /^[+\d\s()-]{7,}$/.test(value.trim()),
  email: (value) => /\S+@\S+\.\S+/.test(value.trim()),
  required: (value) => value.trim() !== '',
  dateNotPast: (value, minDate) => value >= minDate,
  consent: (value) => value === true,
};

const getTodayDate = () => {
  const now = new Date();
  const localMidnight = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localMidnight.toISOString().slice(0, 10);
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

const setFormPendingState = (form, isPending) => {
  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return;

  const defaultLabel = submitButton.dataset.defaultLabel || submitButton.textContent || 'Wyślij zapytanie';
  submitButton.dataset.defaultLabel = defaultLabel;
  submitButton.disabled = isPending;
  submitButton.textContent = isPending ? 'Wysyłanie…' : defaultLabel;
  form.setAttribute('aria-busy', isPending ? 'true' : 'false');
};

const getSubmissionEndpoint = (form) => {
  const action = form.getAttribute('action')?.trim();
  if (!action || action === '#') return '';

  return action;
};

export const initContactForm = () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = document.querySelector('[data-form-status]');
  const summary = document.querySelector('[data-form-summary]');
  const dateField = form.querySelector('[name="moveDate"]');
  const endpoint = getSubmissionEndpoint(form);

  if (dateField) {
    dateField.min = getTodayDate();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const minMoveDate = getTodayDate();

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
      { field: date, valid: validators.dateNotPast(date.value, minMoveDate), message: 'Data przeprowadzki nie może być z przeszłości.' },
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
        const uniqueErrors = [...new Set(errors)];
        const list = document.createElement('ul');

        uniqueErrors.forEach((errorMessage) => {
          const item = document.createElement('li');
          item.textContent = errorMessage;
          list.appendChild(item);
        });

        summary.appendChild(list);
        summary.focus();
      }

      return;
    }

    if (!endpoint) {
      if (summary) {
        summary.textContent = 'Formularz nie ma skonfigurowanego endpointu wysyłki. Użyj telefonu lub adresu e-mail podanych wyżej.';
        summary.focus();
      }

      return;
    }

    try {
      setFormPendingState(form, true);

      if (status) {
        status.textContent = 'Wysyłamy Twoje zapytanie…';
      }

      const response = await fetch(endpoint, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      form.reset();
      checks.forEach(({ field }) => clearError(field));

      if (status) {
        status.textContent = 'Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się w ciągu 24 godzin.';
      }
    } catch (_error) {
      if (summary) {
        summary.textContent = 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub skontaktuj się telefonicznie.';
        summary.focus();
      }

      if (status) {
        status.textContent = '';
      }
    } finally {
      setFormPendingState(form, false);
    }
  });
};
