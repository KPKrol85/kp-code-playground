const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SUBMIT_DELAY_MS = 800;

export function initContactForm() {
  const form = document.querySelector(".contact__form");

  if (!form) {
    return;
  }

  form.setAttribute("novalidate", "");

  const submitButton = form.querySelector('button[type="submit"]');
  const initialButtonLabel = submitButton?.textContent?.trim() || "Wyślij zapytanie";
  const feedback = form.querySelector("[data-form-feedback]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearValidationState(form);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      goal: String(formData.get("goal") || "").trim(),
    };

    const validationErrors = validatePayload(payload);

    if (validationErrors.length > 0) {
      showFeedback(feedback, validationErrors[0].message, "error");
      markInvalidFields(form, validationErrors);
      return;
    }

    setLoadingState(form, submitButton, initialButtonLabel, true);

    try {
      // Symulacja czasu odpowiedzi API. Backend może zostać podpięty w tym miejscu.
      await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));

      console.info("Lead form payload:", payload);
      form.reset();
      showFeedback(feedback, "Twoja wiadomość została wysłana.", "success");
    } catch (error) {
      console.error("Lead form submit failed", error);
      showFeedback(feedback, "Nie udało się wysłać formularza. Spróbuj ponownie.", "error");
    } finally {
      setLoadingState(form, submitButton, initialButtonLabel, false);
    }
  });
}

function validatePayload(payload) {
  const errors = [];

  if (!payload.name) {
    errors.push({ field: "name", message: "Podaj imię i nazwisko." });
  }

  if (!payload.email) {
    errors.push({ field: "email", message: "Podaj adres email." });
  } else if (!EMAIL_PATTERN.test(payload.email)) {
    errors.push({ field: "email", message: "Podaj poprawny adres email." });
  }

  return errors;
}

function markInvalidFields(form, errors) {
  errors.forEach(({ field, message }) => {
    const input = form.elements.namedItem(field);

    if (!(input instanceof HTMLElement)) {
      return;
    }

    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "contact-form-feedback");
  });

  const firstInvalidField = form.querySelector('[aria-invalid="true"]');
  firstInvalidField?.focus();
}

function clearValidationState(form) {
  const invalidFields = form.querySelectorAll('[aria-invalid="true"]');

  invalidFields.forEach((field) => {
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
  });
}

function setLoadingState(form, submitButton, initialButtonLabel, isLoading) {
  form.setAttribute("aria-busy", String(isLoading));

  if (!submitButton) {
    return;
  }

  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Wysyłanie…" : initialButtonLabel;
}

function showFeedback(feedbackElement, message, state) {
  if (!(feedbackElement instanceof HTMLElement)) {
    return;
  }

  feedbackElement.textContent = message;
  feedbackElement.dataset.state = state;
}
