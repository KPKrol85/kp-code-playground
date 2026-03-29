const drawer = document.querySelector('[data-edge-drawer]');
const panel = drawer.querySelector('.edge-drawer__panel');
const openButton = document.querySelector('[data-edge-drawer-open]');
const closeButton = drawer.querySelector('[data-edge-drawer-close]');
const backdrop = drawer.querySelector('[data-edge-drawer-backdrop]');

let lastFocusedElement = null;

function getFocusableElements() {
  return panel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

function trapFocus(event) {
  if (event.key !== 'Tab') return;

  const focusables = getFocusableElements();
  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openDrawer() {
  lastFocusedElement = document.activeElement;
  drawer.classList.add('is-open');
  document.body.classList.add('edge-drawer-open');
  panel.focus();
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  document.body.classList.remove('edge-drawer-open');

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  } else {
    openButton.focus();
  }
}

openButton.addEventListener('click', openDrawer);
closeButton.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
  if (!drawer.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    closeDrawer();
    return;
  }

  trapFocus(event);
});
