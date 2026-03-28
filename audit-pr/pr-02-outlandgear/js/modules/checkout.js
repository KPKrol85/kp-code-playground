import { CONFIG } from "../config.js";
import { qs, qsa, on } from "./dom.js";
import { clearCart } from "./storage.js";

const STATUS_TYPES = {
  success: { role: "status", live: "polite" },
  info: { role: "status", live: "polite" },
  warning: { role: "alert", live: "assertive" },
  error: { role: "alert", live: "assertive" },
};

const setStatusMessage = (status, message, type = "info") => {
  if (!status) return;
  const normalizedType = STATUS_TYPES[type] ? type : "info";
  const semantics = STATUS_TYPES[normalizedType];
  status.textContent = message;
  status.dataset.feedbackType = normalizedType;
  status.setAttribute("role", semantics.role);
  status.setAttribute("aria-live", semantics.live);
  status.setAttribute("aria-atomic", "true");
};

const showError = (input, message) => {
  const error = qs(`[data-error-for="${input.name}"]`);
  if (error) {
    error.textContent = message;
  }
  input.setAttribute("aria-invalid", "true");
};

const clearError = (input) => {
  const error = qs(`[data-error-for="${input.name}"]`);
  if (error) {
    error.textContent = "";
  }
  input.removeAttribute("aria-invalid");
};

export const initCheckout = () => {
  const form = qs(CONFIG.selectors.checkoutForm);
  if (!form) return;
  const status = qs(CONFIG.selectors.checkoutStatus);
  const successPanel = qs("[data-checkout-success]");

  const inputs = qsa("input, select, textarea", form);

  on(form, "submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;
    setStatusMessage(status, "", "info");

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        const message = input.validationMessage || "Wypełnij to pole.";
        showError(input, message);
        if (!firstInvalid) firstInvalid = input;
      } else {
        clearError(input);
      }
    });

    if (firstInvalid) {
      setStatusMessage(status, "Popraw oznaczone pola formularza.", "warning");
      firstInvalid.focus();
      return;
    }

    setStatusMessage(status, "Zamówienie zapisane (demo).", "success");
    if (successPanel) {
      successPanel.hidden = false;
    }
    form.reset();
    form.hidden = true;
    clearCart();
  });
};
