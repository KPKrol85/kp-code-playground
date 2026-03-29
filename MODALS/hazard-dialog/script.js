const body = document.body;
const modal = document.getElementById('hazardModal');
const openButton = document.getElementById('openHazardDialog');
const closeButton = document.getElementById('closeHazardDialog');
const cancelButton = document.getElementById('cancelHazardAction');
const confirmButton = document.getElementById('confirmHazardAction');
const focusSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let lastFocusedElement = null;

function getFocusableElements() {
  return Array.from(modal.querySelectorAll(focusSelector)).filter(
    (element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden')
  );
}

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  body.style.overflow = 'hidden';

  const focusable = getFocusableElements();
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  document.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  modal.hidden = true;
  body.style.overflow = '';
  document.removeEventListener('keydown', handleKeydown);

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== 'Tab' || modal.hidden) {
    return;
  }

  const focusable = getFocusableElements();
  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
confirmButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
    closeModal();
  }
});
