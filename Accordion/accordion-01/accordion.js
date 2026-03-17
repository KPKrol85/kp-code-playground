(function initKPAccordion() {
  var accordion = document.querySelector('[data-kp-accordion]');
  if (!accordion) {
    return;
  }

  var triggers = accordion.querySelectorAll('.kp-accordion__trigger');

  function setItemState(trigger, shouldExpand) {
    var panelId = trigger.getAttribute('aria-controls');
    if (!panelId) {
      return;
    }

    var panel = document.getElementById(panelId);
    if (!panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', String(shouldExpand));
    panel.classList.toggle('is-open', shouldExpand);
    panel.hidden = !shouldExpand;
  }

  triggers.forEach(function (trigger) {
    setItemState(trigger, false);

    trigger.addEventListener('click', function () {
      var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      setItemState(trigger, !isExpanded);
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
})();
