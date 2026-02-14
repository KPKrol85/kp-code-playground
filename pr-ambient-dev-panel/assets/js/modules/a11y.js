let lastFocused;

export function announce(message) {
  const region = document.getElementById('aria-live');
  if (!region) return;
  region.textContent = '';
  setTimeout(() => {
    region.textContent = message;
  }, 30);
}

export function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
}

export function openDialog(dialog) {
  lastFocused = document.activeElement;
  dialog.showModal();
  const focusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusable?.focus();

  dialog.addEventListener('keydown', trapTab);
}

export function closeDialog(dialog) {
  dialog.close();
  dialog.removeEventListener('keydown', trapTab);
  lastFocused?.focus();
}

function trapTab(event) {
  if (event.key !== 'Tab') return;
  const nodes = [...event.currentTarget.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.hasAttribute('disabled'));
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
