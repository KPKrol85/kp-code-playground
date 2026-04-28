(() => {
  const libraryList = document.querySelector('.library-list');
  const liveRegion = document.querySelector('#library-status-live');

  if (!libraryList) {
    return;
  }

  let openMenu = null;

  const closeMenu = (menuRoot) => {
    if (!menuRoot) {
      return;
    }

    const trigger = menuRoot.querySelector('.library-card__menu-button');
    const panel = menuRoot.querySelector('.library-card__menu-panel');

    if (!trigger || !panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');

    if (openMenu === menuRoot) {
      openMenu = null;
    }
  };

  const openMenuPanel = (menuRoot) => {
    if (openMenu && openMenu !== menuRoot) {
      closeMenu(openMenu);
    }

    const trigger = menuRoot.querySelector('.library-card__menu-button');
    const panel = menuRoot.querySelector('.library-card__menu-panel');

    if (!trigger || !panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    openMenu = menuRoot;
  };

  const toggleMenu = (trigger) => {
    const menuRoot = trigger.closest('[data-menu]');

    if (!menuRoot) {
      return;
    }

    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeMenu(menuRoot);
      return;
    }

    openMenuPanel(menuRoot);
  };

  const startDownload = (button) => {
    if (button.disabled || button.dataset.loading === 'true') {
      return;
    }

    const card = button.closest('.library-card');
    const productName = card?.dataset.product || 'Selected product';

    button.dataset.loading = 'true';
    button.dataset.label = button.textContent.trim();
    button.textContent = 'Preparing...';
    button.classList.add('is-loading');
    button.setAttribute('aria-busy', 'true');

    if (liveRegion) {
      liveRegion.textContent = `Preparing download for ${productName}.`;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = reducedMotion ? 450 : 1100;

    window.setTimeout(() => {
      const fallbackLabel = button.dataset.label || 'Download';
      button.textContent = fallbackLabel;
      button.classList.remove('is-loading');
      button.dataset.loading = 'false';
      button.removeAttribute('aria-busy');

      if (liveRegion) {
        liveRegion.textContent = `${productName} is ready to download.`;
      }
    }, timeout);
  };

  libraryList.querySelectorAll('[data-menu]').forEach((menuRoot) => {
    const trigger = menuRoot.querySelector('.library-card__menu-button');
    const panel = menuRoot.querySelector('.library-card__menu-panel');

    if (!trigger || !panel) {
      return;
    }

    const shouldOpen = trigger.getAttribute('aria-expanded') === 'true' || panel.classList.contains('is-open');

    if (shouldOpen && !openMenu) {
      openMenuPanel(menuRoot);
    } else {
      closeMenu(menuRoot);
    }
  });

  libraryList.addEventListener('click', (event) => {
    const trigger = event.target.closest('.library-card__menu-button');

    if (trigger) {
      toggleMenu(trigger);
      return;
    }

    const downloadButton = event.target.closest('[data-download]');

    if (downloadButton) {
      startDownload(downloadButton);
    }
  });

  document.addEventListener('click', (event) => {
    if (!openMenu) {
      return;
    }

    if (event.target.closest('[data-menu]')) {
      return;
    }

    closeMenu(openMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && openMenu) {
      const trigger = openMenu.querySelector('.library-card__menu-button');
      closeMenu(openMenu);
      trigger?.focus();
    }
  });
})();
