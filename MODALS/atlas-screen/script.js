const openButton = document.querySelector('[data-atlas-open]');
const modal = document.querySelector('[data-atlas-modal]');
const panel = modal?.querySelector('.atlas-modal__panel');
const closeControls = modal?.querySelectorAll('[data-atlas-close]');

let lastFocusedElement = null;

const getFocusableElements = () => {
  if (!modal) {
    return [];
  }

  return [...modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
    (element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden')
  );
};

const trapFocus = (event) => {
  if (event.key !== 'Tab') {
    return;
  }

  const focusable = getFocusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
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
};

const openModal = () => {
  if (!modal) {
    return;
  }

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  requestAnimationFrame(() => {
    modal.classList.add('atlas-modal--visible');
    panel?.focus();
  });
  document.body.classList.add('atlas-modal-open');
};

const closeModal = () => {
  if (!modal || modal.hidden) {
    return;
  }

  modal.classList.remove('atlas-modal--visible');
  window.setTimeout(() => {
    modal.hidden = true;
  }, 240);
  document.body.classList.remove('atlas-modal-open');

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

openButton?.addEventListener('click', openModal);

closeControls?.forEach((control) => {
  control.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.classList.contains('atlas-modal__backdrop') && window.innerWidth < 768) {
      return;
    }

    closeModal();
  });
});

document.addEventListener('keydown', (event) => {
  if (!modal || modal.hidden) {
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  trapFocus(event);
});
