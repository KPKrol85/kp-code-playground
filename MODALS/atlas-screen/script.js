const atlasOpenButton = document.querySelector('[data-atlas-open]');
const atlasModal = document.querySelector('[data-atlas-modal]');
const atlasPanel = atlasModal?.querySelector('.atlas-modal__panel');
const atlasCloseElements = atlasModal?.querySelectorAll('[data-atlas-close]');

let previousFocus = null;

function getFocusableItems(container) {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

function onModalKeydown(event) {
  if (!atlasModal.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeAtlasModal();
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const focusable = Array.from(getFocusableItems(atlasPanel)).filter(
    (item) => !item.hasAttribute('disabled') && !item.getAttribute('aria-hidden')
  );

  if (!focusable.length) {
    event.preventDefault();
    atlasPanel.focus();
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

function openAtlasModal() {
  previousFocus = document.activeElement;
  atlasModal.hidden = false;
  requestAnimationFrame(() => {
    atlasModal.classList.add('is-open');
    document.body.classList.add('atlas-scroll-lock');
    const firstFocusable = getFocusableItems(atlasPanel)[0];
    (firstFocusable || atlasPanel).focus();
  });
}

function closeAtlasModal() {
  atlasModal.classList.remove('is-open');
  document.body.classList.remove('atlas-scroll-lock');

  const finishClose = () => {
    atlasModal.hidden = true;
    atlasModal.removeEventListener('transitionend', finishClose);
    if (previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  };

  atlasModal.addEventListener('transitionend', finishClose);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    finishClose();
  }
}

atlasOpenButton?.addEventListener('click', openAtlasModal);
atlasCloseElements?.forEach((element) => {
  element.addEventListener('click', closeAtlasModal);
});

document.addEventListener('keydown', onModalKeydown);
