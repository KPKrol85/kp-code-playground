(function () {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const triggers = Array.from(accordion.querySelectorAll('.accordion-02__trigger'));

  function setItemState(trigger, isExpanded) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    trigger.setAttribute('aria-expanded', String(isExpanded));

    if (!panel) {
      return;
    }

    if (isExpanded) {
      panel.removeAttribute('hidden');
      return;
    }

    panel.setAttribute('hidden', '');
  }

  function collapseOthers(activeTrigger) {
    triggers.forEach(function (trigger) {
      if (trigger !== activeTrigger) {
        setItemState(trigger, false);
      }
    });
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;

      if (nextState) {
        collapseOthers(trigger);
      }

      setItemState(trigger, nextState);
    });
  });
})();
