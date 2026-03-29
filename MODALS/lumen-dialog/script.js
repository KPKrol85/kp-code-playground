const openButton = document.getElementById('openLumenDialog');
const modal = document.getElementById('lumenModal');
const dialog = modal.querySelector('.lumen-modal__panel');
const closeTargets = modal.querySelectorAll('[data-lumen-close]');

let previouslyFocusedElement = null;

function getFocusableElements() {
  return dialog.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const focusableElements = getFocusableElements();
  if (!focusableElements.length) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function openModal() {
  previouslyFocusedElement = document.activeElement;
  modal.dataset.open = 'true';
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lumen-modal-open');

  const focusableElements = getFocusableElements();
  const focusTarget = focusableElements[0] || dialog;
  focusTarget.focus();

  document.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  modal.dataset.open = 'false';
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lumen-modal-open');
  document.removeEventListener('keydown', handleKeydown);

  if (previouslyFocusedElement instanceof HTMLElement) {
    previouslyFocusedElement.focus();
  }
}

openButton.addEventListener('click', openModal);

closeTargets.forEach((element) => {
  element.addEventListener('click', closeModal);
});

modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('lumen-modal__backdrop')) {
    closeModal();
  }
});
