export function createFocusMode({ panelElement, toggleButton }) {
  let active = false;

  const apply = () => {
    panelElement.dataset.focus = active ? 'on' : 'off';
    toggleButton.setAttribute('aria-pressed', String(active));
    toggleButton.textContent = active ? 'Exit Focus' : 'Focus Mode';
  };

  const set = (next) => {
    active = Boolean(next);
    apply();
  };

  apply();

  return {
    toggle() {
      set(!active);
    },
    exit() {
      set(false);
    },
  };
}
