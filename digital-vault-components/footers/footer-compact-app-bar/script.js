(() => {
  const footer = document.querySelector('.pp-footer');
  if (!footer) return;

  const yearTarget = footer.querySelector('#currentYear');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const navItems = Array.from(footer.querySelectorAll('.pp-footer__nav-item'));
  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      navItems.forEach((link) => link.removeAttribute('aria-current'));
      item.setAttribute('aria-current', 'page');
    });
  });

  const moreToggle = footer.querySelector('#moreToggle');
  const morePanel = footer.querySelector('#morePanel');
  const secondaryLinks = Array.from(footer.querySelectorAll('.pp-footer__secondary-nav a'));
  const isDesktop = () => window.matchMedia('(min-width: 760px)').matches;

  const openMorePanel = () => {
    if (!moreToggle || !morePanel) return;
    morePanel.hidden = false;
    moreToggle.setAttribute('aria-expanded', 'true');
    const firstLink = secondaryLinks[0];
    if (firstLink && !isDesktop()) firstLink.focus();
  };

  const closeMorePanel = (returnFocus = false) => {
    if (!moreToggle || !morePanel || isDesktop()) return;
    morePanel.hidden = true;
    moreToggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) moreToggle.focus();
  };

  if (moreToggle && morePanel) {
    moreToggle.addEventListener('click', () => {
      const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMorePanel();
      } else {
        openMorePanel();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && moreToggle.getAttribute('aria-expanded') === 'true') {
        closeMorePanel(true);
      }
    });

    document.addEventListener('click', (event) => {
      if (
        !isDesktop() &&
        moreToggle.getAttribute('aria-expanded') === 'true' &&
        !footer.contains(event.target)
      ) {
        closeMorePanel();
      }
    });

    secondaryLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMorePanel();
      });
    });

    window.addEventListener('resize', () => {
      if (isDesktop()) {
        morePanel.hidden = false;
        moreToggle.setAttribute('aria-expanded', 'true');
      } else {
        morePanel.hidden = true;
        moreToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const quickActionBtn = footer.querySelector('#quickActionBtn');
  const feedback = footer.querySelector('#quickActionFeedback');

  if (quickActionBtn && feedback) {
    quickActionBtn.addEventListener('click', () => {
      feedback.textContent = 'Create panel opened. Start your new item.';
      window.clearTimeout(quickActionBtn._feedbackTimer);
      quickActionBtn._feedbackTimer = window.setTimeout(() => {
        feedback.textContent = '';
      }, 2400);
    });
  }
})();
