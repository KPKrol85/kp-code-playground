const modal = document.getElementById("verdictModal");
const openButton = document.getElementById("openVerdictModal");
const closeButton = document.getElementById("closeVerdictModal");
const confirmButton = document.getElementById("confirmDelete");
const dialog = modal.querySelector(".verdict-modal__dialog");
const closeTriggers = modal.querySelectorAll('[data-close="true"]');

let lastFocusedElement = null;

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("verdict-modal-open");
  dialog.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("verdict-modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function handleEscape(event) {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
}

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
confirmButton.addEventListener("click", closeModal);

closeTriggers.forEach((trigger) => {
  trigger.addEventListener("click", closeModal);
});

document.addEventListener("keydown", handleEscape);
