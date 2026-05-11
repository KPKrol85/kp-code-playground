(() => {
  const root = document.querySelector('.hero-finance-flow');
  if (!root) return;

  const periodButtons = Array.from(root.querySelectorAll('.hero-finance-flow__period-btn'));
  const counterEls = Array.from(root.querySelectorAll('[data-counter]'));
  const barEls = {
    revenue: root.querySelector('[data-bar="revenue"]'),
    spend: root.querySelector('[data-bar="spend"]'),
    savings: root.querySelector('[data-bar="savings"]')
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dataByPeriod = {
    week: { metrics: [11980, 91, 22], bars: { revenue: 72, spend: 55, savings: 31 } },
    month: { metrics: [48750, 94, 18], bars: { revenue: 84, spend: 63, savings: 46 } },
    quarter: { metrics: [143280, 96, 14], bars: { revenue: 92, spend: 68, savings: 58 } }
  };

  const formatValue = (value, prefix, suffix) => {
    const rounded = Math.round(value);
    const numeric = rounded.toLocaleString();
    return `${prefix}${numeric}${suffix}`;
  };

  const animateCounter = (el, target) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    if (prefersReducedMotion) {
      el.textContent = formatValue(target, prefix, suffix);
      return;
    }

    const start = 0;
    const duration = 550;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      el.textContent = formatValue(current, prefix, suffix);
      if (progress < 1) window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  };

  const updateBars = (bars) => {
    Object.entries(bars).forEach(([key, value]) => {
      const bar = barEls[key];
      if (!bar) return;
      if (prefersReducedMotion) {
        bar.style.width = `${value}%`;
        return;
      }
      window.requestAnimationFrame(() => {
        bar.style.width = `${value}%`;
      });
    });
  };

  const setPeriod = (period) => {
    const selected = dataByPeriod[period];
    if (!selected) return;

    periodButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.period === period));
    });

    counterEls.forEach((el, idx) => {
      const target = selected.metrics[idx];
      if (typeof target !== 'number') return;
      animateCounter(el, target);
    });

    updateBars(selected.bars);
  };

  periodButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { period } = button.dataset;
      if (!period) return;
      setPeriod(period);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const index = periodButtons.indexOf(button);
      const nextIndex = event.key === 'ArrowRight'
        ? (index + 1) % periodButtons.length
        : (index - 1 + periodButtons.length) % periodButtons.length;
      periodButtons[nextIndex].focus();
      periodButtons[nextIndex].click();
    });
  });

  const revealEls = Array.from(document.querySelectorAll('.hero-finance-flow__reveal'));
  if (revealEls.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, { threshold: 0.2 });
      revealEls.forEach((el) => io.observe(el));
    }
  }

  setPeriod('month');
})();
