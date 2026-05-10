(function () {
  const detailsToggle = document.querySelector('[data-toggle-details]');
  if (detailsToggle) {
    detailsToggle.addEventListener('click', function () {
      const panel = document.getElementById('cta-03-details');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  }

  document.addEventListener('click', function (event) {
    const dismissBtn = event.target.closest('.cta-04__dismiss');
    if (dismissBtn) {
      const note = dismissBtn.closest('[data-dismissible]');
      if (note) note.hidden = true;
    }

    const copyBtn = event.target.closest('[data-copy-link]');
    if (copyBtn) {
      const link = copyBtn.getAttribute('data-copy-link') || '';
      const status = copyBtn.closest('.cta-06__content')?.querySelector('.cta-06__status');
      if (!navigator.clipboard) {
        if (status) status.textContent = 'Clipboard unavailable in this browser.';
        return;
      }
      navigator.clipboard.writeText(link).then(function () {
        if (status) status.textContent = 'Sample link copied.';
      }).catch(function () {
        if (status) status.textContent = 'Unable to copy link right now.';
      });
    }

    const chip = event.target.closest('.cta-08__chip');
    if (chip) {
      const wrap = chip.closest('.cta-08__inner');
      if (!wrap) return;
      const chips = wrap.querySelectorAll('.cta-08__chip');
      chips.forEach(function (item) {
        item.classList.remove('is-active');
        item.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-checked', 'true');

      const text = wrap.querySelector('[data-intent-text]');
      const cta = wrap.querySelector('.cta-08__button');
      if (chip.dataset.intent === 'growth') {
        if (text) text.textContent = 'Growth path: ideal for teams optimizing multi-page funnels.';
        if (cta) cta.textContent = 'Continue with growth';
      } else {
        if (text) text.textContent = 'Starter path: perfect for MVP launches and fast validation.';
        if (cta) cta.textContent = 'Continue with starter';
      }
    }
  });

  const newsletterForm = document.querySelector('.cta-05__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const emailInput = this.querySelector('input[name="email"]');
      const status = this.querySelector('.cta-05__status');
      if (!emailInput || !status) return;
      const value = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValid) {
        status.textContent = 'Please enter a valid email address.';
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }
      emailInput.removeAttribute('aria-invalid');
      status.textContent = 'Thanks! You are subscribed to weekly signals.';
      this.reset();
    });
  }
})();
