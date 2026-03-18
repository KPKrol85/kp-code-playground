(() => {
  const accordions = document.querySelectorAll('[data-accordion]');

  const setActivePanel = (accordion, nextPanel, moveFocus = false) => {
    const panels = accordion.querySelectorAll('[data-panel]');

    panels.forEach((panel) => {
      const trigger = panel.querySelector('[data-trigger]');
      const content = panel.querySelector('[data-content]');
      const isActive = panel === nextPanel;

      panel.classList.toggle('is-active', isActive);
      trigger.setAttribute('aria-expanded', String(isActive));
      content.hidden = !isActive;

      if (isActive && moveFocus) {
        trigger.focus();
      }
    });
  };

  const getTriggers = (accordion) => Array.from(accordion.querySelectorAll('[data-trigger]'));

  accordions.forEach((accordion) => {
    const panels = Array.from(accordion.querySelectorAll('[data-panel]'));
    const activePanel = panels.find((panel) => panel.classList.contains('is-active')) || panels[0];

    if (activePanel) {
      setActivePanel(accordion, activePanel);
    }

    accordion.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-trigger]');
      if (!trigger || !accordion.contains(trigger)) {
        return;
      }

      const panel = trigger.closest('[data-panel]');
      if (panel && !panel.classList.contains('is-active')) {
        setActivePanel(accordion, panel);
      }
    });

    accordion.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }

      const triggers = getTriggers(accordion);
      const currentIndex = triggers.indexOf(document.activeElement);

      if (currentIndex === -1) {
        return;
      }

      event.preventDefault();

      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
      const nextTrigger = triggers[nextIndex];
      const nextPanel = nextTrigger.closest('[data-panel]');

      if (nextPanel) {
        setActivePanel(accordion, nextPanel, true);
      }
    });
  });
})();
