(function () {
  "use strict";

  const footer = document.querySelector(".nf-footer");
  if (!footer) {
    return;
  }

  const form = footer.querySelector(".nf-form");
  const emailInput = footer.querySelector("#newsletter-email");
  const feedback = footer.querySelector("#newsletter-feedback");
  const yearSlot = footer.querySelector("[data-current-year]");

  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }

  if (!form || !emailInput || !feedback) {
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const setFeedback = (message, state) => {
    feedback.textContent = message;
    feedback.dataset.state = state;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      setFeedback("Please enter your email address to join the list.", "error");
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }

    if (!emailPattern.test(emailValue)) {
      setFeedback("Use a valid email format, for example: you@example.com.", "error");
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute("aria-invalid");
    setFeedback("Thanks for joining. You’re on the waitlist for upcoming releases.", "success");
    form.reset();
  });

  emailInput.addEventListener("input", () => {
    if (feedback.dataset.state === "error") {
      setFeedback("", "");
      emailInput.removeAttribute("aria-invalid");
    }
  });
})();
