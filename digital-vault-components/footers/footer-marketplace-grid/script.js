(() => {
  const yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const groups = Array.from(document.querySelectorAll('[data-group]'));
  const isMobile = window.matchMedia('(max-width: 759px)');

  const applyAccordionState = () => {
    groups.forEach((group, index) => {
      const toggle = group.querySelector('.dv-footer-marketplace__toggle');
      const panel = group.querySelector('.dv-footer-marketplace__panel');
      if (!toggle || !panel) return;

      if (isMobile.matches) {
        const shouldBeOpen = index === 0;
        toggle.disabled = false;
        toggle.setAttribute('aria-expanded', String(shouldBeOpen));
        panel.hidden = !shouldBeOpen;
      } else {
        toggle.disabled = true;
        toggle.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  };

  groups.forEach((group) => {
    const toggle = group.querySelector('.dv-footer-marketplace__toggle');
    const panel = group.querySelector('.dv-footer-marketplace__panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      if (!isMobile.matches) return;
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });

  if (typeof isMobile.addEventListener === 'function') {
    isMobile.addEventListener('change', applyAccordionState);
  } else if (typeof isMobile.addListener === 'function') {
    isMobile.addListener(applyAccordionState);
  }

  applyAccordionState();

  const copyBtn = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');

  if (copyBtn && copyStatus) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || '';
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = `Copied: ${email}`;
      } catch {
        copyStatus.textContent = `Copy unavailable. Email: ${email}`;
      }
    });
  }
})();
