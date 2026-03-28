import { CONFIG } from "../config.js";
import { qs, on } from "./dom.js";
import { clearCart } from "./storage.js";
import { initFormFieldUX, setFormStatus, setSubmitState, validateFormFields } from "./form-ux.js";

export const initCheckout = () => {
  const form = qs(CONFIG.selectors.checkoutForm);
  if (!form) return;

  const successPanel = qs("[data-checkout-success]");
  initFormFieldUX(form);

  on(form, "submit", (event) => {
    event.preventDefault();

    const { firstInvalidField } = validateFormFields(form);

    if (firstInvalidField) {
      setFormStatus(form, "Uzupełnij pola oznaczone błędem i spróbuj ponownie.", "error");
      firstInvalidField.focus();
      return;
    }

    setSubmitState(form, true, "Przetwarzanie zamówienia...");
    setFormStatus(form, "Weryfikujemy dane zamówienia...", "info");

    window.setTimeout(() => {
      setSubmitState(form, false);
      setFormStatus(form, "Zamówienie zostało zapisane (demo).", "success");
      if (successPanel) {
        successPanel.hidden = false;
      }
      form.reset();
      form.hidden = true;
      clearCart();
    }, 500);
  });
};
