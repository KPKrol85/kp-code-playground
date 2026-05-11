(() => {
  const root = document.querySelector('.hero-app-orbit');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const featureButtons = Array.from(root.querySelectorAll('.hero-app-orbit-feature'));
  const titleEl = root.querySelector('#hero-app-orbit-feature-title');
  const copyEl = root.querySelector('#hero-app-orbit-feature-copy');
  const metricsEl = root.querySelector('#hero-app-orbit-feature-metrics');

  const featureData = {
    insights: {
      title: 'Unified Performance Feed',
      copy: 'See growth metrics, team alerts, and priority actions in one glance-friendly stream.',
      metrics: [
        ['Conversion Lift', '+18.4%'],
        ['Automation Coverage', '74 workflows'],
        ['Alert Resolution', '8m avg']
      ]
    },
    flows: {
      title: 'Workflow Launchpad',
      copy: 'Compose no-code automation paths to assign, remind, and escalate critical tasks instantly.',
      metrics: [
        ['Launch Speed', '2.3x faster'],
        ['Monthly Runs', '142k'],
        ['Manual Steps Saved', '31%']
      ]
    },
    team: {
      title: 'Live Team Pulse',
      copy: 'Track team velocity and bottlenecks with real-time status mapping across every squad.',
      metrics: [
        ['Focus Capacity', '87%'],
        ['SLA Health', '98.2%'],
        ['Response Time', '4m 12s']
      ]
    },
    security: {
      title: 'Secure Control Vault',
      copy: 'Protect sensitive operations with policy snapshots, audit trails, and adaptive access rules.',
      metrics: [
        ['Policy Checks', '24/7'],
        ['Audit Events', '1.2M'],
        ['Risk Alerts', '-42%']
      ]
    }
  };

  const renderMetrics = (metrics) => {
    if (!metricsEl) return;
    metricsEl.innerHTML = '';
    metrics.forEach(([term, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = value;
      row.append(dt, dd);
      metricsEl.append(row);
    });
  };

  const setActiveFeature = (featureKey) => {
    const data = featureData[featureKey];
    if (!data || !titleEl || !copyEl) return;

    titleEl.textContent = data.title;
    copyEl.textContent = data.copy;
    renderMetrics(data.metrics);

    featureButtons.forEach((button) => {
      const isActive = button.dataset.feature === featureKey;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  featureButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.dataset.feature) return;
      setActiveFeature(button.dataset.feature);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const index = featureButtons.indexOf(button);
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextButton = featureButtons[(index + direction + featureButtons.length) % featureButtons.length];
      nextButton?.focus();
      if (nextButton?.dataset.feature) setActiveFeature(nextButton.dataset.feature);
    });
  });

  const revealNodes = Array.from(root.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && revealNodes.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  if (!reduceMotion) {
    let tick = 0;
    const orbit = root.querySelector('.hero-app-orbit__feature-ring');
    const animate = () => {
      tick += 0.008;
      if (orbit) {
        orbit.style.transform = `translateX(-50%) rotate(${Math.sin(tick) * 1.2}deg)`;
      }
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }
})();
