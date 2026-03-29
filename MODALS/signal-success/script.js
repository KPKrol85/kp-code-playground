const modal = document.getElementById('successModal');
const openButton = document.getElementById('openModalBtn');
const confirmButton = document.getElementById('confirmBtn');
const dialog = modal.querySelector('.signal-success-modal__dialog');

let lastFocusedElement = null;

const openModal = () => {
  lastFocusedElement = document.activeElement;
  document.body.style.overflow = 'hidden';
  modal.hidden = false;

  requestAnimationFrame(() => {
    modal.classList.add('signal-success-modal--open');
    dialog.focus();
  });
};

const closeModal = () => {
  modal.classList.remove('signal-success-modal--open');

  const closeAfterAnimation = () => {
    modal.hidden = true;
    document.body.style.overflow = '';

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }

    modal.removeEventListener('transitionend', closeAfterAnimation);
  };

  modal.addEventListener('transitionend', closeAfterAnimation);

  setTimeout(() => {
    if (!modal.hidden) {
      closeAfterAnimation();
    }
  }, 260);
};

openButton.addEventListener('click', openModal);
confirmButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  const target = event.target;

  if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) {
    closeModal();
  }
});
