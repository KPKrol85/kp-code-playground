(() => {
  const root = document.querySelector('.ssc-system');

  if (!root) {
    return;
  }

  const liveMessage = root.querySelector('[data-live-message]');
  const previewState = root.querySelector('[data-preview-state]');
  const groups = root.querySelectorAll('.ssc-group');
  const viewTriggers = root.querySelectorAll('[data-view-trigger]');
  const actionButtons = root.querySelectorAll('[data-demo-action]');
  const toggleControl = root.querySelector('[data-toggle-control]');
  const toggleLabel = root.querySelector('[data-toggle-label]');
  const loadingTrigger = root.querySelector('[data-loading-trigger]');
  const loadingLabel = root.querySelector('[data-loading-label]');
  const iconToggle = root.querySelector('[data-icon-toggle]');
  const trustbarSteps = root.querySelectorAll('.ssc-trustbar__step');

  const setMessage = (message) => {
    if (liveMessage) {
      liveMessage.textContent = message;
    }
  };

  const setPreviewState = (message) => {
    if (previewState) {
      previewState.textContent = message;
    }
  };

  const setTrustbarState = (index) => {
    trustbarSteps.forEach((step, stepIndex) => {
      step.classList.toggle('is-live', stepIndex === index);
    });
  };

  viewTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const selectedView = trigger.dataset.viewTrigger;

      viewTriggers.forEach((button) => {
        const isSelected = button === trigger;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
      });

      groups.forEach((group) => {
        const groupType = group.dataset.group;
        const shouldShow = selectedView === 'all' || groupType === selectedView || groupType === 'all';
        group.hidden = !shouldShow;
      });

      setMessage(`Preview filtered to ${trigger.textContent.trim().toLowerCase()}.`);
      setPreviewState(`Preview focus: ${trigger.textContent.trim()}`);
      setTrustbarState(0);
    });
  });

  actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const message = button.dataset.demoAction;
      if (!message) {
        return;
      }

      setMessage(message);
      setPreviewState(`Last interaction: ${button.textContent.replace(/\s+/g, ' ').trim()}`);
      setTrustbarState(2);
    });
  });

  if (toggleControl && toggleLabel) {
    toggleControl.addEventListener('click', () => {
      const isPressed = toggleControl.getAttribute('aria-pressed') === 'true';
      const nextState = !isPressed;

      toggleControl.setAttribute('aria-pressed', String(nextState));
      toggleLabel.textContent = nextState ? 'Maintenance mode on' : 'Maintenance mode off';
      setMessage(
        nextState
          ? 'Maintenance mode enabled: non-admin actions are now paused.'
          : 'Maintenance mode disabled: public workflows are available again.'
      );
      setPreviewState(nextState ? 'Escalated operational posture' : 'Normal review routing');
      setTrustbarState(nextState ? 1 : 0);
    });
  }

  if (iconToggle) {
    iconToggle.addEventListener('click', () => {
      const isPressed = iconToggle.getAttribute('aria-pressed') === 'true';
      const nextState = !isPressed;

      iconToggle.setAttribute('aria-pressed', String(nextState));
      iconToggle.classList.toggle('is-active', nextState);
      setMessage(nextState ? 'Status module pinned to operator workspace.' : 'Status module unpinned from operator workspace.');
    });
  }

  if (loadingTrigger && loadingLabel) {
    let loadingTimeout = 0;
    let completionTimeout = 0;

    loadingTrigger.addEventListener('click', () => {
      if (loadingTrigger.disabled) {
        return;
      }

      loadingTrigger.disabled = true;
      loadingTrigger.classList.add('ssc-button--loading');
      loadingTrigger.setAttribute('aria-busy', 'true');
      loadingLabel.textContent = 'Verification running';
      setMessage('Verification in progress: checks are locking the action until completion.');
      setPreviewState('Pending verification checks');
      setTrustbarState(1);

      window.clearTimeout(loadingTimeout);
      window.clearTimeout(completionTimeout);

      loadingTimeout = window.setTimeout(() => {
        loadingLabel.textContent = 'Verification passed';
        setMessage('Verification complete: controls can proceed safely.');
        setPreviewState('Checks resolved successfully');
        setTrustbarState(2);

        completionTimeout = window.setTimeout(() => {
          loadingLabel.textContent = 'Run verification';
          loadingTrigger.disabled = false;
          loadingTrigger.classList.remove('ssc-button--loading');
          loadingTrigger.removeAttribute('aria-busy');
          setTrustbarState(0);
        }, 1400);
      }, 1700);
    });
  }
})();
