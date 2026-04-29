const phases = Array.from(document.querySelectorAll('.phase'));
const closeAllButton = document.querySelector('[data-close-all]');

function setPanelState(phase, expand) {
  const trigger = phase.querySelector('.phase__trigger');
  const panel = phase.querySelector('.phase__panel');

  trigger.setAttribute('aria-expanded', String(expand));

  if (expand) {
    phase.classList.add('is-open');
    panel.hidden = false;
    panel.style.height = '0px';
    requestAnimationFrame(() => {
      panel.style.height = `${panel.scrollHeight}px`;
    });
  } else {
    panel.style.height = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      panel.style.height = '0px';
    });
    phase.classList.remove('is-open');
  }
}

phases.forEach((phase) => {
  const trigger = phase.querySelector('.phase__trigger');
  const panel = phase.querySelector('.phase__panel');

  if (trigger.getAttribute('aria-expanded') === 'true') {
    panel.hidden = false;
    panel.style.height = `${panel.scrollHeight}px`;
  }

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    setPanelState(phase, !expanded);
  });

  panel.addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'height') return;

    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      panel.style.height = 'auto';
    } else {
      panel.hidden = true;
    }
  });
});

closeAllButton?.addEventListener('click', () => {
  phases.forEach((phase) => setPanelState(phase, false));
});
