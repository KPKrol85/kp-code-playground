(() => {
  const root = document.querySelector('.hero-command-launch-page');
  if (!root) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = Array.from(document.querySelectorAll('.hero-command-launch-reveal'));
  if (revealElements.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.2 });
      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }

  const counters = Array.from(document.querySelectorAll('[data-counter]'));
  if (counters.length) {
    const animateCounter = (el) => {
      const target = Number(el.dataset.target || 0);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = reducedMotion ? 0 : 1200;
      const start = performance.now();

      const frame = (now) => {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const value = Math.round(target * progress);
        el.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
    } else {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.7 });
      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  const panel = document.querySelector('[data-glow-panel]');
  if (panel && !reducedMotion) {
    panel.addEventListener('pointermove', (event) => {
      const rect = panel.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty('--glow-x', `${x}%`);
      panel.style.setProperty('--glow-y', `${y}%`);
    });
  }

  const tabs = Array.from(document.querySelectorAll('.hero-command-launch-tab'));
  const panels = Array.from(document.querySelectorAll('.hero-command-launch-tabpanel'));
  if (tabs.length && panels.length) {
    const activateTab = (nextTab) => {
      tabs.forEach((tab) => {
        const isActive = tab === nextTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panelEl) => {
        const isActive = panelEl.dataset.panel === nextTab.dataset.tab;
        panelEl.classList.toggle('is-active', isActive);
        panelEl.hidden = !isActive;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        const keyMap = { ArrowRight: 1, ArrowLeft: -1, Home: 'start', End: 'end' };
        if (!(event.key in keyMap)) return;
        event.preventDefault();

        let nextIndex = index;
        if (keyMap[event.key] === 'start') nextIndex = 0;
        else if (keyMap[event.key] === 'end') nextIndex = tabs.length - 1;
        else nextIndex = (index + keyMap[event.key] + tabs.length) % tabs.length;

        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });
  }
})();
