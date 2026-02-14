export function setupShortcuts({ timer, soundPanel, theme, focusMode }) {
  window.addEventListener('keydown', (event) => {
    const tag = event.target instanceof HTMLElement ? event.target.tagName.toLowerCase() : '';
    const inFormField = tag === 'input' || tag === 'textarea';

    if (inFormField) return;

    if (event.code === 'Space') {
      event.preventDefault();
      timer.toggle();
    }

    if (event.key.toLowerCase() === 'm') {
      soundPanel.togglePanel();
    }

    if (event.key.toLowerCase() === 't') {
      theme.toggle();
    }

    if (event.key === 'Escape') {
      focusMode.exit();
    }
  });
}
