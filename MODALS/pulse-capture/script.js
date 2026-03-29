const openButton = document.getElementById('openPulseCapture');
const closeButton = document.getElementById('closePulseCapture');
const overlay = document.getElementById('pulseCaptureOverlay');
const modal = document.getElementById('pulseCaptureModal');
const form = document.getElementById('pulseCaptureForm');
const emailInput = document.getElementById('pcEmail');
const feedback = document.getElementById('pcFeedback');

let lastFocusedElement = null;

const getFocusableElements = () => {
  return modal.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
};

const setModalState = (isOpen) => {
  if (isOpen) {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.classList.add('pc-body-locked');
  } else {
    overlay.classList.remove('is-open');
    document.body.classList.remove('pc-body-locked');
    setTimeout(() => {
      if (!overlay.classList.contains('is-open')) {
        overlay.hidden = true;
      }
    }, 230);
  }
};

const openModal = () => {
  lastFocusedElement = document.activeElement;
  setModalState(true);
  emailInput.focus();
};

const closeModal = () => {
  setModalState(false);
  form.reset();
  feedback.textContent = '';
  feedback.removeAttribute('data-state');

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const trapFocus = (event) => {
  if (event.key !== 'Tab' || overlay.hidden) return;

  const focusableElements = getFocusableElements();
  if (!focusableElements.length) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.hidden) {
    closeModal();
  }

  trapFocus(event);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    feedback.textContent = 'Please enter your email to continue.';
    feedback.dataset.state = 'error';
    emailInput.focus();
    return;
  }

  feedback.textContent = `Thanks — ${email} is on the Pulse Capture list.`;
  feedback.removeAttribute('data-state');
  form.reset();
});
