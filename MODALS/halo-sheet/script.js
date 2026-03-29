const openButton = document.querySelector('[data-halo-open]');
const modal = document.querySelector('[data-halo-modal]');
const dialog = modal?.querySelector('.halo-modal__dialog');
const closeControls = modal?.querySelectorAll('[data-halo-close]') ?? [];

let lastFocusedElement = null;

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeHaloSheet();
  }
};

function openHaloSheet() {
  if (!modal || !dialog) return;

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  modal.classList.add('halo-modal--open');
  document.body.classList.add('halo-lock');

  dialog.focus();
  document.addEventListener('keydown', handleEscape);
}

function closeHaloSheet() {
  if (!modal) return;

  modal.classList.remove('halo-modal--open');
  modal.hidden = true;
  document.body.classList.remove('halo-lock');
  document.removeEventListener('keydown', handleEscape);

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

openButton?.addEventListener('click', openHaloSheet);

closeControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    if (event.currentTarget === event.target || control.hasAttribute('data-halo-close')) {
      closeHaloSheet();
    }
  });
});
