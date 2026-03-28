import { CONFIG } from "../config.js";
import { qs, on } from "./dom.js";
import { clearCart } from "./storage.js";
import { clearUiState, setUiState } from "./ui-state.js";

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

  const successPanel = qs("[data-checkout-success]");
  initFormFieldUX(form);

  on(form, "submit", (event) => {
    event.preventDefault();

    const { firstInvalidField } = validateFormFields(form);

    if (firstInvalid) {
      setUiState(status, {
        type: "error",
        title: "Formularz zawiera błędy",
        message: "Uzupełnij wymagane pola i popraw oznaczone wartości.",
      });
      firstInvalid.focus();
      return;
    }

    setUiState(status, {
      type: "success",
      title: "Zamówienie zapisane",
      message: "Możesz wrócić do strony głównej lub kontynuować zakupy.",
    });
    if (successPanel) {
      successPanel.hidden = false;
    }
    form.reset();
    form.hidden = true;
    clearCart();
  });

  on(form, "input", () => {
    clearUiState(status);
  });
};
